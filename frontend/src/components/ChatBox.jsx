import React from "react";
import { FaTimes } from "react-icons/fa";

function ChatBox({ messages, username, message, setMessage, sendMessage, handleKeyPress, setShowChat }) {
  return (
    <div className="relative w-full h-full bg-gray-900 p-4 rounded-lg flex flex-col">
      {/* Close Button, only visible when chat is open */}
      <button
        onClick={() => setShowChat(false)}
        className="absolute top-[3px] left-[-67px] text-white hover:text-gray-400 bg-gray-700 p-3 rounded-full z-50 border-none"
        title="Close Chat"
      >
        <FaTimes size={20} />
      </button>

      {/* Chat messages */}
      <div className="h-[calc(100%-80px)] overflow-y-auto border-b border-gray-700 mb-4 p-2 space-y-2 flex flex-col">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg max-w-[75%] text-sm bg-gray-700 text-white ${
              msg.sender === username ? "self-end text-right" : "self-start text-left"
            }`}
          >
            <span className="font-bold text-blue-300">{msg.sender}</span>: {msg.message}
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="flex gap-2 absolute bottom-0 left-0 right-0 p-4 bg-gray-900">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 p-3 rounded-lg text-white bg-gray-800 border border-gray-600"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
