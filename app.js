const express = require("express");
const socket = require("socket.io");
const path = require("path");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socket(server);
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  console.log("socket Connected");

  socket.on("join-room", ({ username, state, city }) => {
    msg = `Welcome to ${city} Chat`;
    socket.join(city);
    username = "Helping Hands";
    socket.emit("message", { msg, username });
  });
  socket.on("message", ({ msg, username, city }) => {
    io.to(city).emit("message", { msg, username });
  });
});

server.listen(PORT);
