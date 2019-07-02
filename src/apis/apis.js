const prefix = require(`./api.config.${process.env.NODE_ENV}.js`)

const axios = require('axios')

const wrappedAxios = (config, success, fail) => {
  // 如果你大头虾没有指明success 和 fail 等回调函数, 那我会给你一个啥都没有的回调函数
  let adaptedSuccess = () => {
  }
  let adaptedFail = () => {
  }
  if (success) {
    adaptedSuccess = success
  }
  if (fail) {
    adaptedFail = fail
  }
  return axios({
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    baseURL: prefix,
    url: config.url,
    method: config.method || 'GET',
    data: config.data || {},
    params: config.params || {}
  }).then(adaptedSuccess).catch(adaptedFail)
}

const apis = {
  products: {
    getAll: function (config, success, fail) {
      return wrappedAxios({method: 'GET', url: '/products'}, success, fail)
    },
    addOne: function (config, success, fail) {
      return wrappedAxios(Object.assign(config, {
        method: 'POST',
        url: '/enter/product'
      }), success, fail)
    }
  }
}

export default apis