//app.js
import regeneratorRuntime from './libs/regenerator-runtime/runtime-module.js';
import fetch from './utils/fetch.js';
import config from './config/index';
wx.fetch = fetch
wx.config = config

App({
  onLaunch: async function () {
    // 展示本地存储能力
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

    // 登录
    let code = await wx.config.async.login()
    let login_res = await wx.config.api.login(code)
    wx.config.router.target
    wx.setStorageSync(wx.config.storage.userinfo, login_res)
    wx.getStorageSync(wx.config.storage.userinfo)

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})