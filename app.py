from flask import Flask, Response, request, jsonify
import backend
from flask_cors import CORS, cross_origin

app = Flask(__name__)

@app.route('/')
def home():
	return "hi"

@app.route('/pgns', methods=['POST'])
@cross_origin()
def catch_all():
	pgns = request.data
	print(pgns)
	stuff = backend.load_file_to_lines(pgns)
	print(stuff)
	return jsonify({"juicer":"yes", "lines": stuff})
