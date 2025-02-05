import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import NavBar from "../components/NavBar";
import ChatContainer from "../components/ChatContainer";
import ChatToggleButton from "../components/ChatToggleButton";

const socket = io("http://localhost:5000");

function Room() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [username] = useState(() => localStorage.getItem("username") || `User-${Math.floor(Math.random() * 1000)}`);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    localStorage.setItem("username", username);
    const storedMessages = localStorage.getItem(`chat_${roomId}`);
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }

    socket.emit("joinRoom", roomId);

    const handleMessage = (data) => {
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, data];
        localStorage.setItem(`chat_${roomId}`, JSON.stringify(updatedMessages));
        return updatedMessages;
      });
    };

    socket.on("receiveMessage", handleMessage);

    return () => {
      socket.off("receiveMessage", handleMessage);
    };
  }, [roomId, username]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = { sender: username, message };
      socket.emit("sendMessage", { roomId, ...newMessage });
    }
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const exitRoom = () => {
    localStorage.removeItem(`chat_${roomId}`);
    navigate("/");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomId);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white p-4 relative">
      {/* Navbar with overlapping effect */}
      <NavBar exitRoom={exitRoom} roomId={roomId} copyToClipboard={copyToClipboard} className="absolute top-0 w-full z-50" />

      <div className="flex w-full justify-center mt-16">
        {/* Main Content (Playlist or other components can go here) */}
        <div className="flex-1 h-screen flex flex-col">{/* <Playlist /> */}</div>

        {/* Chat Section */}
        <ChatToggleButton showChat={showChat} setShowChat={setShowChat} />
        {showChat && (
          <ChatContainer
            messages={messages}
            username={username}
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
            handleKeyPress={handleKeyPress}
            setShowChat={setShowChat}
          />
        )}
      </div>
    </div>
  );
}

export default Room;
