// pages/news/news.js
import { $getEvents } from '../../utils/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    eventArray:[],
    activeCity:'',
    popFlag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getEvents()
  },
  getEvents() {
  //   const res = {
  //     "code":0,
  //     "data":{
  //         "eventArray":[
  //             {
  //                 "sceHappenDate":"2022-01-10",
  //                 "stateNameCn":"纽约州",
  //                 "cityNameCn":"纽约",
  //                 "stateId":"sta20210913125253424",
  //                 "scoName":"自然灾害",
  //                 "countryNameCn":"美国",
  //                 "scoId":"sco01",
  //                 "cityId":"ct20210913150658404",
  //                 "sctId":"sct002",
  //                 "sctName":"火灾",
  //                 "newsArray":[
  //                     {
  //                         "snId":"sn5027e1eb-4ca3-4e0f-a97a-31557e005b57",
  //                         "snTitle":"美国纽约一公寓楼发生火灾造成至少19人死亡",
  //                         "snUrlLink":"https://news.cctv.com/2022/01/10/ARTIeStkNvki7k1CELPNLpHS220110.shtml",
  //                         "snSource":"新华网",
  //                         "snKeyword":"[美国, 一栋, 发生, 亚当斯, 纽约, 受伤, 美国纽约, 死亡, 9日, 纽约市, 19人, 发生在, 9名, 1月9日, 19层, 63人, 火灾, 布朗]",
  //                         "snContent":"　　新华社纽约1月9日电（记者尚绪谦）美国纽约市一栋公寓楼9日发生火灾，造成至少19人死亡，其中包括9名儿童。 　　据美国媒体报道，火灾于9日上午发生在纽约市布朗克斯区一栋19层公寓楼。纽约市长埃里克·亚当斯对媒体说，已证实火灾造成19人死亡、63人受伤，其中一些人情况危急。这是纽约市最严重的火灾之一。 　　据报道，约200名消防员前往现场灭火。伤者已被送到5家医院进行治疗。 　　纽约市消防局局长丹尼尔·尼格罗说，火灾始于公寓楼内位于二三层的一套复式公寓，由于该公寓房门敞开，火势迅速蔓延，消防员在各个楼层均发现伤者。火灾原因正在调查中。 　　本月5日，美国宾夕法尼亚州费城一栋公寓楼曾发生火灾，造成13人死亡、2人受伤。",
  //                         "snCKontent":null,
  //                         "snIssuetime":"2022-01-10 08:10:27",
  //                         "snCreatetime":"2022-01-10 10:29:52"
  //                     },{
  //                         "snId":"sn5027e1eb-4ca3-4e0f-a97a-31557e005b58",
  //                         "snTitle":"美国一华盛顿华盛顿华盛顿华盛顿华盛顿华盛顿华盛顿华盛顿华盛顿华盛顿",
  //                         "snUrlLink":"https://news.cctv.com/2022/01/10/ARTIeStkNvki7k1CELPNLpHS220110.shtml",
  //                         "snSource":"新华网",
  //                         "snKeyword":"[美国, 一栋, 发生, 亚当斯, 纽约, 受伤, 美国纽约, 死亡, 9日, 纽约市, 19人, 发生在, 9名, 1月9日, 19层, 63人, 火灾, 布朗]",
  //                         "snContent":"　　新华社纽约1月9日电（记者尚绪谦）美国纽约市一栋公寓楼9日发生火灾，造成至少19人死亡，其中包括9名儿童。 　　据美国媒体报道，火灾于9日上午发生在纽约市布朗克斯区一栋19层公寓楼。纽约市长埃里克·亚当斯对媒体说，已证实火灾造成19人死亡、63人受伤，其中一些人情况危急。这是纽约市最严重的火灾之一。 　　据报道，约200名消防员前往现场灭火。伤者已被送到5家医院进行治疗。 　　纽约市消防局局长丹尼尔·尼格罗说，火灾始于公寓楼内位于二三层的一套复式公寓，由于该公寓房门敞开，火势迅速蔓延，消防员在各个楼层均发现伤者。火灾原因正在调查中。 　　本月5日，美国宾夕法尼亚州费城一栋公寓楼曾发生火灾，造成13人死亡、2人受伤。",
  //                         "snCKontent":null,
  //                         "snIssuetime":"2022-01-10 08:10:27",
  //                         "snCreatetime":"2022-01-10 10:29:52"
  //                     }
  //                 ],
  //                 "countryId":"cou20210913102855592"
  //             },
  //             {
  //                 "sceHappenDate":"2022-01-10",
  //                 "stateNameCn":"纽约州",
  //                 "cityNameCn":"东京",
  //                 "stateId":"sta20210913125253425",
  //                 "scoName":"自然灾害",
  //                 "countryNameCn":"日本",
  //                 "scoId":"sco01",
  //                 "cityId":"ct20210913150658405",
  //                 "sctId":"sct002",
  //                 "sctName":"火灾",
  //                 "newsArray":[
  //                     {
  //                         "snId":"sn5027e1eb-4ca3-4e0f-a97a-31557e005b57",
  //                         "snTitle":"日本日本日本日本日本市长埃里克·亚当斯对媒日本日本日本日本日本日本日本日本日本",
  //                         "snUrlLink":"https://news.cctv.com/2022/01/10/ARTIeStkNvki7k1CELPNLpHS220110.shtml",
  //                         "snSource":"新华网",
  //                         "snKeyword":"[美国, 一栋, 发生, 亚当斯, 纽约, 受伤, 美国纽约, 死亡, 9日, 纽约市, 19人, 发生在, 9名, 1月9日, 19层, 63人, 火灾, 布朗]",
  //                         "snContent":"　　新华社纽约1月9日电（记者尚绪谦）美国纽约市一栋公寓楼9日发生火灾，造成至少19人死亡，其中包括9名儿童。 　　据美国媒体报道，火灾于9日上午发生在纽约市布朗克斯区一栋19层公寓楼。纽约市长埃里克·亚当斯对媒体说，已证实火灾造成19人死亡、63人受伤，其中一些人情况危急。这是纽约市最严重的火灾之一。 　　据报道，约200名消防员前往现场灭火。伤者已被送到5家医院进行治疗。 　　纽约市消防局局长丹尼尔·尼格罗说，火灾始于公寓楼内位于二三层的一套复式公寓，由于该公寓房门敞开，火势迅速蔓延，消防员在各个楼层均发现伤者。火灾原因正在调查中。 　　本月5日，美国宾夕法尼亚州费城一栋公寓楼曾发生火灾，造成13人死亡、2人受伤。",
  //                         "snCKontent":null,
  //                         "snIssuetime":"2022-01-10 08:10:27",
  //                         "snCreatetime":"2022-01-10 10:29:52"
  //                     }
  //                 ],
  //                 "countryId":"cou20210913102855593"
  //             },
  //             {
  //                 "sceHappenDate":"2022-01-10",
  //                 "stateNameCn":"纽约州",
  //                 "cityNameCn":"堪培拉",
  //                 "stateId":"sta20210913125253426",
  //                 "scoName":"自然灾害",
  //                 "countryNameCn":"澳大利亚",
  //                 "scoId":"sco01",
  //                 "cityId":"ct20210913150658406",
  //                 "sctId":"sct002",
  //                 "sctName":"火灾",
  //                 "newsArray":[
  //                     {
  //                         "snId":"sn5027e1eb-4ca3-4e0f-a97a-31557e005b57",
  //                         "snTitle":"堪培拉亡道，约200名消防员前往现场道，约200名消防员前往现场道，约200名消防员前往现场",
  //                         "snUrlLink":"https://news.cctv.com/2022/01/10/ARTIeStkNvki7k1CELPNLpHS220110.shtml",
  //                         "snSource":"新华网",
  //                         "snKeyword":"[美国, 一栋, 发生, 亚当斯, 纽约, 受伤, 美国纽约, 死亡, 9日, 纽约市, 19人, 发生在, 9名, 1月9日, 19层, 63人, 火灾, 布朗]",
  //                         "snContent":"　　新华社纽约1月9日电（记者尚绪谦）美国纽约市一栋公寓楼9日发生火灾，造成至少19人死亡，其中包括9名儿童。 　　据美国媒体报道，火灾于9日上午发生在纽约市布朗克斯区一栋19层公寓楼。纽约市长埃里克·亚当斯对媒体说，已证实火灾造成19人死亡、63人受伤，其中一些人情况危急。这是纽约市最严重的火灾之一。 　　据报道，约200名消防员前往现场灭火。伤者已被送到5家医院进行治疗。 　　纽约市消防局局长丹尼尔·尼格罗说，火灾始于公寓楼内位于二三层的一套复式公寓，由于该公寓房门敞开，火势迅速蔓延，消防员在各个楼层均发现伤者。火灾原因正在调查中。 　　本月5日，美国宾夕法尼亚州费城一栋公寓楼曾发生火灾，造成13人死亡、2人受伤。",
  //                         "snCKontent":null,
  //                         "snIssuetime":"2022-01-10 08:10:27",
  //                         "snCreatetime":"2022-01-10 10:29:52"
  //                     }
  //                 ],
  //                 "countryId":"cou20210913102855594"
  //             }
  //         ],
  //         "eventNum":1
  //     },
  //     "success":true,
  //     "message":"获取数据成功！"
  // }
    $getEvents().then(res => {
      console.log(res.data)
      this.setData({
        eventArray: res.data.eventArray
      })
    })
  },
  // 显示关闭选择国家弹窗
  togglePop() {
    this.setData({
      popFlag: !this.data.popFlag
    })
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

 
})