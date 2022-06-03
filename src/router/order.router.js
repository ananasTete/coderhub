const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const { pay, getOrders, confirm } = require("../controller/order.controller");

const router = new Router({ prefix: "/order" });

router.post("/", verifyAuth, pay);

router.get("/", verifyAuth, getOrders);

router.post("/confirm", verifyAuth, confirm);

module.exports = router;
