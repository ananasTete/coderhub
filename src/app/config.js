const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");


dotenv.config(); // 将根目录下.env文件中的环境变量加载到process.env对象

const PRIVATE_KEY = fs.readFileSync("./src/keys/rsa_private_key.pem");
const PUBLIC_KEY = fs.readFileSync("./src/keys/rsa_public_key.pem");

module.exports = {
  APP_HOST,
  APP_PORT,
  APP_PATH,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = process.env;

module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;
