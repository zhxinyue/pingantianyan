// index.js
import {
  $popularCity,
  $matchCity
} from '../../utils/api'

// 获取应用实例
const app = getApp()

Page({
  data: {
    cityName: '',
    popFlag: false,
    popularCityList: [],
    matchCityList: []
  },

  onLoad() {
    // 获取热点城市
    $popularCity().then(res => {
      console.log(res.data)
      this.setData({
        popularCityList: res.data.popularCityArray
      })
    })
  },

  getCityNameVal(e) {
    console.log(e.detail.value)
    this.setData({
      cityName: e.detail.value
    })
    e.detail.value && this.matchCity(e.detail.value)
  },
  matchCity(value) {
    $matchCity(value).then(res => {
      console.log(res)
        this.setData({
          matchCityList: res.data.cityListArray || []
        })
    })
  },

  delIptVal() {
    this.setData({
      cityName: ''
    })
  },
  searchIptVal(e) {
    const item = e.currentTarget.dataset.item
    wx.setStorageSync('item', JSON.stringify(item))
    if (this.data.cityName == '') {
      this.setData({
        popFlag: !this.data.popFlag
      })
    } else {
      wx.navigateTo({
        url: `/pages/citydetail/citydetail`
      })
    }

  },
  closePopup() {
    this.setData({
      popFlag: !this.data.popFlag
    })
  }
})