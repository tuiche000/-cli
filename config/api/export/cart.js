import api from '../import/index';
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module.js'; // 编译es7+

export default {
  // 购物车列表
  CartGetList: async function (type) {
    let res = await api.cart.CartGetList(type)
    res && res.dishes.map(item => {
      item['master'] = 0
      item['dishName'] = item['name']
    })
    return res
  },

  // 添加购物车
  CartAdd: async function (good) {
    let res = await api.cart.CartAdd(good)
    return res
  },

  // 修改购物车
  CartUpdateQty: async function (good) {
    let res = await api.cart.CartUpdateQty(good)
    return res
  },

  // 删除购物车商品
  CartClear: async function (carts) {
    let res = await api.cart.CartClear(carts)
    return res
  },

}