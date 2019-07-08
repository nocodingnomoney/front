import Vue from 'vue'

const prefix = require(`./api.config.${process.env.NODE_ENV}.js`)

const axios = require('axios')

const wrappedAxios = (config, success, fail) => {
  // 如果你大头虾没有指明success 和 fail 等回调函数, 那我会给你一个啥都没有的回调函数
  let adaptedSuccess = () => {
  }
  let adaptedFail = (res) => {
    if (res.response) {
      Vue.prototype.$snackbar({
        message: res.response.data.message
      })
    }
    if (fail) {
      fail()
    }
  }
  if (success) {
    adaptedSuccess = success
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
    addOne: function (config, success, fail) {
      return wrappedAxios(Object.assign(config, {
        method: 'POST',
        url: '/enter/product'
      }), success, fail)
    },

    /**
    * @Description: 通过文件实现产品导入
    * @Param:  Object, function, function
    * @return:  JSON
    * @Author: littlebugyang
    * @Date: 2019/7/8
    */
    addFile: function (config, success, fail) {
      let formData = new FormData()
      formData.append('file', config.file)
      return wrappedAxios(Object.assign({}, {
        method: 'POST',
        url: '/enter/jsonFile',
        data: formData
      }), success, fail)
    },

    getDetail: (id, success, fail) => {
      return wrappedAxios({url: `/products/present/${id}`}, success, fail)
    },

    /**
     * @Description: 专用于待评估产品
     * @Author: littlebugyang
     * @Date: 2019/7/3
     */
    assess: {
      getAll: (config, success, fail) => {
        return wrappedAxios({method: 'GET', url: '/products/process/2'}, success, fail)
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
        return wrappedAxios({method: 'GET', url: '/products/process/3'}, success, fail)
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
      upload: (productId, success, fail) => {
        return wrappedAxios({method: 'PUT', url: `/upload/${productId}`}, success, fail)
      }
    },

    /**
     * @Description: 获取产品库信息
     * @return:  Array
     * @Author: littlebugyang
     * @Date: 2019/7/3
     */
    libraries: {
      getPreselect: (success, fail) => {
        return wrappedAxios({url: '/products/store/1'}, success, fail)
      },
      getStandard: (success, fail) => {
        return wrappedAxios({url: '/products/store/2'}, success, fail)
      },
      getConfigLib: (success, fail) => {
        return wrappedAxios({url: '/products/store/3'}, success, fail)
      },
      getPresented: (success, fail) => {
        return wrappedAxios({url: '/products/process/6'}, success, fail)
      }
    },

    /**
     * @Description: 与产品配置有关
     * @return:  Array
     * @Author: littlebugyang
     * @Date: 2019/7/3
     */
    configs: {
      /**
       * @Description: 获取待配置产品
       * @return:  Array
       * @Author: littlebugyang
       * @Date: 2019/7/5
       */
      getAvailable: (success, fail) => {
        return wrappedAxios({method: 'GET', url: '/products/process/4'}, success, fail)
      },
      add: (config, success, fail) => {
        let adaptedConfig = config
        adaptedConfig.method = 'POST'
        adaptedConfig.url = '/config/product/add'
        return wrappedAxios(adaptedConfig, success, fail)
      },
      approve: (productId, success, fail) => {
        return wrappedAxios({method: 'PUT', url: `/config/product/check/${productId}`}, success, fail)
      },
      configuring: (success, fail) => {
        return wrappedAxios({method: 'GET', url: '/products/process/5'}, success, fail)
      }
    }
  },
  login: function (config, success, fail) {
    return wrappedAxios(config, success, fail)
  },
  logout: (success, fail) => {
    return wrappedAxios({method: 'POST', url: '/common/logout'}, success, fail)
  },

  getOneSupplier: function (config, success, fail) {
    return wrappedAxios(config, success, fail)
  },
  getAllSupplier: function (config, success, fail) {
    return wrappedAxios(config, success, fail)
  },
  addSupplier: function (config, success, fail) {
    return wrappedAxios(config, success, fail)
  },
  deleteSupplier: function (config, success, fail) {
    return wrappedAxios(config, success, fail)
  },
  updateSupplier: function (config, success, fail) {
    return wrappedAxios(config, success, fail)
  },
  getAllBlack: function (config, success, fail) {
    return wrappedAxios(config, success, fail)
  },
  getAllWhite: function (config, success, fail) {
    return wrappedAxios(config, success, fail)
  },
  signUp: function (config, success, fail) {
    return wrappedAxios(config, success, fail)
  },
  getAllUser: function (config, success, fail) {
    return wrappedAxios(config, success, fail)
  },
  updateUser: function (config, success, fail) {
    return wrappedAxios(config, success, fail)
  },
  deleteUser: function (config, success, fail) {
    return wrappedAxios(config, success, fail)
  }
}

export default apis