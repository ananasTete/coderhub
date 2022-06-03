const context = require("koa/lib/context");
const connections = require("../app/database");

class CategoryService {
  // 创建分类
  async createCategory(name) {
    const sql = `INSERT INTO category (name) VALUES (?);`;
    const result = await connections.execute(sql, [name]);
    return result[0];
  }

  // 创建标签
  async createLabel(name, categoryId) {
    const sql = `INSERT INTO label (name, category_id) VALUES (?, ?);`;
    const result = await connections.execute(sql, [name, categoryId]);
    return result[0];
  }

  // 验证分类或标签是否存在
  async verifyExists(tableName, name) {
    const sql = `SELECT * FROM ${tableName} WHERE name = ?;`;
    const result = await connections.execute(sql, [name]);
    return result[0];
  }

  // 在flower_label表设置flower的label
  async setFlowerLabel(flowerId, labelId) {
    const sql = `INSERT INTO flower_label (flower_id, label_id) VALUES (?, ?)`;
    const result = await connections.execute(sql, [flowerId, labelId]);
    return result[0];
  }

  // 验证flower和label的记录是否存在是否存在
  async verifyFlowerLabel(flowerId, labelId) {
    const sql = `SELECT * FROM flower_label WHERE flower_id = ? AND label_id = ?`;
    const result = await connections.execute(sql, [flowerId, labelId]);
    return result[0];
  }

  // 查询标签列表
  async list() {
    const sql = `SELECT
      c.id,
      c.name,
      JSON_ARRAYAGG(JSON_OBJECT('id', l.id, 'name', l.name, 'imgUrl', l.img_url, 'categoryId', l.category_id))labels
    FROM
      category c
    LEFT JOIN 
      label l ON l.category_id = c.id
    GROUP BY c.id;`;
    const result = await connections.execute(sql);
    return result[0];
  }

  // 更新标签中img_url字段
  async updateImgUrlByLabelId(imgUrl, labelId) {
    const sql = `UPDATE label SET img_url = ? WHERE id = ?;`;
    const result = await connections.execute(sql, [imgUrl, labelId]);
    return result[0];
  }

  // 由标签id获取标签配图信息
  async getLabelImgByLabelId(labelId) {
    const sql = `SELECT * FROM labelimg WHERE label_id = ?;`;
    const result = await connections.execute(sql, [labelId]);
    return result[0];
  }

  // 获取分类信息
  async getCategory() {
    const sql = `SELECT`;
  }

  // 根据类别id请求flower信息
  async search(id) {
    const sql = `
    SELECT
      f.id, f.name, f.price, f.oldPrice, f.soldCount, f.material, f.language, f.createAt, f.updateAt, f.img_url,
      IF(c.id, JSON_ARRAYAGG(JSON_OBJECT('id', c.id, 'content', c.content, 'userId', c.user_id, 'commentId', c.comment_id, 'updateTime', c.updateAt)), null) comment,
      JSON_OBJECT('id', u.id, 'name', u.name, 'avatar_url', u.avatar_url) user
    FROM
      flower_label fl
    LEFT JOIN flower f ON f.id = fl.flower_id
    LEFT JOIN comment c ON c.flower_id = f.id
    LEFT JOIN user u ON u.id = c.user_id
    WHERE fl.label_id = ?
    GROUP BY f.id`;
    const result = await connections.execute(sql, [id]);
    return result[0];
  }
}

module.exports = new CategoryService();
