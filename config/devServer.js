const envList = ["dev", "test", "prod"];

// 根据环境选择代理地址
envList.forEach((env) => {
  if (process.argv.indexOf(env) > 1) {
    currEnv = env;
    proxy = proxyMap[env] || proxy;
  }
});

// 导出配置
module.exports = {
  host: "127.0.0.1",
  port: 8080,
  // 当前环境
  currEnv,
  openBrowserAfterComplete: true,
  proxy,
};
