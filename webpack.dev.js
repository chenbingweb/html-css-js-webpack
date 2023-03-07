const path = require("path");
const base = require("./webpack.base");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FileCreate = require("./file-create");
FileCreate();
module.exports = Object.assign(base, {
  mode: "development",
  devtool: "inline-source-map",
  watchOptions: {
    ignored: [
      path.resolve(__dirname, "node_modules"),
      //   path.resolve(__dirname, "dist"),
    ],
  },
  devServer: {
    hot: true,
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9091,
  },
  optimization: {
    runtimeChunk: "single",
  },

  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // publicPath: "/css/",
            },
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1, //设置在 css-loader 前应用的 loader 数量
            },
          },
          {
            loader: "postcss-loader",

            options: {
              postcssOptions: {
                plugins: [["postcss-preset-env", {}]],
              },
            },
          },
          {
            loader: "sass-loader",
          },
          {
            loader: "sass-resources-loader",
            options: {
              resources: path.resolve(__dirname, "./src/comment/css/tool.scss"),
            },
          },
        ],
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        generator: {
          filename: (pathData) => {
            let path = pathData.module.rawRequest.match(/\/images\/\w*\//);
            path = path
              ? path[0] + "[name][ext][query]"
              : "images/[name][ext][query]";
            return path;
          },
          //filename: "images/[name]_[hash:6][ext][query]",
        },
        type: "asset/resource",
      },
      {
        test: /\.html$/,
        loader: "art-template-loader",
        include: path.resolve(__dirname, "src/pages"),
        options: {
          // art-template options (if necessary)
          // @see https://github.com/aui/art-template
        },
      },
    ],
  },
});
