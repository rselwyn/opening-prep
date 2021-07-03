from http.server import BaseHTTPRequestHandler
from datetime import datetime
import json

from lib.backend import load_file_to_lines

class handler(BaseHTTPRequestHandler):

  def do_GET(self):
    self.send_response(200)
    self.send_header('Content-type', 'application/json')
    self.end_headers()

    json_string = json.dumps(load_file_to_lines())
    self.wfile.write(json_string.encode())
    return