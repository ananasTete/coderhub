const connections = require("../app/database");

class FlowerService {
  // 添加flower信息
  async addFlower(flowerInfo) {
    const { name, price, oldPrice, soldCount, material, language } = flowerInfo;
    const sql = `INSERT INTO flower (name, price, oldPrice, soldCount, material, language) VALUES (?, ?, ?, ?, ?, ?)`;
    const result = await connections.execute(sql, [
      name,
      price,
      oldPrice,
      soldCount,
      material,
      language,
    ]);
    console.log(result);
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
    const sql = `SELECT
      f.*, 
    IF
      ( la.id, JSON_ARRAYAGG( la.NAME ), NULL ) labels 
    FROM
    flower f
    LEFT JOIN flower_label fl ON fl.flower_id = f.id
    LEFT JOIN label la ON fl.label_id = la.id 
    GROUP BY f.id`;
    const result = await connections.execute(sql);
    return result[0];
  }

  // 获取所有匹配的flower
  async searchFlower(q) {
    q = `%${q}%`;
    const sql = `
    SELECT
      f.*,
      IF(la.id, JSON_ARRAYAGG(JSON_OBJECT('id', la.id, 'name', la.name)) , NULL) labels
    FROM
      flower f
    LEFT JOIN flower_label fl ON fl.flower_id = f.id
    LEFT JOIN label la ON fl.label_id = la.id
    WHERE f.name like ? OR f.material like ?  OR f.language like ? OR la.name LIKE ?
    GROUP BY f.id;`;
    const result = await connections.execute(sql, [q, q, q, q]);
    return result[0];
  }

  // 给flower添加标签
  async addLabel(flowerId, labelId) {
    const sql = `INSERT INTO flower_label (flower_id, label_id) VALUES (?, ?);`;
    const result = await connections.execute(sql, [flowerId, labelId]);
    return result[0];
  }

  // 根据id获取flower信息
  async getFlowerById(flowerId) {
    const sql = `
    SELECT
      f.id, f.name, f.price, f.oldPrice, f.soldCount, f.material, f.language, f.createAt, f.updateAt, f.img_url,
      IF(c.id, JSON_ARRAYAGG(JSON_OBJECT('id', c.id, 'content', c.content, 'userId', c.user_id, 'commentId', c.comment_id, 'updateTime', c.updateAt)), null) comment,
      JSON_OBJECT('id', u.id, 'name', u.name, 'avatar_url', u.avatar_url) user
    FROM
      flower f
    LEFT JOIN comment c ON c.flower_id = f.id
    LEFT JOIN user u ON u.id = c.user_id
    WHERE f.id = ?
    GROUP BY f.id`;
    const result = await connections.execute(sql, [flowerId]);
    return result[0];
  }

  // 编辑商品信息
  async editFlowerById(id, newInfo) {
    const { name, price, oldPrice, soldCount, material, language } = newInfo;
    const sql = `UPDATE flower f SET name =?, price=?, oldPrice=?, soldCount=?, material=?, language=? WHERE f.id = ?`;
    const result = await connections.execute(sql, [
      name,
      price,
      oldPrice,
      soldCount,
      material,
      language,
      id,
    ]);
    return result[0];
  }

  // 删除商品信息
  async deleteFlowerById(id) {
    const sql = `DELETE FROM flower f WHERE f.id = ?`;
    const result = await connections.execute(sql, [id]);
    return result[0];
  }

  // 搜索商品
  async searchFlowerByOptions(options) {
    let {
      name,
      price,
      priceH,
      oldPrice,
      oldPriceH,
      soldCount,
      soldCountH,
      language,
      material,
      label,
    } = options;
    name = name ? `%${name}%` : "不匹配";
    language = language ? `%${language}%` : "不匹配";
    material = material ? `%${material}%` : "不匹配";
    const sql = `SELECT
      f.*,
      IF
        ( la.id, JSON_ARRAYAGG( la.NAME ), NULL ) labels,
      IF
        ( ca.id, JSON_OBJECT( 'id', ca.id, 'name', ca.NAME ), NULL ) category 
      FROM
        flower f
      LEFT JOIN flower_label fl ON fl.flower_id = f.id
      LEFT JOIN label la ON fl.label_id = la.id
      LEFT JOIN category ca ON ca.id = la.category_id
      WHERE (f.name LIKE ?) OR (f.price BETWEEN ? AND ?) OR (f.oldPrice BETWEEN ? AND ?) OR (f.soldCount BETWEEN ? AND ?) OR (f.language LIKE ?) OR (f.material LIKE ?)	OR (la.name = ?)
      GROUP BY
      f.id;`;
    const result = await connections.execute(sql, [
      name,
      price,
      priceH,
      oldPrice,
      oldPriceH,
      soldCount,
      soldCountH,
      language,
      material,
      label,
    ]);
    return result[0];
  }
}

module.exports = new FlowerService();
