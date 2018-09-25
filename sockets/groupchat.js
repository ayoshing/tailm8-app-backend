module.exports = function(io) {
  io.on("connection", socket => {
    console.log("user connected");

    socket.on("createMessage", message => {
      console.log(message);

      io.emit("newMessage", {
        text: message.text
      });
    });
  });
};
