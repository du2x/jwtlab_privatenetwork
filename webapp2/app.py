from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'I am the webapp2'

if __name__ == '__main__':
    app.run()

