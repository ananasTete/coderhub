const connections = require("../app/database");

class CommentService {
  async list(trendId) {
    const sql = `
      SELECT
        c.id,
        c.content,
        c.trend_id trendId,
        c.comment_id commentId,
        c.createAt createTime,
        ( SELECT COUNT(*) FROM comment o WHERE c.id = o.comment_id ) commentCount,
        JSON_OBJECT("id", u.id, "name", u.name) author
      FROM
        comment c
      LEFT JOIN user u ON c.user_id = u.id`;
    const result = await connections.execute(sql, [trendId]);
    return result[0];
  }

  async create(content, trendId, userId) {
    const sql = `INSERT INTO comment (content, trend_id, user_id) VALUES (?, ?, ?)`;
    const result = await connections.execute(sql, [content, trendId, userId]);
    return result[0];
  }

  async reply(content, trendId, userId, commentId) {
    const sql = `INSERT INTO comment (content, trend_id, user_id, comment_id) VALUES (?, ?, ?, ?)`;
    const result = await connections.execute(sql, [
      content,
      trendId,
      userId,
      commentId,
    ]);
    return result[0];
  }

  async remove(id) {
    const sql = `DELETE FROM comment WHERE id = ?;`;
    const result = await connections.execute(sql, [id]);
    return result[0];
  }
}

module.exports = new CommentService();
