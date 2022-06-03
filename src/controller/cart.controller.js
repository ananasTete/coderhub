const {
  addCartInfo,
  hasCartInfo,
  updateCartInfo,
} = require("../service/cart.service.js");

class CartController {
  // 上传商品到购物车
  async uploadCart(ctx, next) {
    try {
      const { cartInfo } = ctx.request.body;
      const hasCart = await hasCartInfo(cartInfo.userId, cartInfo.shopId);
      if (hasCart) {
        // 更新数据
        await updateCartInfo(cartInfo);
      } else {
        // 添加数据;
        await addCartInfo(cartInfo);
      }
      ctx.response.body = "上传成功";
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new CartController();
