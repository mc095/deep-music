// src/pages/Home.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    const newRoomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    navigate(`/room/${newRoomCode}`);
  };

  const handleJoinRoom = () => {
    if (roomCode.trim()) {
      navigate(`/room/${roomCode}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Deep Music Connection Test</h1>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter Room Code"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          className="p-2 rounded-lg text-white"
        />
        <button
          onClick={handleJoinRoom}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Join Room
        </button>
        <button
          onClick={handleCreateRoom}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Create Room
        </button>
      </div>
    </div>
  );
}

export default Home;