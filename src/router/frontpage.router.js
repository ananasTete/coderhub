const Router = require("koa-router");
const { swiperInfo, singleSwiperInfo } = require("../controller/frontpage.controller");

const router = new Router({ prefix: "/frontpage" });

// 客户端获取全部轮播图
router.get('/swiper', swiperInfo)

// 获取单张轮播图
router.get("/swiper/:filename/:mimetype", singleSwiperInfo);

module.exports = router