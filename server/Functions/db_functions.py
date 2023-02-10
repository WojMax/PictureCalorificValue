import psycopg2


def connect_to_db(keys):
    try:
        connection = psycopg2.connect(user=keys['user'],
                                      password=keys['password'],
                                      host=keys['host'],
                                      port=keys['port'],
                                      database=keys['database'])
        return connection
    except Exception as error:
        print(error)
        return -1
