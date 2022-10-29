import json


def sqlfetch_to_json_meals(values):
    json_to_send = '['
    for entry in values:
        json_entry = f'{{"meal_name":"{entry[0]}", "calories":{str(entry[1])}, "meal_weight":{str(entry[2])}, "calories_on_100g":{str(int(entry[1] * entry[2] / 100))}, "category":"{str(entry[3])}"}},'
        json_to_send += json_entry
    json_to_send = json_to_send[:-1]
    json_to_send += ']'
    return json.loads(json_to_send)


def sqlfetch_to_json_favourites(values):
    json_to_send = '['
    for entry in values:
        json_entry = f'{{"meal_name":"{entry[0]}", "calories":{str(entry[1])}, "category":"{str(entry[2])}"}},'
        json_to_send += json_entry
    json_to_send = json_to_send[:-1]
    json_to_send += ']'
    return json.loads(json_to_send)


