<template>
  <div class="app">
    <md-app md-waterfall md-mode="fixed-last">
      <md-app-toolbar class="md-large md-dense md-primary">
        <Toolbar @toggle-menu="toggleMenuVisibility"></Toolbar>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <Drawer></Drawer>
      </md-app-drawer>

      <md-app-content>
        <!--        这里放置内容-->
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
  // 部分加载组件
  import Vue from 'vue'
  import 'vue-material/dist/vue-material.min.css'
  import 'vue-material/dist/theme/default.css'
  import Drawer from './components/Drawer.vue'
  import Toolbar from './components/Toolbar'
  import {
    MdApp,
  } from 'vue-material/dist/components'

  // Vue-Material的组件引入用Vue.use语句
  Vue.use(MdApp)


  export default {
    name: 'app',
    // 自定义组价在父组件中以下面的形式注册
    components: {
      Drawer,
      Toolbar
    },
    data() {
      return {
        menuVisible: false
      }
    },
    methods: {
      toggleMenuVisibility: function () {
        this.menuVisible = !this.menuVisible
      }
    }
  }
</script>

<style lang="scss" scoped>
  .app {
    font-family: 'Noto Sans', 'Roboto', 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .md-app {
    min-height: 100vh;
    border: 1px solid rgba(#000, 0.12);
  }
</style>
