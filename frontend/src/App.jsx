import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [nameAndNumbers, setnameAndNumbers] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [backendData, setBackendData] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/data").then((res) => {
      res.json().then((data) => {
        console.log(data);
        setnameAndNumbers(data);
      });
    });
  }, []);

  const handleClick = () => {
    fetch("http://localhost:5000/send-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ UserRequest: userInput }),
    })
      .then((res) => res.json())
      .then((data) => {
        setBackendData(data.response);
      });
  };

  return (
    <>
      <div>
        <div>{backendData}</div>
        <div>
          <input type="text" onChange={(e) => setUserInput(e.target.value)} />
          <button onClick={handleClick} />
        </div>
      </div>
    </>
  );
}

export default App;
