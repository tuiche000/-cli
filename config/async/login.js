// 登陆
const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: function (res) {
        if (res.code) {
          resolve(res.code)          
        } else {
          reject(res.errMsg)
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  })
}
export default login