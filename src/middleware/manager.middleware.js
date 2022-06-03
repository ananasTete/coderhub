const errorTypes = require("../constants/error-types");
const ManagerService = require("../service/manager.service")
const md5password = require("../utils/password-handle");

async function verifyUser(ctx, next) {
  const { name, password, permission } = ctx.request.body;

  // 判断用户名和密码是否为空(undefined、null、0、空字符串)
  if (!name || !password || !permission) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }

  // 判断管理员是否被注册过
  const result = await ManagerService.getUserByName(name);
  if (result.length) {
    const error = new Error(errorTypes.USER_ALREADY_EXITS);
    return ctx.app.emit("error", error, ctx);
  }

  await next();
}

async function handlePassword(ctx, next) {
  let { password } = ctx.request.body;
  ctx.request.body.password = md5password(password);
  await next();
}

module.exports = {
  verifyUser,
  handlePassword,
};
