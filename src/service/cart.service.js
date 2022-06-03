const connections = require("../app/database");

class CartService {
  // 判断购物车中是否有该商品
  async hasCartInfo(userId, shopId) {
    const sql = `SELECT * FROM cart c WHERE c.userId = ? AND c.shopId = ?`;
    const result = await connections.execute(sql, [userId, shopId]);
    return result[0].length > 0 ? true : false;
  }
  // 根据userId, shopId更新购物车中的商品
  async updateCartInfo(cartInfo) {
    const sql = `UPDATE cart c SET c.count = ? WHERE c.userId = ? AND c.shopId = ?`;
    const result = await connections.execute(sql, [
      cartInfo.count,
      cartInfo.userId,
      cartInfo.shopId,
    ]);
    return result[0];
  }
  // 向购物车中添加商品
  async addCartInfo(cartInfo) {
    const sql = `INSERT INTO cart (userId, shopId, name, price, count, isChecked, img_url) VALUES (?, ?, ?, ?, ?, ?, ?);`;
    const result = await connections.execute(sql, [...Object.values(cartInfo)]);
    return result[0];
  }
  // 根据userId请求购物车数据
  async getCartInfoById(userId) {
    try {
      const sql = `SELECT userId, shopId, name, price, count, isChecked, img_url FROM cart WHERE userId = ?`;
      const result = await connections.execute(sql, [userId]);
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new CartService();
