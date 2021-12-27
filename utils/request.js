
class Ajax {
  constructor() {
    this.baseUrl =''// 'https://prod-sbjb-user-api.peogoo.com' // 正式环境接口url  
    // this.baseUrl = 'http://10.1.1.31:8097' // 开发环境接口url
    //  this.baseUrl = 'https://test-sbjb-user-api.peogoo.com' // 测试环境接口url
    this.header = {}
    if (!wx.getStorageSync('token')) {
      this.getToken().then(token => {
        this.header.token = token
      })
    } else {
      this.header.token = wx.getStorageSync('token')
    }
  }

  showLoading() {
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
  }

  hideLoading() {
    wx.hideLoading()
  }

  errorTip(err) {
    wx.showToast({
      title: err.errMsg || err,
      duration: 1500,
      mask: true,
      icon: 'none'
    })
  }

  getToken() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: async ({ code }) => {
          const {
            data: { token, userId },
          } = await this.post({
            url: '/wechat/getWxUser',
            data: { code },
          })
          wx.setStorageSync('token', token)
          wx.setStorageSync('userId', userId)
          resolve(token)
        },
      })
    })
  }

  http(options) {
    options.loading = !('loading' in options) ?? true
    options.loading && this.showLoading()
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.baseUrl + options.url,
        data: options.data,
        header: this.header,
        method: options.method,
        success: res => {
          options.loading && this.hideLoading()
          if (options.err) {
            return resolve(res.data)
          }
          // 成功状态码 200
          if (res.data.code !== 200) {
            return this.errorTip(res.data.message || res.errMsg)
          }
          resolve(res.data)
        },
        fail: err => {
          options.loading && this.hideLoading()
          this.errorTip(err || '服务器异常')
        },
      })
    })
  }

  post(options) {
    options.method = 'POST'
    return this.http(options)
  }

  get(options) {
    options.method = 'GET'
    return this.http(options)
  }
}

export default new Ajax()
