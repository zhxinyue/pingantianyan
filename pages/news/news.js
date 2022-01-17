// pages/news/news.js
import { $getEvents } from '../../utils/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    eventArray:[],
    activeCity:'',
    popFlag: false,
    popFlag2: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getEvents()
  },
  getEvents() {
    $getEvents().then(res => {
      console.log(res.data)
      this.setData({
        eventArray: res.data.eventArray
      })
    })
  },
  // 显示关闭选择国家弹窗
  togglePop() {
    if(!this.data.eventArray){
      this.setData({
        popFlag2: !this.data.popFlag2
      })
    }else{
    this.setData({
      popFlag: !this.data.popFlag
    })
  }
  },
  chooseCity(e){
    this.setData({
      activeCity: e.currentTarget.dataset.cityid,
      popFlag: !this.data.popFlag
    })
  },
  toPath(e) {
    const path = e.currentTarget.dataset.path
    const detail = e.currentTarget.dataset.detail
    wx.setStorageSync('detail', JSON.stringify(detail))
    wx.navigateTo({
      url: `/pages/${path}/${path}`
    })
  },
  closePopup() {
    this.setData({
      popFlag2: !this.data.popFlag2
    })
  }
})