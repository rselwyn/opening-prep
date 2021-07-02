import chess.pgn
import io
import json

import urllib.parse

def dfs_move_tree(visited, current_node, line_list):
	if len(current_node.variations) == 0:
		line_list.append(visited)
		return
	else:
		for next_node in current_node.variations:
			dfs_move_tree(visited + [str(current_node.move)], next_node, line_list)

def load_file_to_lines(pgntext):
	pgntext = pgntext.decode('utf-8')
	prep = chess.pgn.read_game(io.StringIO(pgntext))
	line_list = []
	for i in prep.variations:
		dfs_move_tree([], i, line_list)
	print(line_list)

def lookup_line_masters(fen):
	req_url = url + urllib.parse.urlencode({"fen": fen})
	resp = http.request("GET", req_url).data
	json_back = json.loads(resp)

# load_file_to_lines(open("ponzi.pgn"))