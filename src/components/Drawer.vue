<template>
  <div class="md-primary">
    <md-toolbar md-elevation="0">其他 ...</md-toolbar>
    <md-list>
      <md-list-item @click="goToAnotherPart('admin')">
        <md-icon>settings</md-icon>
        <span class="md-list-item-text">系统管理</span>
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
      <md-list-item @click="showSnackbar">
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
    <md-snackbar :md-active.sync="toggleSnackbar" md-persistent>
      <span>暂未开放</span>
      <md-button class="md-primary" @click="toggleSnackbar = false">好的</md-button>
    </md-snackbar>
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

  Vue.use(MdDrawer)
  Vue.use(MdToolbar)
  Vue.use(MdList)
  Vue.use(MdIcon)
  Vue.use(MdButton)
  Vue.use(MdSnackbar)

  export default {
    name: 'Drawer',
    data() {
      return {
        toggleSnackbar: false,
        // 以下本应该是全局变量
        logged: false,
        role: '0',
        // 以上本应该是全局变量

      }
    },
    methods: {
      // 统一错误提示动作
      showSnackbar: function () {
        this.toggleSnackbar = true
      },
      goToAnotherPart: function (name) {
        // todo: 检验是否有权限进入该part, 如果没有则emit一个参数false
        let close = true
        switch (name) {
          case 'admin':
            this.$router.push('/main/admin/userManage')
            break
          case 'personal':
            this.$router.push('/main/settings/personal')
            break
          case 'page':
            this.$router.push('/main/settings/page')
            break
          case 'entry':
            this.$router.push('/main/entry/input')
            break
          case 'review':
            this.$router.push('/main/review/assess')
            break
          case 'config':
            this.$router.push('/main/config/add')
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