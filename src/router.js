import Vue from 'vue'
import Router from 'vue-router'
import PageSettings from './views/PageSettings.vue'
import WrongPath from './views/WrongPath'
import PersonalSettings from './views/PersonalSettings'
import LoginPage from './views/LoginPage'
import MainPage from './views/MainPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      components: {
        default: LoginPage
      },

    },
    {
      path: '/main',
      components: {
        default: MainPage
      },
      children: [{
        path: 'settings/page',
        components: {main: PageSettings}
      }, {
        path: 'settings/personal',
        components: {main: PersonalSettings}
      }]
    },
    // 下面这个匹配必须在routes的最后一个元素
    {
      path: '*',
      components: {
        default: MainPage,

      },
      children: [{
        path: '*',
        components: {main: WrongPath}
      }]
    }
  ]
})