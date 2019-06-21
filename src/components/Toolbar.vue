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
        <md-tab v-for="(tabName,index) in tabs[role]" :key="index" :md-label="tabName"></md-tab>
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
        toggleCard: false, // 员工的card
        role: '1',
        tabs: {
          // 专供供应商渠道岗
          '0': ['资料管理', '用户认证', '黑白名单'],
          // 专供产品录入岗
          '1': ['产品录入', '产品预选库'],
          // 专供产品审核岗
          '2': ['产品审核', '产品评估', '入库审批', '产品标准库'],
          // 专供产品配置岗
          '3': ['产品配置', '入库审批列表', '产品配置库'],
          // 专供系统管理员
          '4': ['用户管理', '产品库', '配置库']
        }
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