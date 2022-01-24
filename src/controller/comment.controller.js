const CommentService = require("../service/comment.service");

class CommentController {
  async getListByFlowerId(ctx, next) {
    const { flowerId } = ctx.request.query;
    const result = await CommentService.getListByFlowerId(flowerId);
    ctx.response.body = result;
  }

  async create(ctx, next) {
    const { flowerId, content } = ctx.request.body;
    const { id: userId } = ctx.request.user;
    const result = await CommentService.create(content, flowerId, userId);
    ctx.response.body = result;
  }

  async reply(ctx, next) {
    const { commentId } = ctx.request.params;
    const { flowerId, content } = ctx.request.body;
    const { id: userId } = ctx.request.user;
    const result = await CommentService.reply(
      content,
      flowerId,
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
