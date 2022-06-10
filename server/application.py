from flask import Flask, request, redirect, url_for

application = Flask(__name__)


@application.route('/')
def hello_world():
    return 'Calorie app server'


@application.route('/picture',methods = ['POST', 'GET'])
def parse_request():
    if request.method == 'POST':
        data = request.data
        print(data)
    return 'TEST'

if __name__ == '__main__':
    application.run(debug=True)


