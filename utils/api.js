import http from './request'
/**
 * 首页接口
 */
// 首页banner
export const $queryBanner = () => {
  return http.get({
    url: '/api/v1.0/bar/banner'
  })
}
/**
 * 点单购物车接口
 */
// 获取点单列表
export const $goodsList = data => {
  return http.post({
    url: '/cart/findCatAndGoodsList',
    data
  })
}