import React from "react";
import { FaCopy } from "react-icons/fa"; // Importing the copy icon

const NavBar = ({ roomId, exitRoom }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomId);
  };

  return (
    <div className="bg-gray-900 text-white w-full p-4 flex items-center justify-between shadow-md z-10 fixed top-0 left-0 right-0">
      <h1 className="text-lg font-bold flex items-center">
        Room Code: {roomId}
        <button
          onClick={copyToClipboard}
          className="ml-2 text-white hover:text-gray-400"
          title="Copy Room Code"
        >
          <FaCopy />
        </button>
      </h1>
      <button
        onClick={exitRoom}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
      >
        Exit Room
      </button>
    </div>
  );
};

export default NavBar;
