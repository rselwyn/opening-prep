import chess.pgn
import io
import json

import urllib.parse
from urllib.request import urlopen


def dfs_move_tree(visited, current_node, line_list):
	if len(current_node.variations) == 0:
		line_list.append(visited)
		return
	else:
		for next_node in current_node.variations:
			dfs_move_tree(visited + [str(current_node.move)], next_node, line_list)

def pp(parsed):
	print(json.dumps(parsed, indent=4, sort_keys=True))

def load_file_to_lines(pgntext):
	pgntext = pgntext.decode('utf-8')
	prep = chess.pgn.read_game(io.StringIO(pgntext))
	line_list = []
	for i in prep.variations:
		dfs_move_tree([], i, line_list)
	print(line_list)

def lookup_position_masters(fen):
	# Returns top n moves
	ENDPOINT = "https://explorer.lichess.ovh/master?"
	req_url = ENDPOINT + urllib.parse.urlencode({"fen": fen})
	resp = urlopen(req_url)
	json_back = json.loads(resp.read().decode('utf-8'))
	# pp(json_back)
	return [i["uci"] for i in json_back["moves"]]

# load_file_to_lines(open("ponzi.pgn"))

print(lookup_position_masters("rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1"))