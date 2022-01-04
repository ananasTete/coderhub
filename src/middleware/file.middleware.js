const path = require("path");

const Jimp = require("jimp");

const { AVATAR_PATH, PICTURE_PATH } = require("../constants/file-path");
const multer = require("koa-multer");

// 头像
const avatarUpload = multer({
  dest: AVATAR_PATH,
});

const avatarHandler = avatarUpload.single("avatar");

// 动态配图
const pictureUpload = multer({
  dest: PICTURE_PATH,
});

const pictureHandler = pictureUpload.array("picture", 12); // 最多上传10个文件

// 上传图片处理
async function pictureResize(ctx, next) {
  console.log(ctx.req.file);
  console.log(ctx.req.files);
  const file = ctx.req.file;
  const files = ctx.req.files;
  if (file) {
    // 单图片处理
    try {
      const destPath = path.join(file.destination, file.filename);
      Jimp.read(file.path).then((image) => {
        image.resize(1280, Jimp.AUTO).write(`${destPath}-large`);
        image.resize(640, Jimp.AUTO).write(`${destPath}-middle`);
        image.resize(320, Jimp.AUTO).write(`${destPath}-small`);
      });
    } catch (error) {
      console.log(error);
    }
  } else if (files) {
    // 多图片处理
    try {
      for (const file of files) {
        const destPath = path.join(file.destination, file.filename);
        Jimp.read(file.path).then((image) => {
          image.resize(1280, Jimp.AUTO).write(`${destPath}-large`);
          image.resize(640, Jimp.AUTO).write(`${destPath}-middle`);
          image.resize(320, Jimp.AUTO).write(`${destPath}-small`);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  await next();
}

module.exports = {
  avatarHandler,
  pictureHandler,
  pictureResize,
};
