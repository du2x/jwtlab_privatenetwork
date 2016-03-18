import os, sys, logging

from flask import Flask, render_template, request, jsonify, g, redirect
from functools import wraps

from datetime import datetime, timedelta

import json

import jwt
from jwt.exceptions import DecodeError, ExpiredSignature
from jwt.contrib.algorithms.pycrypto import RSAAlgorithm

jwt_algorithm = 'RS256'

jwt.register_algorithm(jwt_algorithm, RSAAlgorithm(RSAAlgorithm.SHA256))

app = Flask(__name__)
app.logger.addHandler(logging.StreamHandler(stream=sys.stderr))


APP_ROOT = os.path.dirname(os.path.abspath(__file__))   # refers to application_top

pbkey_filepath = os.path.join(APP_ROOT, 'public.key')


try:
        # you may not commit public.key
        app.config['SECRET_KEY'] = open(pbkey_filepath, 'rb').read()
except:
        logging.error('Could not read public key.')


def jwt_required(f):
	@wraps(f)
	def decorated_function(*args, **kwargs):
		if not request.headers.get('Authorization'):
			return jsonify(message='Missing authorization header'), 401
		try:
			token = request.headers.get('Authorization').split()[1]
			payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=jwt_algorithm)
			g.user = payload['sub']
		except DecodeError:
			return jsonify(message='Token %s is invalid' % token), 401
		except ExpiredSignature:
			return jsonify(message='Token %s has expired' % token), 401
		except IndexError:
			return jsonify(message='Missing token'), 401
		return f(*args, **kwargs)
	return decorated_function


# curl -X GET http://localhost:8070/a"
@app.route('/', methods=['GET', ])
def home():
	return render_template('index.html')


# curl -X GET http://localhost:8070/a/public"
@app.route('/public', methods=['GET', ])
def public():
	return "Response from PUBLIC service", 200


# curl -X GET http://localhost:8070/a/restricted -H "Authorization: Bearer $token"
@app.route('/restricted', methods=['GET'])
@jwt_required
def restricted():
	return "Welcome %s, this a response from RESTRICTED service" % g.user, 200	

if __name__ == '__main__':
    app.run(debug=True)

