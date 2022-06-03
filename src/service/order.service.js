const connections = require("../app/database");

class OrderService {
  async pay(order) {
    const { userId, shopId, name, price, count, status, img_url } = order;
    const sql = `INSERT INTO orders (userId, shopId, name, price, count, status, img_url) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const result = await connections.execute(sql, [
      userId,
      shopId,
      name,
      price,
      count,
      status,
      img_url,
    ]);
    return result[0];
  }

  async getOrders() {
    const sql = `SELECT * FROM orders`;
    const result = await connections.execute(sql);
    return result[0];
  }

  async confirm(id) {
    const sql = `UPDATE orders SET status = ? WHERE id = ?`;
    const result = await connections.execute(sql, [2, id]);
    return result[0];
  }
}

module.exports = new OrderService();
