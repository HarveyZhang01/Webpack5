process.env.NODE_ENV = 'production';
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const devServerConfig = require('../config/devServer.js');
const logInfo = require('../libs/logInfo.js');
const webpackConfig = require('./webpack.config.base');
const context = require('../libs/baseContext.js');

const build = {
  run() {
    // 输出运行环境
    logInfo.runTime(devServerConfig.currEnv);
    // 删除历史打包数据
    require('del')(['./dist/*']);
    this.writeContext();
    this.buildServer();
  },
  // 写出上下文
  writeContext() {
    fs.writeFileSync(path.join(__dirname, '../libs/baseContext.js'), `module.exports = ${JSON.stringify(context, null, 4)}`);
  },
  // 打包
  buildServer() {
    const compiler = webpack(webpackConfig);
    compiler.run((err, stats) => {
      if (err) {
        console.log(chalk.red(err));
        process.exit(0);
      }
      let log = '';
      Object.keys(stats.compilation.assets).forEach(key => {
        log += chalk.blue(key) + '\n';
      });
      stats.compilation.warnings.forEach(key => {
        log += chalk.yellow(key) + '\n';
      });
      stats.compilation.errors.forEach(key => {
        log += chalk.red(`${key}:${stats.compilation.errors[key]}`) + '\n';
      });
      log += chalk.green(`time：${(stats.endTime - stats.startTime) / 1000} s\n`) + '\n';
      console.log(log);
      // 输出运行环境
      logInfo.runTime('打包完成');
    });
  },

};

build.run();