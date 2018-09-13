import global from '../global/index.js'
import storage from '../storage/index.js'

let requestTaskArray = []; //只允许一次显示加载框
const fetch = (params = {
  url: '',
  data: {},
  method: 'GET'
}) => {
  return new Promise((resolve, reject) => {
    showOrHideLoad();
    /* 给每个接口都加上userId和storeId参数 */
    params =  addConstParameter(params);
    /* end */
    let requestTaskItem = wx.request({
      url: params.url,
      data: params.data,
      method: params.method,
      header: {
        'content-type': 'application/json',
        'pi': global.PI,
        'Channel': global.CHANNEL
      },
      success: res => {
        resolve(res.data)
        // if (isReturnOk(res)){
        //   resolve(res.data)
        // } else {
        //   reject(res.errMsg)
        // }
      },
      fail: (res) => {
        wx.showToast({
          title: '网络异常，请稍后重试~~'
        })
      },
      complete: (res) => {
        requestTaskArray.shift();
        showOrHideLoad(false);
      }
    })
    requestTaskArray.push(requestTaskItem);
  })
}

const addConstParameter = (params)=>{
  if (!params.data.hasOwnProperty('userId') ||  !params.data.userId) {
    const { userId } = wx.getStorageSync(storage.USERINFO);
    params.data.userId = userId
  }

  if (!params.data.hasOwnProperty('storeId') || !params.data.storeId) {
    const { storeId } = wx.getStorageSync(storage.STOREINFO)
    params.data.storeId = storeId
  }

  return params
}

/**
 * 请求队列里面是没有请求 开始加载或者停止加载
 */
let showOrHideLoad = (show = true) => {
  const requestLength = requestTaskArray.length;
  if (show && requestLength === 0) {
    return wx.showLoading({
      title: '加载中',
      mask: true
    })
  } else if (!show && requestLength === 0) {
    return wx.hideLoading();
  }
  return;
}


/**
 * 接口是否返回正常
 */
const isReturnOk = res => {
  // console.log('fetch-res:', res)

  // if (res.statusCode !== 200) {
  //   wx.showToast({
  //     title: res.errMsg
  //   })
  //   return;
  // }
  // if (typeof res.data.data == 'undefined' || res.data.data === null || res.data.data === '') {
  //   wx.showModal({
  //     content: res.data.msg,
  //     showCancel: false
  //   })
  //   return;
  // }
  if (res.data.msgCode !== 100) {
    wx.showModal({
      content: res.data.msg,
      showCancel: false
    })
    return;
  }

  // 成功弹窗
  // utils.showModal(res.data)
  return true
}


export default fetch