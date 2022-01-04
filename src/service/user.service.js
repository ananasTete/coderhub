const connections = require("../app/database");

class UserService {
  async register(user) {
    const { name, password } = user;
    const sql = `INSERT INTO user (name, password) VALUES (?, ?);`;
    const result = await connections.execute(sql, [name, password]);
    return result[0];
  }

  async getUserByName(name) {
    const sql = `SELECT * FROM user WHERE name = ?;`;
    const result = await connections.execute(sql, [name]);
    return result[0];
  }

  async updateAvatarUrlById(avatarUrl, userId) {
    const sql = `UPDATE user SET avatar_url = ? WHERE id = ?;`;
    const result = await connections.execute(sql, [avatarUrl, userId])
    return result[0];
  }
}

module.exports = new UserService();
