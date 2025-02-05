import React from "react";
import ChatBox from "./ChatBox";

function ChatContainer({ messages, username, message, setMessage, sendMessage, handleKeyPress, setShowChat }) {
  return (
    <div className="fixed right-0 top-[60px] h-[calc(100%-60px)] w-96 bg-gray-900 p-4 transition-transform z-40">
      <ChatBox
        messages={messages}
        username={username}
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
        handleKeyPress={handleKeyPress}
        setShowChat={setShowChat}
      />
    </div>
  );
}

export default ChatContainer;
