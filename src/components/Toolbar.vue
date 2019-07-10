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

        <md-menu md-size="big" md-direction="top-start"
                 :md-active.sync="toggleCard">
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
                  <span>{{this.staff.name}}</span>
                </div>
                <div>
                  <md-button class="md-raised md-accent" @click="logout">退出</md-button>
                </div>
              </div>
            </div>
          </md-menu-content>
        </md-menu>

      </div>
    </div>
    <div class="md-toolbar-row">
      <md-tabs :class="{'md-primary': theme === 'light' }" md-sync-route>
        <md-tab v-for="(tab,index) in tabs[drawerIndex-1]" :key="index" :md-label="tab.name"
                :id="'tab'+index" :to="tab.url"></md-tab>
      </md-tabs>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {MdTabs, MdButton, MdIcon, MdMenu, MdAvatar} from 'vue-material/dist/components'
  import apis from '@/apis/apis.js'
  import {mapState, mapActions} from 'vuex'

  Vue.use(MdTabs)
  Vue.use(MdButton)
  Vue.use(MdIcon)
  Vue.use(MdMenu)
  Vue.use(MdAvatar)

  export default {
    name: 'Toolbar',
    data() {
      return {
        toggleCard: false, // 员工的card
        drawerIndex: 7,
        tabs: [
          [
            {
              name: '用户管理',
              url: '/main/admin/userManage'
            },
            {
              name: '产品库',
              url: '/main/admin/productHouse'
            },
            {
              name: '配置库',
              url: '/main/admin/configHouse'
            }
          ],
          [
            {
              name: '资料管理',
              url: '/main/supplier/dataManage'
            },
            {
              name: '黑白名单',
              url: '/main/supplier/whiteBlackList'
            }
          ],
          [
            {
              name: '产品录入',
              url: '/main/entry/input'
            },
            {
              name: '产品预选库',
              url: '/main/entry/lib'
            }
          ],
          [
            {
              name: '产品评估',
              url: '/main/review/assess'
            },
            {
              name: '产品审批',
              url: '/main/review/approve'
            },
            {
              name: '产品标准库',
              url: '/main/review/stdLib'
            },
            {
              name: '产品配置库(上架)',
              url: '/main/review/confLib'
            }
          ],
          [
            {
              name: '产品配置',
              url: '/main/config/add'
            },
            {
              name: '配置审批',
              url: '/main/config/approve'
            },
            {
              name: '产品配置库',
              url: '/main/config/lib'
            }
          ],
          [
            {
              name: '职员数据',
              url: '/main/data/staff'
            },
            {
              name: '产品类别销量',
              url: '/main/data/catalog'
            }
          ]
        ]
      }
    },
    mounted() {
      if (this.$session.get('staff')) {
        this.changeStaff(this.$session.get('staff'))
        console.log(this.$session.get('staff'))
      }
      this.changeTabsThroughPath()
    },
    computed: {
      ...mapState('common', ['theme', 'staff'])
    },
    watch: {
      $route() {
        this.changeTabsThroughPath()
      }
    },
    methods: {
      changeTabsThroughPath() {
        switch (this.$route.path.split('/')[2]) {
          case 'admin':
            this.drawerIndex = 1
            break
          case 'supplier':
            this.drawerIndex = 2
            break
          case 'entry':
            this.drawerIndex = 3
            break
          case 'review':
            this.drawerIndex = 4
            break
          case 'config':
            this.drawerIndex = 5
            break
          case 'data':
            this.drawerIndex = 6
            break
          // 下面的index对应什么都没有
          default:
            this.drawerIndex = 7
        }
      },
      toggleMenu: function () {
        this.$emit('toggle-menu')
      },
      logout: function () {
        apis.logout(() => {
          this.$session.remove('staff')
          this.changeStaff({name: '', type: '', level: ''})
          this.$router.push('/login')
          this.$snackbar({
            message: '已登出'
          })
        })
      },
      ...mapActions('common', ['changeStaff'])
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