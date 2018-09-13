import api from '../import/index';
import storage from '../../storage/index';
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module.js'; // 编译es7+

export default {
  // 登录
  login: async function () {

    let login_res = await api.user.login()
    
    if (typeof login_res.data != 'undefined') {
      // 登录正确，登陆的用户信息存起来
      wx.setStorageSync(storage.USERINFO, login_res.data)
    } else {
      // 登录错误，可能是没注册，滚去注册
      wx.navigateTo({ url: wx.router.AUTHORIZE })
    }

  },

  // 注册
  Register: async function (e) {
    if (e.errMsg == "getPhoneNumber:fail user deny") {
      wx.reLaunch({
        url: wx.router.AUTHORIZE,
      })
      return
    }

    function jump() {
      let page_len = getCurrentPages().length
      if (page_len <= 1) {
        wx.switchTab({
          url: wx.router.INDEX
        })
      } else {
        wx.navigateBack()
      }
    }

    let login_res = await this.login()
    
    if (typeof login_res != 'undefined') {

      // 登录正确，登陆的用户信息存起来
      wx.setStorageSync(wx.storage.USERINFO, login_res)
      jump()

    } else {

      // 登录错误，可能是没注册，滚去注册
      let reg_res = await api.user.Register({
        type: '2',
        phoneIv: e.iv,
        cryptData: e.encryptedData
      })
      // 注册OK，登陆的用户信息存起来
      wx.setStorageSync(wx.storage.USERINFO, reg_res)
      jump()

    }

    // let res = await api.user.Register()
    // return res
  },

  // 查询收货地址
  GetDeliveryAddressList: async function (json) {
    let res = await api.user.GetDeliveryAddressList()
    if (json && json.type == 'default') {
      res = res.list.find(item => {
        return item.isDefault == true
      })
    }
    return res
  },

  // 新增收货地址
  AddDeliveryAddressInfo: async function (address) {
    let res = await api.user.AddDeliveryAddressInfo(address)
    return res
  },

  // 修改收货地址
  UpdateDeliveryAddressInfo: async function (address) {
    let res = await api.user.UpdateDeliveryAddressInfo(address)
    return res
  },

  // 删除收货地址
  DelDeliveryAddressInfo: async function (address) {
    let res = await api.user.DelDeliveryAddressInfo(address)
    return res
  },

  //会员信息编辑
  MemberInfoEditor: async function (info) {
    let res = await api.user.MemberInfoEditor(info)
    if (typeof res.data == 'undefined') {
      wx.showToast({
        title: res.msg,
        icon: 'none'
      })
      return res
    }

    if (res.msgCode == 100) {
      wx.showToast({
        title: '编辑成功'
      })
      wx.navigateBack()
    }
    // return res.data
  },

  //会员信息查询
  MemberInfoFindByOpenId: async function () {
    let res = await api.user.MemberInfoFindByOpenId()
    return res
  },

  /**获取客服电话 */
  GetCustomerServicePhone: async function () {
    let res = await api.user.GetCustomerServicePhone()
    return res
  }
}