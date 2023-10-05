from flask import Flask
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient('mongodb+srv://svb24:soccersphere@soccersphere.wr8cfd3.mongodb.net/', username='svb24', password='soccersphere')

## Example: pulling data from a random match
db = client["matches"]
col = db['106']
x = col.find_one()
print(x)

# test API route
@app.route("/test")
def test():
    return {"test": ["test1", "test2", "test3"]}

if __name__ == "__main__":
    app.run(debug=True)