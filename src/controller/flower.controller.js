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

  // 获取所有的flower信息
  async getAllFlower(ctx, next) {
    try {
      const result = await FlowerService.getAllFlower();
      result.forEach((item) => {
        item.img_url = item.img_url.split(" ");
        item.img_url.shift();
        console.log(item.img_url);
      });
      ctx.response.body = result;
    } catch (error) {
      console.log(error);
    }
  }

  // 给flower添加标签
  async addLabel(ctx, next) {
    const { flowerId } = ctx.request.params;
    const { labelId } = ctx.request.body;
    await FlowerService.addLabel(flowerId, labelId)
    ctx.response.body = "flower添加标签成功"                           
  }
}

module.exports = new FlowerController();
