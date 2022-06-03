const connections = require("../app/database");

class AddressService {
  async uploadAddress(id, addressInfo) {
    const {
      name,
      tel,
      province,
      city,
      county,
      addressDetail,
      areaCode,
      isDefault,
      postalCode,
      country,
    } = addressInfo;
    const sql = `INSERT INTO address (userId, name, tel, province, city, county, addressDetail, areaCode, isDefault, postalCode, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const result = await connections.execute(sql, [
      id,
      name,
      tel,
      province,
      city,
      county,
      addressDetail,
      areaCode,
      isDefault,
      postalCode,
      country,
    ]);
    return result[0];
  }
  async getAddressListByUserId(id) {
    const sql = `SELECT * FROM address a WHERE a.userId = ?`;
    const result = await connections.execute(sql, [id]);
    return result[0];
  }
  async getAddressById(id) {
    const sql = `SELECT * FROM address a WHERE a.id = ?`;
    const result = await connections.execute(sql, [id]);
    return result[0];
  }
  async updateAddressById(address) {
    const {
      id,
      name,
      tel,
      province,
      city,
      county,
      addressDetail,
      areaCode,
      isDefault,
    } = address;
    const sql = `UPDATE address SET name = ?, tel = ?,province = ?, city = ?, county = ?, addressDetail =?, areaCode = ?, isDefault = ? WHERE id = ?`;
    const result = await connections.execute(sql, [
      name,
      tel,
      province,
      city,
      county,
      addressDetail,
      areaCode,
      isDefault,
      id,
    ]);
    return result[0];
  }
  async deleteAddressInfo(id) {
    const sql = `DELETE FROM address a WHERE a.id = ?`;
    const result = await connections.execute(sql, [id]);
    return result[0];
  }
  async cancelOtherDefault(id) {
    const sql = `UPDATE address a SET isDefault = 'false' WHERE id != ?`;
    const result = await connections.execute(sql, [id]);
    return result[0];
  }
}

module.exports = new AddressService();
