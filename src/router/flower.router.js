const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const { addFlower } = require("../controller/flower.controller");

const router = new Router({ prefix: "/flower" });

// 添加flower
router.post("/", verifyAuth, addFlower);

module.exports = router;
