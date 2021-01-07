"use strict";
const path = require("path");
const utils = require("./utils");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const context = require('../libs/baseContext');
const VueLoaderPlugin = require("vue-loader/lib/plugin");

/**
 * 获取绝对路径
 * @param dir
 * @returns {*|string}
 */
function resolve(dir) {
  return path.join(__dirname, "..", dir);
}
// 是否是调试模式
const devMode = process.env.NODE_ENV === 'development';

const webpackBaseConfig = {
  mode: process.env.NODE_ENV,
  entry: './src/main.js',
  cache: {
    type: devMode ? 'memory' : 'filesystem'
  },
  // webpack输出路径和命名规则
  output: {
    path: resolve('dist'),
    filename: `.${context.name}/js/[name]${devMode ? '' : '-[contenthash]'}.js`,
    chunkFilename: `.${context.name}/js/[name]${devMode ? '' : '-[contenthash]'}.js`,
    publicPath: '/'
  },
  // 分割规则
  optimization: {
    runtimeChunk: false,
    chunkIds: !devMode ? 'deterministic' : 'named',
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: true,
        exclude: /node_modules/
      })
    ],
    splitChunks: devMode ? false : {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      maxSize: 50000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          priority: -10,
          reuseExistingChunk: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  // 不同类型模块的处理规则
  module: {
    rules: utils.styleLoaders({
      sourceMap: devMode,
      usePostCSS: true
    }).concat([
      {
        // 对所有.vue文件使用vue-loader进行编译
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        // 对所有.js文件使用babel-loader进行编译
        test: /\.js$/,
        use: {
          loader: "babel-loader",
        },
        // 不包含目录
        exclude: /node_modules/,
      },
      {
        // 对图片资源文件使用url-loader
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: "assets",
        generator: {
          filename: `.${context.name}/images/[name]${devMode ? '' : '-[contenthash]'}.[ext]`,
        },
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 // 4kb
          }
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?)?$/,
        type: 'assets',
        generator: {
          filename: `.${context.name}/media/[name]${devMode ? '' : '-[contenthash]'}.[ext]`,
        },
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 // 4kb
          }
        }

      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.(html|tpl)$/,
        loader: 'html-loader'
      }
    ])
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      title: 'Hello',
      inject: 'body',
      favicon: false
    }),
    new MiniCssExtractPlugin({
      filename: `.${context.name}/css/[name]${devMode ? '' : '-[contenthash]'}.css`,
      chunkFilename: `.${context.name}/css/[name]${devMode ? '' : '-[contenthash]'}.css`,
      ignoreOrder: true
    })
  ],
  // 模块resolve的规则
  resolve: {
    // 取别名，方便引用模块，例如有了别名之后
    extensions: [".js", ".vue", ".json"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": resolve("src"),
      // 也可以自己添加一些经常引用的路径
      "~": resolve("static"),
      "_c": resolve("src/components"),
      "@images": resolve("src/assets/images"),
      "@css": resolve("src/assets/css")
    },
  },
};
module.exports = webpackBaseConfig;

