from flask import Flask, render_template, jsonify
from pymongo import MongoClient
from data_models.data import Data
from bson.json_util import dumps

app = Flask(__name__)

data = Data()
match_data = data.get_matches()


## get the data of all available matches
@app.route("/matches/")
def get_matches():
    matches = {match['match_id']:match for match in data.get_matches()}
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

@app.route("/event_players_team/<team_id>/<filter>/<for_team>")
def get_event_player_team_filtered(team_id, filter, for_team):
    
    if for_team == 'Against':
        event_player_data = data.get_event_player_team_data(team_id, filter, for_team=False)
    else:
        event_player_data = data.get_event_player_team_data(team_id, filter, for_team=True)

        
    return jsonify(event_player_data)


@app.route("/event_players/<match_id>/<filter>")
def get_event_players_filtered(match_id, filter):
    event_player_data = data.get_event_player_data(match_id, filter)
    return jsonify(event_player_data)

@app.route("/event_players/<match_id>")
def get_event_players(match_id):
    event_player_data = data.get_event_player_data(match_id)
    return jsonify(event_player_data)

@app.route("/passes/<match_id>")
def get_match_passes(match_id):
    passes = data.get_pass_locations(match_id)
    return jsonify(passes)

@app.route("/complete_passes/<match_id>")
def get_complete_passes(match_id):
    passes = data.get_complete_pass_locations(match_id)
    return jsonify(passes)

@app.route('/linebreaking/<match_id>')
def get_linebreaking(match_id):
    lb_passes = data.get_line_breaking_passes(match_id)
    return jsonify(lb_passes)

@app.route('/linebreaking/<team_id>')
def get_linebreaking_by_team(team_id):
    lb_passes = data.get_line_breaking_passes_by_team(team_id)
    return jsonify(lb_passes)

@app.route('/ballreceipts/<match_id>')
def get_ball_receipts(match_id):
    br = data.ball_receipts_in_space(match_id)
    return jsonify(br)

@app.route('/goals/<match_id>')
def get_goals(match_id):
    goals = data.get_goals(match_id)
    return jsonify(goals)

@app.route('/team_goals/<team_id>')
def get_team_goals(team_id):
    goals = data.get_goals_by_team(team_id)
    return jsonify(goals)

@app.route('/teams/')
def get_teams():
    teams = data.get_teams()
    return jsonify(teams)

if __name__ == "__main__":
    app.run(debug=True)