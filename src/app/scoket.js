/** webSocket */

const onLineList = [];
const busyLineList = [];

const WebSocket = require("ws");

let server;

server = new WebSocket.Server({ port: 8025 });

server.on("open", () => {
  console.log("服务器连接成功");
});

server.on("close", () => {
  console.log("服务器连接关闭");
});

server.on("connection", (ws, req) => {
  const urlArray = req.url.replace("/", "").split("/");
  const [auth, id] = urlArray;

  if (auth === "user") {
    // 客户消息处理
    ws.send("您好，有什么可以帮您");

    ws.userId = id;
    console.log("ws.userId", ws.userId);

    let servicer;
    if (onLineList.length > 0) {
      servicer = onLineList[0];
      if (busyLineList.every((item) => item !== servicer)) {
        busyLineList.push(servicer);
      }
      onLineList.pop();
    }
    console.log("servicer", servicer, onLineList, busyLineList);

    // 收到一台客户端发送的信息
    ws.on("message", (message) => {
      console.log(`客户: ${message}`);

      server.clients.forEach(function each(client) {
        if (
          client.servicer === servicer &&
          client.readyState === WebSocket.OPEN
        ) {
          client.send(JSON.stringify({ userId: id, info: message }));
        }
      });
    });
  } else if (auth === "servicer") {
    // 客服消息处理
    ws.servicer = id;
    if (onLineList.every((item) => item !== id)) {
      onLineList.push(id);
    }

    ws.on("message", (message) => {
      console.log(`客服: ${message}`);

      const { userId, info } = JSON.parse(message);

      server.clients.forEach(function each(client) {
        if (client.userId === userId && client.readyState === WebSocket.OPEN) {
          client.send(info); // 格式为Blob
        }
      });
    });
  }
});

