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
    this.createBanner();
  }
  initEvent() {
    setTimeout(() => {
      this.hideLoading();
    }, 1000);
  }
  createBanner() {
    new Swiper("#certify .swiper-container", {
      watchSlidesProgress: true,
      slidesPerView: "auto",
      centeredSlides: true,
      loop: true,
      // loopedSlides: 5,
      autoplay: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      on: {
        progress: function (progress) {
          for (let i = 0; i < this.slides.length; i++) {
            var slide = this.slides.eq(i);

            var slideProgress = this.slides[i].progress;
            let modify = 1;
            if (Math.abs(slideProgress) > 1) {
              modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
            }
            let translate = slideProgress * modify * 300 + "px";
            let scale = 1 - Math.abs(slideProgress) / 4;
            let zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
            let active = $(slide).hasClass("swiper-slide-active") ? 0 : "100px";
            slide.transform(
              "translateX(" + translate + ")  scale(" + scale + ")"
            );
            slide.css("zIndex", zIndex);
            slide.css("opacity", 1);
            if (Math.abs(slideProgress) > 3) {
              slide.css("opacity", 0);
            }
          }
        },
        setTransition: function (transition) {
          for (var i = 0; i < this.slides.length; i++) {
            var slide = this.slides.eq(i);
            slide.transition(transition);
          }
        },
      },
    });
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
