//index.js
import apiService from "../../services/api.service";
import util from '../../utils/util.js'
Page({
  data: {
    vols: [],
    current: 0,
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },
  onLoad: function () {
    // console.log('onLoad')
    apiService.getVolIdList({
      success: (res) => {
        // console.log(res);
        if (res.data.res === 0) {
          let idList = res.data.data
          this.getVols(idList)
        }
      }
    })
  },
  getVols: function (idList) {
    let vols = this.data.vols

    if (idList.length > 0) {
      apiService.getVolById({
        query: {
          id: idList.shift()
        },
        success: (res) => {
        // console.log(res);          
          if (res.data.res === 0) {
            let vol = res.data.data
            // console.log(vol);
            // vol.hp_makettime = util.formatMakettime(vol.hp_makettime)
            vols.push(vol)
          }
          this.getVols(idList)
        }
      })
    } else {
      this.setData({ vols })
    }
  },
  handelChange: function(){
    console.log("handelChange");
  }
})
