const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);
const cors = require("cors");
nnybh
app.use(cors());

const users = {};
  
io.on("connection", (socket) => {
  socket.on("new-user-joined", (userName) => {
    users[socket.id] = userName;
    io.emit("new-user-joined", userName);
  });

  socket.on("send", (message) => {
    io.emit("receive", { message: message, userName: users[socket.id] });
    // socket.broadcast.emit("send", { message: message, userName: users[socket.id] });
  });

  // socket.on("receive", (message) => {
  //   socket.broadcast.emit("send", { message: message, userName: users[socket.id] });
  // });
});

const port = 8000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
