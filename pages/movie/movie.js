import apiService from '../../services/api.service'
import util from '../../utils/util'

Page({
  data:{
    movies: [],
    lastId: 0
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.getMovies()
  },
  onReady:function(){
    // 页面渲染完成
    wx.setNavigationBarTitle({
      title: '电影'
    })
  },
  getMovies: function () {
    let lastId = this.data.lastId
    if (lastId >= 0) {
      apiService.getMovieListById({
        query: {
          id: lastId
        },
        success: (res) => {
          if (res.data.res === 0) {
            let moreMovies = res.data.data
            let length = moreMovies.length
            let lastId = length ? moreMovies[length - 1].id : -1

            let movies = this.data.movies.concat(moreMovies)
            this.setData({ movies, lastId })
          }
        }
      })
    }
  }
})