import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/**
 * @Description: 注册的通用store
 * @return:  Store
 * @Author: littlebugyang
 * @Date: 2019/7/9
 */

const common = {
  state: {
    staff: {
      name: '',
      type: '',
      level: ''
    },
    theme: 'light'
  },
  mutations: {
    modifyStaff(state, staff) {
      state.staff = staff
    },
    modifyTheme(state, theme) {
      state.theme = theme
    }
  },
  getters: {},
  actions: {
    /**
     * @Description: 该动作经过mapActions可以在各组件中当methods使用
     * @Param:  String theme
     * @Author: littlebugyang
     * @Date: 2019/7/9
     */
    changeTheme({commit}, theme) {
      commit('modifyTheme', theme)
    }
  }
}

const store = new Vuex.Store({
  modules: {
    common: {
      namespaced: true,
      state: common.state,
      mutations: common.mutations,
      getters: common.getters,
      actions: common.actions
    }
  }
})

export default store