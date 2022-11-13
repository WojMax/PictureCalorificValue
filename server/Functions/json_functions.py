import json


def sqlfetch_to_json_meals(values):
    json_to_send = '['
    for entry in values:
        json_entry = f'{{"id":{str(entry[0])}, "meal_name":"{str(entry[1])}", "calories_on_100g":{str(entry[2])}, "meal_weight":{str(entry[3])}, "calories":{str(int(entry[2] * entry[3] / 100))}, "category":"{str(entry[4])}"}},'
        json_to_send += json_entry
    json_to_send = json_to_send[:-1]
    json_to_send += ']'

    return json.loads(json_to_send)


def sqlfetch_to_json_favourites(values):
    json_to_send = '['
    for entry in values:
        json_entry = f'{{"id":{str(entry[0])}, "meal_name":"{str(entry[1])}", "calories_on_100g":{str(entry[2])}}},'
        json_to_send += json_entry
    json_to_send = json_to_send[:-1]
    json_to_send += ']'
    return json.loads(json_to_send)


