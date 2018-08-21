import en from './en.js'
import zh from './zh.js'

const all = {
  en,
  zh
}
function chooseLan(lan) {
  return all[lan]
}

export default {
  chooseLan,
  all
}