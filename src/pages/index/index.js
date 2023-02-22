import "./index.css";
import Main from "../../comment/js/main";
class Page extends Main {
  constructor() {
    super();
    this.init();
  }
  init() {
    this.initVue();
    this.loading("加载中...");
    this.initEvent();
  }
  initVue() {
    let that = this;
    this.vue = new Vue({
      el: "#index_page",
      data() {
        return {
          a: "vue",
        };
      },
      created() {},
      methods: {
        onClick() {
          that.tipShow("2323");
        },
      },
    });
    console.log(this.vue);
  }
  initEvent() {
    setTimeout(() => {
      this.hideLoading();
    }, 1000);
  }
  delay() {
    let t = new Promise((r) => {
      setTimeout(() => {
        r(true);
      }, 2000);
    });
    return t;
  }
}
window.onload = () => {
  new Page();
  console.log("index");
};
