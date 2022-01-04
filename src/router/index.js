const fs = require("fs");

/** 读取当前目录，返回目录中所有文件名字符串组成的数组，遍历数组导入router对象注册 */

function useRoutes(app) {
  fs.readdirSync(__dirname).forEach((file) => {
    if (file === "index.js") return;
    const router = require(`./${file}`);
    app.use(router.routes());
    app.use(router.allowedMethods());
  });
}

module.exports = useRoutes;
