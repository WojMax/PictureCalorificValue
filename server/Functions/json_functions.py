import json


def sqlfetch_to_json_meals(values):
    breakfast = ''
    lunch = ''
    dinner = ''
    snacks = ''

    breakfast_calories = 0
    lunch_calories = 0
    dinner_calories = 0
    snacks_calories = 0

    for entry in values:
        meal_entry = f'''{{"id":{str(entry[0])}, "meal_name":"{str(entry[1])}", "calories_on_100g":{str(entry[2])}, "meal_weight":{str(entry[3])}, "calories":{str(int(entry[2] * entry[3] / 100))}}}'''

        if entry[4] == 'breakfast':
            breakfast += meal_entry + ','
            breakfast_calories += int(entry[2] * entry[3] / 100)
        elif entry[4] == 'lunch':
            lunch += meal_entry + ','
            lunch_calories += int(entry[2] * entry[3] / 100)
        elif entry[4] == 'dinner':
            dinner += meal_entry + ','
            dinner_calories += int(entry[2] * entry[3] / 100)
        elif entry[4] == 'snacks':
            snacks += meal_entry + ','
            snacks_calories += int(entry[2] * entry[3] / 100)

    if len(breakfast) != 0:
        breakfast = breakfast[:-1]
    if len(lunch) != 0:
        lunch = lunch[:-1]
    if len(dinner) != 0:
        dinner = dinner[:-1]
    if len(snacks) != 0:
        snacks = snacks[:-1]

    json_to_send = f'''{{"breakfast": {{"meals":[{breakfast}], "calories": {breakfast_calories}}},
                         "lunch": {{"meals":[{lunch}], "calories": {lunch_calories}}},
                         "dinner": {{"meals":[{dinner}], "calories": {dinner_calories}}},
                         "snacks": {{"meals":[{snacks}], "calories": {snacks_calories}}}}}'''
    return json.loads(json_to_send)


def sqlfetch_to_json_favourites(values):
    json_to_send = '['
    for entry in values:
        json_entry = f'{{"id":{str(entry[0])}, "meal_name":"{str(entry[1])}", "calories_on_100g":{str(entry[2])}}},'
        json_to_send += json_entry
    json_to_send = json_to_send[:-1]
    json_to_send += ']'
    return json.loads(json_to_send)


def sqlfetch_to_json_most_popular(values):
    json_to_send = '['
    for entry in values:
        json_entry = f'{{"meal_name":"{str(entry[0])}", "calories_on_100g":{str(entry[1])}, "proposed_meal_weight":{str(entry[2])}}},'
        json_to_send += json_entry
    json_to_send = json_to_send[:-1]
    json_to_send += ']'
    return json.loads(json_to_send)


def sqlfetch_to_json_user_weight(values):
    json_to_send = '['
    for entry in values:
        json_entry = f'{{"weight":{str(entry[0])}, "weight_date":"{str(entry[1])}"}},'
        json_to_send += json_entry
    json_to_send = json_to_send[:-1]
    json_to_send += ']'
    return json.loads(json_to_send)


def sqlfetch_to_json_profile(values, language):
    gender = str(values[0][0])
    exercise = str(values[0][4])

    if values[0][3] == values[0][5]:
        if language == 'pl':
            goal = 'utrzymać wagę'
        else:
            goal = 'maintain weight'
    elif values[0][3] > values[0][5]:
        if language == 'pl':
            goal = 'schudnąć'
        else:
            goal = 'lose weight'
    else:
        if language == 'pl':
            goal = 'przybrać na wadze'
        else:
            goal = 'gain weight'

    if language == 'pl':
        if gender.lower() == 'male':
            gender = 'Mężczyzna'
        else:
            gender = 'Kobieta'

        if exercise == 'Sedentary':
            exercise = 'Brak'
        elif exercise == 'Lightly':
            exercise = 'Mała'
        elif exercise == 'Moderately':
            exercise = 'Średnia'
        elif exercise == 'Active':
            exercise = 'Duża'
        elif exercise == 'Very active':
            exercise = 'Znaczna'

    json_to_send = f'{{"gender":"{gender}", "age":{str(values[0][1])}, "height":{str(values[0][2])}, "weight":{str(values[0][3])}, "exercise":"{exercise}", "goal_weight":{str(values[0][5])}, "goal_weight_change":{str(values[0][6])}, "goal":"{goal}", "activityID":{str(values[0][7])}}} '
    print(json_to_send)
    return json.loads(json_to_send)
