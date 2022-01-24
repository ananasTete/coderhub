const fs = require('fs')
const { create } = require("../service/comment.service");
const categoryService = require("../service/category.service");
const { LABEL_IMG_PATH } = require("../constants/file-path");

class CategoryController {
  // 创建分类
  async createCategory(ctx, next) {
    const tableName = "category";
    const { name } = ctx.request.body;
    const result = await categoryService.verifyExists(tableName, name);
    if (result.length > 0) {
      // 存在
      ctx.response.body = "该分类已存在！";
    } else {
      // 不存在
      const result = await categoryService.createCategory(name);
      ctx.response.body = result;
    }
  }

  // 创建标签
  async createLabel(ctx, next) {
    const tableName = "label";
    const { categoryId } = ctx.request.params;
    const { name } = ctx.request.body;
    const result = await categoryService.verifyExists(tableName, name);
    if (result.length > 0) {
      // 存在
      ctx.response.body = "该标签已存在！";
    } else {
      // 不存在
      const result = await categoryService.createLabel(name, categoryId);
      ctx.response.body = result;
    }
  }

  // 查询标签列表
  async list(ctx, next) {
    const result = await categoryService.list();
    ctx.response.body = result;
  }

  // 获取标签配图
  async getLabelImg(ctx, next) {
    try {
      const { labelId } = ctx.request.params;
      const result = await categoryService.getLabelImgByLabelId(labelId);


      if (result.length > 0) {
        let { filename, mimetype } = result[0];
        mimetype = mimetype.replace("2", "/")
        ctx.response.set("content-type", mimetype);
        ctx.response.body = fs.createReadStream(LABEL_IMG_PATH + "/" + filename);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // 请求分类信息
  async getCategory() {
    try {
      const result = await categoryService.getCategory()
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new CategoryController();
