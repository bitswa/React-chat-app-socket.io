const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST"],
  },
});

const users = [];

io.on("connection", (socket) => {
  console.log(socket.id);
  users.push({
    userId: socket.id,
    image:
      "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg",
  });

  io.emit("connected", { users });

  socket.on("send_message", ({ to, from, content }) => {
    socket.to(to).emit("private_message", {
      from,
      content,
    });
  });

  socket.on("change_image", ({ userId, image }) => {
    const oldProfile = users.map((user) => user.userId.indexOf(userId));
    users.splice(oldProfile, 1);
    users.push({
      userId,
      image,
    });
    io.emit("connected", { users });
  });

  socket.on("disconnect", () => {
    const newUsers = users.map((user) => user.userId.indexOf(socket.id));
    users.splice(newUsers, 1);
    io.emit("connected", { users });
  });
});

server.listen(3001, () => {
  console.log("server is running");
});
