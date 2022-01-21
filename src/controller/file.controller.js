const fs = require("fs");
const path = require("path");

const fileService = require("../service/file.service");
const userService = require("../service/user.service");
const flowerService = require("../service/flower.service");

const { APP_HOST, APP_PORT } = require("../app/config");

class FileController {
  // 保存头像信息中间件
  async saveAvatarInfo(ctx, next) {
    const { filename, mimetype, size } = ctx.req.file;
    const { id: userId } = ctx.request.user;

    // 将解析图片的信息保存到avatar表
    const result = await fileService.getAvatarByUserId(userId);
    if (result.length > 0) {
      for (const avatar of result) {
        await fs.unlink(`./uploads/avatar/${avatar.filename}`, (err) => {
          if (err) throw err;
          console.log("删除文件成功!");
        });
      }
    }
    await fileService.deleteAvatarById(userId);
    await fileService.saveAvatarInfo(filename, mimetype, size, userId);

    // 更新user表中avatar_url字段
    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${userId}/avatar`;
    await userService.updateAvatarUrlById(avatarUrl, userId);

    ctx.response.body = "上传头像成功";
  }

  // 保存动态配图信息中间件
  async savePictureInfo(ctx, next) {
    console.log(ctx.req.files);

    const { trendId } = ctx.request.query;
    const { id: userId } = ctx.request.user;
    const files = ctx.req.files;
    for (const file of files) {
      const { filename, mimetype, size } = file;
      await fileService.savePictureInfo(
        filename,
        mimetype,
        size,
        trendId,
        userId
      );
    }
    ctx.response.body = ctx.req.files;
  }

  // 保存轮播图中间件
  async saveSwiperInfo(ctx, next) {
    const files = ctx.req.files;
    for (const file of files) {
      const { filename, mimetype, size } = file;
      await fileService.saveSwiperInfo(filename, mimetype, size);
    }
    ctx.response.body = "上传轮播图成功";
  }

  // 保存flower配图信息中间件
  async saveFlowerImgInfo(ctx, next) {
    const { flowerId } = ctx.request.params;
    const files = ctx.req.files;
    for (const file of files) {
      let { filename, mimetype, size } = file;
      await fileService.saveFlowerImgInfo(filename, mimetype, size, flowerId);

      mimetype = mimetype.replace("/", "2");
      const imgUrl = `#${APP_HOST}:${APP_PORT}/flower/img/${filename}/${mimetype}`;
      await flowerService.updateImgUrlByFlowerId(imgUrl, flowerId);
    }
    ctx.response.body = "上传轮播图成功";
  }
}

module.exports = new FileController();
