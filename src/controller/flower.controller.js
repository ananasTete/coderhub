const fs = require("fs");
const { FLOWER_IMG_PATH } = require("../constants/file-path");
const categoryService = require("../service/category.service");
const FlowerService = require("../service/flower.service");

class FlowerController {
  async addFlower(ctx, next) {
    const { permission } = ctx.request.user;
    if (permission === "0" || permission === "1") {
      const flowerInfo = ctx.request.body;
      const { labels } = flowerInfo;
      const newFlower = await FlowerService.addFlower(flowerInfo);
      labels.forEach(async (item) => {
        const labelInfo = await categoryService.verifyExists("label", item);
        if (labelInfo.length > 0) {
          await categoryService.setFlowerLabel(
            newFlower.insertId,
            labelInfo[0].id
          );
        }
      });
      ctx.response.body = "添加成功";
    } else {
      ctx.response.body = "无权限";
    }
  }

  // 获取单张flower配图
  async getFlowerImg(ctx, next) {
    try {
      let { filename, mimetype } = ctx.request.params;
      mimetype = mimetype.replace("2", "/");
      ctx.response.set("content-type", mimetype);
      ctx.response.set("Cache-Control", "max-age=300");
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
      });
      ctx.response.body = result;
    } catch (error) {
      console.log(error);
    }
  }

  // 搜索所有匹配的flower
  async searchFlower(ctx, next) {
    try {
      const { q } = ctx.request.query;
      const result = await FlowerService.searchFlower(q);
      result.forEach((item) => {
        item.img_url = item.img_url.split(" ");
        item.img_url.shift();
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
    await FlowerService.addLabel(flowerId, labelId);
    ctx.response.body = "flower添加标签成功";
  }

  // 根据flowerId获取flower信息
  async getFlowerById(ctx, next) {
    try {
      const { flowerId } = ctx.request.params;
      const result = await FlowerService.getFlowerById(flowerId);
      const flowerInfo = result[0];
      flowerInfo.img_url = flowerInfo.img_url.split(" ");
      flowerInfo.img_url.shift();
      ctx.response.body = flowerInfo;
    } catch (error) {
      console.log(error);
    }
  }

  async editFlowerById(ctx, next) {
    try {
      const { permission } = ctx.request.user;
      if (permission === "0" || permission === "1") {
        const { flowerId } = ctx.request.params;
        const newInfo = ctx.request.body;
        await FlowerService.editFlowerById(flowerId, newInfo);
        const { labels } = newInfo;
        labels.forEach(async (item) => {
          const labelInfo = await categoryService.verifyExists("label", item);
          if (labelInfo.length > 0) {
            const isExits = await categoryService.verifyFlowerLabel(
              flowerId,
              labelInfo[0].id
            );
            if (isExits.length === 0) {
              await categoryService.setFlowerLabel(flowerId, labelInfo[0].id);
            }
          }
        });
        ctx.response.body = "修改成功";
      } else {
        ctx.response.body = "无权限";
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteFlowerById(ctx, next) {
    try {
      const { permission } = ctx.request.user;
      if (permission === "0" || permission === "1") {
        const { flowerId } = ctx.request.params;
        await FlowerService.deleteFlowerById(flowerId);
        ctx.response.body = "删除成功";
      } else {
        ctx.response.body = "无权限";
      }
    } catch (error) {
      console.log(error);
    }
  }

  async searchFlowerByOptions(ctx, next) {
    try {
      const options = ctx.request.body;
      console.log(options);
      const result = await FlowerService.searchFlowerByOptions(options);
      result.forEach((item) => {
        item.img_url = item.img_url.split(" ");
        item.img_url.shift();
      });
      ctx.response.body = result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new FlowerController();
