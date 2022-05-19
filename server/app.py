import psycopg2
import os
from flask import Flask

app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Calorie app server'


def get_db_connection():
    connection = psycopg2.connect(host='localhost',
                                  database='flask_db',
                                  user=os.environ['DB_USERNAME'],
                                  password=os.environ['DB_PASSWORD'])
    return connection


if __name__ == '__main__':
    app.run()

db_connection = get_db_connection()

cursor = db_connection.cursor()

cursor.close()
db_connection.close()
