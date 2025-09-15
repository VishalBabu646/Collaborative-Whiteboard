import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const isValidRoomCode = (code) => /^[a-zA-Z0-9]{6,8}$/.test(code);

const generateRoomCode = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

const RoomJoin = () => {
  const [roomCode, setRoomCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleJoin = (e) => {
    e.preventDefault();
    const trimmedCode = roomCode.trim();

    if (!isValidRoomCode(trimmedCode)) {
      setError("Room code must be 6–8 alphanumeric characters");
      return;
    }

    navigate(`/room/${trimmedCode}`);
  };

  const handleCreateRoom = () => {
    const newCode = generateRoomCode();
    navigate(`/room/${newCode}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen  bg-gray-100">
      <div className="bg-black/60 backdrop-blur-sm p-6 rounded shadow-lg w-full  max-w-sm border-gray-900 border">
        <h2 className="text-xl font-bold mb-4 text-center text-white">
          Join a Whiteboard Room
        </h2>

        <form onSubmit={handleJoin} className="flex flex-col">
          <input
            type="text"
            placeholder="Enter Room Code"
            value={roomCode}
            onChange={(e) => {
              setRoomCode(e.target.value);
              setError("");
            }}
            className="border p-2 rounded mb-4 focus:outline-none focus:ring"
            maxLength={8}
            required
            disabled={loading}
          />

          <button
            type="submit"
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-500 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Joining..." : "Join Room"}
          </button>
        </form>
        <div className="flex items-center justify-center">
          <button
            onClick={handleCreateRoom}
            className="mt-3 bg-blue-900 text-white w-full px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Create New Room
          </button>
        </div>

        {error && (
          <p className="text-red-500 mt-2 text-sm text-center">{error}</p>
        )}
      </div>
    </div>
  );
};

export default RoomJoin;
