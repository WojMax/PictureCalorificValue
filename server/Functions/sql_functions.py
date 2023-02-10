import ast
from datetime import date


def insert_meals(cursor, put_data, userID):
    put_data = ast.literal_eval(put_data.decode("UTF-8"))

    mealName = put_data["mealName"]
    caloriesOn100g = put_data["caloriesOn100g"]
    mealWeight = put_data["mealWeight"]
    dateCreated = put_data["dateCreated"]
    category = put_data["category"]

    try:
        cursor.execute("""
            INSERT INTO public.user_meal_data (user_id, meal_name, calories, meal_weight, date_created, category) 
            VALUES (%s, %s, %s, %s, %s, %s);
            """,
                       (userID, mealName, caloriesOn100g, mealWeight, dateCreated, category))
        return 1
    except Exception as error:
        print(error)
        return -1


def update_meals(cursor, post_data, userID):
    post_data = ast.literal_eval(post_data.decode("UTF-8"))

    mealID = post_data["mealID"]
    mealName = post_data["mealName"]
    caloriesOn100g = post_data["caloriesOn100g"]
    mealWeight = post_data["mealWeight"]

    try:
        cursor.execute("""
            UPDATE public.user_meal_data
            SET meal_name = %s, calories = %s, meal_weight = %s 
            WHERE id = %s AND user_id = %s;
            """,
                       (mealName, caloriesOn100g, mealWeight, mealID, userID))
        return 1
    except Exception as error:
        print(error)
        return -1


def delete_meals(cursor, delete_data):
    delete_data = ast.literal_eval(delete_data.decode("UTF-8"))["data"]

    mealId = delete_data["mealID"]

    try:
        cursor.execute("""
            DELETE FROM public.user_meal_data
            WHERE id = %s;
            """,
                       (mealId,))
        return 1
    except Exception as error:
        print(error)
        return -1


def insert_favourites(cursor, put_data, userID):
    put_data = ast.literal_eval(put_data.decode("UTF-8"))

    mealName = put_data["mealName"]
    caloriesOn100g = put_data["caloriesOn100g"]

    try:
        cursor.execute("""
            INSERT INTO public.user_favourites_data (user_id, meal_name, calories) 
            VALUES (%s, %s, %s);
            """,
                       (userID, mealName, caloriesOn100g))
        return 1
    except Exception as error:
        print(error)
        return -1


def delete_favourites(cursor, delete_data):
    delete_data = ast.literal_eval(delete_data.decode("UTF-8"))["data"]

    mealId = delete_data["mealID"]

    try:
        cursor.execute("""
            DELETE FROM public.user_favourites_data 
            WHERE id = %s;
            """,
                       (mealId,))
        return 1
    except Exception as error:
        print(error)
        return -1


def update_favourites(cursor, post_data, userID):
    post_data = ast.literal_eval(post_data.decode("UTF-8"))

    mealID = post_data["mealID"]
    mealName = post_data["mealName"]
    caloriesOn100g = post_data["caloriesOn100g"]

    try:
        cursor.execute("""
            UPDATE public.user_favourites_data
            SET meal_name = %s, calories = %s 
            WHERE id = %s AND user_id = %s;
            """,
                       (mealName, caloriesOn100g, mealID, userID))
        return 1
    except Exception as error:
        print(error)
        return -1


def insert_user_data(cursor, put_data, userID):
    put_data = ast.literal_eval(put_data.decode("UTF-8"))

    gender = put_data["gender"]
    age = put_data["age"]
    height = put_data["height"]
    weight = put_data["weight"]
    weekly_exercise = put_data["activityID"]
    goal_weight = put_data["goal_weight"]
    goal_weight_change = put_data["goal_weight_change"]

    if goal_weight.lower() == 'null' or goal_weight is None:
        goal_weight = weight
        goal_weight_change = 0

    current_date = date.today()

    try:
        cursor.execute("""
            INSERT INTO public.users(user_id, gender, age, height, weight, weekly_exercise, goal_weight, goal_weight_change) 
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s);
            
            INSERT INTO public.user_weight_history(user_id, weight, weight_date)
            VALUES (%s, %s, %s);
            """,
                       (userID, gender, age, height, weight, weekly_exercise, goal_weight, goal_weight_change, userID, weight, current_date))
        return 1
    except Exception as error:
        print(error)
        return -1


def update_user_data(cursor, post_data, userID, already_inserted, current_date):
    post_data = ast.literal_eval(post_data.decode("UTF-8"))

    gender = post_data["gender"]
    age = post_data["age"]
    height = post_data["height"]
    weight = post_data["weight"]
    weekly_exercise = post_data["activityID"]

    if already_inserted == 0:
        try:
            cursor.execute("""
                INSERT INTO public.user_weight_history(user_id, weight, weight_date)
                VALUES (%s, %s, %s);
                
                UPDATE public.users
                SET gender = %s, age = %s, height = %s, weight = %s, weekly_exercise = %s
                WHERE user_id = %s;
                """,
                           (userID, weight, current_date, gender, age, height, weight, weekly_exercise, userID))
            return 1
        except Exception as error:
            print(error)
            return -1
    else:
        try:
            cursor.execute("""
                UPDATE public.user_weight_history
                SET weight = %s
                WHERE user_id = %s AND weight_date = %s;

                UPDATE public.users
                SET gender = %s, age = %s, height = %s, weight = %s, weekly_exercise = %s
                WHERE user_id = %s;
                """,
                           (weight, userID, current_date, gender, age, height, weight, weekly_exercise, userID))
            return 1
        except Exception as error:
            print(error)
            return -1


def insert_weight_history(cursor, put_data, userID, already_inserted):
    put_data = ast.literal_eval(put_data.decode("UTF-8"))

    weight = put_data["weight"]
    date = put_data["date"]

    if already_inserted == 0:
        try:
            cursor.execute("""
                INSERT INTO public.user_weight_history(user_id, weight, weight_date)
                VALUES (%s, %s, %s);

                UPDATE public.users
                SET weight = %s
                WHERE user_id = %s;
                """,
                           (userID, weight, date, weight, userID))
            return 1
        except Exception as error:
            print(error)
            return -1
    else:
        try:
            cursor.execute("""
                UPDATE public.user_weight_history
                SET weight = %s
                WHERE user_id = %s AND weight_date = %s;

                UPDATE public.users
                SET weight = %s
                WHERE user_id = %s;
                """,
                           (weight, userID, date, weight, userID))
            return 1
        except Exception as error:
            print(error)
            return -1


def update_goals(cursor, post_data, userID):
    post_data = ast.literal_eval(post_data.decode("UTF-8"))

    goal_weight_change = post_data["goal_weight_change"]
    goal_weight = post_data["goal_weight"]

    try:
        cursor.execute("""
            UPDATE public.users
            SET goal_weight_change = %s, goal_weight = %s 
            WHERE user_id = %s;
            """,
                       (goal_weight_change, goal_weight, userID))
        return 1
    except Exception as error:
        print(error)
        return -1
