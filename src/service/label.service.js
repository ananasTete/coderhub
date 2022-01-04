const context = require("koa/lib/context");
const connections = require("../app/database");

class LabelService {
  async create(name) {
    const sql = `INSERT INTO label (name) VALUES (?);`;
    const result = await connections.execute(sql, [name]);
    return result[0];
  }

  async verifyExists(label) {
    const sql = `SELECT * FROM label WHERE name = ?;`;
    const result = await connections.execute(sql, [label]);
    return result[0];
  }

  async list() {
    const sql = `SELECT * FROM label;`;
    const result = await connections.execute(sql);
    return result[0];
  }
}

module.exports = new LabelService();
