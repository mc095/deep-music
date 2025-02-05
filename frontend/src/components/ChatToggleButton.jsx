import React from "react";

function ChatToggleButton({ showChat, setShowChat }) {
  return (
    <button
      onClick={() => setShowChat(!showChat)}
      className="fixed bottom-4 right-4 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg z-10"
    >
      {showChat ? "Hide Chat" : "Chat"}
    </button>
  );
}

export default ChatToggleButton;
