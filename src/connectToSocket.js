module.exports = (io) => {
  io.on("connection", (socket) => {
    const { id } = socket;
    console.log(`Socket connected: ${id}`);
    // работа с комнатами
    const { roomName } = socket.handshake.query;
    console.log(`Socket roomName: ${roomName}`);
    socket.join(roomName);
    socket.on("message-to-room", (msg) => {
      msg.type = `room: ${roomName}`;
      socket.to(roomName).emit("message-to-room", msg);
      socket.emit("message-to-room", msg);
    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${id}`);
    });
  });
};
