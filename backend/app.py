from flask import Flask, jsonify, request
from flask_cors import CORS
from llamaAI import get_chat_response, conversation_history
import json

app = Flask(__name__)
CORS(app)


# Not used but here as reference
@app.route('/data', methods=['GET'])
def get_data():
    items = [{"name":"john","number":0}, {"name":"Marie","number":1}]
    return jsonify([item for item in items])

def update_conversation_history():
    try:
        with open("./persistentHistory.json", "r") as infile:
            data = json.load(infile)
            conversation_history.extend(data)
    except FileNotFoundError:
        print("No persistent history found")
        with open("./persistentHistory.json", "w") as outfile:
            json.dump([], outfile)
    except json.JSONDecodeError:
        print("History file is empty or invalid.")

def append_to_persistent_history(*messages):
    try:
        with open("./persistentHistory.json", "r") as infile:
            existing = json.load(infile)
    except:
        existing = []
    
    for msg in messages:
        if isinstance(msg, list):
            existing.extend(msg)
        else:
            existing.append(msg)


    with open("./persistentHistory.json", "w") as outfile:
        json.dump(existing, outfile, indent=4)

@app.route('/send-data', methods=['POST'])
def send_data():
    incoming_data = request.get_json()
    print(incoming_data)
    input_text = incoming_data['UserRequest']
    response = get_chat_response(input_text)

    incoming_json_object = {
        'role': 'user',
        'content': input_text
    }
    outgoing_json_object = {
        'role': 'assistant',
        'content': response
    }

    append_to_persistent_history(incoming_json_object, outgoing_json_object)

    return jsonify({"response":response})

if __name__ == "__main__":
    update_conversation_history()
    app.run(debug=True)