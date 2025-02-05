import React from "react";

const Playlist = () => {
  return (
    <div className="w-96 h-screen bg-gray-900 p-4 rounded-lg flex flex-col mt-4">
      <h2 className="text-lg font-bold text-white mb-2">Playlist</h2>
      <div className="h-48 overflow-y-auto border-b border-gray-700 mb-4 p-2 space-y-2 flex flex-col">
        <p className="text-gray-400">No videos added yet.</p>
      </div>
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
        Add Video
      </button>
    </div>
  );
};

export default Playlist;
