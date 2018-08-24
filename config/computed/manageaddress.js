import global from '../global/index.js' // 全局变量
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module.js'; // 编译es7+
import fetch from '../../utils/fetch.js'; // 封装的request
import pro from '../../utils/wxPromise' // 封装的wx.api
pro() // 使用wx.pro.api进行异步操作

export default {
  // 登录
  login: async function () {
    let {
      code
    } = await wx.pro.login()
    let op = {
      url: config.login,
      data: {
        code,
        channelType: global.channelType
      },
      method: 'POST'
    }
    return (await fetch(op)).data
  },

  // 注册
  Register: async function () {
    let {
      code
    } = await wx.pro.login()
    let op = {
      url: config.Register,
      data: {
        channelType: global.channelType,
        code,
        "mobile": "15216707627",
      },
      method: 'POST'
    }
    return (await fetch(op)).data
  },

  // 查询收货地址
  AddressList: async function () {
    let op = {
      url: config.AddressList,
      data: {
        "userId": "115329432817927356",
        "longitude": 121.3729,
        "latitude": 31.2684,
        "page": 1,
        "size": 10
      },
      method: 'POST'
    }
    return (await fetch(op)).data
  },

  // 新增收货地址
  AddDeliveryAddressInfo: async function (address_info) {
    let {
      code
    } = await wx.pro.login()
    let op = {
      url: config.AddDeliveryAddressInfo,
      data: {
        "userId": "115329432817927356",
        "longitude": 121.3776,
        "latitude": 31.26961,
        "sex": 1,
        "sendMobile": "18216789452",
        "receiveMobile": "18216789452",
        "receiveName": "张三",
        "receiveAddress": "15B",
        "receiveDetailAddress": "耀光中环国际广场A座",
        "isDefault": true
      },
      method: 'POST'
    }
    return (await fetch(op)).data
  },

  // 修改收货地址
  UpdateDeliveryAddressInfo: async function (address) {
    let op = {
      url: config.UpdateDeliveryAddressInfo,
      data: {
        "receiveId": "3215329434879002833",
        "userId": "115329432817927356",
        "latitude": 31.24955,
        "longitude": 121.40355,
        "sex": 1,
        "sendMobile": "18216789452",
        "receiveMobile": "18216789452",
        "receiveName": "张三",
        "receiveAddress": "祁连山南路2999号",
        "receiveDetailAddress": "金鼎花苑",
        "isDefault": false
      },
      method: 'POST'
    }
    return (await fetch(op)).data
  },

  // 删除收货地址
  DelDeliveryAddressInfo: async function (address) {
    let op = {
      url: config.DelDeliveryAddressInfo,
      data: {
        "userId": "115329432817927356",
        "receiveId": address.receiveId
      },
      method: 'POST'
    }
    return (await fetch(op)).data
  },
}