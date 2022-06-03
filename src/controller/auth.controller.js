const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../app/config");
const { getAddressListByUserId } = require("../service/address.service");
const { getCartInfoById } = require("../service/cart.service");
const { getMenuByPermission } = require("../middleware/auth.middleware");

class AuthController {
  // 用户登录中间件
  async login(ctx, next) {
    const { id, name } = ctx.request.user;
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24 * 3, // 单位：秒   3天
      algorithm: "RS256",
    });
    const cartInfo = await getCartInfoById(id);
    const addressInfo = await getAddressListByUserId(id);
    ctx.response.statusText = "登陆成功";
    ctx.response.body = {
      userInfo: {
        id,
        name,
        token,
      },
      cartInfo,
      addressInfo,
    };
  }

  // 管理员登陆
  async managerLogin(ctx, next) {
    let { id, name, permission } = ctx.request.user;
    console.log(id, name, permission);
    const token = jwt.sign({ id, name, permission }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24 * 3, // 单位：秒   3天
      algorithm: "RS256",
    });
    permission = await getMenuByPermission(permission);
    ctx.response.statusText = "登陆成功";
    ctx.response.body = {
      userInfo: {
        id,
        name,
        token,
      },
      permission,
    };
  }
}

module.exports = new AuthController();
