"use strict";

process.env.NODE_ENV = 'development';
const webpack = require("webpack");
const chalk = require('chalk');
const logInfo = require('../libs/logInfo')
const path = require("path");
const fs = require('fs');

const dev = {
  run() {
    // 删除历史打包数据
    require("del")(["./dist/*"]);
    this.writeContext();
    this.runDev();
  },
  // 写出上下文
  writeContext() {
    // 得到上下文
    const context = require("../libs/baseContext.js");
    fs.writeFileSync(
      path.join(__dirname, "../libs/baseContext.js"),
      `module.exports = ${JSON.stringify(context, null, 4)}`
    );
  },
  // 启动调试
  runDev() {
    const WebpackDevServer = require("webpack-dev-server");
    const devServerConfig = require("../config/devServer.js");
    const webpackConfig = require("./webpack.config.base.js");
    // 输出运行环境
    logInfo.runTime(devServerConfig.currEnv);

    let { host, port, proxy } = devServerConfig;
    port += 1;
    const compiler = webpack(webpackConfig);
    new WebpackDevServer(compiler, {
      contentBase: webpackConfig.output.path,
      publicPath: webpackConfig.output.publicPath,
      inline: true,
      hot: true,
      hotOnly: true,
      quiet: true,
      https: true,
      open: true,
      progress: false,
      compress: true,
      disableHostCheck: true,
      historyApiFallback: {
        disableDotRule: true
      },
      port,
      host,
      proxy
    }).listen(port, host, err => {
      if (err) return console.log(err);
    });
    compiler.hooks.done.tap("done", stats => {
      console.log(
        chalk.green(`time：${(stats.endTime - stats.startTime) / 1000} s\n`)
        // chalk.white("调试完毕")
      );
      logInfo.runTime(devServerConfig.currEnv); //输出运行环境
      // if (devServerConfig.openBrowserAfterComplete) {
      //   const cmd = os.platform() === "win32" ? "explorer" : "open";
      //   require("child_process").exec(`${cmd} 'https://${host}:${port}'`);
      //   devServerConfig.openBrowserAfterComplete = false;
      // }
      console.log('访问地址：')
      logInfo.getUrl(`https://${host}:${port}`);
    });
  }
};

dev.run();
