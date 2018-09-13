import global from './global/index'
import api from './api/export/index'
import router from './router/router'
import storage from './storage/index'
import utils from './utils/index'

wx.global = global
wx.api = api
wx.router = router
wx.storage = storage
wx.utils = utils
wx.fetch = utils.fetch
