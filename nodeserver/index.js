const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);
const cors = require("cors");

app.use(cors());

const users = {};

io.on("connection", (socket) => {
  socket.on("new-user-joined", (name) => {
    console.log('new user is joined', name);
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });

  socket.on("send", (message) => {
    socket.broadcast.emit("receive", { message: message, name: users[socket.id] });
  });
});

const port = 8000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
