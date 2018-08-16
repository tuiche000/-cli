//index.js
Page({
  data: {
    content: ''
  },
  onLoad: function () {
    let current_lan = wx.getStorageSync('lan')
    console.log(current_lan)
    console.log(wx.config.language.chooseLan(current_lan))
    this.setData({
      content: wx.config.language.chooseLan(current_lan)
    })
  },
  change_language(){
    const current_lan = wx.getStorageSync('lan')
    let new_lan = null
    if(current_lan == 'zh') {
      new_lan = 'en'
    } else {
      new_lan = 'zh'
    }
    wx.setStorageSync('lan', new_lan)
    this.setData({
      content: wx.config.language.chooseLan(new_lan)
    })
  }
})
