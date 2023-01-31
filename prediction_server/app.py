import json
import base64
import os

from flask import Flask, request, jsonify
from flask_cors import cross_origin
from flask_awscognito import AWSCognitoAuthentication

import Functions.is_food_ml_functions as is_food
import Functions.food_category_ml_functions as food_category

app = Flask(__name__, instance_relative_config=True)

is_food_model_path = 'Models/OCC_Dish17_weights.h5'
category_model_path = 'Models/dish_recognition29.h5'

is_food_ml_model = is_food.get_model(is_food_model_path)
category_ml_model = food_category.get_model(category_model_path)


with open('AWS/secrets.json', mode='r') as f:
	keys = json.loads(f.read())

	app.config['AWS_DEFAULT_REGION'] = keys['AWS_DEFAULT_REGION']
	app.config['AWS_COGNITO_USER_POOL_ID'] = keys['AWS_COGNITO_USER_POOL_ID']
	app.config['AWS_COGNITO_DOMAIN'] = keys['AWS_COGNITO_DOMAIN']
	app.config['AWS_COGNITO_USER_POOL_CLIENT_ID'] = keys['AWS_COGNITO_USER_POOL_CLIENT_ID']
	app.config['AWS_COGNITO_USER_POOL_CLIENT_SECRET'] = keys['AWS_COGNITO_USER_POOL_CLIENT_SECRET']
	app.config['AWS_COGNITO_REDIRECT_URL'] = keys['AWS_COGNITO_REDIRECT_URL']


aws_auth = AWSCognitoAuthentication(app)


@app.route('/', methods=['GET'])
@aws_auth.authentication_required
@cross_origin()
def status():
	return 'active'
	

@app.route('/predict', methods=['POST'])
@aws_auth.authentication_required
@cross_origin()
def parse_request():
	if request.method == 'POST':
		data = request.data
		pic_json = json.loads(data.decode('utf-8'))
		try:
        		b64_pic = pic_json['base64']
		except:
			return jsonify({"message": "Invalid picture"})
		encoded_pic_data = base64.b64decode(b64_pic)
		filename = 'Predict/Data/test-image.jpg'
		with open(filename, 'wb') as f:
			f.write(encoded_pic_data)

		category = None
		calories = None
		is_dish = is_food.give_prediction(filename, is_food_ml_model)

		if is_dish == 'Dish':
			category, calories = food_category.give_prediction(category_ml_model)

		os.remove(filename)

		return jsonify({"category": category, "calories": calories})


if __name__ == '__main__':
	app.run(debug=True)

