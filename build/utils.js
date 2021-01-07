"use strict";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { Autoprefixer } = require('autoprefixer');

/**
 * 生成css,sass,scss等各种用来编写样式的语言对应的loader配置
 * @param options
 * @returns {{css: *, postcss: *, less: *, sass: *, scss: *, stylus: *, styl: *}}
 */
exports.cssLoaders = function (options) {
  options = options || {};

  const cssLoader = {
    loader: "css-loader",
    options: {
      sourceMap: options.sourceMap
    }
  };

  const postcssLoader = {
    loader: "postcss-loader",
    options: {
      plugins: [Autoprefixer],
      sourceMap: options.sourceMap
    }
  };


  function generateLoaders(loader, loaderOptions) {
    const loaders = options.usePostCSS
      ? [cssLoader, postcssLoader,]
      : [cssLoader];
    if (loader) {
      loaders.push({
        loader: loader + "-loader",
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      });
    }


    if (options.extract) {
      return MiniCssExtractPlugin.extract({
        use: loaders,
        fallback: "vue-style-loader"
      });
    } else {
      return ["vue-style-loader"].concat(loaders);
    }
  }


  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders("less"),
    sass: generateLoaders("sass", { indentedSyntax: true }),
    scss: generateLoaders("sass"),
    stylus: generateLoaders("stylus"),
    styl: generateLoaders("stylus")
  };
};

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = [];
  const loaders = exports.cssLoaders(options);

  for (const extension in loaders) {
    const loader = loaders[extension];
    output.push({
      test: new RegExp("\\." + extension + "$"),
      use: loader
    });
  }
  return output;
}
