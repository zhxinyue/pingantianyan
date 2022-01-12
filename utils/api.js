import http from './request'

// 模糊匹配城市
export const $matchCity = cityWord => {
  return http.post({
    url: '/mini/getCityListBycityWord',
    data:{cityWord}
  })
}

// 获取热点城市列表
export const $popularCity = () => {
  return http.post({
    url: '/mini/getPopularCityList'
  })
}

// 获取城市的综合分数
export const $getCityScore = (cityId) => {
  return http.post({
    url: '/mini/getCityScore',
    data: {cityId }
  })
}

// 获取城市的天气状况
export const $getCityWeather = (cityId) => {
  return http.post({
    url: '/mini/getCityWeatherInfo',
    data: {cityId }
  })
}

// 获取国家简介
export const $getCountryIntro = (countryId) => {
  return http.post({
    url: '/mini/getCountryIntroInfo',
    data: {countryId }
  })
}

// 获取城市一级分类的详细信息
export const $getEventNews = (scoId,cityId) => {
  return http.post({
    url: '/mini/getCityEventNews',
    data: {scoId,cityId }
  })
}

// 获取72小时内发生的事件
export const $getEvents = () => {
  return http.post({
    url: '/mini/get72HoursCityEvents'
  })
}