const path = require("path");
const { temps } = require("./config/pages.config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const base = require("./webpack.base");
module.exports = Object.assign(base, {
  mode: "production",
  // 代码拆分
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 10 * 1024 * 1,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        exclude: /\/public\/js/,

        minify: CssMinimizerPlugin.cleanCssMinify,
      }),
      new TerserPlugin({
        parallel: true, // 可省略，默认开启并行
        terserOptions: {
          toplevel: true, // 最高级别，删除无用代码
          ie8: true,
          safari10: true,
        },
      }),
    ],
  },
  target: ["web", "es5"],
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
        parser: {
          dataUrlCondition: {
            maxSize: 0.01, // 8kb （低于8kb都会压缩成 base64）
          },
        },
        use: [
          // image-webpack-loader需要用cnpm安装否则容易报错
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
      // {
      //   test: /\.html$/i,
      //   loader: "html-loader",
      //   include: path.resolve(__dirname, "src/pages"),
      //   options: {
      //     minimize: false,
      //   },
      // },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src"),
        loader: "babel-loader", //转换成es5
        options: {
          presets: ["@babel/preset-env"], //设置编译的规则
          plugins: [
            // 设置编译的插件
            ["@babel/plugin-transform-runtime"], //设置编译的规则
          ],
        },
      },
    ],
  },
});
