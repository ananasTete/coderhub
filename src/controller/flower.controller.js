const FlowerService = require('../service/flower.service')

class FlowerController {
  async addFlower(ctx, next) {
    const flowerInfo = ctx.request.body;
    const result = await FlowerService.addFlower(flowerInfo)
    ctx.response.body = result
  }
}

module.exports = new FlowerController()