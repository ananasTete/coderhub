const Router = require("koa-router");
const {
  saveAvatarInfo,
  savePictureInfo,
} = require("../controller/file.controller");
const { verifyAuth } = require("../middleware/auth.middleware");
const {
  avatarHandler,
  pictureHandler,
  pictureResize
} = require("../middleware/file.middleware");

const router = new Router({
  prefix: "/upload",
});

// 上传头像
router.post("/avatar", verifyAuth, avatarHandler, pictureResize, saveAvatarInfo);

// 上传动态配图
router.post("/picture", verifyAuth, pictureHandler, pictureResize, savePictureInfo);

module.exports = router;
