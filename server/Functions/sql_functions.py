import ast


def insert_meals(put_data, userID):
    put_data = ast.literal_eval(put_data.decode("UTF-8"))

    mealName = put_data["mealName"]
    caloriesOn100g = put_data["caloriesOn100g"]
    mealWeight = put_data["mealWeight"]
    dateCreated = put_data["dateCreated"]
    category = put_data["category"]

    SQLquery_user = f'INSERT INTO public.users VALUES (\'{userID}\') ON CONFLICT DO NOTHING; '
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
    delete_data = ast.literal_eval(delete_data.decode("UTF-8"))

    mealId = delete_data["mealID"]

    SQLquery = f'DELETE FROM public.user_meal_data\n' \
               f'WHERE id = \'{mealId}\';'
    return SQLquery


def insert_favourites(put_data, userID):
    put_data = ast.literal_eval(put_data.decode("UTF-8"))

    mealName = put_data["mealName"]
    caloriesOn100g = put_data["caloriesOn100g"]

    SQLquery_user = f'INSERT INTO public.users VALUES (\'{userID}\') ON CONFLICT DO NOTHING; '
    SQLquery_meal = 'INSERT INTO public.user_favourites_data (user_id, meal_name, calories) VALUES ' \
                    + f'(\'{userID}\', \'{mealName}\', {caloriesOn100g});'
    return SQLquery_user + SQLquery_meal


def delete_favourites(delete_data):
    delete_data = ast.literal_eval(delete_data.decode("UTF-8"))

    mealId = delete_data["mealID"]

    SQLquery = f'DELETE FROM public.user_favourites_data\n' \
               f'WHERE user_id = \'{mealId}\';'
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
