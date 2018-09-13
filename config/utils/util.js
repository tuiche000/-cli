const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const fen2Price = (price) => {
  return `¥${(price / 100).toFixed(2)}`
}


const formatPhone = (phone)=>{
  return phone.trim().replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3')
}

const formatZuoji = (num)=> {
  return num.trim().replace(/(\d{3)-/, '$1-')
}

/**获取现在的时间 */
const _now = Date.now || function () {
  return new Date().getTime();
};

const throttle = (func, wait, options) => {
  let context, args, result;
  let timeout = null;
  let previous = 0;
  if (!options) options = {};
  let later = function () {
    previous = options.leading === false ? 0 : _now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function () {
    let now = _now();
    if (!previous && options.leading === false) previous = now;
    //计算剩余时间
    let remaining = wait - (now - previous);
    context = this;
    args = arguments;
    //剩余时间小于等于0或者剩余时间大于等待时间(本地时间变动出现)
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}

module.exports = {
  formatTime: formatTime,
  formatPhone: formatPhone,
  fen2Price: fen2Price,
  throttle: throttle
}
