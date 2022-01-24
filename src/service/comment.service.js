const connections = require("../app/database");

class CommentService {
  async getListByFlowerId(flowerId) {
    const sql = `
      SELECT
        c.id,
        c.content,
        c.flower_id flowerId,
        c.comment_id commentId,
        c.createAt createTime,
        ( SELECT COUNT(*) FROM comment o WHERE c.id = o.comment_id ) commentCount,
        JSON_OBJECT("id", u.id, "name", u.name) author
      FROM
        comment c
      LEFT JOIN user u ON c.user_id = u.id`;
    const result = await connections.execute(sql, [flowerId]);
    return result[0];
  }

  async create(content, flowerId, userId) {
    const sql = `INSERT INTO comment (content, flower_id, user_id) VALUES (?, ?, ?)`;
    const result = await connections.execute(sql, [content, flowerId, userId]);
    return result[0];
  }

  async reply(content, flowerId, userId, commentId) {
    const sql = `INSERT INTO comment (content, flower_id, user_id, comment_id) VALUES (?, ?, ?, ?)`;
    const result = await connections.execute(sql, [
      content,
      flowerId,
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
