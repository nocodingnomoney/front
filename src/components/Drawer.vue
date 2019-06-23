<template>
  <div class="md-primary">
    <md-toolbar md-elevation="0">其他 ...</md-toolbar>
    <md-list>
      <md-list-item @click="showSnackbar">
        <md-icon>settings</md-icon>
        <span class="md-list-item-text">系统管理</span>
      </md-list-item>
      <md-list-item @click="showSnackbar">
        <md-icon>attach_money</md-icon>
        <span class="md-list-item-text">财务中心</span>
      </md-list-item>
      <md-list-item @click="showSnackbar">
        <md-icon>account_balance</md-icon>
        <span class="md-list-item-text">产品中心</span>
      </md-list-item>
      <md-list-item @click="showSnackbar">
        <md-icon>list</md-icon>
        <span class="md-list-item-text">订单中心</span>
      </md-list-item>
      <md-list-item @click="showSnackbar">
        <md-icon>bar_chart</md-icon>
        <span class="md-list-item-text">数据统计</span>
      </md-list-item>
      <md-list-item @click="showSnackbar">
        <md-icon>web</md-icon>
        <span class="md-list-item-text">页面设置</span>
      </md-list-item>
      <md-list-item @click="goToPersonalSettings">
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
  import 'vue-material/dist/vue-material.min.css'
  import 'vue-material/dist/theme/default.css'
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
      goToPersonalSettings: function () {
        this.$emit('click-item', 'personalSettings')
        this.$router.push('/settings')
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>