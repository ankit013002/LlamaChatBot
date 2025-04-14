import React, { useState } from "react";
import "./Messaging.css";

const Messaging = (props) => {
  const [input, setInput] = useState("");

  const sendMessage = () => {
    props.sendRequest(input);
    setInput("");
  };

  const checkKey = (e) => {
    if (e.key == "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="messaging-container">
      <input
        value={input}
        onKeyDown={(e) => checkKey(e)}
        onChange={(e) => setInput(e.target.value)}
        className="messaging-container-input"
        placeholder="Enter Message..."
      />
      <button className="messaging-container-button" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
};

export default Messaging;
