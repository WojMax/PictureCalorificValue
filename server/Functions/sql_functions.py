import ast


def insert_meals(put_data):
    put_data = ast.literal_eval(put_data.decode("UTF-8"))

    userID = put_data["userID"]
    mealName = put_data["mealName"]
    calories = put_data["calories"]
    mealWeight = put_data["mealWeight"]
    dateCreated = put_data["dateCreated"]
    category = put_data["category"]

    SQLquery_user = f'INSERT INTO public.users VALUES (\'{userID}\') ON CONFLICT DO NOTHING; '
    SQLquery_meal = 'INSERT INTO public.user_meal_data (user_id, meal_name, calories, meal_weight, date_created, category) VALUES ' \
                    + f'(\'{userID}\', \'{mealName}\', {calories}, {mealWeight}, \'{dateCreated}\', \'{category}\');'
    return SQLquery_user + SQLquery_meal


def update_meals(post_data):
    post_data = ast.literal_eval(post_data.decode("UTF-8"))

    userID = post_data["userID"]
    mealName = post_data["mealName"]
    calories = post_data["calories"]

    mealWeight = post_data["mealWeight"]
    newMealName = post_data["newMealName"]
    newCalories = post_data["newCalories"]
    newMealWeight = post_data["newMealWeight"]



    #SQLquery = f'UPDATE public.user_meal_data\n' \
    #           f'SET meal_name=\'{newMealName}\', calories={newCalories}, meal_weight={newMealWeight}\n' \
    #           f'WHERE user_id = \'{userID}\' AND meal_name=\'{mealName}\' AND calories={calories} AND meal_Weight={mealWeight};'
    SQLquery = f'UPDATE public.user_meal_data\n' \
               f'SET meal_name=\'{newMealName}\', calories={newCalories}, meal_weight={newMealWeight}\n' \
               f'WHERE user_id = \'{userID}\' AND meal_name=\'{mealName}\' AND meal_Weight={mealWeight};'
    print(SQLquery)
    return SQLquery


def delete_meals(delete_data):
    delete_data = ast.literal_eval(delete_data.decode("UTF-8"))

    userID = delete_data["userID"]
    mealName = delete_data["mealName"]
    calories = delete_data["calories"]
    weight = delete_data["mealWeight"]

    SQLquery = f'DELETE FROM public.user_meal_data\n' \
               f'WHERE user_id = \'{userID}\' AND meal_name = \'{mealName}\' AND calories = {calories} AND meal_weight = \'{weight}\';'
    return SQLquery


def insert_favourites(put_data):
    put_data = ast.literal_eval(put_data.decode("UTF-8"))

    userID = put_data["userID"]
    mealName = put_data["mealName"]
    calories = put_data["calories"]
    category = put_data["category"]

    SQLquery_user = f'INSERT INTO public.users VALUES (\'{userID}\') ON CONFLICT DO NOTHING; '
    SQLquery_meal = 'INSERT INTO public.user_favourites_data (user_id, meal_name, calories, category) VALUES ' \
                    + f'(\'{userID}\', \'{mealName}\', {calories}, \'{category}\');'
    return SQLquery_user + SQLquery_meal


def delete_favourites(delete_data):
    delete_data = ast.literal_eval(delete_data.decode("UTF-8"))

    userID = delete_data["userID"]
    mealName = delete_data["mealName"]
    calories = delete_data["calories"]
    category = delete_data["category"]

    SQLquery = f'DELETE FROM public.user_favourites_data\n' \
               f'WHERE user_id = \'{userID}\' AND meal_name = \'{mealName}\' AND calories = {calories} AND category = \'{category}\';'
    return SQLquery


def update_favourites(post_data):
    post_data = ast.literal_eval(post_data.decode("UTF-8"))

    userID = post_data["userID"]
    mealName = post_data["mealName"]
    calories = post_data["calories"]
    category = post_data["category"]
    newMealName = post_data["newMealName"]
    newCalories = post_data["newCalories"]
    newCategory = post_data["newCategory"]

    SQLquery = f'UPDATE public.user_favourites_data\n' \
               f'SET meal_name=\'{newMealName}\', calories={newCalories}, category=\'{newCategory}\'\n' \
               f'WHERE user_id = \'{userID}\' AND meal_name=\'{mealName}\' AND calories={calories} AND category=\'{category}\';'
    return SQLquery
