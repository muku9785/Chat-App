const socket = io("http://localhost:8000");
const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");

const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.appendChild(messageElement);
};

const userName = prompt("Enter your name");
append(` ${userName} joined the chat`, "right");
socket.emit("new-user-joined", userName);

socket.on("new-user-joined", (userName) => {  
  append(`${userName} joined the chat`, "left");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`you : ${message}`, "right");
  socket.emit('send', message);
  messageInput.value = '';
});

socket.on("receive", (data) => {
  append(`${data.userName} : ${data.message}`, "left");
});

socket.on("send", (data) => {
  append(`${data.userName} : ${data.message}`, "right");
});
