// app/components/Sidebar.jsx
import { useState } from "react";
import { Button } from "@shopify/polaris";
import { MoonIcon, SunIcon, MenuIcon } from "@shopify/polaris-icons";

export default function Sidebar({ darkMode, toggleDarkMode }) {
  const [expanded, setExpanded] = useState(false);

  const pinnedChats = [
    "Lorem ipsum dolor sit",
    "Duis aute irure dolor in repre",
    "Eserunt mollit anim id est laboru...",
    "Voluptat diam ut venenatis tellus...",
  ];

  const chatHistory = [
    "Quis ipsum suspendisse",
    "Ut tristique et egestas quis ipsu...",
    "Sed viverra tellus in hac",
    "Eros in cursus turpis massa",
  ];

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <div className={`sidebar-toggle ${darkMode ? "dark" : ""}`}>
        <Button icon={MenuIcon} onClick={toggleSidebar} plain />
        <div className="sidebar-icons">
          <div className="nav-icon">
            <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
              <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1.581.814L10 13.197l-4.419 3.617A1 1 0 014 16V4z" />
            </svg>
          </div>
          <div className="nav-icon"></div>
          <Button
            icon={darkMode ? SunIcon : MoonIcon}
            onClick={toggleDarkMode}
            plain
          />
        </div>
      </div>

      <div
        className={`sidebar ${darkMode ? "dark" : ""} ${expanded ? "expanded" : ""}`}
      >
        <div className="sidebar-search">
          <input type="text" placeholder="Search for chats..." />
        </div>

        <div className="sidebar-nav">
          <div className="nav-item">
            <span className="nav-text">Library</span>
          </div>
        </div>

        <div className="sidebar-section">
          <h3>PINNED</h3>
          <div className="chat-list">
            {pinnedChats.map((chat, index) => (
              <div key={`pinned-${index}`} className="chat-item">
                {chat}
              </div>
            ))}
          </div>
        </div>

        <div className="sidebar-section">
          <h3>CHAT HISTORY</h3>
          <div className="chat-list">
            {chatHistory.map((chat, index) => (
              <div key={`history-${index}`} className="chat-item">
                {chat}
              </div>
            ))}
          </div>
        </div>

        <div className="new-chat-button">
          <Button primary fullWidth>
            + New Chat
          </Button>
        </div>
      </div>
    </>
  );
}
