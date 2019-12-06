var getFlag = function (id) {
  return document.getElementById(id);
}
var extend = function (des, src) {
  for (p in src) {
    des[p] = src[p];
  }
  return des;
}
var clss = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
//小球构造函数，传入小球大小和样式
var Ball = function (diameter, classn) {
  var ball = document.createElement("div");
  //设置样式
  ball.className = classn;
  with (ball.style) {
    width = height = diameter + 'px';
    position = 'absolute';
  }
  return ball;
}
//放容器（inner）构造函数
var Screen = function (cid, config) {
  var self = this;
  if (!(self instanceof Screen)) {
    return new Screen(cid, config)
  }
  config = extend(Screen.Config, config)
  self.container = getFlag(cid);
  //小球个数
  self.ballsnum = config.ballsnum;
  //大小
  self.diameter = 60;
  //圆角
  self.radius = self.diameter / 2;
  self.spring = config.spring;
  self.bounce = config.bounce;
  self.gravity = config.gravity;
  //所有小球
  self.balls = [];
  self.timer = null;
  //容器边界
  self.L_bound = 0;
  self.R_bound = self.container.clientWidth-self.diameter;
  self.T_bound = 0;
  self.B_bound = self.container.clientHeight-self.diameter;
};
//默认配置
Screen.Config = {
  ballsnum: 10,
  //速度
  spring: 0.8,
  //改变方向
  bounce: -0.9,
  //垂直加速度
  gravity: 0.05
};
Screen.prototype = {
  //初始化
  initialize: function () {
    var self = this;
    self.createBalls();
    self.timer = setInterval(function () {
      self.hitBalls();
    }, 200)
  },
  //创建小球
  createBalls: function () {
    var self = this
      , num = self.ballsnum;
    var frag = document.createDocumentFragment();
    for (i = 0; i < num; i++) {
      var ball = new Ball(self.diameter, clss[i]);
      ball.diameter = self.diameter;
      ball.radius = self.radius;
      ball.style.left = (Math.random() * self.R_bound) + 'px';
      ball.style.top = (Math.random() * self.B_bound) + 'px';
      ball.vx = Math.random() * 6 - 3;
      ball.vy = Math.random() * 6 - 3;
      frag.appendChild(ball);
      self.balls[i] = ball;
    }
    self.container.appendChild(frag);
  },
  //碰撞
  hitBalls: function () {
    var self = this
      , num = self.ballsnum
      , balls = self.balls;
    for (i = 0; i < num - 1; i++) {
      var ball1 = self.balls[i];
      ball1.x = ball1.offsetLeft + ball1.radius;
      ball1.y = ball1.offsetTop + ball1.radius;
      for (j = i + 1; j < num; j++) {
        console.log('111111111');
        var ball2 = self.balls[j];
        ball2.x = ball2.offsetLeft + ball2.radius;
        ball2.y = ball2.offsetTop + ball2.radius;
        dx = ball2.x - ball1.x;
        dy = ball2.y - ball1.y;
        //两球中心点的距离
        var dist = Math.sqrt(dx * dx + dy * dy);
        //两球的半径和
        var misDist = ball1.radius + ball2.radius;
        //两球距离小于两球半径和改变移动方向
        if (dist < misDist) {
          var angle = Math.atan2(dy, dx);
          tx = ball1.x + Math.cos(angle) * misDist;
          ty = ball1.y + Math.sin(angle) * misDist;
          ax = (tx - ball2.x) * self.spring;
          ay = (ty - ball2.y) * self.spring;
          ball1.vx -= ax;
          ball1.vy -= ay;
          ball2.vx += ax;
          ball2.vy += ay;
        }
      }
    }
    for (i = 0; i < num; i++) {
      self.moveBalls(balls[i]);
    }
  },
  //移动小球
  moveBalls: function (ball) {
    var self = this;
    ball.vy += self.gravity;
    ball.style.left = (ball.offsetLeft + ball.vx) + 'px';
    ball.style.top = (ball.offsetTop + ball.vy) + 'px';
    var L = self.L_bound
      , R = self.R_bound
      , T = self.T_bound
      , B = self.B_bound
      , BC = self.bounce;
    //计算碰壁
    if (ball.offsetLeft < L) {
      ball.style.left = L;
      ball.vx *= BC;
    } else if (ball.offsetLeft + ball.diameter > R) {
      ball.style.left = (R - ball.diameter) + 'px';
      ball.vx *= BC;
    } else if (ball.offsetTop < T) {
      ball.style.top = T;
      ball.vy *= BC;
    }else if (ball.offsetTop + ball.diameter > B) {
      ball.style.top = (B - ball.diameter) + 'px';
      ball.vy *= BC;
    }
  }
}
//页面加载时
window.onload = function () {
  var sc = null;
  // document.getElementById("inner").innerHTML = '';
  // sc = new Screen('inner', {
  //   ballsnum: 10,
  //   spring: 0.3,
  //   bounce: -0.9,
  //   gravity: 0.01
  // });
  // sc.initialize();
  //开始
  getFlag('start').onclick = function () {
    document.getElementById("inner").innerHTML = '';
    sc = new Screen('inner', {
      ballsnum: 10,
      spring: 0.9,
      bounce: -1,
      gravity: 0.01
    });
    sc.initialize();
  }
  //停止
  getFlag('stop').onclick = function () {
    clearInterval(sc.timer);
  }
}
