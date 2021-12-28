// pages/news/news.js
import {
  $queryBanner
} from '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsList: [{}, {}],
    countryList:[{}, {},{}, {},{}, {},{}, {},{}, {},{}, {},{}, {},{}, {},],
    pageInfo: {
      pageIndex: 1,
      pageLimit: 10
    },
    popFlag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getList() {
    $queryBanner().then(res => {
      this.setData({
        bannerList: res.data
      })
    })
  },
  // 显示关闭选择国家弹窗
  togglePop() {
    this.setData({
      popFlag: !this.data.popFlag
    })
  },
  toPath(e) {
    const path = e.currentTarget.dataset.path
    wx.navigateTo({
      url: `/pages/${path}/${path}`
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})