//index.js
//获取应用实例
import regeneratorRuntime from '../../utils/regenerator-runtime/runtime-module.js';
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: async function () {
    const _login = () => {
      return new Promise((resolve, reject) => {
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            resolve(res)
          },
          fail(err) {
            reject(err)
          }
        })
      })
    }
    let res = await _login()
    // console.log(res)
    // try{
    //   let res = await _login()
    // }catch{
    //   console.log('err')
    // }
  }
    
})
