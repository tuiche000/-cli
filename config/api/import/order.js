import config from './config.js' // api常量
import global from '../../global/index.js' // 全局变量
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module.js'; // 编译es7+
import fetch from '../../utils/fetch.js'; // 封装的request
import pro from '../../utils/wxPromise' // 封装的wx.api

export default {
  // 提交订单
  OrderSubmit: async function (json) {
    const { oToken } = await this.GetOToken()
    const op = {
      url: config.OrderSubmit,
      data: {
        "addressid": json.address.receiveId, //必填
        "basketInfos": [{
          dishes: json.basketInfos
        }], // 购物车
        "orderType": 1,  //订单类型： 外卖单-1, 自提单-2, 堂食单-3 //必填
        "contactName": json.address.receiveName, //必填
        "contactPhone": json.address.receiveMobile, //必填
        "channelType": global.channelType,//必填
        oToken,//必填
        memo: json.memo,
      },
      method: 'POST'
    }
    return (await fetch(op))
  },

  // 获取用户支付token
  GetOToken: async function () {
    let op = {
      url: config.GetOToken,
      data: {
        channelType: global.channelType,
      },
    }
    return (await fetch(op)).data
  },

  // 订单预览
  OrderReview: async function (cart) {
    cart.map(val=>{
      val.master = val.is_master;
    })
    const op = {
      url: config.OrderReview,
      data: {
        channelType: global.channelType,
        "orderType": '1', //1 外卖 ，4 自提 ,
        basketInfos: [
          {
            dishes: cart
          }
        ]
      },
      method: 'POST'
    }
    return (await fetch(op))
  },

  // 订单列表
  GetOrderList: async function (list) {
    const op = {
      url: config.Orderlist,
      data: {
        "userId": list.userId,
        "pageSize": list.pageSize,
        "pageNo": list.pageNo,
        "payStatus": list.payStatus || "",
        "orderType": list.orderType, //1 外卖 ，4 自提 ,
        "model": list.model, // 1 - 所有订单, 2 - 当日订单, 3 - 历史订单，4-待支付，5-待配送，43-配送中， 6-已完成,
        "ctime": list.ctime || ""
      },
      method: 'POST'
    }
    return (await fetch(op)).data
  },

  //订单详情
  GetOrderDetail: async function (detail) {
    const op = {
      url: config.OrderDetail,
      data: {
        "orderId": detail.orderId
      },
      method: 'POST'
    }
    return (await fetch(op)).data
  },

  //退款
  OrderRefund: async function (refund) {
    const op = {
      url: config.OrderRefund,
      data: {
        "userId": refund.userId,
        "orderId": refund.orderId,
        "reason": refund.reason || "",
        "channelType": global.channelType,
        "refundDishes": refund.refundDishes
      },
      method: 'POST'
    }
    return await fetch(op)
  },

  //订单取消
  OrderCancel: async function (cancel) {
    const op = {
      url: config.OrderCancel,
      data: {
        "orderId": cancel.orderId,
        "userId": cancel.userId,
        "message": cancel.message || '',
        "channelType": global.channelType
      },
      method: 'POST'
    }
    return (await fetch(op)).data
  },

  //提醒发货
  OrderReminder: async function (reminder) {
    const op = {
      url: config.OrderReminder,
      data: {
        "orderId": reminder.orderId,
        "userId": reminder.userId,
        "message": reminder.message || '',
        "channelType": global.channelType
      },
      method: 'POST'
    }
    return fetch(op)
  },

  //确认付款

  OrderRepay: async function (repay) {
    const { oToken } = await this.GetOToken()
    const op = {
      url: config.OrderRepay,
      data: {
        "storeId": repay.storeId,
        "orderId": repay.orderId,
        "userId": repay.userId,
        "channelType": global.channelType,
        "oToken": oToken
      },
      method: 'POST'
    }
    const payData = (await fetch(op)).data.payContent;
    const data = await wx.pro.requestPayment({
      'timeStamp': payData.timestamp,
      'nonceStr': payData.nonce_str,
      'package': payData.package,
      'signType': 'MD5',
      'paySign': payData.sign
    })
    return data
  }
}