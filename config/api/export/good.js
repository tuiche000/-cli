import api from '../import/index';
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module.js'; // 编译es7+
import utils from '../../../config/utils/util.js';

export default {
  // 商品列表
  GetDish: async function(dish) {
    let res = await api.good.GetDish(dish)
    if (!dish.classify && dish.type == 0 && dish.defaultShow == 2) { //商品菜单
      res = res.DishCategorys.slice(0, 5)
      // res.map(item => {
      //   item.category['onIcon0'] = item.category['onIcon'].split('|')[0]
      //   item.category['onIcon1'] = item.category['onIcon'].split('|')[1]
      // })
    }
    if (!dish.classify && dish.type == 1 && dish.defaultShow == 2) { //每日必抢
      res = res.DishCategorys
      res.map(item => {
        item.category['onIcon1'] = item.category.onIcon.split('|')[0]
        item.category['onIcon2'] = item.category.onIcon.split('|')[1]
      })
    }

    if (dish.classify) { //商品分类
      let dishCategorys = res.DishCategorys;
      let leftCate = [];
      let rightChildGoods = [];
      dishCategorys.map(val => {
        val.category.children.map(childVal => {
          leftCate.push(childVal.category); 
          rightChildGoods.push(childVal.category);
          childVal.dishList.map(dish => {
            dish.nameMini = `${dish.name}/${dish.unit}`;
            dish.originalPriceMini = utils.fen2Price(dish.originalPrice);
            dish.price = utils.fen2Price(dish.price);
            rightChildGoods.push(dish);
          })
        })
      })

      return {
        leftCate: leftCate,
        rightChildGoods: rightChildGoods
      }
    }
    return res
  },

  // 商品详情
  GetSingleDish: async function(good) {
    let res = await api.good.GetSingleDish(good)
    return res
  },

  /**搜索门店的商品 */
  SearchDish: async function(str) {
    let res = await api.good.SearchDish(str);
    res = res.DishCategorys[0]
    if (res.dishCount == 0) {
      wx.showToast({
        title: '没有找到您搜索的商品，换个搜索词试试',
        icon: 'none',
      })
    }
    return res;
  }
}