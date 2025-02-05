import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import ChatBox from "../components/ChatBox";

const socket = io("http://localhost:5000");

function Room() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [username] = useState(() => localStorage.getItem("username") || `User-${Math.floor(Math.random() * 1000)}`);
  const [showNotification, setShowNotification] = useState(true);

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

  const exitRoom = () => {
    localStorage.removeItem(`chat_${roomId}`);
    navigate("/");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomId);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white p-4">
      {showNotification && (
        <div className="fixed top-5 right-5 bg-blue-500 text-white p-4 rounded-lg shadow-lg flex items-center gap-2">
          <span className="font-bold">Room Code: {roomId}</span>
          <button 
            onClick={copyToClipboard} 
            className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded-lg text-sm">
            Copy
          </button>
          <button
            onClick={() => setShowNotification(false)}
            className="text-white font-bold text-lg ml-2">
            ×
          </button>
        </div>
      )}
      <ChatBox messages={messages} username={username} message={message} setMessage={setMessage} sendMessage={sendMessage} />
      <button
        onClick={exitRoom}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg mt-4"
      >
        Exit Room
      </button>
    </div>
  );
}

export default Room;
