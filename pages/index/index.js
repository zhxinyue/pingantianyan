// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    cityName: ''
  },

  onLoad() {

  },
  getCityNameVal(e) {
    this.setData({
      cityName: e.detail.value
    })
  },
  delIptVal() {
    this.setData({
      cityName: ''
    })
  },
  searchIptVal() {

  }
})