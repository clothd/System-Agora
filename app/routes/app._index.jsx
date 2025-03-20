import { TextField, Button, Scrollable } from "@shopify/polaris";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Chat.css";

export default function Index() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    // Apply dark mode to body when state changes
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
      // API for the LLM response (backend function)
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`chat-container ${darkMode ? "dark" : ""}`}>
      <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <div className="main-content">
        <div className="chat-area">
          <div className="message-feed">
            {messages.length === 0 ? (
              <div className="empty-state">How can I help you today?</div>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  className={`message ${msg.sender === "user" ? "user" : "bot"}`}
                >
                  <div className="message-bubble">{msg.text}</div>
                </div>
              ))
            )}
          </div>

          <div className="action-buttons">
            <div className="action-button">
              <span>Solve</span>
            </div>
            <div className="action-button">
              <span>Find opportunities</span>
            </div>
            <div className="action-button">
              <span>Analyze data</span>
            </div>
            <div className="action-button">
              <span>More</span>
            </div>
          </div>

          <div className="message-input">
            <TextField
              value={input}
              onChange={setInput}
              placeholder="Message Agora..."
              onKeyPress={handleKeyPress}
              autoFocus
              multiline
              style={{
                width: "90%",
                fontFamily: '"Helvetica Neue", sans-serif',
                fontWeight: "300",
                fontSize: "15px",
              }}
            />
            <Button
              onClick={handleSend}
              primary
              style={{
                marginLeft: "auto",
                background: "#ff6b6b",
                borderRadius: "30px",
                boxShadow: "none",
                padding: "8px 16px",
                fontWeight: "400",
                letterSpacing: "0.5px",
                fontSize: "14px",
              }}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
