<template>
  <div class="app">
    <md-app :md-theme="theme" md-waterfall md-mode="fixed-last">
      <md-app-toolbar class="md-large md-dense md-primary">
        <Toolbar @toggle-menu="toggleMenuVisibility"></Toolbar>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <Drawer @click-item="handleClickDrawerItem"></Drawer>
      </md-app-drawer>

      <md-app-content>
        <!--        这里放置内容-->
        <router-view></router-view>
        <router-view name="pageSettings"></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
  // 部分加载组件
  import Vue from 'vue'
  import 'vue-material/dist/vue-material.min.css'

  // 使用样式切换的话就不需要这个了
  // import 'vue-material/dist/theme/deSfault.css'
  // import 'vue-material/dist/theme/default-dark.css'

  import Drawer from './components/Drawer.vue'
  import Toolbar from './components/Toolbar'
  import {
    MdApp, MdContent
  } from 'vue-material/dist/components'

  // Vue-Material的组件引入用Vue.use语句
  Vue.use(MdApp)
  Vue.use(MdContent)


  export default {
    name: 'app',
    // 自定义组价在父组件中以下面的形式注册
    components: {
      Drawer,
      Toolbar
    },
    data() {
      return {
        menuVisible: false,
        theme: 'classical'
      }
    },
    methods: {
      toggleMenuVisibility: function () {
        this.menuVisible = !this.menuVisible
      },
      handleClickDrawerItem: function (params) {
        if (params === 'personalSettings') {
          this.menuVisible = false
        }
      }
    }
  }
</script>

<style lang="scss">

  /*切换主题样式*/
  /*@import "~vue-material/dist/theme/prebuilt/default";*/
  @import "@assets/theme.scss";

  .md-app {
    min-height: 100vh;
    border: 1px solid rgba(#000, 0.12);

    .md-app-content {
      background: #efefefde;
    }

    .md-app-drawer {
      width: 250px;
    }
  }

  .md-app-content {
    background: #efefefde;
  }
</style>
