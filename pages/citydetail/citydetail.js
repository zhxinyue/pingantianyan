// pages/citydetail/citydetail.js
import * as echarts from '../../ec-canvas/echarts';
import {
  $getCityScore
} from '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityItem:{},
    cityDetail:{},
    cityName: '',
    sfatyList: [{
      scoName: '综合安全'
    }],
    sfatyActive: 0,
    infoList: [{
      name: '国家概况'
    }, {
      name: '入境居留'
    }, {
      name: '安全保护'
    }, {
      name: '交通出行'
    }, {
      name: '物价医疗'
    }, {
      name: '实用信息'
    }, {
      name: '使馆信息'
    }],
    infoActive: 0,
    sfatyInfo: [{}, {}, {}],
    yearData: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    yearDataShow: [{}, {}, {}, {}, {}, {}],
    toggleFlag: true,
    //echarts数据
    ecRadar: {
      onInit: initChartRadar
    },
    ecLine: {
      onInit: initChartLine
    },

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
// this.setData({
//   cityItem:JSON.parse(wx.getStorageSync('item'))
// })
this.setData({
  cityItem:{"stateNameCn":"纽约州","stateNameEn":"New York","cityNameCn":"罗切斯特","countryNameCn":"美国","cityNameEn":"Rochester","cityId":"ct20210913150658811","countryId":"cou20210913102855592","countryNameEn":"United States"}
})
console.log(this.data.cityItem)
wx.setNavigationBarTitle({
  title: this.data.cityItem.cityNameCn
})
this.getCityScore()
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
  getCityScore(){
    $getCityScore(this.data.cityItem.cityId).then(res => {
      console.log(res.data.citySafetyArray)
      const array =JSON.parse(JSON.stringify(this.data.sfatyList)).concat(res.data.citySafetyArray)
        this.setData({
          cityDetail: res.data,
          sfatyList:array
        })
        // echartInitRadar(res.data.citySafetyArray)
    })
  },
  chooseSfaty(e) {
    this.setData({
      sfatyActive: e.target.dataset.index
    })
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
        yearDataShow: this.data.yearData.slice(0, 6)
      })
    } else {
      this.setData({
        yearDataShow: this.data.yearData
      })
    }
  },
  echartInitRadar(e) {
  // console.log(record)
    // const recordData = e.target.dataset.record;
  
    // console.log(this.data.cityDetail.citySafetyArray)
    this.data.cityDetail.citySafetyArray?.length &&  initChartRadar(e.detail.canvas, e.detail.width, e.detail.height, this.data.cityDetail.citySafetyArray);
  }

})
// 雷达图
function initChartRadar(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
console.log(cityDetail.citySafetyArray)
const indicatorList = recordData.map((item)=>{
  return {
    name:item.scoName
  }
})
const seriesData =  recordData.map((item)=>{
  return item.cityScore
  
})
console.log('indicatorList'+indicatorList)
console.log('seriesData'+seriesData)
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
      indicator: [{
          name: '战争冲突',
          max: 100
        },
        {
          name: '恐怖袭击',
          max: 100
        },
        {
          name: '示威骚乱',
          max: 100
        },
        {
          name: '传染疫病',
          max: 100
        },
        {
          name: '社会治安',
          max: 100
        },
        {
          name: '自然灾害',
          max: 100
        }
      ],
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
        value: [30, -40,-130, 70, 90, 80],
        name: '预算'
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
function initChartLine(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
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
      data: ['水灾', '火灾', '地震', '火山', '海啸', '塌陷', '山体滑坡'],
      axisLabel: {
        textStyle: {
          color: '#6B6B6B',
          fontSize: 12
        },
        interval: 0,
        formatter: function (value) {
          var str = "";
          var num = 2; //每行显示字数 
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
      data: [18, 36, 65, 30, 78, 40, 33]
    }]
  };

  chart.setOption(option);
  return chart;
}