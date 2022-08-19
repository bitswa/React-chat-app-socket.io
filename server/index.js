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
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
    username: "",
  });

  io.emit("connected", { users });

  socket.on("send_message", ({ to, from, content }) => {
    console.log(to, from, content);
    socket.to(to).emit("private_message", {
      from,
      content,
    });
  });

  socket.on("user_modification", ({ userId, image, username }) => {
    console.log(users);
    users.map((user, index) => {
      if (user.userId !== userId) return;

      users.splice(index, 1);
      console.log(userId, image, username);
      users.push({
        userId,
        image,
        username,
      });
      console.log(users);

      io.emit("connected", { users });
    });
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
