const roomUsers = {}; // Global map

export const socketHandlers = (io) => {
  io.on("connection", (socket) => {
    console.log(" New connection:", socket.id);

    socket.on("join-room", (roomId) => {
      if (!roomId) return;

      if (socket.roomId === roomId) {
        console.log(` Socket ${socket.id} already in room ${roomId}`);
        return;
      }

      socket.roomId = roomId;
      socket.join(roomId);

      if (!roomUsers[roomId]) {
        roomUsers[roomId] = new Set();
      }

      roomUsers[roomId].add(socket.id);

      const count = roomUsers[roomId].size;
      console.log(` User ${socket.id} joined room ${roomId}`);
      console.log(` Room ${roomId} size:`, count);
      console.log(` Socket.IO sees:`, io.sockets.adapter.rooms.get(roomId)?.size || 0);
      io.to(roomId).emit("user-count", count);
    });

    //  Draw events
    socket.on("draw-start", (data) => {
      socket.to(data.roomId).emit("draw-start", data);
    });

    socket.on("draw-move", (data) => {
      socket.to(data.roomId).emit("draw-move", data);
    });

    socket.on("draw-end", (data) => {
      socket.to(data.roomId).emit("draw-end", data);
    });

    socket.on("clear-canvas", ({ roomId }) => {
      io.to(roomId).emit("clear-canvas");
    });

    //  Cursor sync
    socket.on("cursor-move", (data) => {
      socket.to(data.roomId).emit("cursor-update", data);
    });

    socket.on("disconnect", () => {
      const { roomId } = socket;

      if (roomId && roomUsers[roomId]) {
        roomUsers[roomId].delete(socket.id);
        if (roomUsers[roomId].size === 0) {
          delete roomUsers[roomId];
        }

        const count = roomUsers[roomId]?.size || 0;
        io.to(roomId).emit("user-count", count);
      }

      console.log(" Disconnected:", socket.id);
    });
  });
};
