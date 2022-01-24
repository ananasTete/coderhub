const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const {
  avatarHandler,
  pictureHandler,
  swiperHandler,
  flowerImgHandler,
  labelImgHandler,
  pictureResize
} = require("../middleware/file.middleware");
const {
  saveAvatarInfo,
  savePictureInfo,
  saveSwiperInfo,
  saveFlowerImgInfo,
  saveLabelImgInfo
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
router.post("/swiper", swiperHandler, saveSwiperInfo)

// 上传flower配图
router.post('/flower/:flowerId/img', verifyAuth, flowerImgHandler, saveFlowerImgInfo)

// 上传标签配图
router.post('/label/:labelId/img', verifyAuth, labelImgHandler, saveLabelImgInfo)

module.exports = router;
