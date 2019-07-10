import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import VueSessionStorage from 'vue-sessionstorage'

Vue.config.productionTip = false

Vue.use(VueSessionStorage)

/**
 * @Description: Vuex 通过 store 选项，提供了一种机制将状态从根组件“注入”到每一个子组件中（需调用 Vue.use(Vuex)）
 * @Author: littlebugyang
 * @Date: 2019/7/9
 */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')