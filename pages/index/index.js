// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    cityName: '',
    popFlag:false
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
    if(this.data.cityName==''){
      this.setData({
        popFlag:!this.data.popFlag
      })
    }else{
       wx.navigateTo({
      url: `/pages/citydetail/citydetail`
    })
    }
   
  },
  closePopup(){
    this.setData({
      popFlag:!this.data.popFlag
    })
  }
})