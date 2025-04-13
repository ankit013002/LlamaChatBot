from dotenv import load_dotenv
import os
from ollama import chat

load_dotenv()

OLLAMA_MODEL = os.getenv("OLLAMA_MODEL")

conversation_history = []


def get_chat_response(message):
    conversation_history.append({"role": "user", "content": message})
    response = chat(
        model=OLLAMA_MODEL,
        messages=conversation_history
    )

    conversation_history.append({"role": "assistant", "content": response['message']['content']})

    return response['message']['content']


if __name__ == "__main__":
    response = get_chat_response("Hello")
    print(response)