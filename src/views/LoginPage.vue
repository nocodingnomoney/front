<template>
  <div class="content">
    <h1 class="header">理财产品管理系统</h1>
    <md-card>
      <md-card-header>
        <div class="md-title">登录系统</div>
        <div class="md-subhead">使用已有账号登录</div>
      </md-card-header>

      <md-card-content>
        <md-field :class="whetherIdEmpty">
          <md-icon>person_outline</md-icon>
          <label>账号</label>
          <md-input v-model="username" type="number"></md-input>
          <span class="md-error">账号不能为空</span>
        </md-field>

        <md-field :class="whetherPasswordEmpty">
          <md-icon>lock_outline</md-icon>
          <label>密码</label>
          <md-input v-model="password" type="password" @keyup.enter="login()"></md-input>
          <span class="md-error">密码不能为空</span>
        </md-field>
      </md-card-content>

      <md-card-actions>
        <md-button class="btn" @click="login">登录</md-button>
        <md-button class="signUp" @click="goToSignup">注册</md-button>
      </md-card-actions>

      <!-- <md-card-content v-if="showHint" class="hint">
        <md-icon>error_outline</md-icon>
        {{hint}}
      </md-card-content> -->
    </md-card>
  </div>
</template>

<style lang="scss" scoped>
  .content {
    min-height: 100vh;
    background-image: url('../backgroundImage/backImage1.jpg') !important;
    background-repeat: no-repeat;
    background-size: 100% auto;
  }

  .header {
    font-size: 40px;
    margin: 0;
    color: white;
    text-align: center;
    position: relative;
    left: 0;
    top: 50px;
  }

  .md-card {
    width: 400px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    left: 0;
    top: 100px;
    background-color: rgba(255, 255, 255, 0.95);
  }

  .md-title,
  .md-subhead {
    text-align: center;
  }

  .md-button {
    width: 120px;
    margin-left: auto !important;
    margin-right: auto !important;
    color: white !important;
    background-color: #00bfff;
  }

  .hint {
    color: red;
  }
</style>

<script>
  import Vue from 'vue'

  import {MdCard, MdField} from 'vue-material/dist/components'

  import apis from '@/apis/apis.js'

  import {mapActions} from 'vuex'

  Vue.use(MdField)
  Vue.use(MdCard)

  export default {
    name: 'LoginPage',
    data() {
      return {
        username: '',
        password: '',

        //hint是错误信息
        // hint: "账号或密码错误",
        // showHint: false,

        touched: false
      }
    },

    computed: {
      whetherIdEmpty() {
        return {
          'md-invalid': this.username == '' && this.touched
        }
      },
      whetherPasswordEmpty() {
        return {
          'md-invalid': this.password == '' && this.touched
        }
      }
    },

    methods: {
      login: function () {
        this.touched = true

        if (this.username != '' && this.password != '') {
          apis.login(
            {
              method: 'POST',
              url: `/common/login`,
              data: {
                id: this.username,
                password: this.password
              }
            },
            //这里需要根据返回的结果对登录进行判断，成功或失败（账号不存在，密码错误）
            (res) => {
              const staff = JSON.parse(res.data.data)
              this.changeStaff(staff)
              this.$session.set('staff', staff)
              console.log(staff)
              switch (parseInt(staff.type)) {
                case 1:
                  this.$router.push({path: '/main/admin/userManage'})
                  break
                case 2:
                  this.$router.push({path: '/main/supplier/dataManage'})
                  break
                case 3:
                  this.$router.push({path: '/main/entry/input'})
                  break
                case 4:
                  this.$router.push({path: '/main/review/assess'})
                  break
                case 5:
                  this.$router.push({path: '/main/config/add'})
                  break
                default:
                  this.$router.push({path: '/main/'})
              }
            },
            () => {
              //根据具体错误信息，修改 this.hint 并将this.showHint设为true
            }
          )
        }
      },

      goToSignup: function () {
        this.$router.push({path: '/signup'})
      },
      ...mapActions('common', ['changeStaff'])
    }
  }
</script>