/**订单状态 */
export default {
  payStatus: {
    unpay: 1, //未支付
    paySuc: 2 //支付完成
  },
  orderType: { //订单类型
    delivery: 1, //外卖
    pickup: 4 ,//自提
    eatIn: 5, //堂食
  },
  mode: { //订单类型
    all: 1,
    today: 2, //当日订单
    history: 3, //历史订单
    waitIngPay: 4, //待支付
    waitIngDelivery: 5, //待配送,
    deliveryIng: 43, //配送中
    complete: 6 //已完成
  },
  orderNowStatus: {
    newOrder: 1,
    waitPay: 0,
    hasCancel: 3, //已取消
    complete: 6,
    riderRob: 41, //骑手抢单
    allFinish: 200,
  },
  refundStatus: {
    applyRefund: 1,
    agreeRefund: 2,
    alreadyRefund: 3,
    refundSuc: 4,
    refuseRefund: 5
  }
}


// 1 新订单，0 待支付 ，2 已结单， 4 配送中 ，200 完成 ，3 取消，41 骑手抢单， 43 配送中， 6 配送完成 
// 1：申请退款，2：同意退款，3：已退货，4：退款成功，5：拒绝退款