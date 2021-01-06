const serverBaseUrl = {
  dev: "localhost:8080",
  test: "localhost:8081",
  prod: "localhost: 3000",
};

const proxyPath = ["/api/", "/sys/"];

// 各环境对应的代理配置
const proxyMap = {};
Object.keys(serverBaseUrl).forEach((env) => {
  // env环境代理信息
  proxyMap[env] = {};
  proxyPath.forEach((pathItem) => {
    proxyMap[env][pathItem] = {
      target: serverBaseUrl[env],
      secure: false,
      changeOrigin: true,
    };
  });
});

module.exports = { proxyMap, serverBaseUrl };
