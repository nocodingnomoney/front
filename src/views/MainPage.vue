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
        <transition name="fade" mode="out-in">
          <router-view name="main"></router-view>
        </transition>
      </md-app-content>
    </md-app>
  </div>
</template>


<script>
  // 部分加载组件
  import Vue from 'vue'

  // 使用样式切换的话就不需要这个了
  // import 'vue-material/dist/theme/default.css'
  // import 'vue-material/dist/theme/default-dark.css'

  import Drawer from '@/components/Drawer.vue'
  import Toolbar from '@/components/Toolbar'
  import {
    MdApp, MdContent
  } from 'vue-material/dist/components'
  import {mapState} from 'vuex'

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
    computed: {
      // 来自全局状态树的theme
      ...mapState({
        theme: state => state.common.theme
      })
    },
    data() {
      return {
        menuVisible: false
      }
    },
    methods: {
      toggleMenuVisibility: function () {
        this.menuVisible = !this.menuVisible
      },
      handleClickDrawerItem: function (close) {
        this.menuVisible = !close
      }
    }
  }
</script>

<style lang="scss">

  /*切换主题样式*/
  /*@import "~vue-material/dist/theme/prebuilt/default";*/
  @import "@/assets/theme.scss";

  .md-app {
    min-height: 100vh;

    .md-app-content {
      background: #efefefde;
      padding-left: 0;
    }

    .md-app-drawer {
      width: 250px;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
</style>
