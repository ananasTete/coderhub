const connections = require("../app/database");

class FlowerService {
  // 添加flower信息
  async addFlower(flowerInfo) {
    const { name, price, oldPrice, soldCount, material, language } = flowerInfo;
    const sql = `INSERT INTO flower (name, price, oldPrice, soldCount, material, language) VALUES (?, ?, ?, ?, ?, ?)`;
    const result = connections.execute(sql, [
      name,
      price,
      oldPrice,
      soldCount,
      material,
      language,
    ]);
    return result[0];
  }

  // 给flower添加img_url字段
  async updateImgUrlByFlowerId(imgUrl, userId) {
    const sql = `UPDATE flower SET img_url = ? WHERE id = ?;`;
    const result = await connections.execute(sql, [imgUrl, userId]);
    return result[0];
  }
}

module.exports = new FlowerService();
