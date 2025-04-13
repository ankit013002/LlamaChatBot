from flask import Flask, jsonify, request
from flask_cors import CORS
from llamaAI import get_chat_response

app = Flask(__name__)
CORS(app)


@app.route('/data', methods=['GET'])
def get_data():
    items = [{"name":"john","number":0}, {"name":"Marie","number":1}]
    return jsonify([item for item in items])


@app.route('/send-data', methods=['POST'])
def send_data():
    incoming_data = request.get_json()
    print(incoming_data)
    input_text = incoming_data['UserRequest']
    response = get_chat_response(input_text)

    return jsonify({"response":response})

if __name__ == "__main__":
    app.run(debug=True)