import ast
import json

from flask_awscognito import AWSCognitoAuthentication
from datetime import date

from flask import Flask, request, jsonify, make_response
from flask_cors import cross_origin

from Functions.db_functions import connect_to_db
from Functions.json_functions import sqlfetch_to_json_meals, sqlfetch_to_json_favourites, sqlfetch_to_json_most_popular, \
    sqlfetch_to_json_user_weight, sqlfetch_to_json_profile
from Functions.sql_functions import insert_favourites, delete_favourites, update_favourites, insert_meals, update_meals, \
    delete_meals, insert_user_data, update_user_data, insert_weight_history, update_goals
from Functions.user_functions import calculate_caloric_demand
from Middleware.middleware_tokens import Middleware


application = Flask(__name__, instance_relative_config=True)
application.wsgi_app = Middleware(application.wsgi_app)

with open('AWS/secrets.json', mode='r') as f:
    keys = json.loads(f.read())

    application.config['AWS_DEFAULT_REGION'] = keys['AWS_DEFAULT_REGION']
    application.config['AWS_COGNITO_USER_POOL_ID'] = keys['AWS_COGNITO_USER_POOL_ID']
    application.config['AWS_COGNITO_DOMAIN'] = keys['AWS_COGNITO_DOMAIN']
    application.config['AWS_COGNITO_USER_POOL_CLIENT_ID'] = keys['AWS_COGNITO_USER_POOL_CLIENT_ID']
    application.config['AWS_COGNITO_USER_POOL_CLIENT_SECRET'] = keys['AWS_COGNITO_USER_POOL_CLIENT_SECRET']
    application.config['AWS_COGNITO_REDIRECT_URL'] = keys['AWS_COGNITO_REDIRECT_URL']


aws_auth = AWSCognitoAuthentication(application)


@application.route('/')
def index():
    return 'active'


@application.route('/meal/<date>', methods=['GET'])
@aws_auth.authentication_required
@cross_origin()
def get_meal(date):
    if request.method == 'GET':
        connection = connect_to_db(keys)
        cursor = connection.cursor()
        try:
            user = Middleware.get_user_ID(application.wsgi_app)
            cursor.execute(
                f'''SELECT 
                        id, meal_name, calories, meal_weight, category 
                    FROM 
                        public.user_meal_data 
                    WHERE 
                        user_id =\'{user}\' AND date_created = \'{date}\';''')
        except Exception as error:
            print(error)
            connection.rollback()

        if cursor.rowcount == -1:
            cursor.close()
            connection.close()
            return make_response(jsonify({'code': 'FAILURE'}), 500)
        elif cursor.rowcount == 0:
            cursor.close()
            connection.close()
            return jsonify({})
        else:
            meals = cursor.fetchall()
            cursor.close()
            connection.close()
            return jsonify(sqlfetch_to_json_meals(values=meals))


@application.route('/meal', methods=['PUT', 'POST', 'PATCH'])
@aws_auth.authentication_required
@cross_origin()
def meal():
    if request.method == 'PUT':
        connection = connect_to_db(keys)
        cursor = connection.cursor()
        try:
            insert_meals(cursor, request.data, Middleware.get_user_ID(application.wsgi_app))
            connection.commit()
            print("successful sql statement")
            cursor.close()
            connection.close()
            return make_response(jsonify({'code': 'SUCCESS'}), 200)
        except Exception as error:
            print("error occurred, rollback")
            print(error)
            connection.rollback()
            cursor.close()
            connection.close()
            return make_response(jsonify({'code': 'FAILURE'}), 500)
    if request.method == 'POST':
        connection = connect_to_db(keys)
        cursor = connection.cursor()
        try:
            update_meals(cursor, request.data, Middleware.get_user_ID(application.wsgi_app))
            connection.commit()
            print("successfull sql statement")
            cursor.close()
            connection.close()
            return make_response(jsonify({'code': 'SUCCESS'}), 200)
        except Exception as error:
            print("error occured, rollback")
            print(error)
            connection.rollback()
            cursor.close()
            connection.close()
            return make_response(jsonify({'code': 'FAILURE'}), 500)
    if request.method == 'PATCH':
        connection = connect_to_db(keys)
        cursor = connection.cursor()
        try:
            delete_meals(cursor, request.data)
            connection.commit()
            print("successful sql statement")
            cursor.close()
            connection.close()
            return make_response(jsonify({'code': 'SUCCESS'}), 200)
        except Exception as error:
            print(error)
            print("error occurred, rollback")
            connection.rollback()
            cursor.close()
            connection.close()
            return make_response(jsonify({'code': 'FAILURE'}), 500)


