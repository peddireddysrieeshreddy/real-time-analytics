import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    // origin: process.env.CLIENT_URL,
    origin: "*",
    methods: ["GET", "POST"],
  },
});

function generateMockData() {
  return {
    timestamp: new Date().toISOString(),
    active_users: Math.floor(Math.random() * 100) + 1,
    page_views: Math.floor(Math.random() * 200) + 50,
    avg_session_duration: Math.random() * 5 + 2,
  };
}

io.on("connection", (socket) => {
  console.log(`Client connected with ID: ${socket.id}`);

  const interval = setInterval(() => {
    const data = generateMockData();
    socket.emit("updateData", data);
  }, 1000);

  socket.on("disconnect", (reason) => {
    console.log(`Client with ID: ${socket.id} disconnected. Reason: ${reason}`);
    clearInterval(interval);
  });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
