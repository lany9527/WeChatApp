import apiService from '../../services/api.service'

Page({
  data:{
    carousel: [],
    articles: {},
    current: 0
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    apiService.getCarousel({
      success: (res) => {
        // console.log(res);
        if(res.data.res === 0) {
          let carousel = res.data.data;
          this.setData({carousel});
        }
      }
    })

    apiService.getLastArticles({
      success: (res) => {
        if (res.data.res === 0) {
          let articles = res.data.data;
          this.setData({articles});
        }
      }
    })

  },
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

  // 点击跳转
  tapEssay: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'essay/essay?id=' + id
    })
  },
  tapSerial: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'serial/serial?id=' + id
    })
  },
  tapQuestion: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'question/question?id=' + id
    })
  }
})