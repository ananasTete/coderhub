const Router = require("koa-router");
const { login, managerLogin } = require("../controller/auth.controller");
const { verifyLogin, verifyLoginManager } = require("../middleware/auth.middleware");

const router = new Router({
  prefix: "/login",
});

// 用户登录
router.post("/", verifyLogin, login);

// 管理员登陆
router.post("/manager", verifyLoginManager, managerLogin)

module.exports = router;
