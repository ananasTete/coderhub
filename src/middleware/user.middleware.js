const errorTypes = require("../constants/error-types");
const UserService = require("../service/user.service");
const md5password = require("../utils/password-handle");

async function verifyUser(ctx, next) {
  const { name, password } = ctx.request.body;

  // 判断用户名和密码是否为空(undefined、null、0、空字符串)
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }

  // 判断用户名是否被注册过
  const result = await UserService.getUserByName(name);
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
