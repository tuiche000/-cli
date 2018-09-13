import config from './config.js' // api常量
import global from '../../global/index.js' // 全局变量
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module.js'; // 编译es7+
import fetch from '../../utils/fetch.js'; // 封装的request
import pro from '../../utils/wxPromise' // 封装的wx.api

export default {
  // 查询附近门店
  GetStores: async function (keyword) {
    let Setting = await wx.pro.getSetting()
    let location
    try {
      location = await wx.pro.getLocation()
    }
    catch(e) {
      return
    }
    let op = {
      url: config.GetStores,
      data: {
        "Latitude": location.latitude,
        "Longitude": location.longitude,
        "PageNo": 1,
        "PageSize": 10,
        "withTag": 1,
        "withPic": 1,
        "keyword": keyword || '',
        "withBanner": 1,
        "Lbs": {
          "Radius": 80,
          "Count": 10
        }
      },
      method: 'POST'
    }
    return (await fetch(op)).data
  },
  // 门店详情
  GetStoreDetail: async function (store) {
    let op = {
      url: config.GetStoreDetail,
      data: {
        StoreId: store.storeId
      }
    }
    return (await fetch(op)).data
  },
  // 门店轮换图
  Ad_GetList: async function () {
    let op = {
      url: config.Ad_GetList,
      data: {
        "pageNo": 1,
        "status": 2,
        "channel": 3, // 活动类型,1：公告信息;2：活动信息;3：广告轮播图
        "pageSize": 10
      },
      method: 'POST'
    }
    return (await fetch(op)).data
  },

}