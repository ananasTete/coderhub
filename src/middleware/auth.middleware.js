const errorTypes = require("../constants/error-types");
const UserService = require("../service/user.service");
const ManagerService = require("../service/manager.service");
const AuthService = require("../service/auth.service");
const md5password = require("../utils/password-handle");
const jwt = require("jsonwebtoken");
const { PUBLIC_KEY } = require("../app/config");

/** 验证用户是否注册 */
async function verifyLogin(ctx, next) {
  const { name, password } = ctx.request.body;

  // 判断用户名和密码是否为空(undefined、null、0、空字符串)
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }

  // 判断用户是否存在（result为查询结果组成的对象数组，有对象则查询到了数据）
  const result = await UserService.getUserByName(name);
  if (!result.length) {
    const error = new Error(errorTypes.USER_DOES_NOT_EXITS);
    return ctx.app.emit("error", error, ctx);
  }

  // 判断密码是否和数据库中保存的是否一致(加密后比较)
  if (md5password(password) != result[0].password) {
    const error = new Error(errorTypes.PASSWORD_IS_INCORRECT);
    return ctx.app.emit("error", error, ctx);
  }

  // 将查询到的用户信息流转到下一个中间件
  ctx.request.user = result[0];

  await next();
}

/** 验证是否登录（token） */

async function verifyAuth(ctx, next) {
  const authorization = ctx.request.headers.authorization;
  if (!authorization) {
    const error = new Error(errorTypes.UNAUTHORIZED);
    ctx.app.emit("error", error, ctx);
  }
  const token = authorization.replace("Bearer ", "");

  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      // { id: 6, name: 'lucy', iat: 1640756202, exp: 1640842602 }
      algorithms: ["RS256"],
    });
    ctx.request.user = result; // result对象中包含被加密的信息(在这里是id和name)，以及生成时间和失效时间
    console.log(ctx.request.user);
    await next();
  } catch (err) {
    console.log(err);
    const error = new Error(errorTypes.UNAUTHORIZED);
    ctx.app.emit("error", error, ctx);
  }
}

/** 验证权限 */

async function verifyPermission(ctx, next) {
  const paramsKeys = Object.keys(ctx.request.params);
  const tableName = paramsKeys[0].replace("Id", ""); // 如 commentId -> comment
  const id = ctx.request.params[paramsKeys[0]];
  const { id: userId } = ctx.request.user;

  const isPermission = await AuthService.check(tableName, id, userId);
  if (!isPermission) {
    const error = new Error(errorTypes.NOPERMISSION);
    return ctx.app.emit("error", error, ctx);
  }
  await next();
}

/** 验证管理员是否注册 */

async function verifyLoginManager(ctx, next) {
  const { name, password } = ctx.request.body;

  // 判断用户名和密码是否为空(undefined、null、0、空字符串)
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }

  // 判断用户是否存在（result为查询结果组成的对象数组，有对象则查询到了数据）
  const result = await ManagerService.getUserByName(name);
  if (!result.length) {
    const error = new Error(errorTypes.USER_DOES_NOT_EXITS);
    return ctx.app.emit("error", error, ctx);
  }

  // 判断密码是否和数据库中保存的是否一致(加密后比较)
  if (md5password(password) != result[0].password) {
    const error = new Error(errorTypes.PASSWORD_IS_INCORRECT);
    return ctx.app.emit("error", error, ctx);
  }

  // 将查询到的用户信息流转到下一个中间件
  ctx.request.user = result[0];

  await next();
}

/** 不同管理员对应菜单信息*/
async function getMenuByPermission(permission) {
  switch (permission) {
    case "0":
      return [
        {
          permission: "超级管理员",
          menu: [
            { title: "商品池", to: "/home/pool" },
            { title: "分类管理", to: "/home/category" },
            { title: "人员管理", to: "/home/person" },
            { title: "客服", to: "/home/service" },
          ],
        },
      ];
      break;
    case "1":
      return [
        {
          permission: "管理员",
          menu: [
            { title: "商品池", to: "/home/pool" },
            { title: "客服", to: "/home/service" },
          ],
        },
      ];
      break;
    case "2":
      return [
        {
          permission: "客服人员",
          menu: [{ title: "客服", to: "/home/service" }],
        },
      ];
      break;
  }
}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission,
  verifyLoginManager,
  getMenuByPermission,
};
