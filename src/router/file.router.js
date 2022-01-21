const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const {
  avatarHandler,
  pictureHandler,
  swiperHandler,
  pictureResize
} = require("../middleware/file.middleware");
const {
  saveAvatarInfo,
  savePictureInfo,
  saveSwiperInfo
} = require("../controller/file.controller");

// 上传图片路由
const router = new Router({
  prefix: "/upload",
});

// 上传头像
router.post("/avatar", verifyAuth, avatarHandler, pictureResize, saveAvatarInfo);

// 上传动态配图
router.post("/picture", verifyAuth, pictureHandler, pictureResize, savePictureInfo);

// 上传轮播图
router.post("/swiper", swiperHandler, pictureResize, saveSwiperInfo)

module.exports = router;
