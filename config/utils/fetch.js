let requestTaskArray = []; //只允许一次显示加载框
const fetch = (params = {
  url: '',
  data: {},
  method: 'GET'
}) => {
  return new Promise((resolve, reject) => {
    showOrHideLoad();
    let requestTaskItem = wx.request({
      url: params.url,
      data: params.data,
      method: params.method,
      header: {
        'content-type': 'application/json'
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

/**
 * 请求队列里面是没有请求 开始加载或者停止加载
 */
let showOrHideLoad = (show = true) => {
  const requestLength = requestTaskArray.length;
  if (show && requestLength === 0) {
    return wx.showLoading({
      title: '加载中',
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

  if (res.statusCode !== 200) {
    wx.showToast({
      title: res.errMsg
    })
    return;
  }
  if (typeof res.data == 'undefined' || res.data === null || res.data === '') {
    wx.showToast({
      title: res.errMsg
    })
    return;
  }
  if (res.data.msgCode !== 100) {
    wx.showToast({
      title: res.data.msg
    })
    return;
  }

  // 成功弹窗
  // utils.showModal(res.data)
  return true
}


export default fetch