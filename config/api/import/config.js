import global from '../../global/index.js'
const api = {
  // 用户
  login: 'User/Login', // 登陆
  Register: 'User/Register', // 注册
  GetCustomerServicePhone: 'GetCustomerServicePhone',// 获取客服电话
  // 门店信息
  GetStores: 'GetStores', // 查询附近的门店
  GetStoreDetail: 'GetStoreDetail', // 门店详情
  Ad_GetList: 'Ad/GetList', // 门店轮换图
  // 收货地址
  GetDeliveryAddressList: 'User/GetDeliveryAddressList', // 查询收货地址
  AddDeliveryAddressInfo: 'User/AddDeliveryAddressInfo', // 新增收货地址
  UpdateDeliveryAddressInfo: 'User/UpdateDeliveryAddressInfo', // 修改收货地址
  DelDeliveryAddressInfo: 'User/DelDeliveryAddressInfo', // 删除收货地址
  MemberInfoEditor: 'User/MemberInfoEditor',// 会员信息编辑
  MemberInfoFindByOpenId: 'User/MemberInfoFindByOpenId',//会员信息查询
  // 商品信息
  GetDish: 'GetDish', // 商品列表
  GetSingleDish: 'GetSingleDish', // 商品详情
  SearchDish: 'SearchDish',  //商品搜索
  // 购物车
  CartGetList: 'Cart/GetList', // 购物车列表
  CartAdd: 'Cart/Add', // 添加购物车
  CartUpdateQty: 'Cart/UpdateQty', // 修改购物车
  CartClear: 'Cart/Clear', // 删除购物车商品
  //订单
  OrderReview: 'OrderReview', // 订单预览
  OrderSubmit: 'OrderSubmit', // 提交订单
  Orderlist: 'OrderList', //订单列表
  OrderDetail: 'OrderDetail', //订单详情
  OrderRefund: 'OrderRefund', //订单退款
  OrderCancel: 'OrderCancel',//订单取消
  OrderReminder: 'OrderReminder', //提醒发货
  MemberInfoEditor: 'User/MemberInfoEditor', //会员信息编辑
  GetOToken: 'GetOToken', //令牌
  OrderRepay: 'OrderRepay',//重新支付
}
const url = (function() {
  let res = {}
  for (let key in api) {
    res[key] = global.apiHost + api[key]
  }
  return res
})()

export default url