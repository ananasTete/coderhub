const Koa = require("koa");
const useRoutes = require("../router/index")
const bodyParser = require("koa-bodyparser");
const errorHandler = require("./error-handle");
const usersRouter = require("../router/user.router");
const authRouter = require("../router/auth.router")

const app = new Koa();

// 注册解析JSON的全局中间件
app.use(bodyParser());

// 批量注册路由
useRoutes(app);

// 监听错误事件
app.on("error", errorHandler);

module.exports = app;
