import api from '../import/index';
import utils from '../../../config/utils/util.js';
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module.js'; // 编译es7+
import orderStatus from '../../global/orderStatus.js';


export default {
  // 提交订单
  OrderSubmit: async function (json) {
    if (!json.address) {
      wx.showToast({
        title: '请选择收货地址',
        icon: 'none'
      })
      return
    }
    if (json) {
      json.basketInfos.map(item => {
        item['dishName'] = item.name
      })
    }
    let res = await api.order.OrderSubmit(json);
    if (res.msgCode == 100) {
      let { timestamp, nonce_str, sign } = res.data.payContent
      wx.requestPayment({
        'timeStamp': timestamp,
        'nonceStr': nonce_str,
        'package': res.data.payContent.package,
        'signType': 'MD5',
        'paySign': sign,
        'success': res2 => {
          this.clearCart(json);
          wx.redirectTo({
            url: `${wx.router.ORDERDETAIL}?id=${res.data.orderId}`
          })
        },
        'fail': function (res) {
          wx.showToast({
            title: '支付失败',
            icon: 'none'
          })
          setTimeout(()=>{
            wx.navigateBack({})
          }, 2000)
        }
      })
    } else {
      wx.showToast({
        title: res.msg,
        icon: 'none'
      })
    }
    // return res
  },

  clearCart(dishObj) {
    let dish = [];
    dishObj.basketInfos.map(val => {
      dish.push(val.cartItemId);
    })
    console.log(dish)
    api.cart.CartClear(dish);
  },

  // 订单预览
  OrderReview: async function (list) {
    let res = await api.order.OrderReview(list)
    if (typeof res.data == 'undefined') {
      wx.showModal({
        content: res.msg,
        showCancel: false
      })
      return
    }
    return res.data.orderInfo
  },

  // 订单列表
  GetOrderList: async function (list) {
    let res = await api.order.GetOrderList(list);
    res.orders.map(val => {
      val.customerPhoneMini = utils.formatPhone(val.customerPhone);
      val.totalFeeMini = utils.fen2Price(val.totalFee);
      val.deliverFeeMini = utils.fen2Price(val.deliverFee);
      val.discountMini = utils.fen2Price(val.discount);
      val.minOrderFeeMini = utils.fen2Price(val.minOrderFee);
      switch (val.status) {
        case orderStatus.orderNowStatus.riderRob:
        case orderStatus.orderNowStatus.waitIngDelivery:
        case orderStatus.orderNowStatus.allFinish:
        case orderStatus.orderNowStatus.newOrder:
          val.btnText = '申请退款';
          val.btnStyle = 'background-color: #F2F2F2;color: #333;';
          break;
        // case orderStatus.orderNowStatus.complete:
        //   val.btnText = '确认收货';
        //   val.btnStyle = 'background-color: #e93240;color: #fff;';
        //   break;
        case orderStatus.orderNowStatus.waitPay:
          val.btnText = '确认付款';
          val.btnStyle = 'background-color: #e93240;color: #fff;';
          break;
      }
      val.basketInfos[0].dishes.map(valTwo => {
        valTwo.priceMini = utils.fen2Price(valTwo.price);
        valTwo.qtyMini = `x${valTwo.qty}`;
      })
    })
    return res
  },



  //订单详情
  GetOrderDetail: async function (detail) {
    let res = await api.order.GetOrderDetail(detail);
    res.customerPhoneMini = utils.formatPhone(res.customerPhone);
    res.totalFeeMini = utils.fen2Price(res.totalFee);
    res.deliverFeeMini = utils.fen2Price(res.deliverFee);
    res.discountMini = utils.fen2Price(res.discount);
    res.minOrderFeeMini = utils.fen2Price(res.minOrderFee);
    res.orderTotalDiscountMini = utils.fen2Price(res.orderTotalDiscount);
    res.freeDeliveryPriceMini = `满${utils.fen2Price(res.minOrderFee)}元免配送费`;
    if (!res.memo) {
      res.memoMini = '无';
    } else {
      res.memoMini = res.memo;
    }
    res.createDateMini = utils.formatTime(new Date(res.createDate));
    switch (res.status) {
      case orderStatus.orderNowStatus.riderRob:
      case orderStatus.orderNowStatus.waitIngDelivery:
      case orderStatus.orderNowStatus.allFinish:
      case orderStatus.orderNowStatus.newOrder:
        if (!res.hasRefund){
        res.btnText = '申请退款';
        res.btnStyle = 'background-color: #F2F2F2;color: #333;';
        }
        break;
      case orderStatus.orderNowStatus.complete:
        res.btnText = '确认收货';
        res.btnStyle = 'background-color: #e93240;color: #fff;';
        break;
      case orderStatus.orderNowStatus.waitPay:
        res.btnText = '确认付款';
        res.btnStyle = 'background-color: #e93240;color: #fff;';
        break;
    }
    res.basketInfos[0].dishes.map(valTwo => {
      valTwo.priceMini = utils.fen2Price(valTwo.price);
      valTwo.qtyMini = `x${valTwo.qty}`;
    })
    return res
  },

  //退款
  OrderRefund: async function (refund) {
    let res = await api.order.OrderRefund(refund)
    return res
  },

  //订单取消
  OrderCancel: async function (cancel) {
    let res = await api.order.OrderCancel(cancel)
    return res
  },

  //提醒发货
  OrderReminder: async function (reminder) {
    let res = await api.order.OrderReminder(reminder)
    return res
  },

  //确认付款
  OrderRepay: async function (repay) {
    let res = await api.order.OrderRepay(repay)
    return res
  }
}