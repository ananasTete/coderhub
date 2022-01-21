const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const { addFlower, getFlowerImg, getAllFlower } = require("../controller/flower.controller");

const router = new Router({ prefix: "/flower" });

// 添加flower
router.post("/", verifyAuth, addFlower);

// 获取所有的flower信息
router.get("/", getAllFlower)

// 获取flower单张配图
router.get('/img/:filename/:mimetype', getFlowerImg)

module.exports = router;