@application.route('/favourites', methods=['GET', 'PUT', 'PATCH', 'POST'])
@aws_auth.authentication_required
@cross_origin()
def favourites():
    if request.method == 'GET':
        connection = connect_to_db(keys)
        cursor = connection.cursor()
        try:
            user = Middleware.get_user_ID(application.wsgi_app)
            cursor.execute(
                f'''SELECT 
                        id, meal_name, calories 
                    FROM 
                        public.user_favourites_data 
                    WHERE 
                        user_id =\'{user}\';''')
        except Exception as error:
            print(error)
            connection.rollback()

        if cursor.rowcount == -1:
            cursor.close()
            connection.close()
            return make_response(jsonify({'code': 'FAILURE'}), 500)
        elif cursor.rowcount == 0:
            cursor.close()
            connection.close()
            return jsonify({})
        else:
            favourite_meals = cursor.fetchall()
            cursor.close()
            connection.close()
            return jsonify(sqlfetch_to_json_favourites(values=favourite_meals))

    if request.method == 'PUT':
        # add new favourite meal
        connection = connect_to_db(keys)
        cursor = connection.cursor()
        try:
            insert_favourites(cursor, request.data, Middleware.get_user_ID(application.wsgi_app))
            connection.commit()
            print("successful sql statement")
            cursor.close()
            connection.close()
            return make_response(jsonify({'code': 'SUCCESS'}), 200)
        except Exception as error:
            print(error)
            print("error occurred, rollback")
            connection.rollback()
            cursor.close()
            connection.close()
            return make_response(jsonify({'code': 'FAILURE'}), 500)

    elif request.method == 'PATCH':
        # delete favourite meal
        connection = connect_to_db(keys)
        cursor = connection.cursor()
        try:
            delete_favourites(cursor, request.data)
            connection.commit()
            print("successful sql statement")
            cursor.close()
            connection.close()
            return make_response(jsonify({'code': 'SUCCESS'}), 200)
        except Exception as error:
            print(error)
            print("error occurred, rollback")
            connection.rollback()
            cursor.close()
            connection.close()
            return make_response(jsonify({'code': 'FAILURE'}), 500)

    elif request.method == 'POST':
        # change favourite meal data
        connection = connect_to_db(keys)
        cursor = connection.cursor()
        try:
            update_favourites(cursor, request.data, Middleware.get_user_ID(application.wsgi_app))
            connection.commit()
            print("successful sql statement")
            cursor.close()
            print('cursor closed')
            connection.close()
            print('conn closed')
            return make_response(jsonify({'code': 'SUCCESS'}), 200)
        except Exception as error:
            print(error)
            print("error occurred, rollback")
            connection.rollback()
            cursor.close()
            connection.close()
            return make_response(jsonify({'code': 'FAILURE'}), 500)


@application.route('/popular/<lang>', methods=['GET'])
@aws_auth.authentication_required
@cross_origin()
def popular(lang):
    if request.method == 'GET':
        connection = connect_to_db(keys)
        cursor = connection.cursor()
        try:
            cursor.execute(
                f'''SELECT 
                        meal_name, calories_on_100g, proposed_meal_weight
                    FROM 
                        public.most_popular
                    WHERE
                        language = '{lang}'
                    ORDER BY
                        meal_name;''')

        except Exception as error:
            print(error)
            connection.rollback()

        if cursor.rowcount == -1:
            cursor.close()
            connection.close()
            return make_response(jsonify({'code': 'FAILURE'}), 500)
        elif cursor.rowcount == 0:
            cursor.close()
            connection.close()
            return jsonify({})
        else:
            most_popular_meals = cursor.fetchall()
            cursor.close()
            connection.close()
            return jsonify(sqlfetch_to_json_most_popular(values=most_popular_meals))


@application.route('/caloricDemand', methods=['GET'])
@aws_auth.authentication_required
@cross_origin()
def caloric_demand():
    if request.method == 'GET':
        connection = connect_to_db(keys)
        cursor = connection.cursor()
        try:
            user = Middleware.get_user_ID(application.wsgi_app)
            cursor.execute(
                f'''SELECT 
                        U.gender, U.age, U.height, U.weight, E.value, U.goal_weight_change, U.goal_weight
                    FROM 
                        public.users U 
                    INNER JOIN 
                        public.user_exercise_data E ON U.weekly_exercise = E.id
                    WHERE
                        user_id = \'{user}\';''')
        except Exception as error:
            print(error)
            connection.rollback()

        if cursor.rowcount == -1:
            cursor.close()
            connection.close()
            return make_response(jsonify({'code': 'FAILURE'}), 500)
        elif cursor.rowcount == 0:
            cursor.close()
            connection.close()
            return jsonify({})
        else:
            user_data = cursor.fetchall()
            caloric_demand = calculate_caloric_demand(user_data)
            cursor.close()
            connection.close()
            if caloric_demand != -1:
                return jsonify(json.loads(f'{{"caloricDemand": {caloric_demand}}}'))
            else:
                return make_response(jsonify({'code': 'FAILURE', 'error': 'incorrect user values'}), 500)


