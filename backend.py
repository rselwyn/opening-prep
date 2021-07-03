import chess.pgn
import io
import json

import urllib.parse
from urllib.request import urlopen


def dfs_move_tree(visited, current_node, line_list, depth_limit):
	if len(current_node.variations) == 0 or depth_limit == 0:
		line_list.append(visited)
		return
	else:
		for next_node in current_node.variations:
			dfs_move_tree(visited + [str(current_node.move)], next_node, line_list, depth_limit - 1)

def pp(parsed):
	print(json.dumps(parsed, indent=4, sort_keys=True))

def load_file_to_lines(pgntext):
	limit_depth = request.args.get('depth', default = 10000)
	sorting_method = request.args.get('sort', default = "masters") # Options: Masters, Lichess, DFS
	
	try:
		pgntext = pgntext.decode('utf-8')
	except:
		pass
	prep = chess.pgn.read_game(io.StringIO(pgntext))
	line_list = []
	for i in prep.variations:
		dfs_move_tree([], i, line_list, limit_depth)
	return line_list

def lookup_position_masters(fen):
	# Returns top n moves
	ENDPOINT = "https://explorer.lichess.ovh/master?"
	req_url = ENDPOINT + urllib.parse.urlencode({"fen": fen})
	resp = urlopen(req_url)
	json_back = json.loads(resp.read().decode('utf-8'))
	# pp(json_back)
	return [i["uci"] for i in json_back["moves"]]

# print(load_file_to_lines(open("tp.pgn").read()))

# print(lookup_position_masters("rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1"))