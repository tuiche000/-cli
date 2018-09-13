//app.js
import config from './config/index';

App({
  onLaunch: function () {

    wx.api.user.login()

  }
})