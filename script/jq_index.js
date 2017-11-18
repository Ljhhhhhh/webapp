/**
 * @Date:   2017-11-17T13:26:08+08:00
 * @Last modified time: 2017-11-18T13:52:16+08:00
 */
;
(function($) {
  var picsShow = function($data) {
    //可以增加对$data的判断。
    var _this = this;
    this.init($data);
    this.bindEvent();
  };
  picsShow.prototype = {
    init: function($data) {
      var _this = this;
      _this.data = {
        scale: $(window).width() / $(window).height(),
        docuW: $(window).width()
      };
      _this.data.obj = $data.obj;
      _this.data.list = $data.list;
      _this.data.listLen = $data.list.length;
      var tempList = '';
      _this.data.ul = $("<ul></ul>");
      for (var i = 0; i < _this.data.listLen; i++) {
        var src = _this.data.list[i].img;
        if (_this.data.list[i].width / _this.data.list[i].height > _this.data.scale) { //横图
          tempList += '<li style="width:' + _this.data.docuW + 'px" ><img width="100%" src="' + src + '"></li>';
        } else { //竖图
          tempList += '<li style="width:' + _this.data.docuW + 'px" ><img height="100%" src="' + src + '"></li>';
        }
      }
      _this.data.ul.html(tempList);
      _this.data.ul.css({
        width: _this.data.docuW * _this.data.listLen
      })
      _this.data.ul.appendTo(_this.data.obj);
    },
    bindEvent: function() {
      var _this = this;
      var location = {};
      var startTouch = function(e) {
        location.offsetX = 0;
        location.offsetOldX = location.offsetOldX ? location.offsetOldX : 0;
        location.startX = e.originalEvent.targetTouches[0].pageX;
        location.startTime = new Date() * 1;
        location.move = 0;
      };
      var moveTouch = function(e) {
        e.preventDefault();
        location.offsetX = e.originalEvent.targetTouches[0].pageX - location.startX + location.offsetOldX;
        _this.data.ul.css({
          transform: 'translateX(' + location.offsetX + 'px)'
        });
        location.move = e.originalEvent.targetTouches[0].pageX - location.startX;
      };
      var endTouch = function(e) {
        var boundary = _this.data.docuW / 6;
        if (Math.abs(location.move) > boundary) {
          //需要翻页
          if (location.move > 0) {
            //前页
            var offsetEnd = location.offsetOldX + _this.data.docuW;
          } else if (location.move < 0) {
            //后页
            var offsetEnd = location.offsetOldX - _this.data.docuW;
          }
        } else {
          //不需要翻页
          var offsetEnd = location.offsetOldX;
        }
        if (offsetEnd > 0) {
          offsetEnd = 0;
        };
        if (offsetEnd < -(_this.data.listLen - 1) * _this.data.docuW) {
          offsetEnd = -(_this.data.listLen - 1) * _this.data.docuW;
        }
        _this.data.ul.css({
          transform: 'translateX(' + offsetEnd + 'px)'
        });
        location.offsetOldX = offsetEnd; //更新位置信息
      }
      _this.data.ul.on('touchstart', startTouch);
      _this.data.ul.on('touchmove', moveTouch);
      _this.data.ul.on('touchend', endTouch);
    }
  };




  window.picsShow = picsShow;
})(jQuery);
var list = [{
    height: 950,
    width: 800,
    img: "imgs/1.jpg"
  },
  {
    height: 4970,
    img: "imgs/8.jpg",
    width: 1080
  },
  {
    height: 1187,
    width: 900,
    img: "imgs/2.jpg"
  },
  {
    height: 766,
    width: 980,
    img: "imgs/3.jpg"
  },
  {
    height: 754,
    width: 980,
    img: "imgs/4.jpg"
  },
  {
    height: 493,
    img: "imgs/5.jpg",
    width: 750
  },
  {
    height: 500,
    img: "imgs/6.jpg",
    width: 750
  },
  {
    height: 600,
    img: "imgs/7.jpg",
    width: 400
  }
];
new picsShow({
  obj: $('#list'),
  list: list
})
