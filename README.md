## html-css-js-webpack
主要使用于非前后分离的项目中，如果不是用现在主流的框架，也可以用于前后分离的项目中，主要针对js,图片,css,工程化处理。
#### 使用步骤
下载完后，按如下操作：

执行命令：`npm install `
开发模式：`npm run dev `
生产模式：`npm run build `

### 相关说明

> html中，图片引用有所区别，需要参照下方,css文件中，按照正常使用

    <img src="<%= require('../../images/index/sw.png')%>" alt="">

> 页面目录说明

+ `config`

	+ `pages.config.js` ---页面文件相关配置
+ `public`--全局引用
    + `css`
    + `js`
	
+ `src`--源文件
	+ `comment` —全局公用
	+ `images`—图片
	+ `pages`--页面
		+ `index`
			+`index.html`--当前页面html文件
			+`index.scss`--当前页面引用的css
			+`index.js`--当前页面引用的js
		 `detail`
			+`detail.html`--当前页面html文件
			+`detail.scss`--当前页面引用的css
			+`detail.js`--当前页面引用的js
	+ `main.js`
+ `packege.json`

+ `postcss.config.js` 

+ `webpack.base.js` --公用配置

+ `webpack.config.js`  --生产模式

+ `webpack.dev.js` --开发模式
> pages.config.js 具体配置
```javascript
let pages = [
  {
    title: "首页", // 页面标题
    tempSrc: "src/pages/index/index.html", // HtmlWebpackPlugin插件里对应的template参数，
    filename: "index.html",// 打包完后生成的文件名称
    entryName: "index", // 打包入库
    entrySrc: "./src/pages/index/index.js", // 打包入库文件路径
    jsName: "index",// 打包完页面加入的js文件名称
  },
  {
    title: "详情",
    tempSrc: "src/pages/detail/detail.html",
    filename: "detail.html",
    entryName: "detail",
    entrySrc: "./src/pages/detail/detail.js",
    jsName: "detail",
  },
];
```