import Vue from 'vue'
import App from './App.vue'

import VueMaterial from 'vue-material'
import VueRouter from 'vue-router'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
Vue.use(VueMaterial)
Vue.use(VueRouter)

import Login from "./components/Login.vue"
import Mainpage from './components/MainPage'

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '',
      component: Login
    },{
      path: '/main',
      component: Mainpage
    }
  ]
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
