const connections = require("../app/database");

class FileService {
  async saveAvatarInfo(filename, mimetype, size, userId) {
    const sql = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?);`;
    const result = await connections.execute(sql, [
      filename,
      mimetype,
      size,
      userId,
    ]);
    return result[0];
  }

  async savePictureInfo(filename, mimetype, size, trendId, userId) {
    const sql = `INSERT INTO file (filename, mimetype, size, trend_id, user_id) VALUES (?, ?, ?, ?, ?);`;
    const result = await connections.execute(sql, [
      filename,
      mimetype,
      size,
      trendId,
      userId,
    ]);
    return result[0];
  }

  async getAvatarByUserId(userId) {
    const sql = `SELECT * FROM avatar WHERE user_id = ?;`;
    const result = await connections.execute(sql, [userId]);
    return result[0];
  }

  async getFileByFileName(filename) {
    const sql = `SELECT * FROM file WHERE filename = ?;`;
    const result = await connections.execute(sql, [filename]);
    return result[0];
  }

  async deleteAvatarById(userId) {
    const sql = `DELETE FROM avatar WHERE user_id = ?;`;
    const result = await connections.execute(sql, [userId]);
    return result[0];
  }
}

module.exports = new FileService();
