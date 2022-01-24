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
  async updateImgUrlByFlowerId(imgUrl, flowerId) {
    const sql = `UPDATE flower SET img_url = CONCAT(img_url, ?) WHERE id = ?;`;
    const result = await connections.execute(sql, [imgUrl, flowerId]);
    return result[0];
  }

  // 获取所有的flower信息
  async getAllFlower() {
    const sql = `SELECT * FROM flower`;
    const result = await connections.execute(sql);
    return result[0];
  }

  // 给flower添加标签
  async addLabel(flowerId, labelId) {
    const sql = `INSERT INTO flower_label (flower_id, label_id) VALUES (?, ?);`;
    const result = connections.execute(sql, [flowerId, labelId]);
    return result[0];
  }
}

module.exports = new FlowerService();
