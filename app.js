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
    // 登录
    // let code = await wx.config.async.login()
    // let login_res = await wx.config.api.login(code)
  }
})