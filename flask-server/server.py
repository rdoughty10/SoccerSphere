from flask import Flask, render_template, jsonify
from pymongo import MongoClient
from data_models.data import Data
from bson.json_util import dumps

app = Flask(__name__)

data = Data()
match_data = data.get_matches()

# test API route
@app.route("/test")
def test():
    return {"test": ["test1", "test2", "test3"]}

## get the data of all available matches
@app.route("/matches/")
def get_matches():
    matches = {match['match_id']:match for match in data.get_matches()}
    for match in data.get_matches():
        matches[match['match_id']] =  match
    return jsonify(matches)

## get the match ids of available matches
@app.route('/match-ids/')
def get_match_ids():
    match_ids = [str(match['match_id']) for match in data.get_matches()]
    return {"matches": match_ids}

## get the data of a match by the id
@app.route("/matches/<match_id>")
def get_match(match_id):
    match_data = data.get_match(match_id)
    return jsonify(match_data)

@app.route("/event_players/<match_id>")
def get_event_players(match_id):
    event_player_data = data.get_event_player_data(match_id)
    return jsonify(event_player_data)

@app.route("/passes/<match_id>")
def get_match_passes(match_id):
    passes = [match_pass_event for match_pass_event in data.get_passes(match_id)]
    return jsonify(passes)

@app.route("/complete_passes/<match_id>")
def get_complete_passes(match_id):
    passes = data.get_complete_pass_locations(match_id)
    return jsonify(passes)

@app.route('/linebreaking/<match_id>')
def get_linebreaking(match_id):
    lb_passes = data.get_line_breaking_passes(match_id)
    return jsonify(lb_passes)

if __name__ == "__main__":
    app.run(debug=True)