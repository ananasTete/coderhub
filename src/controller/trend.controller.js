const fs = require("fs");

const fileService = require("../service/file.service");
const trendService = require("../service/trend.service");

const { PICTURE_PATH } = require("../constants/file-path");

class trendController {
  async create(ctx, next) {
    const content = ctx.request.body.content;
    const userId = ctx.request.user.id;
    const result = await trendService.create(content, userId);
    ctx.response.body = result;
  }

  async getSingleTrend(ctx, next) {
    const { trendId } = ctx.request.params;
    const result = await trendService.getSingleTrend(trendId);
    ctx.response.body = result;
  }

  async getTrendList(ctx, next) {
    const { offset, size } = ctx.request.query;
    const result = await trendService.getTrendList(offset, size);
    ctx.response.body = result;
  }

  async deleteSingleTrend(ctx, next) {
    const { trendId } = ctx.request.params;
    const result = await trendService.deleteSingleTrend(trendId);
    ctx.response.body = result;
  }

  async updateSingleTrend(ctx, next) {
    const content = ctx.request.body.content;
    const { trendId } = ctx.request.params;
    const result = await trendService.updateSingleTrend(content, trendId);
    ctx.response.body = result;
  }

  async addLabels(ctx, next) {
    const { trendId } = ctx.request.params;
    const labelsId = ctx.request.labelsId;
    for (const labelId of labelsId) {
      // 判断动态是否已经存在该标签
      const hasLabel = await trendService.hasLabel(trendId, labelId);
      if (!hasLabel) {
        // 不存在则添加该标签
        const result = await trendService.addLabels(trendId, labelId);
      }
    }
    ctx.response.body = "给动态添加标签成功";
  }

  async fileInfo(ctx, next) {
    try {
      let { filename } = ctx.request.params;
      const { type } = ctx.request.query;
      const result = await fileService.getFileByFileName(filename);
      const mimetype = result[0].mimetype;

      const types = ["large", "middle", "small"];
      if (types.some((item) => type === item)) {
        filename = filename + "-" + type;
        console.log(filename);
      }

      ctx.response.set("content-type", mimetype);
      ctx.response.body = fs.createReadStream(PICTURE_PATH + "/" + filename);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new trendController();
