const fs = require("fs");
const FileService = require("../service/file.service");
const UserService = require("../service/user.service");
const { AVATAR_PATH } = require("../constants/file-path");

class UserController {
  // 用户注册中间件
  async register(ctx, next) {
    // 获取用户数据
    const user = ctx.request.body;

    // 操作数据库
    const res = await UserService.register(user);

    // 返回响应报文结束响应
    ctx.response.body = res;
  }

  async avatarInfo(ctx, next) {
    try {
      const { userId } = ctx.request.params;
      const { type } = ctx.request.query;
      const result = await FileService.getAvatarByUserId(userId);
      const mimetype = result[0].mimetype;
      let filename = result[0].filename;

      const types = ["large", "middle", "small"];
      if (types.some((item) => type === item)) {
        filename = filename + "-" + type;
      }

      ctx.response.set("content-type", mimetype);
      ctx.response.body = fs.createReadStream(AVATAR_PATH + "/" + filename);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new UserController();
