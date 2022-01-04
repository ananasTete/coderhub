const connections = require("../app/database");

class trendService {
  async create(content, userId) {
    const sql = `INSERT INTO trend (content, user_id) VALUES (?, ?);`;
    const result = await connections.execute(sql, [content, userId]);
    return result[0];
  }

  async getSingleTrend(id) {
    const sql = `
      SELECT
        t.id,
        t.content,
        t.createAt createTime,
        t.updateAt updateTime,
        JSON_OBJECT("id", u.id, "name", u.name, "url", u.avatar_url) author,
        (SELECT count(*) FROM comment c WHERE c.trend_id = t.id) commentCount,
        (SELECT count(*) FROM trend_label tl WHERE tl.trend_id = t.id) labelCount,
        (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/trend/images/', f.filename))
          FROM file f WHERE t.id = f.trend_id) images
      FROM
        trend t
      LEFT JOIN user u ON t.user_id = u.id
      WHERE t.id = ?;`;
    const result = await connections.execute(sql, [id]);
    return result[0];
  }

  async getTrendList(offset, size) {
    const sql = `
      SELECT
        t.id,
        t.content,
        t.createAt,
        t.updateAt,
        JSON_OBJECT( "id", u.id, "name", u.name, "url", u.avatar_url ) author,
        IF(COUNT(la.id), JSON_ARRAYAGG(JSON_OBJECT( "id", la.id, "name", la.name )), NULL) labels,
        ( SELECT COUNT(*) FROM comment c WHERE c.trend_id = t.id ) commentCount,
        (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/trend/images/', f.filename))
          FROM file f WHERE t.id = f.trend_id) images 
      FROM
        trend t
      LEFT JOIN user u ON t.user_id = u.id
      LEFT JOIN trend_label tl ON t.id = tl.trend_id
      LEFT JOIN label la ON tl.label_id = la.id 
      GROUP BY t.id
      LIMIT ?, ?;`;
    const result = await connections.execute(sql, [offset, size]);
    return result[0];
  }

  async deleteSingleTrend(id) {
    const sql = `DELETE FROM trend WHERE id = ?`;
    const result = await connections.execute(sql, [id]);
    return result[0];
  }

  async updateSingleTrend(content, id) {
    const sql = `UPDATE trend SET content = ? WHERE id = ?;`;
    const result = await connections.execute(sql, [content, id]);
    return result[0];
  }

  async hasLabel(trendId, labelId) {
    const sql = `SELECT * FROM trend_label WHERE trend_id = ? AND label_id = ?;`;
    const result = await connections.execute(sql, [trendId, labelId]);
    return result[0].length > 0 ? true : false;
  }

  async addLabels(trendId, labelId) {
    const sql = `INSERT INTO trend_label (trend_id, label_id) VALUES (?, ?);`;
    const result = await connections.execute(sql, [trendId, labelId]);
    return result[0];
  }
}

module.exports = new trendService();
