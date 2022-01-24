const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const { createCategory, createLabel, list, getLabelImg, getCategory } = require("../controller/category.controller");

const router = new Router({
  prefix: "/category",
});

// 创建分类
router.post('/', verifyAuth, createCategory)

// 创建标签
router.post("/:categoryId/label", verifyAuth, createLabel);

// 获取标签配图接口
router.get("/label/:labelId/img", getLabelImg);

// 请求分类信息接口
router.get("/label/list", list)

module.exports = router;
