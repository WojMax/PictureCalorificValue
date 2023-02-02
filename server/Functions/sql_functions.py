import ast
from datetime import date


def insert_meals(put_data, userID):
    put_data = ast.literal_eval(put_data.decode("UTF-8"))

    mealName = put_data["mealName"]
    caloriesOn100g = put_data["caloriesOn100g"]
    mealWeight = put_data["mealWeight"]
    dateCreated = put_data["dateCreated"]
    category = put_data["category"]

    SQLquery_user = f'INSERT INTO public.users(user_id, gender, age, height, weight, weekly_exercise) VALUES (\'{userID}\', \'male\', 20, 180, 75, 3) ON CONFLICT DO NOTHING; '
    SQLquery_meal = 'INSERT INTO public.user_meal_data (user_id, meal_name, calories, meal_weight, date_created, category) VALUES ' \
                    + f'(\'{userID}\', \'{mealName}\', {caloriesOn100g}, {mealWeight}, \'{dateCreated}\', \'{category}\');'

    return SQLquery_user + SQLquery_meal


def update_meals(post_data, userID):
    post_data = ast.literal_eval(post_data.decode("UTF-8"))

    mealID = post_data["mealID"]
    mealName = post_data["mealName"]
    caloriesOn100g = post_data["caloriesOn100g"]
    mealWeight = post_data["mealWeight"]

    SQLquery = f'UPDATE public.user_meal_data\n' \
               f'SET meal_name=\'{mealName}\', calories={caloriesOn100g}, meal_weight={mealWeight}\n' \
               f'WHERE id = {mealID} AND user_id = \'{userID}\';'

    return SQLquery


def delete_meals(delete_data):
    delete_data = ast.literal_eval(delete_data.decode("UTF-8"))["data"]

    mealId = delete_data["mealID"]

    SQLquery = f'DELETE FROM public.user_meal_data\n' \
               f'WHERE id = \'{mealId}\';'

    return SQLquery


def insert_favourites(put_data, userID):
    put_data = ast.literal_eval(put_data.decode("UTF-8"))

    mealName = put_data["mealName"]
    caloriesOn100g = put_data["caloriesOn100g"]

    SQLquery_user = f'INSERT INTO public.users(user_id, gender, age, height, weight, weekly_exercise) VALUES (\'{userID}\', \'male\', 20, 180, 75, 3) ON CONFLICT DO NOTHING; '
    SQLquery_meal = 'INSERT INTO public.user_favourites_data (user_id, meal_name, calories) VALUES ' \
                    + f'(\'{userID}\', \'{mealName}\', {caloriesOn100g});'

    return SQLquery_user + SQLquery_meal


def delete_favourites(delete_data):
    delete_data = ast.literal_eval(delete_data.decode("UTF-8"))["data"]

    mealId = delete_data["mealID"]

    SQLquery = f'DELETE FROM public.user_favourites_data\n' \
               f'WHERE id = \'{mealId}\';'

    return SQLquery


def update_favourites(post_data, userID):
    post_data = ast.literal_eval(post_data.decode("UTF-8"))

    mealID = post_data["mealID"]
    mealName = post_data["mealName"]
    caloriesOn100g = post_data["caloriesOn100g"]

    SQLquery = f'UPDATE public.user_favourites_data\n' \
               f'SET meal_name=\'{mealName}\', calories={caloriesOn100g}\n' \
               f'WHERE id = {mealID} AND user_id = \'{userID}\';'

    return SQLquery


def insert_user_data(put_data, userID):
    put_data = ast.literal_eval(put_data.decode("UTF-8"))

    gender = put_data["gender"]
    age = put_data["age"]
    height = put_data["height"]
    weight = put_data["weight"]
    weekly_exercise = put_data["activityID"]
    goal_weight = put_data["goal_weight"]
    goal_weight_change = put_data["goal_weight_change"]
    print(put_data)
    if goal_weight.lower() == 'null' or goal_weight is None:
        goal_weight = weight
        goal_weight_change = 0

    current_date = date.today()

    SQLquery_user = 'INSERT INTO public.users(user_id, gender, age, height, weight, weekly_exercise, goal_weight, ' \
                    'goal_weight_change) VALUES ' \
                    + f'(\'{userID}\', \'{gender}\', {age}, {height}, {weight}, {weekly_exercise}, {goal_weight}, ' \
                      f'{goal_weight_change}); '
    SQLquery_user_weight_history = f'''INSERT INTO public.user_weight_history(user_id, weight, weight_date)
                                                VALUES ('{userID}', {weight}, '{current_date}');'''
    print(SQLquery_user)
    print(SQLquery_user_weight_history)
    return SQLquery_user + SQLquery_user_weight_history


def update_user_data(post_data, userID, already_inserted, current_date):
    post_data = ast.literal_eval(post_data.decode("UTF-8"))

    gender = post_data["gender"]
    age = post_data["age"]
    height = post_data["height"]
    weight = post_data["weight"]
    weekly_exercise = post_data["activityID"]

    if already_inserted == 0:
        SQLquery_user_weight_history = f'''INSERT INTO public.user_weight_history(user_id, weight, weight_date)
                                            VALUES ('{userID}', {weight}, '{current_date}');'''
    else:
        SQLquery_user_weight_history = f'''UPDATE public.user_weight_history
                                            SET weight={weight}
                                            WHERE user_id = '{userID}' AND weight_date = '{current_date}';'''

    SQLquery_user_data = f'''UPDATE public.users
                    SET gender='{gender}', age={age}, height={height}, weight={weight}, weekly_exercise={weekly_exercise}
                    WHERE user_id = '{userID}';'''

    return SQLquery_user_data + SQLquery_user_weight_history


def insert_weight_history(put_data, userID, already_inserted):
    put_data = ast.literal_eval(put_data.decode("UTF-8"))

    weight = put_data["weight"]
    date = put_data["date"]

    if already_inserted == 0:
        SQLquery_user_weight_history = f'''INSERT INTO public.user_weight_history(user_id, weight, weight_date)
                                            VALUES ('{userID}', {weight}, '{date}');'''
    else:
        SQLquery_user_weight_history = f'''UPDATE public.user_weight_history
                                            SET weight={weight}
                                            WHERE user_id = '{userID}' AND weight_date = '{date}';'''
    SQLquery_user = f'''UPDATE public.users
                        SET weight={weight}
                        WHERE user_id = '{userID}';'''

    return SQLquery_user_weight_history + SQLquery_user


def update_goals(post_data, userID):
    post_data = ast.literal_eval(post_data.decode("UTF-8"))

    goal_weight_change = post_data["goal_weight_change"]
    goal_weight = post_data["goal_weight"]

    SQLquery = f'''UPDATE public.users
                    SET goal_weight_change='{goal_weight_change}', goal_weight={goal_weight}
                    WHERE user_id = '{userID}';'''
    return SQLquery
