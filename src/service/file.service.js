const connections = require("../app/database");

class FileService {
  /** 保存头像信息 */
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

  async getAvatarByUserId(userId) {
    const sql = `SELECT * FROM avatar WHERE user_id = ?;`;
    const result = await connections.execute(sql, [userId]);
    return result[0];
  }

  async deleteAvatarById(userId) {
    const sql = `DELETE FROM avatar WHERE user_id = ?;`;
    const result = await connections.execute(sql, [userId]);
    return result[0];
  }

  /** 保存动态配图信息 */
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

  async getFileByFileName(filename) {
    const sql = `SELECT * FROM file WHERE filename = ?;`;
    const result = await connections.execute(sql, [filename]);
    return result[0];
  }

  /** 保存轮播图信息 */
  async saveSwiperInfo(filename, mimetype, size) {
    const sql = `INSERT INTO swiper (filename, mimetype, size) VALUES (?, ?, ?);`;
    const result = await connections.execute(sql, [filename, mimetype, size]);
    return result[0]
  }

  /** 保存flower配图信息 */
  async saveFlowerImgInfo(filename, mimetype, size, flowerId) {
    const sql = `INSERT INTO flowerimg (filename, mimetype, size, flower_id) VALUES (?, ?, ?, ?);`;
    const result = await connections.execute(sql, [filename, mimetype, size, flowerId]);
    return result[0]
  }

  /** 保存label配图信息 */
  async saveLabelImgInfo(filename, mimetype, size, labelId) {
    const sql = `INSERT INTO labelimg (filename, mimetype, size, label_id) VALUES (?, ?, ?, ?);`;
    const result = await connections.execute(sql, [filename, mimetype, size, labelId]);
    return result[0]
  }
}

module.exports = new FileService();
