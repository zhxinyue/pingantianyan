// pages/citydetail/citydetail.js
import * as echarts from '../../ec-canvas/echarts';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityName: '',
    sfatyList:[{name:'综合安全'},{name:'战争冲突'},{name:'恐怖袭击'},{name:'自然灾害'},{name:'示威骚乱'},{name:'社会治安'},{name:'传染疫病'}],
    sfatyActive:0,
    infoList:[{name:'国家概况'},{name:'入境居留'},{name:'安全保护'},{name:'交通出行'},{name:'物价医疗'},{name:'实用信息'},{name:'使馆信息'}],
    infoActive:0,
    sfatyInfo:[{},{},{}],
    yearData:[{},{},{},{},{},{},{},{},{},{},{},{}],
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
  chooseSfaty(e){
    this.setData({
      sfatyActive:e.target.dataset.index
    })
  },
  chooseInfo(e){
    this.setData({
      infoActive:e.target.dataset.index
    })
  },
  echartInit(e) {
    let recordData = e.target.dataset.record;
    if (recordData.thisExam.length > 0) {
      initChart(e.detail.canvas, e.detail.width, e.detail.height, recordData);
    }
  }

})
// 雷达图
function initChartRadar(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

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
      name:{
        textStyle:{color:'#6B6B6B'}
       },
      splitArea: {
        show: true,
        areaStyle: {
          color: ["#fff"] // 图表背景网格的颜色
        }
      },
    },
  
    series: [{
      name: '预算 vs 开销',
      type: 'radar',
      data: [{
        value: [30, 40, 50, 70, 90, 80],
        name: '预算'
      }
      ]
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
        formatter:function(value){  
            var str = ""; 
            var num = 2; //每行显示字数 
            var valLength = value.length; //该项x轴字数  
            var rowNum = Math.ceil(valLength / num); // 行数  
            if(rowNum > 1) {
                for(var i = 0; i < rowNum; i++) {
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