const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());

io.on("connection", (socket) => {
  socket.on("joinRoom", (roomId) => {
    if (![...socket.rooms].includes(roomId)) {
      socket.join(roomId);
      io.to(roomId).emit("userJoined", socket.id);
    }
  });

  socket.on("sendMessage", ({ roomId, message, sender }) => {
    io.to(roomId).emit("receiveMessage", { sender, message });
  });

  socket.on("disconnect", () => {});
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});

