import ast
import base64
#import tensorflow as tf
#from keras.models import *
#from keras.layers import *
#from keras.callbacks import *
#from keras.optimizers import *
#from keras.applications import VGG16
#from keras.applications.vgg19 import preprocess_input
#import numpy as np
import io
import json
import os
import random

from datetime import date

import boto3
import botocore
from flask import Flask, request, jsonify, make_response
from flask_cors import cross_origin

from Functions.db_functions import connect_to_db
from Functions.json_functions import sqlfetch_to_json_meals, sqlfetch_to_json_favourites, sqlfetch_to_json_most_popular, \
    sqlfetch_to_json_user_weight, sqlfetch_to_json_profile
#from Functions.ml_functions import give_prediction, load_model_instance
from Functions.sql_functions import insert_favourites, delete_favourites, update_favourites, insert_meals, update_meals, \
    delete_meals, insert_user_data, update_user_data, insert_weight_history, update_goals
from Functions.user_functions import calculate_caloric_demand
from Middleware.middleware_tokens import Middleware

application = Flask(__name__, instance_relative_config=True)
application.wsgi_app = Middleware(application.wsgi_app)


@application.route('/')
# @aws_auth.authentication_required
def index():
    # claims = aws_auth.claims  # also available through g.cognito_claims
    # return jsonify({'claims': claims})
    return 'welcome'


@application.route('/meal/<date>', methods=['GET'])
@cross_origin()
def get_meal(date):
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


@application.route('/meal', methods=['PUT', 'POST', 'DELETE'])
@cross_origin()
def meal():
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


@application.route('/caloricDemand', methods=['GET'])
@cross_origin()
def caloric_demand():
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


@application.route('/profile', methods=['GET', 'PUT', 'POST'])
@cross_origin()
def profile():
    if request.method == 'GET':
        connection = connect_to_db()
        cursor = connection.cursor()
        try:
            user = Middleware.get_user_ID(application.wsgi_app)
            cursor.execute(
                f'''SELECT 
                        U.gender, U.age, U.height, U.weight, E.name, U.goal_weight, U.goal_weight_change
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
            return jsonify(sqlfetch_to_json_profile(values=profile_data))

    elif request.method == 'PUT':
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

    elif request.method == 'POST':
        connection = connect_to_db()
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
            cursor.execute(update_user_data(request.data, user, already_inserted, current_date))
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
@cross_origin()
def get_weight():
    if request.method == 'GET':
        connection = connect_to_db()
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
        connection = connect_to_db()
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
            cursor.execute(insert_weight_history(request.data, user, already_inserted))
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
@cross_origin()
def goal():
    if request.method == 'POST':
        connection = connect_to_db()
        cursor = connection.cursor()
        try:
            cursor.execute(update_goals(request.data, Middleware.get_user_ID(application.wsgi_app)))
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
