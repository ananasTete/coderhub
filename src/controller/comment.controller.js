const CommentService = require("../service/comment.service");

class CommentController {
  async list(ctx, next) {
    const { trendId } = ctx.request.query;
    console.log({ trendId });
    const result = await CommentService.list(trendId);
    ctx.response.body = result;
  }

  async create(ctx, next) {
    const { trendId, content } = ctx.request.body;
    const { id: userId } = ctx.request.user;
    const result = await CommentService.create(content, trendId, userId);
    ctx.response.body = result;
  }

  async reply(ctx, next) {
    const { commentId } = ctx.request.params;
    const { trendId, content } = ctx.request.body;
    const { id: userId } = ctx.request.user;
    const result = await CommentService.reply(
      content,
      trendId,
      userId,
      commentId
    );
    ctx.response.body = result;
  }

  async remove(ctx, next) {
    const { commentId: id } = ctx.request.params;
    const result = await CommentService.remove(id);
    ctx.response.body = result;
  }
}

module.exports = new CommentController();
