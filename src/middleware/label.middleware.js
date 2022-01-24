const categoryService = require("../service/category.service");

async function  verifyExists(ctx, next) {
  const { labels } = ctx.request.body;

  const labelsId = [];
  for (const label of labels) {
    const result = await categoryService.verifyExists(label);
    if (result.length > 0) {
      // 存在，将id放入数组
      labelsId.push(result[0].id);
    } else {
      // 不存在，创建新标签，将id放入数组
      const result = await categoryService.create(label);
      labelsId.push(result.insertId);
    }
  }
  ctx.request.labelsId = labelsId;
  await next();
}

module.exports = {
  verifyExists,
};
