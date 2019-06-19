<template>
  <div class="toolbar">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <md-button class="md-icon-button" @click="toggleMenu">
          <md-icon>menu</md-icon>
        </md-button>

        <span class="md-title">理财产品管理系统</span>
      </div>

      <div class="md-toolbar-section-end">

        <md-menu md-size="big" md-direction="top-start" :md-active.sync="toggleCard">
          <!--          这个button是弹出菜单的入口-->
          <md-button class="md-icon-button" md-menu-trigger>
            <md-icon>contacts</md-icon>
          </md-button>

          <!--          下面是菜单的内容-->
          <md-menu-content>
            <div class="author-card">
              <md-avatar class="md-large md-elevation-4">
                <md-icon>person</md-icon>
              </md-avatar>
              <div class="author-card__info">
                <div class="author-card__info__name">
                  <span>{{this.staffName}}</span>
                </div>
                <div>
                  <md-button class="md-raised md-accent">退出</md-button>
                </div>
              </div>
            </div>
          </md-menu-content>
        </md-menu>

      </div>
    </div>
    <div class="md-toolbar-row">
      <md-tabs class="md-primary">
        <md-tab md-label="系统管理"></md-tab>
        <md-tab md-label="财务中心"></md-tab>
        <md-tab md-label="产品中心"></md-tab>
        <md-tab md-label="订单中心"></md-tab>
        <md-tab md-label="数据统计"></md-tab>
      </md-tabs>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import 'vue-material/dist/vue-material.min.css'
  import 'vue-material/dist/theme/default.css'
  import {MdTabs, MdButton, MdIcon, MdMenu, MdAvatar} from 'vue-material/dist/components'

  Vue.use(MdTabs)
  Vue.use(MdButton)
  Vue.use(MdIcon)
  Vue.use(MdMenu)
  Vue.use(MdAvatar)

  export default {
    name: 'Toolbar',
    data() {
      return {
        staffName: '二狗',
        toggleCard: false
      }
    },
    methods: {
      toggleMenu: function () {
        this.$emit('toggle-menu')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .toolbar {
    width: 100%;
  }



  .author-card {
    display: flex;

    .author-card__info {
      display: flex;
      flex-direction: column;

      .author-card__info__name {
        text-align: center;
      }
    }
  }
</style>