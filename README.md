components // 组件存放处，主要作用是重用，建议有三个或以上可以重用的template使用组件
config // 配置文件
    api // 所有api处理中心
    async // 异步代码分装
    global // 全局变量存放
    router // 路由变量存放
    storage // storage变量
libs // 第三方库
    uuid // node-uuid模块，可以快速地生成符合 RFC4122 规范 version 1 或者 version 4 的 UUID。注：主要用来生不会重复的唯一ID
    Base64 // js-base64 是 Base64 的 JavaScript 实现。注：因为小程序不带js的btoa()，所以使用这个方法来实现base64的互转
    regenerator-runtime // 由于微信不支持es7的编译,所以通过这个库可以编译es7。
pages // 页面
style // 样式
utils // 工具函数
    wxPromise // 把wxAPI接口全部封装成异步的。方便快速开发，配合async更佳！！！
    validate // 表单校验的一些方法

提示信息：
前端校验提示的信息用wx.showToast
接口校验给的提示信息用wx.showModal