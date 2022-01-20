const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../app/config");

class AuthController {
  // 用户登录中间件
  async login(ctx, next) {
    const { id, name } = ctx.request.user;
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24 * 3, // 单位：秒   3天
      algorithm: "RS256",
    });
    ctx.response.statusText = "登陆成功"
    ctx.response.body = {
      id,
      name,
      token,
    };
  }
}

module.exports = new AuthController();
