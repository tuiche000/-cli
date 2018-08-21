import config from './config.js' // 引入常量
import global from '../../global/index.js'
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module.js';
import fetch from '../../../utils/fetch.js';
import pro from '../../../utils/wxPromise'
pro()

export default {
  // 登录
  Login: async function () {
    let { code } = await wx.pro.login()
    const op = {
      url: config.LOGIN,
      data: {
        code,
        channelType: global.channelType
      },
      method: 'POST'
    }
    return (await fetch(op)).data
  },
  // 登出
  // 改密码
}
