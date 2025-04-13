import React, { useEffect, useState } from "react";
import "./ChatBox.css";

const ChatBox = (props) => {
  const [thinking, setThinking] = useState([
    { letter: "T" },
    { letter: "h" },
    { letter: "i" },
    { letter: "n" },
    { letter: "k" },
    { letter: "i" },
    { letter: "n" },
    { letter: "g" },
    { letter: "." },
    { letter: "." },
    { letter: "." },
  ]);

  const [glowIndex, setGlowIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIndex((prev) => (prev + 1) % thinking.length);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="chatbox-container">
      {props.conversationHistory.map((item, index) => {
        return item.user == "client" ? (
          <div key={index} className="outgoing-message ">
            <div className="message outgoing-message-box">{item.message}</div>
          </div>
        ) : (
          <div key={index} className="incoming-message ">
            <div className="message incoming-message-box">{item.message}</div>
          </div>
        );
      })}
      {props.thinking && (
        <div className="incoming-message ">
          <div className="message incoming-message-box thining-message">
            {thinking.map((item, index) => (
              <span
                key={index}
                className={
                  glowIndex == index || glowIndex == index + 1 ? "glow" : ""
                }
              >
                {item.letter}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
