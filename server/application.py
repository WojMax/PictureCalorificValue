import psycopg2
import ast
import json
# from flask_awscognito import AWSCognitoAuthentication
from psycopg2 import Error
from flask import Flask, request, jsonify
from flask_cors import cross_origin

application = Flask(__name__, instance_relative_config=True)

# application.config['AWS_DEFAULT_REGION'] = 'eu-central-1'
# application.config['AWS_COGNITO_DOMAIN'] = 'https://calorie-app-server.auth.eu-central-1.amazoncognito.com'
# application.config['AWS_COGNITO_USER_POOL_ID'] = 'eu-central-1_rOBluZwQ1'
# application.config['AWS_COGNITO_USER_POOL_CLIENT_ID'] = 'm75ur9evsre2ngnssbnvnkf5g'
# application.config['AWS_COGNITO_USER_POOL_CLIENT_SECRET'] = 'ZZZZ'
# application.config['AWS_COGNITO_REDIRECT_URL'] = 'http://localhost:5000/aws_cognito_redirect'

# aws_auth = AWSCognitoAuthentication(application)

try:
    connection = psycopg2.connect(user="postgres",
                                  password="f26e%ppBV7t%a#MPxHUMMvq9j",
                                  host="calorie-app-database-instance.ctsaxdvte9a9.eu-central-1.rds.amazonaws.com",
                                  port="5432",
                                  database="calorie_app_database")
# connection = psycopg2.connect(user="postgres",
#                              password="Wojtecki2",  ########## enter password
#                              host="localhost",
#                              port="5432",
#                              database="calorie_app_database")

except (Exception, Error) as error:
    print("Error while connecting to PostgreSQL", error)


@application.route('/')
# @aws_auth.authentication_required
def index():
    # claims = aws_auth.claims  # also available through g.cognito_claims
    # return jsonify({'claims': claims})
    return 'welcome'


# @application.route('/sign_in')
# def sign_in():
#    return redirect(aws_auth.get_sign_in_url())


# @application.route('/aws_cognito_redirect')
# def aws_cognito_redirect():
#    access_token = aws_auth.get_access_token(request.args)
#    return jsonify({'access_token': access_token})


@application.route('/picture', methods=['POST', 'GET'])
@cross_origin()
def parse_request():
    if request.method == 'POST':
        pass
    return 'TEST'


@application.route('/last-picture')
@cross_origin()
def show_last_picture(last_photo=None):
    return last_photo


@application.route('/meal', methods=['PUT', 'GET'])
@cross_origin()
def save_meal_data_in_database():
    if request.method == 'PUT':
        data = request.data
        post_data = ast.literal_eval(data.decode("UTF-8"))


        userID = post_data["userID"]
        mealName = post_data["mealName"]
        calories = post_data["calories"]
        mealWeight = post_data["mealWeight"]
        dateCreated = post_data["dateCreated"]
        category = post_data["category"]

        SQLquery_user = f'INSERT INTO public.users VALUES (\'{userID}\') ON CONFLICT DO NOTHING; '
        SQLquery_meal = 'INSERT INTO public.user_meal_data (user_id, meal_name, calories, meal_weight, date_created, category) VALUES ' \
                        + f'(\'{userID}\', \'{mealName}\', {calories}, {mealWeight}, \'{dateCreated}\', \'{category}\');'
        SQLquery = SQLquery_user + SQLquery_meal
        try:
            cursor = connection.cursor()
            cursor.execute(SQLquery)
            connection.commit()
            print("successfull sql statement")
            cursor.close()
            return "200"
        except:
            print("error occured, rollback")
            connection.rollback()
            return "error occured, rollback"
    return 'pass data to db'


@application.route("/meals/<userID>", methods=['GET'])
@cross_origin()
def get_user_meals(userID):
    if request.method == 'GET':
        SQLquery = f'SELECT meal_name, calories, meal_weight FROM public.user_meal_data WHERE user_id =\'{userID}\''
        cursor = connection.cursor()
        cursor.execute(SQLquery)
        if cursor.rowcount != 0:
            meals = cursor.fetchall()
            cursor.close()
            jsons = '['
            for entry in meals:
                meal_name = entry[0]
                meal_calories_on_100g = entry[1]
                meal_weight = entry[2]
                meal_calories = meal_weight * meal_calories_on_100g / 100
                entry_json = '{"meal_name":"' + meal_name + '","calories":' + str(
                    int(meal_calories)) + ',"calories_on_100g":' + str(int(meal_calories_on_100g)) + '},'
                jsons += entry_json
            jsons = jsons[:-1]
            jsons += ']'
            meals_data_json = json.loads(jsons)
            return jsonify(meals_data_json)
        else:
            cursor.close()
            return {}


