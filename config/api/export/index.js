import user from './user.js'
import store from './store.js'
import good from './good.js'
import cart from './cart.js'
import order from './order.js'

// 传入多个异步函数，来验证所有异步函数是否都正常通过，如果有其中一个报错，那么就会返回一个err
const isAll = function (...apiArr) {
  return new Promise((resolve, reject) => {
    Promise.all([
      ...apiArr
    ]).then(res => {
      resolve(res)
    }).catch(err => {
      wx.showModal({
        title: '提示',
        content: '数据加载失败，请重新尝试',
        showCancel: false
      })
      reject(err)
    })
  })
}
// example 传入两个异步，接口一个登陆，一个注册，最后返给我一个数组
// isAll(user.login(), user.Register()).then(res => {
// })

export default {
  isAll,
  user,
  store,
  good,
  order,
  cart,
}