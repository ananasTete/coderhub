const Router = require("koa-router");
const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/auth.middleware");
const { verifyExists } = require("../middleware/label.middleware");
const {
  create,
  getSingleTrend,
  getTrendList,
  updateSingleTrend,
  deleteSingleTrend,
  addLabels,
  fileInfo
} = require("../controller/trend.controller");

const router = new Router({
  prefix: "/trend",
});

// 发布动态
router.post("/", verifyAuth, create);

// 获取单条动态
router.get("/:trendId", getSingleTrend);

// 获取动态列表
router.get("/", getTrendList);

// 修改动态
router.patch("/:trendId", verifyAuth, verifyPermission, updateSingleTrend);

// 删除单条动态
router.delete("/:trendId", verifyAuth, verifyPermission, deleteSingleTrend);

// 给动态添加标签
router.post("/:trendId/labels", verifyAuth, verifyPermission, verifyExists, addLabels);

// 获取动态图片
router.get("/images/:filename", fileInfo);

module.exports = router;
