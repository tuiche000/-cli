import config from './config.js' // api常量
import global from '../../global/index.js' // 全局变量
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module.js'; // 编译es7+
import fetch from '../../utils/fetch.js'; // 封装的request
import pro from '../../utils/wxPromise' // 封装的wx.api

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
    return (await fetch(op))
  },

  // 注册
  Register: async function (params = {
    type: 2,
    iv: '',
    phoneIv: '',
    cryptData: '',
    phoneCryptData: '',
    mobile: '',
  }) {
    let {
      code
    } = await wx.pro.login()
    let op = {
      url: config.Register,
      data: {
        channelType: global.channelType,
        code,
        // mobile: params.mobile,
        type: params.type,
        // iv: '',
        // cryptData: '',
        phoneIv: params.phoneIv,
        phoneCryptData: params.cryptData,
      },
      method: 'POST'
    }
    return (await fetch(op)).data
  },

  // 查询收货地址
  GetDeliveryAddressList: async function (address) {
    const {
      userId
    } = wx.getStorageSync(wx.storage.USERINFO)
    let op = {
      url: config.GetDeliveryAddressList,
      data: {
        // "longitude": address.longitude,
        // "latitude": address.latitude,
        "page": 1,
        "size": 10
      },
      method: 'POST'
    }
    return (await fetch(op)).data
  },

  // 新增收货地址
  AddDeliveryAddressInfo: async function (address) {
    let {
      code
    } = await wx.pro.login()
    const {
      userId
    } = wx.getStorageSync(wx.storage.USERINFO)
    let op = {
      url: config.AddDeliveryAddressInfo,
      data: {
        "userId": userId,
        "longitude": address.longitude,
        "latitude": address.latitude,
        "sex": address.sex,
        "sendMobile": address.sendMobile,
        "receiveMobile": address.receiveMobile,
        "receiveName": address.receiveName,
        "receiveAddress": address.receiveAddress,
        "receiveDetailAddress": address.receiveDetailAddress,
        "isDefault": true
      },
      method: 'POST'
    }
    return (await fetch(op)).data
  },

  // 修改收货地址
  UpdateDeliveryAddressInfo: async function (address) {
    const {
      userId
    } = wx.getStorageSync(wx.storage.USERINFO)
    let op = {
      url: config.UpdateDeliveryAddressInfo,
      data: {
        "receiveId": address.receiveId,
        "userId": userId,
        "latitude": address.latitude,
        "longitude": address.longitude,
        "sex": address.sex,
        "sendMobile": address.sendMobile,
        "receiveMobile": address.receiveMobile,
        "receiveName": address.receiveName,
        "receiveAddress": address.receiveAddress,
        "receiveDetailAddress": address.receiveDetailAddress,
        "isDefault": address.isDefault
      },
      method: 'POST'
    }
    return (await fetch(op))
  },

  // 删除收货地址
  DelDeliveryAddressInfo: async function (address) {
    let op = {
      url: config.DelDeliveryAddressInfo,
      data: {
        "userId": address.userId,
        "receiveId": address.receiveId
      },
      method: 'POST'
    }
    return (await fetch(op)).data
  },

  //会员信息编辑
  MemberInfoEditor: async function (info) {
    const openId = wx.getStorageSync(wx.storage.USERINFO).userId;
    const op = {
      url: config.MemberInfoEditor,
      data: {
        "partnerId": global.PI,
        "openId": openId,
        "channelCode": "xcx",
        "ver": "1",
        "sexFlag": info.sexFlag,
        "birthday": info.birthday,
        "email": info.email,
        "province": info.province,
        "city": info.city,
        "district": info.district,
      },
      method: 'POST'
    }
    return (await fetch(op))
  },
  
  //会员信息查询
  MemberInfoFindByOpenId: async function () {
    const openId = wx.getStorageSync(wx.storage.USERINFO).userId;
    const op = {
      url: config.MemberInfoFindByOpenId,
      data: {
        "partnerId": global.PI,
        "openId": openId,
        "channelCode": "xcx",
        "ver": "1"
      },
      method: 'POST'
    }
    return (await fetch(op)).data
  },

  /**获取客服电话 */
  GetCustomerServicePhone: async function () {
    const op = {
      url: config.GetCustomerServicePhone,
      data: {},
      method: 'GET'
    }
    return (await fetch(op)).data
  }
}