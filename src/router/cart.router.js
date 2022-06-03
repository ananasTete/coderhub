const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const { uploadCart } = require("../controller/cart.controller");

const router = new Router({
  prefix: "/cart",
});

// 上传购物车数据
router.post("/", verifyAuth, uploadCart);

module.exports = router;
