from flask import Flask, Response, request, jsonify
import backend

app = Flask(__name__)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
	pgns = request.data
	print(pgns)
	stuff = backend.load_file_to_lines(pgns)
	return jsonify({"juicer":"yes"})