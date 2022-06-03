const errorTypes = require("../constants/error-types");

function errorHandler(error, ctx) {
  let status, info, message;

  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 200;
      info = {
        returnCode: 20001,
        message: "用户名或密码不能为空！"
      }
      break;
    case errorTypes.USER_ALREADY_EXITS:
      status = 200;
      info = {
        returnCode: 20002,
        message: "该用户名已存在！"
      }
      break;
    case errorTypes.USER_DOES_NOT_EXITS:
      status = 200;
      info = {
        returnCode: 20003,
        message: "此用户未注册！"
      }
      break;
    case errorTypes.PASSWORD_IS_INCORRECT:
      status = 200;
      info = {
        returnCode: 20004,
        message: "密码错误！"
      }
      break;
    case errorTypes.UNAUTHORIZED:
      status = 200;
      info = {
        returnCode: 20005,
        message: "无效的token！"
      }
      break;
    case errorTypes.NOPERMISSION:
      status = 200;
      info = {
        returnCode: 20005,
        message : "无权限！"
      }
      break;
    default:
      status = 404,
      message = "NOT FOUND"
      break;
  }
  ctx.status = status;
  ctx.response.body = info;
}

module.exports = errorHandler;
