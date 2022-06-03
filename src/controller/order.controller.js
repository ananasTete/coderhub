const orderService = require("../service/order.service");

class OrderController {
  async pay(ctx, next) {
    const orderList = ctx.request.body;
    orderList.forEach(async (item) => {
      item.status = 0;
      await orderService.pay(item);
    });
    ctx.body = "成功";
  }

  async getOrders(ctx, next) {
    const result = await orderService.getOrders();
    ctx.body = result;
  }

  async confirm(ctx, next) {
    const { id } = ctx.request.body;
    console.log(id);
    await orderService.confirm(id);
    ctx.body = "成功"
  }
}

module.exports = new OrderController();
