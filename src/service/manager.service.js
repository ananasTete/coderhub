const connections = require("../app/database");

class ManagerService {
  async register(user) {
    const { name, password, permission } = user;
    const sql = `INSERT INTO manager (name, password, permission) VALUES (?, ?, ?);`;
    const result = await connections.execute(sql, [name, password, permission]);
    return result[0];
  }

  async getUserByName(name) {
    name = `%${name}%`;
    const sql = `SELECT * FROM manager WHERE name like ?;`;
    const result = await connections.execute(sql, [name]);
    return result[0];
  }

  async getAllManager() {
    const sql = `SELECT * FROM manager`;
    const result = await connections.execute(sql);
    return result[0];
  }

  async editManager(managerId, newInfo) {
    const { name, password, permission } = newInfo;
    const sql = `UPDATE manager  SET name =?, password=?, permission=? WHERE id = ?`;
    const result = await connections.execute(sql, [
      name,
      password,
      permission,
      managerId,
    ]);
    return result[0];
  }

  async deleteManager(managerId) {
    const sql = `DELETE FROM manager WHERE id = ?`;
    const result = await connections.execute(sql, [managerId]);
    return result[0];
  }

  async searchManager(info) {
    let { name, permission } = info;
    if (name) {
      name = `%${name}%`;
    }
    const sql = `SELECT * FROM manager WHERE name like ? OR permission = ?`;
    const result = await connections.execute(sql, [name, permission]);
    return result[0];
  }

  // async updateAvatarUrlById(avatarUrl, userId) {
  //   const sql = `UPDATE user SET avatar_url = ? WHERE id = ?;`;
  //   const result = await connections.execute(sql, [avatarUrl, userId]);
  //   return result[0];
  // }
}

module.exports = new ManagerService();
