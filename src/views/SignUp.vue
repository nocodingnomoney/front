<template>
  <div class="content">
    <h1 class="header">理财产品管理系统</h1>
    <md-card>
      <md-card-header>
        <div class="md-title">注册账号</div>
        <div class="md-subhead"></div>
      </md-card-header>

      <md-card-content>
        <md-field :class="isIdEmpty">
          <md-icon>person_outline</md-icon>
          <label>账号</label>
          <md-input type="number" v-model="id"></md-input>
          <span class="md-error">账号不能为空</span>
        </md-field>

        <md-field md-clearable :class="isNameEmpty">
          <md-icon>chat_bubble_outline</md-icon>
          <label>名称</label>
          <md-input v-model="name"></md-input>
          <span class="md-error">名称不能为空</span>
        </md-field>

        <md-field :class="isFirstPasswordEmpty">
          <md-icon>lock_outline</md-icon>
          <label>密码</label>
          <md-input type="password" v-model="firstPassword"></md-input>
          <span class="md-error">密码不能为空</span>
        </md-field>

        <md-field :class="isSecondPasswordEmpty">
          <md-icon>check_circle_outline</md-icon>
          <label>确认密码</label>
          <md-input type="password" v-model="secondPassword"></md-input>
          <span class="md-error">再次输入以确认密码</span>
        </md-field>
      </md-card-content>

      <md-card-actions>
        <md-button class="btn" @click="handleSignUp">注册</md-button>
      </md-card-actions>

      <md-card-content v-if="firstPassword!=secondPassword&&touched" class="hint">
        <md-icon>error_outline</md-icon>
        {{hint}}
      </md-card-content>
    </md-card>
  </div>
</template>

<style lang="scss" scoped>
  .content {
    min-height: 100vh;
    background-image: url("../backgroundImage/backImage1.jpg") !important;
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
    width: 150px;
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

  import {MdCard, MdField, MdIcon} from 'vue-material/dist/components'

  import apis from '@/apis/apis.js'

  Vue.use(MdField)
  Vue.use(MdCard)
  Vue.use(MdIcon)

  export default {
    name: 'LoginPage',
    data() {
      return {
        hint: '两次输入密码不一致',

        id: '',
        name: '',
        password: '',
        firstPassword: '',
        secondPassword: '',

        touched: false
      }
    },

    computed: {
      isIdEmpty() {
        return {
          'md-invalid': this.id == '' && this.touched
        }
      },
      isNameEmpty() {
        return {
          'md-invalid': this.name == '' && this.touched
        }
      },
      isFirstPasswordEmpty() {
        return {
          'md-invalid': this.firstPassword == '' && this.touched
        }
      },
      isSecondPasswordEmpty() {
        return {
          'md-invalid': this.secondPassword == '' && this.touched
        }
      }
    },

    methods: {
      handleSignUp: function () {
        this.touched = true

        if (
          this.id != '' &&
          this.name != '' &&
          this.firstPassword != '' &&
          this.secondPassword != ''
        ) {
          if (this.firstPassword != this.secondPassword) {
            //两次密码不一致
          } else {
            //输入均不为空且两次密码一致
            this.password = this.firstPassword
            apis.signUp(
              {
                method: 'POST',
                url: `/common/register`,
                data: {
                  id: this.id,
                  name: this.name,
                  password: this.password
                }
              },

              () => {
                //弹出提示框 等待2秒后回到登录页
                this.$snackbar({
                  message: '注册成功'
                })
                this.$router.push({path: '/login'})
              },
              () => {
              }
            )
          }
        }
      }
    }
  }
</script>