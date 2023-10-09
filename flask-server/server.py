from flask import Flask, render_template
from pymongo import MongoClient
from data_models.data import Data

app = Flask(__name__)

data = Data()
match_data = data.get_match(3835335)
team_name = match_data['home_team']['home_team_name']


# test API route
@app.route("/test")
def test():
    output = f"<h1> {str(team_name)} <h1>"
    print(output)
    return {"test": ["test1", "test2", "test3"]}
    

if __name__ == "__main__":
    app.run(debug=True)