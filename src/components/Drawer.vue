<template>
  <div class="md-primary">
    <md-toolbar md-elevation="0">其他 ...</md-toolbar>
    <md-list>
      <md-list-item @click="goToAnotherPart('admin')">
        <md-icon>settings</md-icon>
        <span class="md-list-item-text">系统管理</span>
      </md-list-item>
      <md-list-item @click="goToAnotherPart('supplier')">
        <md-icon>home</md-icon>
        <span class="md-list-item-text">供应商管理</span>
      </md-list-item>
      <md-list-item @click="goToAnotherPart('entry')">
        <md-icon>account_balance</md-icon>
        <span class="md-list-item-text">录入中心</span>
      </md-list-item>
      <md-list-item @click="goToAnotherPart('review')">
        <md-icon>attach_money</md-icon>
        <span class="md-list-item-text">审核中心</span>
      </md-list-item>
      <md-list-item @click="goToAnotherPart('config')">
        <md-icon>list</md-icon>
        <span class="md-list-item-text">配置中心</span>
      </md-list-item>
      <md-list-item @click="showError">
        <md-icon>bar_chart</md-icon>
        <span class="md-list-item-text">数据统计</span>
      </md-list-item>
      <md-list-item @click="goToAnotherPart('page')">
        <md-icon>web</md-icon>
        <span class="md-list-item-text">页面设置</span>
      </md-list-item>
      <md-list-item @click="goToAnotherPart('personal')">
        <md-icon>perm_identity</md-icon>
        <span class="md-list-item-text">个人设置</span>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
  import Vue from 'vue'

  import {
    MdDrawer,
    MdToolbar,
    MdList,
    MdIcon,
    MdButton,
    MdSnackbar
  } from 'vue-material/dist/components'

  import Globals from '@/global.js'

  Vue.use(MdDrawer)
  Vue.use(MdToolbar)
  Vue.use(MdList)
  Vue.use(MdIcon)
  Vue.use(MdButton)
  Vue.use(MdSnackbar)

  export default {
    name: 'Drawer',
    data() {
      return {}
    },
    methods: {
      // 统一错误提示动作
      showError: function () {
        this.$snackbar({
          message: '暂未开放'
        })
      },
      showUnauthorized(occupation) {
        let chineseType = [
          '游客',
          '系统管理岗',
          '供应商管理岗',
          '产品录入岗',
          '产品审核岗',
          '产品配置岗'
        ]
        this.$snackbar({
          message: `尚无权限进入 ${occupation} 界面! 当前对应岗位为: ${chineseType[Globals.staff.type]}`
        })
      },
      goToAnotherPart: function (name) {
        // todo: 检验是否有权限进入该part, 如果没有则emit一个参数false
        const staffType = parseInt(Globals.staff.type)
        console.log(staffType)
        let close = true
        switch (name) {
          case 'admin':
            if (staffType === 1) {
              this.$router.push('/main/admin/userManage')
              break
            }
            this.showUnauthorized('系统管理员')
            break
          case 'supplier':
            if (staffType === 2) {
              this.$router.push('/main/supplier/dataManage')
              break
            }
            this.showUnauthorized('供应商管理岗')
            break
          case 'personal':
            this.$router.push('/main/settings/personal')
            break
          case 'page':
            this.$router.push('/main/settings/page')
            break
          case 'entry':
            if (staffType === 3) {
              this.$router.push('/main/entry/input')
              break
            }
            this.showUnauthorized('产品录入岗')
            break
          case 'review':
            if (staffType === 4) {
              this.$router.push('/main/review/assess')
              break
            }
            this.showUnauthorized('产品审核岗')
            break
          case 'config':
            if (staffType === 5) {
              this.$router.push('/main/config/add')
              break
            }
            this.showUnauthorized('产品配置岗')
            break
          default:
            close = false
            break
        }
        this.$emit('click-item', close)
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>