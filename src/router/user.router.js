const Router = require("koa-router");
const { verifyUser, handlePassword } = require("../middleware/user.middleware");
const { register, avatarInfo } = require("../controller/user.controller");
const { verifyAuth } = require("../middleware/auth.middleware");

const router = new Router({ prefix: "/users" });

// 用户注册
router.post("/", verifyUser, handlePassword, register);

// 获取用户头像
router.get("/:userId/avatar", avatarInfo);

module.exports = router;
