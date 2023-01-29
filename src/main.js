/** 程序执行入口文件 */
const http = require("http");
const { Server } = require("socket.io");
const app = require("./app/index");
const config = require("./app/config");

const httpServer = http.createServer(app.callback());
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:8081", "http://localhost:8080"],
  },
});

const onLineList = [];
const busyLineList = [];

io.on("connection", (socket) => {
  // 用户上线
  socket.on("userOnLine", () => {
    if (onLineList.length > 0) {
      socket.emit("greeting", "您好，有什么可以帮您~");
      const servantRoom = onLineList.shift();
      if (!busyLineList.includes(servantRoom)) {
        busyLineList.push(servantRoom);
      }
      socket.join(servantRoom);
      socket.broadcast.to(servantRoom).emit("statusMessage", "用户已上线");

      socket.on("userChatMessage", (message) => {
        console.log(onLineList, busyLineList, servantRoom);
        console.log("user:", message);
        socket.broadcast.to(servantRoom).emit("chatMessageU", message);
      });

      socket.on("userOffLine", () => {
        console.log("servant", socket.rooms.size);
        if (socket.rooms.size > 1) {
          socket.broadcast.to(servantRoom).emit("statusMessage", "用户已离线");
          socket.leave(servantRoom);
          busyLineList.forEach((item, index) => {
            if (item === servantRoom) {
              busyLineList.splice(index, 1);
            }
          });
          onLineList.push(servantRoom);
        }
      });
    } else {
      console.log(onLineList, busyLineList);
      socket.emit("statusMessage", "客服忙线中，请您稍后再来~");
    }
  });

  // 客服上线
  socket.on("servantOnLine", (servantRoom) => {
    console.log("onLine", onLineList, "busy", busyLineList);
    if (
      !onLineList.includes(servantRoom) &&
      !busyLineList.includes(servantRoom)
    ) {
      onLineList.push(servantRoom);
      socket.join(servantRoom);
    }

    socket.on("servantChatMessage", (message) => {
      socket.broadcast.to(servantRoom).emit("chatMessageS", message);
    });

    socket.on("servantOffLine", () => {
      console.log("servant", socket.rooms);
      socket.broadcast.to(servantRoom).emit("statusMessage", "客服已离线");
      socket.leave(servantRoom);

      busyLineList.forEach((item, index) => {
        if (item === servantRoom) {
          busyLineList.splice(index, 1);
        }
      });
      onLineList.forEach((item, index) => {
        if (item === servantRoom) {
          onLineList.splice(index, 1);
        }
      });
    });
  });
});

httpServer.listen(8000, () => {
  console.log("服务器启动");
});
