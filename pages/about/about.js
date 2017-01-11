//获取应用实例
var app = getApp()

Page({
  data:{
    text:"雨纷纷 旧故里草木深 "
  },
  onLoad:function(options){
    // console.log(options);
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
  	//调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      // console.log(userInfo);
      //更新数据
      that.setData({
        userInfo:userInfo
      })
      that.update()
    })
  },
  bindKeyInput: function(e) {
    console.log(e);
    if(e.detail.value.length <= 10) {      
      this.setData({
        inputValue: e.detail.value
      })
    }else if(e.detail.value.length > 10){
      wx.showToast({
        title: '输入的数值长度过大',
        icon: 'success',
        duration: 2000
      })
      this.setData({
        inputValue: e.detail.value.substring(0,9)
      })
    }    
  }
  // onReady:function(){
  //   // 页面渲染完成
  // },
  // onShow:function(){
  //   // 页面显示
  // },
  // onHide:function(){
  //   // 页面隐藏
  // },
  // onUnload:function(){
  //   // 页面关闭
  // }
})


