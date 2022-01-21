const fs = require("fs");
const { APP_PATH } = require("../app/config");
const { SWIPER_PATH } = require("../constants/file-path");
const frontpageService = require("../service/frontpage.service");

class FrontpageController {
  async swiperInfo(ctx, next) {
    const filenames = await frontpageService.getSwiperInfo();
    const swiperArray = filenames.map((item) => {
      const mimetype = item.mimetype.replace("/", "2");
      return `${APP_PATH}/frontpage/swiper/${item.filename}/${mimetype}`;
    });
    ctx.response.body = swiperArray;
  }

  async singleSwiperInfo(ctx, next) {
    try {
      const type = ctx.request.query.type;
      let { filename, mimetype } = ctx.request.params;

      const types = ["large", "middle", "small"];
      if (types.some((item) => type === item)) {
        filename = filename + "-" + type;
      }

      mimetype = mimetype.replace("2", "/");
      ctx.response.set("content-type", mimetype);
      ctx.response.body = fs.createReadStream(SWIPER_PATH + "/" + filename);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new FrontpageController();
