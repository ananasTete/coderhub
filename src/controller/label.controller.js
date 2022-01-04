const { create } = require("../service/comment.service");
const LabelService = require("../service/label.service");

class LabelController {
  async create(ctx, next) {
    const { name } = ctx.request.body;
    const labels = await LabelService.verifyExists(name);
    if (labels.length > 0) {
      // 存在
      ctx.response.body = "标签已存在！";
    } else {
      // 不存在
      const result = await LabelService.create(name);
      ctx.response.body = result;
    }
  }

  async list(ctx, next) {
    const result = await LabelService.list();
    console.log(result);
    ctx.response.body = result;
  }
}

module.exports = new LabelController();
