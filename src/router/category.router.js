const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const {
  createCategory,
  createLabel,
  list,
  getLabelImg,
  getCategory,
  search,
  deleteCategory,
  deleteLabel,
} = require("../controller/category.controller");

const router = new Router({
  prefix: "/category",
});

// 创建分类
router.post("/", verifyAuth, createCategory);

// 删除分类
router.delete("/:categoryID", verifyAuth, deleteCategory);

// 创建标签
router.post("/:categoryId/label", verifyAuth, createLabel);

// 删除标签
router.delete("/label/:labelID", verifyAuth, deleteLabel);

// 获取标签配图接口
router.get("/label/:labelId/img", getLabelImg);

// 请求分类信息接口
router.get("/label/list", list);

// 根据类别id请求flower信息接口
router.get("/search", search);

module.exports = router;
