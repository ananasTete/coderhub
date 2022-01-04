const connections = require("../app/database");

class AuthService {
  async check(tableName, id, userId) {
    const sql = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;`;
    const result = await connections.execute(sql, [id, userId]);
    return result[0].length === 0 ? false : true;
  }
}

module.exports = new AuthService()