import Vue from 'vue'
import Router from 'vue-router'
import PageSettings from './views/PageSettings.vue'
import WrongPath from './views/WrongPath'
import PersonalSettings from './views/PersonalSettings'
import LoginPage from './views/LoginPage'
import MainPage from './views/MainPage'
import DataManage from './views/supplier/DataManage'
import WhiteBlackList from './views/supplier/WhiteBlackList'
import ProductCenter from './views/ProductCenter'
import ProductDetail from './components/productCenter/ProductDetail'
import SignUp from './views/SignUp'
import EntryInput from './views/productEntry/EntryInput'
import PreselectLibrary from './views/productEntry/PreselectLibrary'
import AssessProduct from './views/productReview/AssessProduct'
import ApproveProduct from './views/productReview/ApproveProduct'
import StandardLibrary from './views/productReview/StandardLibrary'
import ReviewConfigLibrary from './views/productReview/ConfigLibrary'
import AddConfig from './views/productConfig/AddConfig'
import ApproveConfig from './views/productConfig/ApproveConfig'
import ConfigConfigLibrary from './views/productConfig/ConfigLibrary'
import UserManage from './views/administrator/UserManage'
import ProductHouse from './views/administrator/ProductHouse'
import ConfigHouse from './views/administrator/ConfigHouse'
import StaffAnalysis from './views/dataAnalysis/StaffAnalysis'
import CatalogAnalysis from './views/dataAnalysis/CatalogAnalysis'

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
      components: {
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
          path: 'review/stdLib',
          components: {main: StandardLibrary}
        },
        {
          path: 'review/confLib',
          components: {main: ReviewConfigLibrary}
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
          components: {main: ConfigConfigLibrary}
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
          path: 'admin/userManage',
          components: {main: UserManage}
        },
        {
          path: 'admin/productHouse',
          components: {main: ProductHouse}
        },
        {
          path: 'admin/configHouse',
          components: {main: ConfigHouse}
        },
        {
          path: 'data/staff',
          components: {main: StaffAnalysis}
        },
        {
          path: 'data/catalog',
          components: {main: CatalogAnalysis}
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
        default: MainPage
      },
      children: [{
        path: '*',
        components: {main: WrongPath}
      }]
    }
  ]
})
