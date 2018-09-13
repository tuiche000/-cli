import api from '../import/index';
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module.js'; // 编译es7+

export default {
  // 查询附近门店
  GetStores: async function (keyword) {
    let res = await api.store.GetStores(keyword)
    return res
  },
  // 门店详情
  GetStoreDetail: async function (store) {
    let res = await api.store.GetStoreDetail(store)
    return res
  },
  // 门店轮换图
  Ad_GetList: async function () {
    let res = await api.store.Ad_GetList()
    return res
  },

}