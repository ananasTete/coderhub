const crypto = require("crypto");

// 内置模块crypto提供了通用的加密和哈希算法，这里使用md5加密算法对密码加密
// 默认返回的加密结果是Buffer格式，传入参数'hex'后返回对应16进制的字符串

function md5password(password) {
  const md5 = crypto.createHash('md5');
  const result = md5.update(password).digest('hex');
  return result
}

module.exports = md5password