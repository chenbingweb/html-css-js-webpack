const path = require("path");
const base = require("./webpack.base");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = Object.assign(base, {
  mode: "development",
  devtool: "inline-source-map",
  watchOptions: {
    ignored: [
      path.resolve(__dirname, "node_modules"),
      path.resolve(__dirname, "dist"),
    ],
  },
  devServer: {
    hot: true,
    static: {
      directory: path.join(__dirname, "src"),
    },
    compress: true,
    port: 9090,
  },
  optimization: {
    runtimeChunk: "single",
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // publicPath: "/css/",
            },
          },
          {
            loader: "css-loader",
          },
        ],
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset",
      },
    ],
  },
});
