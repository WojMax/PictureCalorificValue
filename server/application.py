import psycopg2
import ast
from psycopg2 import Error
from flask import Flask, request, redirect, url_for
from flask_cors import CORS, cross_origin

application = Flask(__name__, instance_relative_config=True)


try:
    connection = psycopg2.connect(user="postgres",
                                  password="f26e%ppBV7t%a#MPxHUMMvq9j",
                                  host="calorie-app-database-instance.ctsaxdvte9a9.eu-central-1.rds.amazonaws.com",
                                  port="5432",
                                  database="calorie_app_database")


except (Exception, Error) as error:
    print("Error while connecting to PostgreSQL", error)


@application.route('/')
def hello_world():
    return 'Calorie app server'


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


@application.route('/meal', methods=['PUT','GET'])
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
        print(SQLquery)
        cursor = connection.cursor()
        try:
            cursor.execute(SQLquery)
            connection.commit()
            cursor.close()
            print("successfull sql statement")
            return "200"
        except:
            print("error occured, rollback")
            connection.rollback()
            cursor.close()
            return "error occured, rollback"
    return 'pass data to db'


if __name__ == '__main__':
    application.run(debug=True)



