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
    },
    addFile: function (config, success, fail) {
      let formData = new FormData()
      formData.append('file', config.file)
      return wrappedAxios(Object.assign({}, {
        method: 'POST',
        url: '/enter/jsonFile',
        data: formData
      }), success, fail)
    },

    /**
     * @Description: 专用于待评估产品
     * @Author: littlebugyang
     * @Date: 2019/7/3
     */
    assess: {
      getAll: (config, success, fail) => {
        return wrappedAxios({method: 'GET', url: '/products/evaluating'}, success, fail)
      },
      pass: (config, success, fail) => {
        let adaptedConfig = config
        adaptedConfig.method = 'PUT'
        adaptedConfig.url = '/evaluating/' + config.data.id
        adaptedConfig.data = undefined
        return wrappedAxios(adaptedConfig, success, fail)
      }
    },

    /**
     * @Description: 专用于待审批产品
     * @Author: littlebugyang
     * @Date: 2019/7/3
     */
    approve: {
      getAll: (config, success, fail) => {
        return wrappedAxios({method: 'GET', url: '/products/checking'}, success, fail)
      },
      pass: (productId, success, fail) => {
        return wrappedAxios({method: 'PUT', url: `/checking/${productId}`}, success, fail)
      }
    },

    /**
     * @Description:
     * @Param:
     * @return:
     * @Author: littlebugyang
     * @Date: 2019/7/3
     */
    submit: {
      // todo: 这个操作由系统自动完成, 即将删除
      approve: () => {
      },
      // todo: 这个操作由系统自动完成, 即将删除
      assess: () => {
      },
      upload: (productId, success, fail) => {
        return wrappedAxios({method: 'PUT', url: `/checking/${productId}`}, success, fail)
      }
    },

    /**
     * @Description: 获取产品库信息
     * @return:  Array
     * @Author: littlebugyang
     * @Date: 2019/7/3
     */
    libraries: {
      getStandard: (success, fail) => {
        return wrappedAxios({url: '/products/process/4'}, success, fail)
      },
      getPreselect: () => {
        return wrappedAxios({url: ''})
      },
      getUploaded: () => {
      }
    }
  }
}

export default apis