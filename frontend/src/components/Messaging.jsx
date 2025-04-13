import React, { useState } from "react";
import "./Messaging.css";

const Messaging = (props) => {
  const [input, setInput] = useState("");

  const sendMessage = () => {
    props.sendRequest(input);
    setInput("");
  };

  return (
    <div className="messaging-container">
      <input
        value={input}
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
