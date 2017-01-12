import apiService from '../../../services/api.service'
import util from '../../../utils/util'

Page({
  data:{
    text:"Page serial"
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数\
    apiService.getSerialById({
      query: {
        id: options.id
      },
      success: (res) => {
        if (res.data.res === 0) {
          let serial = res.data.data
          serial.content = util.filterContent(serial.content)
          serial.maketime = util.formatMakettime(serial.maketime)
          this.setData({ serial })
        }
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
    wx.setNavigationBarTitle({
      title: '连载'
    })
  }
})