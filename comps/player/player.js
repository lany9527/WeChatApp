var config = {
  data: {
    text: "Page player",
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
};

var targetObj = undefined;
var targetCallback = undefined; // 完成回调

// main
function player(that, info, callback = function () { }) {
  // var
  targetObj = info;
  targetCallback = callback;
  // 挂载函数
  that.playerInputBindTapView = playerInputBindTapView;
  that.playerInputBindTapNext = playerInputBindTapNext;
  that.playerInputBindNick = playerInputBindNick;
  // console.log(that.data);

  // 格式化数据
  // console.log(info);
  var update = {};
  // 用户确认
  if (info.playerIdx == undefined) {
    info.playerIdx = 0;
  }
  // 显示用户信息
  info.playerShow = false;

  // update
  update[info.key] = info;
  that.setData(update);
};

//
function updateView(that) {
  var update = {};
  update[targetObj.key] = that.data[targetObj.key];
  that.setData(update);
}

// 输入昵称
function playerInputBindNick(event) {
  var d = this.data[targetObj.key];
  this.data[d.key].player[d.playerIdx].nick = event.detail.value;
  updateView(this);
}

// 玩家查看身份
function playerInputBindTapView() {
  this.data[targetObj.key].playerShow = !this.data[targetObj.key].playerShow;
  updateView(this);
}

// 传给下一个玩家
function playerInputBindTapNext() {
  if (this.data[targetObj.key].playerIdx < this.data[targetObj.key].player.length - 1) {
    this.data[targetObj.key].playerIdx += 1;
    this.data[targetObj.key].playerShow = false;
    updateView(this);
  } else {
    // 交给法官
    if (targetCallback != undefined) {
      targetCallback();
    }
  }
}

module.exports = {
  player: player,
}

// Page(config);