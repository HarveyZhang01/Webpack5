const envList = ["dev", "test", "prod"];
const serverBaseUrl = require('./proxy')
// 默认代理到正式环境
let proxy = serverBaseUrl.release;
let currEnv = "dev";

// 根据环境选择代理地址
envList.forEach((env) => {
  if (process.argv.indexOf(env) > 1) {
    currEnv = env;
    proxy = proxyMap[env] || proxy;
  }
});

// 导出配置
module.exports = {
  host: "localhost",
  port: 8080,
  // 当前环境
  currEnv,
  openBrowserAfterComplete: true,
  proxy,
};
