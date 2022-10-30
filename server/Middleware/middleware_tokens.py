from werkzeug.wrappers import Request, Response
from flask import request
import jwt


class Middleware:
    def __init__(self, application):
        self.application = application

    def __call__(self, environ, start_response):
        return self.application(environ, start_response)

    def get_user_ID(self):
        token = request.headers['Authorization']
        decoded_token = jwt.decode(token, algorithms=["RS256"], options={"verify_signature": False})
        # request.environ['cognito_user'] = decoded_token['cognito:username']

        return decoded_token['cognito:username']
