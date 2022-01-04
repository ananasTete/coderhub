const Router = require("koa-router");
const { list, create, reply, remove } = require("../controller/comment.controller");
const { verifyAuth, verifyPermission } = require("../middleware/auth.middleware");

const router = new Router({
  prefix: "/comment",
});

// 获取评论列表
router.get("/", list)

// 发布评论
router.post("/", verifyAuth, create);

// 回复评论
router.post("/:commentId/reply", verifyAuth, reply);

// 删除评论
router.delete("/:commentId", verifyAuth, verifyPermission, remove);

module.exports = router;
