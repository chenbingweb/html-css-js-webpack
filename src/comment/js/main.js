export default class Main {
  isMobile() {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      return true;
    } else {
      return false;
    }
  }
  loading(text) {
    if ($("._loading_").length) {
      $("._loading_").remove();
    }
    $("body").append(
      '<div class="_loading_"><div class="_loading_style_"><div class="loading_icon"></div><div class="_style_text_">' +
        text || "加载中..." + "</div></div></div>"
    );
  }
  hideLoading() {
    if ($("._loading_").length) {
      $("._loading_").css({
        opacity: 0,
      });
      setTimeout(function () {
        $("._loading_").remove();
      }, 1000);
    }
  }
  remToPx(val) {
    var per = parseFloat($("html").css("font-size"));
    return (val / 75) * per;
  }
  getQueryString(name) {
    //获取url参数
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return unescape(r[2]);
    }
    return null;
  }
  AjaxFunc(url, data, success, fail) {
    $.ajax({
      url: url,
      dataType: "json",
      type: "POST",
      data: data,
      success: function (res) {
        success(res);
      },
      fail: function () {
        fail && fail();
      },
    });
  }
  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  jsonParse(form) {
    var serializeObj = {};
    var array = $(form).serializeArray();
    // var str = $(form).serialize();
    $(array).each(function () {
      if (serializeObj[this.name]) {
        if ($.isArray(serializeObj[this.name])) {
          serializeObj[this.name].push(this.value);
        } else {
          serializeObj[this.name] = [serializeObj[this.name], this.value];
        }
      } else {
        serializeObj[this.name] = this.value;
      }
    });
    return serializeObj;
  }
  AnimationCss(el, className) {
    $(el).addClass(className);
    return new Promise(function (resolve) {
      $(el).one(
        "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
        function () {
          resolve();
          return false;
        }
      );
    });
  }
  tipShow(tip, time) {
    if ($("._tip_box_").length) {
      $("._tip_box_").remove();
    }
    var ele = $(
      '<div class="_tip_box_ "><div class="_tip_cion">' +
        (tip || "数据错误") +
        "</div></div>"
    );
    $("body").append(ele);
    let that = this;
    this.AnimationCss(ele, "_animation_tip_show").then(function () {
      setTimeout(function () {
        that.AnimationCss(ele, "_animation_tip_hide").then(function () {
          $("._tip_box_").remove();
        });
      }, time || 2000);
    });
  }
  confirm(text, success, fail, hidCancel) {
    if ($("._comfirm_box_").length) {
      $("._comfirm_box_").remove();
    }
    var _comfirm_box_ = $('<div class="_comfirm_box_"></div>');
    var _comfirm_box_tip = $('<div class="_comfirm_box_tip"></div>').css(
      "opacity",
      0
    );
    var _comfirm_tip_text = $('<div class="_comfirm_tip_text">提示</div>');
    var _comfirm_tip_content = $(
      ' <div class="_comfirm_tip_content">' + (text || "提示内容") + "</div>"
    );
    var _comfirm_btn = $('<div class="flex_between _comfirm_btn "></div>');
    if (hidCancel) {
      _comfirm_btn = $('<div class="flex_center _comfirm_btn "></div>');
    }
    var _comfirm_cancel_ = $('<div class="_comfirm_cancel_">取消</div>');
    var _comfirm_sure_ = $('<div class="_comfirm_sure_">确认</div>');
    if (!hidCancel) {
      _comfirm_btn.append(_comfirm_cancel_);
      //取消
      _comfirm_cancel_.click(function () {
        AnimationCss(_comfirm_box_tip, "_animation_confirm_bounceOut")
          .then(function () {
            _comfirm_box_tip.css("opacity", 0);
            return AnimationCss(_comfirm_box_, "_animation_fadeOut");
          })
          .then(function () {
            _comfirm_box_.remove();

            fail && fail();
          });

        return false;
      });
    }

    _comfirm_btn.append(_comfirm_sure_);
    _comfirm_box_tip
      .append(_comfirm_tip_text)
      .append(_comfirm_tip_content)
      .append(_comfirm_btn);
    _comfirm_box_.append(_comfirm_box_tip);
    $("body").append(_comfirm_box_);
    //点击确认
    _comfirm_sure_.click(function () {
      AnimationCss(_comfirm_box_tip, "_animation_confirm_bounceOut")
        .then(function () {
          _comfirm_box_tip.css("opacity", 0);
          return AnimationCss(_comfirm_box_, "_animation_fadeOut");
        })
        .then(function () {
          _comfirm_box_.remove();

          success && success();
        });
      return false;
    });
    AnimationCss(_comfirm_box_, "_animation_fadeIn").then(function () {
      _comfirm_box_tip.css("opacity", 1);
      return AnimationCss(_comfirm_box_tip, "_animation_confirm_bounceIn");
    });
  }
}
