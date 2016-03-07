from flask import Flask, render_template, request, jsonify, g
from functools import wraps
from datetime import datetime, timedelta

import json

from config import token_timeout, jwt_algorithm

import jwt
from jwt.contrib.algorithms.pycrypto import RSAAlgorithm
from jwt.exceptions import DecodeError, ExpiredSignature

jwt.register_algorithm('RS256', RSAAlgorithm(RSAAlgorithm.SHA256))

app = Flask(__name__)
try:
	# you may not commit private_key.pem
	app.config['SECRET_KEY'] = open('private_key.pem', 'rb').read()
except:
	print 'Error: No secret key.'

users = json.loads(open('users.json', 'rb').read().strip())


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


# curl -X POST -d "email=dudumonteiro@gmail.com&password=12345" http://localhost:5000/signin
@app.route('/signin', methods=['POST'])
def login():
	data = request.form.to_dict()
	encoded = authenticate(data['email'], data['password'])
	if encoded:
		return encoded
	else:
		return "Unauthorized", 401


if __name__ == '__main__':
    app.run(debug=True)
