const Koa = require("koa");
const useRoutes = require("../router/index");
const bodyParser = require("koa-bodyparser");
const compress = require("koa-compress");
const errorHandler = require("./error-handle");
const usersRouter = require("../router/user.router");
const authRouter = require("../router/auth.router");
const etag = require("koa-etag");
// const cors = require("koa-cors");

const app = new Koa();

// 注册解析JSON的全局中间件
app.use(bodyParser());

const options = { threshold: 2048 };
app.use(compress(options));

app.use(etag());

// app.use(async function (ctx, next) {
//   if (ctx.headers.origin === "http://localhost:8080") {
//     // 简单跨域请求
//     ctx.set("Access-Control-Allow-Origin", ctx.headers.origin);
//     console.log(ctx.headers);
//     // 非简单跨域请求
//     if (ctx.request.method === "OPTIONS") {
//       ctx.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//       ctx.set(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, content-type"
//       );
//       ctx.set("Access-Control-Max-Age", 360);
//       ctx.response.body = "";
//     }
//   } else {
//     // 不允许的请求源直接返回响应，不再进行其它中间件的操作
//     ctx.response.body = "";
//   }
//   await next();
// });

// 批量注册路由
useRoutes(app);

// 监听错误事件
app.on("error", errorHandler);

module.exports = app;
