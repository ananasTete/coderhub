const Router = require("koa-router");
const {
  verifyUser,
  handlePassword,
} = require("../middleware/manager.middleware");
const {
  register,
  getAllManager,
  editManager,
  deleteManager,
  searchManager,
} = require("../controller/manager.controller");
const { verifyAuth } = require("../middleware/auth.middleware");

const router = new Router({ prefix: "/manager" });

// 管理员注册
router.post("/", verifyUser, handlePassword, register);

// 请求所有的管理员
router.get("/", verifyAuth, getAllManager);

// 编辑管理员
router.post("/:managerId/edit", verifyAuth, handlePassword, editManager);

// 删除管理员
router.delete("/:managerId/delete", verifyAuth, deleteManager);

// 搜索管理员
router.post("/search", verifyAuth, searchManager);

module.exports = router;
