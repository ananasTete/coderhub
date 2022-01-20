const Router = require("koa-router");
const { login } = require("../controller/auth.controller");
const { verifyLogin } = require("../middleware/auth.middleware");

const router = new Router({
  prefix: "/login",
});

// 用户登录
router.post("/", verifyLogin, login);

module.exports = router;
