const connections = require("../app/database");

class FlowerService {
  async      addFlower(flowerInfo) {
    const { name, price, oldPrice, soldCount, material, language } = flowerInfo;
    const sql = `INSERT INTO flower (name, price, oldPrice, soldCount, material, language) VALUES (?, ?, ?, ?, ?, ?)`
    const result = connections.execute(sql, [name, price, oldPrice, soldCount, material, language])
    return result[0]
  }
}

module.exports = new FlowerService();
