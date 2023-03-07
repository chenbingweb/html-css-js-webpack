const HtmlWebpackPlugin = require("html-webpack-plugin");

let pages = [
  {
    title: "首页",
    tempSrc: "src/pages/index/index.html",
    filename: "index.html",
    entryName: "index",
    entrySrc: "./src/pages/index/index.js",
    jsName: "index",
  },
  {
    title: "详情",
    tempSrc: "src/pages/detail/detail.html",
    filename: "detail.html",
    entryName: "detail",
    entrySrc: "./src/pages/detail/detail.js",
    jsName: "detail",
  },

  

  

        
      


            
          


            //login
            {"title":"login title","tempSrc":"src/pages/login/login.html","filename":"login.html","entryName":"login","entrySrc":"./src/pages/login/login.js","jsName":"login"},
            //login
          
/*config*/
];

let temps = pages.map((item) => {
  return new HtmlWebpackPlugin({
    title: item.title,
    filename: item.filename,
    template: item.tempSrc,
    inject: false,
    chunks: ["main", item.jsName],
    minify: {
      collapseWhitespace: false,
      keepClosingSlash: false,
      removeComments: false,
      removeRedundantAttributes: false,
      removeScriptTypeAttributes: false,
      removeStyleLinkTypeAttributes: false,
      useShortDoctype: false,
    },
    templateParameters: {
      css: [
        "./libs/css/normalize.css",
        "./libs/css/animate.min.css",
        "./libs/css/custom-animate.min.css",
        "./libs/css/element.css",
        "./libs/css/swiper.min.css",
      ],
      js: [
        "./libs/js/jquery.min.js",
        "./libs/js/animation.js",
        "./libs/js/vue.js",
        "./libs/js/element.js",
        "./libs/js/swiper.min.js",
      ],
    },
  });
});
let enterConfig = {};
pages.forEach((item) => {
  enterConfig[item.entryName] = {
    import: item.entrySrc,
  };
});

module.exports = {
  temps,
  pages,
  enterConfig,
};
