import apiService from '../../../services/api.service'
import util from '../../../utils/util'

Page({
  data:{
    text:"Page question"
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    apiService.getQuestionById({
      query: {
        id: options.id
      },
      success: (res) => {
        if (res.data.res === 0) {
          let question = res.data.data
          question.answer_content = util.filterContent(question.answer_content)
          question.question_makettime = util.formatMakettime(question.question_makettime)
          this.setData({ question })
        }
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
    wx.setNavigationBarTitle({
      title: '问题'
    })
  }
})