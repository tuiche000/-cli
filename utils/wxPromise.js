const promisify = (api) => {
  return (options, ...params) => {
    return new Promise((resolve, reject) => {
      api(Object.assign({}, options, {
        success: resolve,
        fail: reject
      }), ...params)
      Promise.prototype.finally = function(callback) {
        let P = this.constructor
        return this.then(
          value => P.resolve(callback()).then(() => value),
          reason => P.resolve(callback()).then(() => {
            throw reason
          })
        )
      }
    })
  }
}

wx.pro = {}
// 以下是没有 success、fail、complete 属性的api
// 1、...Sync【√】
// 2、on...【√】
// 3、create... 除了 createBLEConnection【√】
// 4、...Manager【√】
// 5、pause...【√】
// 6、stopRecord、stopVoice、stopBackgroundAudio、stopPullDownRefresh【√】
// 7、hideKeyboard、hideToast、hideLoading、showNavigationBarLoading、hideNavigationBarLoading【√】
// 8、canIUse、navigateBack、closeSocket、pageScrollTo、drawCanvas【√】
const wxPromise = () => {
  // 将 promise 方法 挂载到 wx.pro 对象上
  for (let key in wx) {
    if (wx.hasOwnProperty(key)) {
      if (!(/^on|^create|Sync$|Manager$|^pause/.test(key) && key !== 'createBLEConnection' || key === 'stopRecord' || key === 'stopVoice' || key === 'stopBackgroundAudio' || key === 'stopPullDownRefresh' || key === 'hideKeyboard' || key === 'hideToast' || key === 'hideLoading' || key === 'showNavigationBarLoading' || key === 'hideNavigationBarLoading' || key === 'canIUse' || key === 'navigateBack' || key === 'closeSocket' || key === 'closeSocket' || key === 'pageScrollTo' || key === 'drawCanvas')) {
        wx.pro[key] = promisify(wx[key])
      }
    }
  }
}
export default wxPromise