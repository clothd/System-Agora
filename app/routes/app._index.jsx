import { Card, Page, TextField, Button, Scrollable } from "@shopify/polaris";
import { useState } from "react";

export default function Index() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
      // API for the LLM response (backend function)
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <Page fullWidth>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "90vw",
          height: "90vh",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "300",
            letterSpacing: "4px",
            color: "#ff6b6b",
            textAlign: "center",
            margin: "20px 0",
            fontFamily: '"Helvetica Neue", sans-serif',
          }}
        >
          AGORA
        </h1>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            borderRadius: "12px",
            overflow: "hidden",
            background: "rgba(255, 255, 255, 0.95)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
            height: "calc(100vh - 100px)",
          }}
        >
          <Scrollable style={{ flex: 1 }}>
            {messages.length === 0 ? (
              <div
                style={{
                  display: "flex",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#aaaaaa",
                  fontFamily: '"Helvetica Neue", sans-serif',
                  fontWeight: "300",
                  fontSize: "16px",
                  letterSpacing: "1px",
                }}
              >
                How can I help you today?
              </div>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: "12px",
                    padding: "16px",
                    display: "flex",
                    justifyContent:
                      msg.sender === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "70%",
                      padding: "12px 16px",
                      borderRadius:
                        msg.sender === "user"
                          ? "18px 18px 4px 18px"
                          : "18px 18px 18px 4px",
                      background: msg.sender === "user" ? "#ff6b6b" : "#f1f1f1",
                      color: msg.sender === "user" ? "white" : "#333",
                      fontFamily: '"Helvetica Neue", sans-serif',
                      fontWeight: "300",
                      fontSize: "15px",
                      letterSpacing: "0.3px",
                      lineHeight: "1.4",
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))
            )}
          </Scrollable>

          <div
            style={{
              borderTop: "3px solid #f0f0f0",
              padding: "10px",
              display: "flex",
              alignItems: "center",
              background: "white",
              boxSizing: "border-box",
            }}
          >
            <TextField
              value={input}
              onChange={setInput}
              placeholder="What should I do?"
              onKeyPress={handleKeyPress}
              autoFocus
              multiline
              style={{
                width: "90%",
                fontFamily: '"Helvetica Neue", sans-serif',
                fontWeight: "300",
                fontSize: "15px",
                padding: "0 8px",
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
                fontFamily: '"Helvetica Neue", sans-serif',
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
    </Page>
  );
}
