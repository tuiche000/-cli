import config from './config.js' // api常量
import global from '../../global/index.js' // 全局变量
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module.js'; // 编译es7+
import fetch from '../../utils/fetch.js'; // 封装的request
import pro from '../../utils/wxPromise' // 封装的wx.api

export default {
  // 商品列表
  GetDish: async function (dish) {
    let op = {
      url: config.GetDish,
      data: {
        "timeStamp": '',
        "defaultShow": dish.defaultShow || 2,
        "labelName": '',
        "nodeId": '',
        "sortType": '',
        "orderBy": '',
        "type": dish.type,
      }
    }
    return (await fetch(op)).data
  },

  // 商品详情
  GetSingleDish: async function (good) {
    let op = {
      url: config.GetSingleDish,
      data: {
        "id": good.id,
        // "id": '117692711497332507', 
        "sTime": new Date().getTime(),
        "promotionType": good.promotionType, //商品优惠类型
        "discountPrice": good.discountPrice, //优惠金额
        "discountRate": good.discountRate
      },
      method: 'POST'
    }
    return (await fetch(op)).data
  },

  /**商品搜索 */
  SearchDish: async function (str) {
    const op = {
      url: config.SearchDish,
      data: {
        "labelName": str || '', //商品名
        //"timeStamp": new Date().getTime() //时间戳
      },
    }
    return (await fetch(op)).data
  }
}