import Vue from 'vue'
import Router from 'vue-router'
import PageSettings from './views/PageSettings.vue'
import WrongPath from './views/WrongPath'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      components: {
        default: WrongPath
      }
    },
    {
      path: '/settings',
      components: {
        pageSettings: PageSettings
      }
    },
// {
//   path: '/about',
//   name: 'about',
//   // route level code-splitting
//   // this generates a separate chunk (about.[hash].js) for this route
//   // which is lazy-loaded when the route is visited.
//   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
// }
  ]
})
