const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const { addFlower, getFlowerImg, getAllFlower, addLabel } = require("../controller/flower.controller");

const router = new Router({ prefix: "/flower" });

// 添加flower
router.post("/", verifyAuth, addFlower);

// 获取所有的flower信息
router.get("/", getAllFlower)

// 获取flower单张配图
router.get('/img/:filename/:mimetype', getFlowerImg)

// 给flower设置标签接口
router.post('/:flowerId/label', verifyAuth, addLabel)

module.exports = router;
