import config from './config.js' // api常量
import global from '../../global/index.js' // 全局变量
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module.js'; // 编译es7+
import fetch from '../../utils/fetch.js'; // 封装的request
import pro from '../../utils/wxPromise' // 封装的wx.api

export default {
  // 购物车列表
  CartGetList: async function (type) {
    let op = {
      url: config.CartGetList,
      data: {},
      method: 'POST'
    }
    return (await fetch(op)).data
  },

  // 添加购物车
  CartAdd: async function (good) {
    good.qty = good.qty || 1
    good.guige = good.guige ? good.guige : ''
    let op = {
      url: config.CartAdd,
      data: {
        "channelType": global.channelType,
        "dishes": {
          "id": good.id,
          "qty": good.qty || 1,
          "master": good.master,// 是否是主套餐商品，1是 0不是 2：规格属性
          "subDishes": good.guige == "" ? "" : [
            {
              "id": good.guige.id, // 规格ID
              "qty": good.qty,
              "groupid": good.guige.attributename // 获取商品详情接口返回的  attributeName 值
            }
          ]
        }
      },
      method: 'POST'
    }
    return (await fetch(op)).data
  },

  // 修改购物车
  CartUpdateQty: async function (good) {
    let op = {
      url: config.CartUpdateQty,
      data: {
        "id": good.cart_item_id,
        "qty": good.qty,
        "channelType": global.channelType
      },
      method: 'POST'
    }
    let data = (await fetch(op))
    if (typeof data.data == 'undefined') {
      data.data = ''
    }
    return (await fetch(op)).data
  },

  // 删除购物车商品
  CartClear: async function (carts) {
    let op = {
      url: config.CartClear,
      data: {
        "carts": carts,
        "channelType": global.channelType
      },
      method: 'POST'
    }
    return (await fetch(op)).data
  },

}