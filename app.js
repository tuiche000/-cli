//app.js
import pro from './utils/wxPromise'
pro()
import regeneratorRuntime from './libs/regenerator-runtime/runtime-module.js';
import fetch from './utils/fetch.js';
import config from './config/index';
wx.fetch = fetch
wx.config = config

App({
  onLaunch: async function () {
    if(!wx.getStorageSync('lan')) {
      wx.setStorageSync('lan', 'en')
    }



    // example 
    // wx.pro
    // const getSetting = await wx.pro.getSetting()
    // const getUserInfo = await wx.pro.getUserInfo()
    // const location = await wx.pro.getLocation()
    // console.log(getSetting)
    // console.log(getUserInfo)
    // console.log(location)
    
    // 全部封装
    // const all = await Promise.all([
    //   wx.pro.getSetting(),
    //   wx.pro.getUserInfo(),
    //   wx.pro.getLocation()
    // ])
    // console.log(all)

    // 没分装之前写法
    // wx.getSetting({
    //   success(res) {
    //     wx.getUserInfo({
    //       success: function (res) {
    //         wx.getLocation({
    //           type: 'wgs84',
    //           success: function (res) {
    //             var latitude = res.latitude
    //             var longitude = res.longitude
    //             var speed = res.speed
    //             var accuracy = res.accuracy
    //           }
    //         })
    //       }
    //     })
    //   }
    // })

    // 登录
    // let { code } = await wx.pro.login()
    // const op = {
    //   url: 'http://172.16.13.4:8080/api/login',
    //   data: {
    //     js_code: code
    //   }
    // }
    // const { openid } = (await fetch(op)).data
    // console.log(openid)
    


    // 登录
    // let code = await wx.config.async.login()
    // let login_res = await wx.config.api.login(code)
  }
})