const orderService = require("../service/order.service");
const FlowerService = require("../service/flower.service");

class OrderController {
  async pay(ctx, next) {
    const orderList = ctx.request.body;
    orderList.forEach(async (item) => {
      item.status = 0;
      await orderService.pay(item);
    });
    ctx.body = "成功";
  }

  async putGoods(ctx, next) {
    const { id } = ctx.request.params;
    const result = await orderService.confirm(id);
    console.log(result);
    ctx.body = result;
  }

  async getOrders(ctx, next) {
    const result = await orderService.getOrders();
    ctx.body = result;
  }

  async confirm(ctx, next) {
    const { id } = ctx.request.body;
    await orderService.confirm(id);
    await next();
  }

  async updateCount(ctx, next) {
    const { id } = ctx.request.body;
    const flower = await orderService.getOrderById(id);
    if (flower.length > 0) {
      await FlowerService.updateSoldCount(flower[0].id, flower[0].count);
    }
    ctx.body = "成功";
  }
}

module.exports = new OrderController();
