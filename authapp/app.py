import os, sys, logging

from flask import Flask, render_template, request, jsonify, g
from functools import wraps
from datetime import datetime, timedelta

import json

import jwt
from jwt.contrib.algorithms.pycrypto import RSAAlgorithm
from jwt.exceptions import DecodeError, ExpiredSignature

jwt_algorithm = 'RS256'
token_timeout = 5 # minutes

jwt.register_algorithm(jwt_algorithm, RSAAlgorithm(RSAAlgorithm.SHA256))

app = Flask(__name__)
app.logger.addHandler(logging.StreamHandler(stream=sys.stderr))

APP_ROOT = os.path.dirname(os.path.abspath(__file__))   # refers to application_top

pvtkey_filepath = os.path.join(APP_ROOT, 'private.key')

try:
	# you may not commit private_key.pem
	app.config['SECRET_KEY'] = open(pvtkey_filepath, 'rb').read()
except:
	logging.error('Could not read private key.')


users = [
        {
                "name":"Scott Tiger",
                "password":"12345",
                "email":"scott@gmail.com"
        },
    {
                "name":"John Doe",
                "password":"54321",
                "email":"john@gmail.com"
    }
]


def authenticate(user, pwd):
	for usr in users:
		if usr['email'] == user and usr['password'] == pwd:
			return create_token(usr)
	return False


def create_token(user):
	payload = {
		# subject
		'sub': user['name'],
		# issued at
		'iat': datetime.utcnow(),
		# expiry
		'exp': datetime.utcnow() + timedelta(minutes=token_timeout)
	}
	token = jwt.encode(payload, app.config['SECRET_KEY'], algorithm=jwt_algorithm)
	return token.decode('unicode_escape')


# curl -X POST -d "email=scott@gmail.com&password=12345" http://localhost:5000/signin
@app.route('/signin', methods=['GET', 'POST'])
def login():
	if request.method == 'GET':
		return render_template('login.html')
	else:
		try:
			data = request.form.to_dict()
			encoded = authenticate(data['login'], data['password'])
			if encoded:
				return encoded, 200
			else:
				return "Unauthorized", 401
		except Exception, e:
			logging.error('Authentication error.')
			return str(e)
			

if __name__ == '__main__':
    app.run(debug=True)
