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
import EntryInput from './views/productEntry/EntryInput'
import PreselectLibrary from './views/productEntry/PreselectLibrary'
import AssessProduct from './views/productReview/AssessProduct'
import ApproveProduct from './views/productReview/ApproveProduct'
import StandardLibrary from './views/productReview/StandardLibrary'
import AddConfig from './views/productConfig/AddConfig'
import ApproveConfig from './views/productConfig/ApproveConfig'
import ConfigLibrary from './views/productConfig/ConfigLibrary'

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
      path: '/product',
      components: {
        default: ProductCenter
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
          path: 'entry/lib',
          components: {main: PreselectLibrary}
        },
        {
          path: 'review/assess',
          components: {main: AssessProduct}
        },
        {
          path: 'review/approve',
          components: {main: ApproveProduct}
        },
        {
          path: 'review/lib',
          components: {main: StandardLibrary}
        },
        {
          path: 'config/add',
          components: {main: AddConfig}
        },
        {
          path: 'config/approve',
          components: {main: ApproveConfig}
        },
        {
          path: 'config/lib',
          components: {main: ConfigLibrary}
        },
        {
          path: 'settings/page',
          components: {main: PageSettings}
        },
        {
          path: 'settings/personal',
          components: {main: PersonalSettings}
        },
        {
          path: 'supplier/dataManage',
          components: {main: DataManage}
        },
        {
          path: 'supplier/whiteBlackList',
          components: {main: WhiteBlackList}
        },
        {
          path: '*',
          components: {main: WrongPath}
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
