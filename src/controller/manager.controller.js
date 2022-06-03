const fs = require("fs");
// const FileService = require("../service/file.service");
const ManagerService = require("../service/manager.service");
const md5password = require("../utils/password-handle");
// const { AVATAR_PATH } = require("../constants/file-path");

class ManagerController {
  async register(ctx, next) {
    const manager = ctx.request.body;
    const res = await ManagerService.register(manager);
    ctx.response.body = res;
  }

  async getAllManager(ctx, next) {
    const { permission } = ctx.request.user;
    if (permission === "0") {
      const result = await ManagerService.getAllManager();
      ctx.response.body = result;
    } else {
      ctx.response.body = "无权限";
    }
  }

  async editManager(ctx, next) {
    const { managerId } = ctx.request.params;
    const newInfo = ctx.request.body;
    const { permission } = ctx.request.user;
    if (permission === "0") {
      const result = await ManagerService.editManager(managerId, newInfo);
      ctx.response.body = "编辑成功";
    } else {
      ctx.response.body = "无权限";
    }
  }

  async deleteManager(ctx, next) {
    const { managerId } = ctx.request.params;
    const { permission } = ctx.request.user;
    if (permission === "0") {
      const result = await ManagerService.deleteManager(managerId);
      ctx.response.body = "删除成功";
    } else {
      ctx.response.body = "无权限";
    }
  }

  async searchManager(ctx, next) {
    const { permission } = ctx.request.user;
    const info = ctx.request.body;
    if (permission === "0") {
      const result = await ManagerService.searchManager(info);
      ctx.response.body = result;
    } else {
      ctx.response.body = "无权限";
    }
  }

  // async avatarInfo(ctx, next) {
  //   try {
  //     const { userId } = ctx.request.params;
  //     const { type } = ctx.request.query;
  //     const result = await FileService.getAvatarByUserId(userId);
  //     const mimetype = result[0].mimetype;
  //     let filename = result[0].filename;

  //     const types = ["large", "middle", "small"];
  //     if (types.some((item) => type === item)) {
  //       filename = filename + "-" + type;
  //     }

  //     ctx.response.set("content-type", mimetype);
  //     ctx.response.set("Cache-Control", "max-age=300")
  //     ctx.response.body = fs.createReadStream(AVATAR_PATH + "/" + filename);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}

module.exports = new ManagerController();
