var config = {
  data: {
    text: "Page input-smart"
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
  },
};

// main
function inputSmart(that, callback = function () { }) {
  // 挂载函数
  that.inputSmartValueAdd = inputSmartValueAdd;
  that.inputSmartValueSub = inputSmartValueSub;
  that.inputSmartCallback = callback;
};

// 加法
function inputSmartValueAdd(event) {
  var key = event.target.dataset.bindValue;
  var max = undefined;
  var opt = {
    method: "+",
    rollback: function () { },
    this: this,
  }
  if (this.data[key] && this.data[key].max != undefined) {
    max = this.data[key].max;
  }
  if (this.data[key] && this.data[key].value != undefined) {
    if (max != undefined && this.data[key].value >= max) {
      return
    } else {
      var newData = {};
      this.data[key].value += 1;
      newData[key] = this.data[key];
      this.setData(newData);
      opt.rollback = function () {
        var _newData = {};
        opt.this.data[key].value -= 1;
        _newData[key] = opt.this.data[key];
        opt.this.setData(_newData);
      };
      this.inputSmartCallback(key, this.data[key].value, opt);
    }
  }
};

// 减法
function inputSmartValueSub(event) {
  var key = event.target.dataset.bindValue;
  var min = undefined;
  var opt = {
    method: "-",
    this: this,
    rollback: function () { },
  }
  if (this.data[key] && this.data[key].min != undefined) {
    min = this.data[key].min
  }
  if (this.data[key] && this.data[key].value) {
    if (min != undefined && this.data[key].value <= min) {
      return
    } else {
      var newData = {};
      this.data[key].value -= 1;
      newData[key] = this.data[key];
      this.setData(newData);
      opt.rollback = function () {
        var _newData = {};
        opt.this.data[key].value += 1;
        _newData[key] = opt.this.data[key];
        opt.this.setData(_newData);
      };
      this.inputSmartCallback(key, this.data[key].value, opt);
    }
  }
};

module.exports = {
  inputSmart: inputSmart,
}
// Page(config);