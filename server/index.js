require("dotenv").config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

let users = [];

io.on("connection", (socket) => {
  console.log(socket.id);

  users.push({
    userId: socket.id,
    image:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
    username: "",
  });

  io.emit("connected", { users });

  socket.on("send_message", ({ to, from, content }) => {
    socket.to(to).emit("private_message", {
      from,
      content,
    });
  });

  socket.on("message_state", ({ to, state }) => {
    socket.to(to).emit("receive_message_state", {
      state,
    });
  });

  socket.on("user_modification", ({ userId, image, username }) => {
    users.map((user, index) => {
      if (user.userId !== userId) return;

      users.splice(index, 1);

      users.push({
        userId,
        image,
        username,
      });

      io.emit("connected", { users });
    });
  });

  socket.on("disconnect", () => {
    // const newUsers = users.map((user) => user.userId.indexOf(socket.id));
    // users.splice(newUsers, 1);
    users = users.filter((user) => user.userId !== socket.id);
    console.log(socket.id, "desconectado");
    // console.log(users);
    io.emit("connected", { users });
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log("server is running");
});
