import json
import base64
import os

from flask import Flask, request
from flask_cors import cross_origin

import Functions.is_food_ml_functions as is_food
import Functions.food_category_ml_functions as food_category

application = Flask(__name__, instance_relative_config=True)

is_food_model_path = 'Models/OCC_Dish17_weights.h5'
category_model_path = 'Models/dish_recognition39.h5'

is_food_ml_model = is_food.get_model(is_food_model_path)
category_ml_model = food_category.get_model(category_model_path)


@application.route('/predict', methods=['POST'])
@cross_origin()
def parse_request():
    if request.method == 'POST':
        data = request.data
        pic_json = json.loads(data.decode('utf-8'))
        # b64_pic = pic_json['assets'][0]['base64']
        b64_pic = pic_json['base64']
        encoded_pic_data = base64.b64decode(b64_pic)
        filename = 'test_image.jpg'
        with open(filename, 'wb') as f:
            f.write(encoded_pic_data)

        category = None
        is_dish = is_food.give_prediction(filename, is_food_ml_model)

        if is_dish == 'Dish':
            category = food_category.give_prediction(filename, category_ml_model)

        os.remove(filename)

        return {"category": category}


if __name__ == '__main__':
    application.run(debug=True, host='127.0.0.1', port=5000)
