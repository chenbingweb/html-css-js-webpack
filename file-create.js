const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");
const pathFile = path.resolve(__dirname, "src/pages");

module.exports = () => {
  const watcher = chokidar.watch(pathFile, {
    ignored: /[\/\\]\./,
    persistent: true,
  });
  var log = console.log.bind(console);
  let ready = false;
  watcher
    .on("addDir", function (path) {
      if (ready) {
        let filename = path.match(/([^/]+)$/)[0];
        // filename = filename[0].toUpperCase() + filename.slice(1);
        let upperFileName = filename[0].toUpperCase() + filename.slice(1);
        let filepath = path.match(/(\/[^/]+)$/)[0];
        log("Directory", path + filepath, "has been added");
        Promise.all([
          createFiles(
            path + filepath,
            "html",
            `<% include('../comm/html-header.html') %>
        <% include('../comm/html-footer.html') %>`
          ),
          createFiles(path + filepath, "scss", `div{width:100%}`),
          // createFiles(path + filepath, "css", `div{width:100%}`),
          createFiles(
            path + filepath,
            "js",
            `import "./${filename}.scss";
            class ${upperFileName} {
              constructor() {
                console.log("${filename}");
              }
            }
            new ${upperFileName}();`
          ),
        ]).then((res) => {
          let obj = JSON.stringify({
            title: filename + " title",
            tempSrc: `src/pages/${filename}/${filename}.html`,
            filename: `${filename}.html`,
            entryName: `${filename}`,
            entrySrc: `./src/pages/${filename}/${filename}.js`,
            jsName: filename,
          });
          writeFile(`
            //${filename}
            ${obj},
            //${filename}
          `);
          setTimeout(() => {
            reload();
          }, 2000);
        });
      }
      // log("Directory", path, "has been added");
    })
    .on("unlinkDir", function (path) {
      if (ready) {
        let filename = path.match(/([^/]+)$/)[0];
        filename = filename[0].toLocaleLowerCase() + filename.slice(1);
        log("Directory", path, "has been removed");
        delContent(filename);
      }
    })

    .on("ready", function () {
      ready = true;
      log("ready");
    });
  function createFiles(savePath, ext, content) {
    return new Promise((resolve) => {
      fs.writeFile(
        savePath + "." + ext,
        content,
        "utf-8",
        function (err, data) {
          if (err) {
            console.err("创建失败", err);
          } else {
            resolve();
            console.log("创建成功", ext);
          }
        }
      );
    });
  }
  function isDirExis(dir) {
    let tempDir = path.resolve(__dirname + dir);
    return fs.existsSync(tempDir);
  }
  function writeFile(content) {
    let fileName = `${__dirname}/config/pages.config.js`;
    var data = fs.readFileSync(fileName).toString();
    let str = `\n\r${content}\n\r`;

    data = addString(data, "/*config*/", str);
    fs.writeFileSync(fileName, data);
  }
  function addString(data, flag, str) {
    let importantIndex = data.toString().indexOf(flag);

    data = data.slice(0, importantIndex) + str + data.slice(importantIndex);
    return data;
  }
  function delContent(flag) {
    //a.match(new RegExp('//adf.*//adf','g'))
    let reg = new RegExp(`//${flag}[\\s\\S]*//${flag}`, "g");
    let fileName = `${__dirname}/config/pages.config.js`;
    var data = fs.readFileSync(fileName).toString();
    let textMath = data.match(reg);
    if (textMath) {
      data = data.replace(reg, "");
      fs.writeFileSync(fileName, data);
    }
  }
  function reload() {}
};
