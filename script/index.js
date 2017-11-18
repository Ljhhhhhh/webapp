/**
 * @Date:   2017-11-16T18:29:34+08:00
 * @Last modified time: 2017-11-17T13:25:06+08:00
 */
$(function() {
  var list = [{
      height: 950,
      width: 800,
      img: "imgs/1.jpg"
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
    },
    {
      height: 4970,
      img: "imgs/8.jpg",
      width: 1080
    }
  ];

  function Slider(opts) {
    this.wrap = opts.dom;
    this.list = opts.list;
    this.init();
    this.renderDOM();
    this.bindDOM();
  };
  Slider.prototype.init = function() {
    //算出窗口长宽比
    this.radio = window.innerHeight / window.innerWidth;
    //
    this.scaleW = window.innerWidth;
    //当前图片的索引
    this.index = 0;
  }
  Slider.prototype.renderDOM = function() {
    var wrap = this.wrap;
    var data = this.list;
    var len = data.length;
    var scale = this.scaleW;
    this.outer = document.createElement('ul');
    for (var i = 0; i < len; i++) {
      var item = data[i];
      var li = document.createElement('li');
      if (item) {
        if (item['height'] / item['width'] > this.radio) {
          li.innerHTML = '<img height="' + window.innerHeight + '" src="' + item['img'] + '">'
        } else {
          li.innerHTML = '<img width="' + window.innerWidth + '" src="' + item['img'] + '">'
        }
      }
      li.style.transform = 'translate3d(' + i * scale + 'px,0,0)';
      this.outer.appendChild(li);
    }
    wrap.style.height = window.innerHeight + 'px';
    wrap.appendChild(this.outer);
  };
  Slider.prototype.bindDOM = function() {
    var self = this;
    var scale = self.scaleW;
    var outer = self.outer;
    var len = self.list.length;
    var startHandler = function(evt) {
      self.startX = evt.touches[0].pageX;
      self.offsetX = 0;
      self.startTime = new Date() * 1;
    };
    var moveHandler = function(evt) {
      evt.preventDefault();
      self.offsetX = evt.touches[0].pageX - self.startX;
      var lis = outer.getElementsByTagName('li');
      var i = self.index - 1;
      var m = i+3;
      for (i; i < m; i++) {
        lis[i] && (lis[i].style.transform = 'translate3d(' + ((i - self.index) * scale + self.offsetX) + 'px,0,0)');
        lis[i] && (lis[i].style.transition='none');
      }
    };
    var endHandler = function(evt) {
      var boundary=scale/6;
      var endTime=new Date()*1;
      var lis = outer.getElementsByTagName('li');
      if(endTime-self.startTime>800){
        if(self.offsetX>=boundary){
          //进入上一张
          self.go('-1');
        }else if(self.offsetX<-boundary){
          //进入下一页
          self.go('+1');
        }else {
          //留在本页
          self.go('0');
        }
      }else {
        //快速操作
        if(self.offsetX>50){
          self.go('-1');
        }else if(self.offsetX<-50){
          self.go('+1');
        }else {
          self.go('0');
        }
      }
    };
    outer.addEventListener('touchstart', startHandler);
    outer.addEventListener('touchmove', moveHandler);
    outer.addEventListener('touchend', endHandler);
  };
  Slider.prototype.go=function(n){
    var index=this.index;
    var Cindex;
    var lis=this.outer.getElementsByTagName('li');
    var len=lis.length;
    var scale=this.scaleW;
    if(typeof n=='number'){
      Cindex=index;
    }else if(typeof n=='string'){
      Cindex=index+n*1;
    }
    //当索引右边超出
    if(Cindex>len-1){
      Cindex=len-1;
    }else if(Cindex<0){
      Cindex=0;
    }
    this.index=Cindex;
    lis[Cindex].style.transition='transform 0.3s ease-out';
    lis[Cindex-1] && (lis[Cindex-1].style.transition='transform 0.3s ease-out');
    lis[Cindex+1] && (lis[Cindex+1].style.transition='transform 0.3s ease-out');
    lis[Cindex].style.transform='translate3d(0,0,0)';
    lis[Cindex-1] &&(lis[Cindex-1].style.transform='translate3d(-'+scale+'px,0,0)');
    lis[Cindex+1] &&(lis[Cindex+1].style.transform='translate3d('+scale+'px,0,0)');

  }
  new Slider({
    'dom': document.getElementById('canvas'),
    'list': list
  });
})
