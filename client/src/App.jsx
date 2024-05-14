import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/guestbook").then((response) => {
      setMessages(response.data);
    });
  }, [messages]);

  const handleClick = (e) => {
    e.preventDefault();
    const name = document.getElementById("input-name").value;
    const message = document.getElementById("input-message").value;

    axios.post("http://localhost:3000/new", {
      sender: name,
      message: message,
    });
  };

  if (messages.length === 0) {
    return (
      <div className="App">
        <div className="form-wrapper">
          <h1>Gastbucheinträge</h1>
          <label>
            <p>Name</p>
            <input
              className="input"
              id="input-name"
              name="input-name"
              type="text"
            />
          </label>
          <label>
            <p>Nachricht</p>
            <textarea
              className="input"
              id="input-message"
              name="input-message"
              rows="4"
              cols="50"
            ></textarea>
          </label>
          <button className="send-button" name="send" onClick={handleClick}>
            Senden
          </button>
        </div>
        <div className="message-wrapper">
          <h3>Keine Einträge vorhanden</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="form-wrapper">
        <h1>Gastbucheinträge</h1>
        <label>
          <p>Name</p>
          <input className="input" name="name" type="text" />
        </label>
        <label>
          <p>Nachricht</p>
          <textarea
            className="input"
            id="message-field"
            name="message"
            rows="4"
            cols="50"
          ></textarea>
        </label>
        <button className="send-button" name="send">
          Senden
        </button>
      </div>
      <div className="message-wrapper">
        {messages.map((value, idx) => (
          <div className="message" key={idx}>
            <h2>Nachricht von {value.name}</h2>
            <p className="content">{value.message}</p>
            <p className="date">Datum hier</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
