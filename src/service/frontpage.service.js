const connections = require("../app/database");

class FrontpageService {
  async getSwiperInfo() {
    const sql = `SELECT filename, mimetype FROM swiper`
    const result = await connections.execute(sql);
    return result[0]
  }
}

module.exports = new FrontpageService()