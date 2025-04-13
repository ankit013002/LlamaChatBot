import { useEffect, useState } from "react";
import "./App.css";
import ChatBox from "./components/ChatBox";
import Messaging from "./components/Messaging";

function App() {
  const [userInput, setUserInput] = useState("");
  const [backendData, setBackendData] = useState("");
  const [conversationHistory, setConversationHistory] = useState([]);
  const [thinking, setThinking] = useState(false);

  const handleClick = (input) => {
    setConversationHistory((prevConversationHistory) => {
      return [...prevConversationHistory, { user: "client", message: input }];
    });
    setThinking(true);
    fetch("http://localhost:5000/send-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ UserRequest: input }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.response);
        setBackendData(data.response);
        setConversationHistory((prevConversationHistory) => {
          setThinking(false);
          return [
            ...prevConversationHistory,
            { user: "assistant", message: data.response },
          ];
        });
      });
  };

  return (
    <>
      <div className="app-container">
        <div className="app-chat-container">
          <ChatBox
            conversationHistory={conversationHistory}
            thinking={thinking}
          />
        </div>
        <div className="app-message-container">
          <Messaging sendRequest={handleClick} />
        </div>
      </div>
    </>
  );
}

export default App;
