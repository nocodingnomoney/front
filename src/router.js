import Vue from 'vue'
import Router from 'vue-router'
import PageSettings from './views/PageSettings.vue'
import WrongPath from './views/WrongPath'
import PersonalSettings from './views/PersonalSettings'
import LoginPage from './views/LoginPage'
import MainPage from './views/MainPage'
import DataManage from './views/DataManage'
import WhiteBlackList from './views/WhiteBlackList'
import ProductCenter from './views/ProductCenter'
import ProductDetail from './components/productCenter/ProductDetail'
import SignUp from './views/SignUp'
import EntryInput from './views/productEntry/EntryInput'
import PreselectLibrary from './views/productEntry/PreselectLibrary'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      components: {
        default: LoginPage
      }

    },

    {
      path: '/signup',
      components: {
        default: SignUp
      }
    },
    {
      path: '/product',
      components: {
        default: ProductCenter
      }
    },

    {
      path: '/productDetail/:id',
      components:{
        default: ProductDetail
      }
    },

    {
      path: '/main',
      components: {
        default: MainPage
      },
      children: [
        {
          path: 'entry/input',
          components: {main: EntryInput}
        },
        {
          path: 'entry/preselect',
          components: {main: PreselectLibrary}
        },
        {
          path: 'settings/page',
          components: {main: PageSettings}
        }, {
          path: 'settings/personal',
          components: {main: PersonalSettings}
        }, {
          path: 'supplier/dataManage',
          components: {main: DataManage}
        }, {
          path: 'supplier/whiteBlackList',
          components: {main: WhiteBlackList}
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
