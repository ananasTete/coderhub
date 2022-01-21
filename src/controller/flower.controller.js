const fs = require("fs");
const { FLOWER_IMG_PATH } = require("../constants/file-path");
const FlowerService = require("../service/flower.service");

class FlowerController {
  async addFlower(ctx, next) {
    const flowerInfo = ctx.request.body;
    const result = await FlowerService.addFlower(flowerInfo);
    ctx.response.body = result;
  }

  // 获取单张flower配图
  async getFlowerImg(ctx, next) {
    try {
      let { filename, mimetype } = ctx.request.params;
      mimetype = mimetype.replace("2", "/");
      ctx.response.set("content-type", mimetype);
      ctx.response.body = fs.createReadStream(FLOWER_IMG_PATH + "/" + filename);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new FlowerController();
