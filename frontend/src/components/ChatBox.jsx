import React from "react";

function ChatBox({ messages, username, message, setMessage, sendMessage }) {
  return (
    <div className="w-full max-w-md bg-gray-900 p-4 rounded-lg flex flex-col">
      <div className="h-64 overflow-y-auto border-b border-gray-700 mb-4 p-2 space-y-2 flex flex-col">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg max-w-[75%] text-sm bg-gray-700 text-white ${
              msg.sender === username
                ? "self-end text-right"
                : "self-start text-left"
            }`}
          >
            <span className="font-bold text-blue-300">{msg.sender}</span>:{" "}
            {msg.message}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 rounded-lg text-white bg-gray-800 border border-gray-600"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
