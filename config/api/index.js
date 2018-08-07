import fetch from '../../utils/fetch.js'
const login = code => {
  return fetch({
    url: 'http://localhost:8888/login',
    data: {
      code
    }
  })
}

export default {
  login
}