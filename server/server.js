
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"], // Add both frontend ports
    methods: ["GET", "POST"]
  }
});


app.use(cors());

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.on("joinRoom", (roomId) => {
    if (![...socket.rooms].includes(roomId)) {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);
      io.to(roomId).emit("userJoined", socket.id);
    }
  });

  socket.on("sendMessage", ({ roomId, message, sender }) => {
    console.log(`Message from ${sender} in ${roomId}: ${message}`);
    io.to(roomId).emit("receiveMessage", { sender, message });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});



server.listen(5000, () => {
  console.log("Server running on port 5000");
});