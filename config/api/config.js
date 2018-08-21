import global from '../global/index.js'
const api = {
  LOGIN: 'User/User/Login',
}
const url = (function() {
  let res = {}
  for (let key in api) {
    res[key] = global.apiHost + api[key]
  }
  return res
})()

export default url