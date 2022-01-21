const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const { addFlower, getFlowerImg } = require("../controller/flower.controller");

const router = new Router({ prefix: "/flower" });

// 添加flower
router.post("/", verifyAuth, addFlower);

// 获取flower单张配图
router.post('/img/:filename/:mimetype', getFlowerImg)

module.exports = router;
