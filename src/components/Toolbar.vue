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

        <md-menu class="md-primary" md-size="big" md-direction="top-start" :md-active.sync="toggleCard">
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
      <md-tabs class="md-primary" md-s ync-route>
        <md-tab v-for="(tabName,index) in tabs[role]" :key="index" :md-label="tabName"
                @click="switchTab(tabName)"></md-tab>
      </md-tabs>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {MdTabs, MdButton, MdIcon, MdMenu, MdAvatar} from 'vue-material/dist/components'
  import Globals from '@/global.js'

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
        role: Globals.role,
        tabs: {
          // 专供供应商渠道岗
          '0': ['资料管理', '黑白名单'],
          // 专供产品录入岗
          '1': ['产品录入', '产品预选库'],
          // 专供产品审核岗
          '2': ['产品评估', '产品审批', '产品标准库'],
          // 专供产品配置岗
          '3': ['产品配置', '配置审批', '产品配置库'],
          // 专供系统管理员
          '4': ['用户管理', '产品库', '配置库']
        }
      }
    },
    mounted() {
      this.changeTabsThroughPath()
    },
    watch: {
      $route() {
        this.changeTabsThroughPath()
      }
    },
    methods: {
      changeTabsThroughPath() {
        switch (this.$route.path.split('/')[2]) {
          case 'supplier':
            this.role = '0'
            break
          case 'entry':
            this.role = '1'
            break
          case 'review':
            this.role = '2'
            break
          case 'config':
            this.role = '3'
            break
          case 'admin':
            this.role = '4'
            break
          default:
            this.role = '5'
        }
      },
      toggleMenu: function () {
        this.$emit('toggle-menu')
      },
      switchTab: function (tabName) {
        switch (tabName) {
          case '资料管理':
            this.$router.push('/main/supplier/dataManage')
            break
          case '黑白名单':
            this.$router.push('/main/supplier/whiteBlackList')
            break
          case '产品录入':
            this.$router.push('/main/entry/input')
            break
          case '产品预选库':
            this.$router.push('/main/entry/lib')
            break
          case '产品评估':
            this.$router.push('/main/review/assess')
            break
          case '产品审批':
            this.$router.push('/main/review/approve')
            break
          case '产品标准库':
            this.$router.push('/main/review/lib')
            break
          case '产品配置':
            this.$router.push('/main/config/add')
            break
          case '配置审批':
            this.$router.push('/main/config/approve')
            break
          case '产品配置库':
            this.$router.push('/main/config/lib')
            break
        }
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