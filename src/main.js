import "./comment/css/comment.scss";
class GlobalFn {
  constructor() {
    this.init();
  }
  init() {
    this.setFontSize();
    this.event();
  }
  setFontSize() {
    [".header"].forEach((item) => {
      $(item).css("font-size", this.getFontSize());
    });
  }
  event() {
    window.onresize = () => {
      this.setFontSize();
    };
  }
  getFontSize() {
    var designSize = 1440; // 设计图尺寸
    var html = document.documentElement;
    var wW = html.clientWidth; // 窗口宽度
    var rem = (wW * 16) / designSize;
    return rem + "px";
  }
}
new GlobalFn();
