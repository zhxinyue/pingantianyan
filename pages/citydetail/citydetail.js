// pages/citydetail/citydetail.js
// 天气图片  wc000000001：多云  wc000000002：晴 wc000000003：雨  wc000000008：雪
import * as echarts from '../../ec-canvas/echarts';
import {
  $getCityScore,
  $getCityWeather,
  $getCountryIntro,
  $getEventNews
} from '../../utils/api'
let a = null
let b = null
let c = null
let d = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityItem: {},
    cityDetail: {},
    eventArray: [],
    newsArray: [],
    countryData: {},
    weatherData: {},
    cityName: '',
    sfatyList: [{
      scoName: '综合安全'
    }],
    sfatyActive: 0,
    infoList: [],
    infoActive: 0,
    sfatyInfo: [{}, {}, {}],
    yearDataShow: [],
    toggleFlag: true,
    toggleInfoFlag: true,
    //echarts数据
    ecRadar: {
      // onInit: initChartRadar
    },
    ecLine: {
      // onInit: initChartLine
    },
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cityItem:JSON.parse(wx.getStorageSync('item'))
    })
    // this.setData({
    //   cityItem: {
    //     "stateNameCn": "大西洋省",
    //     "stateNameEn": "Atlantic Province",
    //     "cityNameCn": "巴兰基亚",
    //     "countryNameCn": "哥伦比亚",
    //     "cityNameEn": "Barranquilla",
    //     "cityId": "ct20210913150614308",
    //     "countryId": "cou20210913102854014",
    //     "countryNameEn": "Colombia"
    //   }
    // })
    wx.setNavigationBarTitle({
      title: this.data.cityItem.cityNameCn
    })
    this.getCityWeather()
    this.getCountryIntro()
  },
  getCityWeather() {
    $getCityWeather(this.data.cityItem.cityId).then(res => {
      this.setData({
        weatherData: res.data,
        yearDataShow: res.data.cwRainfall.slice(0, 7)
      })
    })
  },
  getCountryIntro() {
    $getCountryIntro(this.data.cityItem.countryId).then(res => {
      const info = [{
        name: '国家概况',
        content: res.data.countryBaseInfo.replace(/style="display: none;"/g, '')
      }, {
        name: '入境居留',
        content: res.data.countryEntryResidence.replace(/style="display: none;"/g, '')
      }, {
        name: '安全保护',
        content: res.data.countrySafeguard.replace(/style="display: none;"/g, '')
      }, {
        name: '交通出行',
        content: res.data.countryTransportation.replace(/style="display: none;"/g, '')
      }, {
        name: '物价医疗',
        content: res.data.countryPriceMedical.replace(/style="display: none;"/g, '')
      }, {
        name: '实用信息',
        content: res.data.countryPracticalInfo.replace(/style="display: none;"/g, '')
      }, {
        name: '使馆信息',
        content: res.data.countryEmbassyInfo.replace(/style="display: none;"/g, '')
      }]
      this.setData({
        infoList: info
      })
    })
  },
  getEventNews(scoId) {
    $getEventNews(scoId, this.data.cityItem.cityId).then(res => {
      this.setData({
        eventArray: res.data.eventArray,
        newsArray: res.data.newsArray
      })
      a && initChartLine(a, b, c, d, res.data.eventArray)
    })
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

  },
  chooseSfaty(e) {
    this.setData({
      sfatyActive: e.target.dataset.index
    })
    const scoId = e.target.dataset.scoid
    e.target.dataset.index != 0 && this.getEventNews(scoId)
  },
  chooseInfo(e) {
    this.setData({
      infoActive: e.target.dataset.index
    })
  },
  toggleYear() {
    this.setData({
      toggleFlag: !this.data.toggleFlag
    })
    if (this.data.toggleFlag) {
      this.setData({
        yearDataShow: this.data.weatherData.cwRainfall.slice(0, 7)
      })
    } else {
      this.setData({
        yearDataShow: this.data.weatherData.cwRainfall
      })
    }
  },
  toggleInfo() {
    this.setData({
      toggleInfoFlag: !this.data.toggleInfoFlag
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
  async echartInitRadar(e) {
    if (this.data.cityDetail.ScoreGrade) { // 已经获取到数据
      return
    }
    const res = await $getCityScore(this.data.cityItem.cityId)
    const array = JSON.parse(JSON.stringify(this.data.sfatyList)).concat(res.data.citySafetyArray)
    this.setData({
      cityDetail: res.data,
      sfatyList: array
    })
    this.data.cityDetail.citySafetyArray?.length && initChartRadar(e.detail.canvas, e.detail.width, e.detail.height, e.detail.dpr, this.data.cityDetail.citySafetyArray);
  },
  echartInitLine(e) {
    a = e.detail.canvas
    b = e.detail.width
    c = e.detail.height
    d = e.detail.dpr
    e.target.dataset.record && initChartLine(a, b, c, d, e.target.dataset.record)
  },
})
// 雷达图
function initChartRadar(canvas, width, height, dpr, recordData) {
  console.log('recordData-----' + recordData)
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);
  const indicatorList = recordData?.map((item) => {
    return {
      name: item.scoName,
      min: 0,
      max: 100
    }
  })
  const seriesData = recordData?.map((item) => {
    return item.cityScore < 0 ? 0 : item.cityScore
  })
  var option = {
    backgroundColor: "#ffffff",
    color: "#07466F",
    xAxis: {
      show: false
    },
    yAxis: {
      show: false
    },
    radar: {
      indicator: indicatorList,
      name: {
        textStyle: {
          color: '#6B6B6B'
        }
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ["#fff"] // 图表背景网格的颜色
        }
      },
    },
    series: [{
      type: 'radar',
      data: [{
        value: seriesData
      }]
    }]
  };
  option.radar.indicator[0].axisLabel = {
    show: true,
    fontSize: 12,
    color: '#ccc',
    showMaxLabel: true, //不显示最大值，即外圈不显示数字
    showMinLabel: true, //显示最小数字，即中心点显示0
  }
  chart.setOption(option);
  return chart;
}
// 折线图
function initChartLine(canvas, width, height, dpr, recordData) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  const xAxisData = recordData?.map((item) => {
    return item.sctName
  })
  console.log(xAxisData.length)
  const seriesData = recordData?.map((item) => {
    return item.safetyClassificationEventNum
  })
  var option = {
    title: {
      subtext: '（近一年发生的次数)'
    },
    color: "#07466F",
    grid: {
      containLabel: false
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisLabel: {
        textStyle: {
          color: '#6B6B6B',
          fontSize: 12
        },
        interval: 0,
        formatter: function (value) {
          var str = "";
          var num =xAxisData.length>8?1:2; //每行显示字数 
          var valLength = value.length; //该项x轴字数  
          var rowNum = Math.ceil(valLength / num); // 行数  
          if (rowNum > 1) {
            for (var i = 0; i < rowNum; i++) {
              var temp = "";
              var start = i * num;
              var end = start + num;
              temp = value.substring(start, end) + "\n";
              str += temp;
            }
            return str;
          } else {
            return value;
          }
        }
      }
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'solid'
        }
      }
      // show: false
    },
    series: [{
      name: 'A',
      type: 'line',
      data: seriesData
    }]
  };

  chart.setOption(option);
  return chart;
}