import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:3001");

function createMessage(msg) {
  socket.emit("createMessage", {
    text: msg
  });
}

function newMessage() {
  socket.on("newMessage", data => console.log(data));
}

export { createMessage, newMessage };