@application.route('/profile/<lang>', methods=['GET'])
@aws_auth.authentication_required
@cross_origin()
def profile_get(lang):
    if request.method == 'GET':
        connection = connect_to_db(keys)
        cursor = connection.cursor()
        try:
            user = Middleware.get_user_ID(application.wsgi_app)
            cursor.execute(
                f'''SELECT 
                        U.gender, U.age, U.height, U.weight, E.name, U.goal_weight, U.goal_weight_change, E.id
                    FROM 
                        public.users U 
                    INNER JOIN 
                        public.user_exercise_data E ON U.weekly_exercise = E.id
                    WHERE
                        user_id = \'{user}\';''')
        except Exception as error:
            print(error)
            connection.rollback()

        if cursor.rowcount == -1:
            cursor.close()
            connection.close()
            return make_response(jsonify({'code': 'FAILURE'}), 500)
        elif cursor.rowcount == 0:
            cursor.close()
            connection.close()
            return jsonify({})
        else:
            profile_data = cursor.fetchall()
            cursor.close()
            connection.close()
            return jsonify(sqlfetch_to_json_profile(values=profile_data, language=lang))


@application.route('/profile', methods=['PUT', 'POST'])
@aws_auth.authentication_required
@cross_origin()
def profile():
    if request.method == 'PUT':
        connection = connect_to_db(keys)
        cursor = connection.cursor()
        try:
            insert_user_data(cursor, request.data, Middleware.get_user_ID(application.wsgi_app))
            connection.commit()
            print("successful sql statement")
            cursor.close()
            connection.close()
            return make_response(jsonify({'code': 'SUCCESS'}), 200)
        except Exception as error:
            print(error)
            print("error occurred, rollback")
            connection.rollback()
            cursor.close()
            connection.close()
            return make_response(jsonify({'code': 'FAILURE'}), 500)

    elif request.method == 'POST':
        connection = connect_to_db(keys)
        cursor = connection.cursor()
        try:
            user = Middleware.get_user_ID(application.wsgi_app)
            current_date = date.today()

            cursor.execute(
                f'''SELECT 
                        *
                    FROM 
                        public.user_weight_history
                    WHERE 
                        user_id = '{user}' AND weight_date = '{current_date}';''')

            already_inserted = cursor.rowcount
            cursor.close()

            cursor = connection.cursor()
            update_user_data(cursor, request.data, user, already_inserted, current_date)
            connection.commit()
            print("successful sql statement")
            cursor.close()
            print('cursor closed')
            connection.close()
            print('conn closed')
            return make_response(jsonify({'code': 'SUCCESS'}), 200)
        except Exception as error:
            print(error)
            print("error occurred, rollback")
            connection.rollback()
            cursor.close()
            connection.close()
            return make_response(jsonify({'code': 'FAILURE'}), 500)


@application.route('/weight', methods=['GET', 'PUT'])
@aws_auth.authentication_required
@cross_origin()
def get_weight():
    if request.method == 'GET':
        connection = connect_to_db(keys)
        cursor = connection.cursor()
        try:
            user = Middleware.get_user_ID(application.wsgi_app)
            cursor.execute(
                f'''SELECT 
                        weight, weight_date
                    FROM 
                        public.user_weight_history
                    WHERE 
                        user_id = '{user}';''')
        except Exception as error:
            print(error)
            connection.rollback()

        if cursor.rowcount == -1:
            cursor.close()
            connection.close()
            return make_response(jsonify({'code': 'FAILURE'}), 500)
        elif cursor.rowcount == 0:
            cursor.close()
            connection.close()
            return jsonify({})
        else:
            user_weight_data = cursor.fetchall()
            cursor.close()
            connection.close()
            return jsonify(sqlfetch_to_json_user_weight(values=user_weight_data))

    elif request.method == 'PUT':
        connection = connect_to_db(keys)
        cursor = connection.cursor()
        try:
            user = Middleware.get_user_ID(application.wsgi_app)
            put_data = ast.literal_eval(request.data.decode("UTF-8"))
            date = put_data["date"]

            cursor.execute(
                f'''SELECT 
                        *
                    FROM 
                        public.user_weight_history
                    WHERE 
                        user_id = '{user}' AND weight_date = '{date}';''')

            already_inserted = cursor.rowcount
            cursor.close()

            cursor = connection.cursor()
            insert_weight_history(cursor, request.data, user, already_inserted)
            connection.commit()
            print("successful sql statement")
            cursor.close()
            connection.close()
            return make_response(jsonify({'code': 'SUCCESS'}), 200)
        except Exception as error:
            print(error)
            print("error occurred, rollback")
            connection.rollback()
            cursor.close()
            connection.close()
            return make_response(jsonify({'code': 'FAILURE'}), 500)


@application.route('/goal', methods=['POST'])
@aws_auth.authentication_required
@cross_origin()
def goal():
    if request.method == 'POST':
        connection = connect_to_db(keys)
        cursor = connection.cursor()
        try:
            update_goals(cursor, request.data, Middleware.get_user_ID(application.wsgi_app))
            connection.commit()
            print("successfull sql statement")
            cursor.close()
            connection.close()
            return make_response(jsonify({'code': 'SUCCESS'}), 200)
        except Exception as error:
            print("error occured, rollback")
            print(error)
            connection.rollback()
            cursor.close()
            connection.close()
            return make_response(jsonify({'code': 'FAILURE'}), 500)


if __name__ == '__main__':
    application.run(debug=True)
