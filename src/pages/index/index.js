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
    this.vue = new Vue({
      el: "#index_page",
      data() {
        return {
          a: "vue",
        };
      },
    });
    console.log(this.vue);
  }
  initEvent() {
    setTimeout(() => {
      this.hideLoading();
    }, 2000);
    $("button").click(() => {
      this.delay().then(() => {
        alert(2);
      });
    });
  }
  delay() {
    let t = new Promise((r) => {
      setTimeout(() => {
        r(1);
      }, 2000);
    });
    return t;
  }
}
window.onload = () => {
  //   new Page();
  console.log(2323);
  new Vue({
    el: "#index_page",
    data() {
      return {
        a: "vue",
      };
    },
  });
};