@application.route('/favourites', methods=['PUT', 'DELETE', 'POST'])
@cross_origin()
def favourites():
    if request.method == 'PUT':
        # add new favourite meal
        data = request.data
        post_data = ast.literal_eval(data.decode("UTF-8"))

        userID = post_data["userID"]
        mealName = post_data["mealName"]
        calories = post_data["calories"]
        category = post_data["category"]

        SQLquery_user = f'INSERT INTO public.users VALUES (\'{userID}\') ON CONFLICT DO NOTHING; '
        SQLquery_meal = 'INSERT INTO public.user_favourites_data (user_id, meal_name, calories, category) VALUES ' \
                        + f'(\'{userID}\', \'{mealName}\', {calories}, \'{category}\');'
        SQLquery = SQLquery_user + SQLquery_meal
        try:
            cursor = connection.cursor()
            cursor.execute(SQLquery)
            connection.commit()
            print("successfull sql statement")
            cursor.close()
            return "200"
        except:
            print("error occured, rollback")
            connection.rollback()
            cursor.close()
            return "error occured, rollback"

    elif request.method == 'DELETE':
        # delete favourite meal
        data = request.data
        post_data = ast.literal_eval(data.decode("UTF-8"))

        userID = post_data["userID"]
        mealName = post_data["mealName"]
        calories = post_data["calories"]
        category = post_data["category"]

        SQLquery = f'DELETE FROM public.user_favourites_data\n' \
                   f'WHERE user_id = \'{userID}\' AND meal_name = \'{mealName}\' AND calories = {calories} AND category = \'{category}\';'
        try:
            cursor = connection.cursor()
            cursor.execute(SQLquery)
            connection.commit()
            print("successfull sql statement")
            cursor.close()
            return "200"
        except:
            print("error occured, rollback")
            connection.rollback()
            cursor.close()
            return "error occured, rollback"

    elif request.method == 'POST':
        # change favourite meal data
        data = request.data
        post_data = ast.literal_eval(data.decode("UTF-8"))

        userID = post_data["userID"]
        mealName = post_data["mealName"]
        calories = post_data["calories"]
        category = post_data["category"]
        newMealName = post_data["newCategory"]
        newCalories = post_data["newCalories"]
        newCategory = post_data["newCategory"]

        SQLquery = f'UPDATE public.user_favourites_data\n' \
                   f'SET meal_name=\'{newMealName}\', calories={newCalories}, category=\'{newCategory}\'\n' \
                   f'WHERE user_id = \'{userID}\' AND meal_name=\'{mealName}\' AND calories={calories} AND category=\'{category}\';'
        print(SQLquery)
        try:
            cursor = connection.cursor()
            cursor.execute(SQLquery)
            connection.commit()
            print("successfull sql statement")
            cursor.close()
            return "200"
        except:
            print("error occured, rollback")
            connection.rollback()
            cursor.close()
            return "error occured, rollback"


@application.route("/favourites/<userID>", methods=['GET'])
@cross_origin()
def get_user_favourites(userID):
    if request.method == 'GET':
        cursor = connection.cursor()
        SQLquery = f'SELECT meal_name, calories, category FROM public.user_favourites_data WHERE user_id =\'{userID}\''
        cursor.execute(SQLquery)
        if cursor.rowcount != 0:
            favourites = cursor.fetchall()
            cursor.close()

            jsons = '['
            for entry in favourites:
                favourite_name = entry[0]
                favourite_calories_on_100g = entry[1]
                favourite_category = entry[2]
                entry_json = '{"meal_name":"' + favourite_name + '","calories":' + str(int(favourite_calories_on_100g)) \
                             + ',"category": "' + str(favourite_category) + '"},'
                jsons += entry_json
            jsons = jsons[:-1]
            jsons += ']'

            favourites_data_json = json.loads(jsons)

            return jsonify(favourites_data_json)
        else:
            cursor.close()
            return {}


if __name__ == '__main__':
    application.run(debug=True)
