import json

from flask import Flask, request, jsonify, make_response
from flask_cors import cross_origin
from Functions.json_functions import sqlfetch_to_json_meals, sqlfetch_to_json_favourites, sqlfetch_to_json_most_popular
from Functions.db_functions import connect_to_db
from Functions.sql_functions import insert_favourites, delete_favourites, update_favourites, insert_meals, update_meals, \
    delete_meals, insert_user_data
from Functions.user_functions import calculate_caloric_demand
from Middleware.middleware_tokens import Middleware

application = Flask(__name__, instance_relative_config=True)
application.wsgi_app = Middleware(application.wsgi_app)


# application.config['AWS_DEFAULT_REGION'] = 'eu-central-1'
# application.config['AWS_COGNITO_DOMAIN'] = 'https://calorie-app-server.auth.eu-central-1.amazoncognito.com'
# application.config['AWS_COGNITO_USER_POOL_ID'] = 'eu-central-1_RCh3lDhgJ'
# application.config['AWS_COGNITO_USER_POOL_CLIENT_ID'] = '32q1vjtjc18nftf6r87r6ijj6p'
# application.config['AWS_COGNITO_USER_POOL_CLIENT_SECRET'] = ''
# application.config['AWS_COGNITO_REDIRECT_URL'] = 'http://localhost:5000/aws_cognito_redirect'

# aws_auth = AWSCognitoAuthentication(application)


@application.route('/')
# @aws_auth.authentication_required
def index():
    # claims = aws_auth.claims  # also available through g.cognito_claims
    # return jsonify({'claims': claims})
    return 'welcome'


@application.route('/meal', methods=['GET', 'PUT', 'POST', 'DELETE'])
@cross_origin()
def meal():
    if request.method == 'GET':
        connection = connect_to_db()
        cursor = connection.cursor()
        try:
            user = Middleware.get_user_ID(application.wsgi_app)
            cursor.execute(
                f'''SELECT 
                        id, meal_name, calories, meal_weight, category 
                    FROM 
                        public.user_meal_data 
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
            meals = cursor.fetchall()
            cursor.close()
            connection.close()
            return jsonify(sqlfetch_to_json_meals(values=meals))

    if request.method == 'PUT':
        connection = connect_to_db()
        cursor = connection.cursor()
        try:
            cursor.execute(insert_meals(request.data, Middleware.get_user_ID(application.wsgi_app)))
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
        connection = connect_to_db()
        cursor = connection.cursor()
        try:
            cursor.execute(update_meals(request.data, Middleware.get_user_ID(application.wsgi_app)))
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
    if request.method == 'DELETE':
        connection = connect_to_db()
        cursor = connection.cursor()
        try:
            cursor.execute(delete_meals(request.data))
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


@application.route('/favourites', methods=['GET', 'PUT', 'DELETE', 'POST'])
@cross_origin()
def favourites():
    if request.method == 'GET':
        connection = connect_to_db()
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
        connection = connect_to_db()
        cursor = connection.cursor()
        try:
            cursor.execute(insert_favourites(request.data, Middleware.get_user_ID(application.wsgi_app)))
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

    elif request.method == 'DELETE':
        # delete favourite meal
        connection = connect_to_db()
        cursor = connection.cursor()
        try:
            cursor.execute(delete_favourites(request.data))
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
        connection = connect_to_db()
        cursor = connection.cursor()
        try:
            cursor.execute(update_favourites(request.data, Middleware.get_user_ID(application.wsgi_app)))
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
@cross_origin()
def popular(lang):
    if request.method == 'GET':
        connection = connect_to_db()
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


@application.route('/profile', methods=['GET', 'PUT'])
@cross_origin()
def profile():
    if request.method == 'GET':
        connection = connect_to_db()
        cursor = connection.cursor()
        try:
            user = Middleware.get_user_ID(application.wsgi_app)
            cursor.execute(
                f'''SELECT 
                        U.gender, U.age, U.height, U.weight, E.value
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

    if request.method == 'PUT':
        connection = connect_to_db()
        cursor = connection.cursor()
        try:
            cursor.execute(insert_user_data(request.data, Middleware.get_user_ID(application.wsgi_app)))
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


if __name__ == '__main__':
    application.run(debug=True)
