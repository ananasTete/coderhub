const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const {
  addFlower,
  getFlowerImg,
  getAllFlower,
  addLabel,
  searchFlower,
  getFlowerById,
  editFlowerById,
  deleteFlowerById,
  searchFlowerByOptions,
} = require("../controller/flower.controller");

const router = new Router({ prefix: "/flower" });

// 添加flower
router.post("/", verifyAuth, addFlower);

// 获取所有的flower信息
router.get("/", getAllFlower);

// 获取所以匹配的flower
router.get("/search", searchFlower);

// 获取flower单张配图
router.get("/img/:filename/:mimetype", getFlowerImg);

// 给flower设置标签接口
router.post("/:flowerId/label", verifyAuth, addLabel);

// 根据id获取flower信息及其评论信息
router.get("/:flowerId", getFlowerById);

// 编辑商品
router.post("/:flowerId/edit", verifyAuth, editFlowerById);

// 删除商品
router.delete("/:flowerId/delete", verifyAuth, deleteFlowerById);

// 通过字段搜索商品
router.post("/options/search", searchFlowerByOptions);

module.exports = router;
