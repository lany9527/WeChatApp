import {
  AUDIO_PLAY_TEXT,
  AUDIO_PLAY_IMG,
  AUDIO_PAUSE_TEXT,
  AUDIO_PAUSE_IMG
} from '../../../utils/constants'

import apiService from '../../../services/api.service'
import util from '../../../utils/util'
Page({
  data:{
    essay: {},
    audioBtn: {
      text: AUDIO_PLAY_TEXT,
      imgPath: AUDIO_PLAY_IMG
    }
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    apiService.getEssayById({
      query: {
        id: options.id
      },
      success: (res) => {
        if (res.data.res === 0) {
          let essay = res.data.data
          essay.hp_content = util.filterContent(essay.hp_content)
          essay.hp_makettime = util.formatMakettime(essay.hp_makettime)
          this.setData({ essay })
        }
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
    wx.setNavigationBarTitle({
      title: '短篇'
    })
  },
  togglePlay: function (e){
    console.log(e);
    let audio = this.data.essay.audio;
    let audioBtn = this.data.audioBtn;
    if (audioBtn.text === AUDIO_PLAY_TEXT) {
      audioBtn = {
        text: AUDIO_PAUSE_TEXT,
        imgPath: AUDIO_PAUSE_IMG
      }
      this.playAudio(audio)
    } else {
      audioBtn = {
        text: AUDIO_PLAY_TEXT,
        imgPath: AUDIO_PLAY_IMG
      }
      this.playAudio()
    }
    this.setData({ audioBtn })
  },
  playAudio: function(audio) {
    let title = this.data.essay.hp_title; 
    wx.playBackgroundAudio({
      dataUrl: audio,
      title: title
    })
  },
  pauseAudio: function () {
    wx.pauseBackgroundAudio()
  }
})