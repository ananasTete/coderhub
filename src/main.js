/** 程序执行入口文件 */
const app = require("./app/index");
const config = require("./app/config");
const connections = require("./app/database")

app.listen(config.APP_PORT, "0.0.0.0", () => {
  console.log("服务器启动成功！");
});
