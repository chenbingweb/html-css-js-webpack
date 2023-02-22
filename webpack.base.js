const path = require("path");
const { temps, enterConfig } = require("./config/pages.config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WebpackBar = require("webpackbar");
const ProgressBarWebpackPlugin = require("progress-bar-webpack-plugin");
module.exports = {
  entry: {
    main: {
      import: "./src/main.js",
    },
    ...enterConfig,
  },
  // 缓存，第二次打包速度更快
  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [__filename],
    },
  },
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new WebpackBar(),
    new ProgressBarWebpackPlugin(),
    // css文件 抽离
    new MiniCssExtractPlugin({
      filename: "./css/[name].css",
    }),
    // 文件拷贝
    new CopyWebpackPlugin({
      patterns: [
        { from: "public/css", to: "libs/css" },
        { from: "public/js", to: "libs/js" },
      ],
    }),
    ...temps,
  ],
};
