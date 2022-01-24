const path = require("path");
const Jimp = require("jimp");
const {
  AVATAR_PATH,
  PICTURE_PATH,
  SWIPER_PATH,
  FLOWER_IMG_PATH,
  LABEL_IMG_PATH
} = require("../constants/file-path");
const multer = require("koa-multer");

// 1. 上传头像中间件
const avatarUpload = multer({
  dest: AVATAR_PATH,
});

const avatarHandler = avatarUpload.single("avatar");

// 2. 上传动态配图中间件
const pictureUpload = multer({
  dest: PICTURE_PATH,
});

const pictureHandler = pictureUpload.array("picture", 10); // 最多上传10个文件

// 3. 上传轮播图中间件
const swiperUpload = multer({
  dest: SWIPER_PATH,
});

const swiperHandler = swiperUpload.array("swiper", 10);

// 4. 上传flower配图中间件
const flowerImgUpload = multer({
  dest: FLOWER_IMG_PATH,
});

const flowerImgHandler = flowerImgUpload.array("flower", 10);

// 5. 上传标签配图中间件
const labelImgUpload = multer({
  dest: LABEL_IMG_PATH
})

const labelImgHandler = labelImgUpload.single("label");

// 5. 上传图片处理中间件
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
  swiperHandler,
  flowerImgHandler,
  labelImgHandler
};
