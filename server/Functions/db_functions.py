import psycopg2
from psycopg2 import errors


def connect_to_db():
    try:
        connection = psycopg2.connect(user="postgres",
                                        password="f26e%ppBV7t%a#MPxHUMMvq9j",
                                        host="calorie-app-database-instance.ctsaxdvte9a9.eu-central-1.rds.amazonaws.com",
                                        port="5432",
                                        database="calorie_app_database")
        #connection = psycopg2.connect(user="postgres",
        #                              password="Wojtecki2",  ########## enter password
        #                              host="localhost",
        #                             port="5432",
        #                             database="calorie_app_database")
        return connection
    except (psycopg2.errors.ConnectionException, psycopg2.errors.ConnectionDoesNotExist, psycopg2.errors.ConnectionFailure) as error:
        print(error)
        return -1
