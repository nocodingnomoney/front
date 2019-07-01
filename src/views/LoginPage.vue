<template>
  <div>
    <md-card>
      <md-card-header>
        <div class="md-title">登录系统</div>
        <div class="md-subhead">使用已有账号登录</div>
      </md-card-header>

      <md-card-content>
        <md-field md-clearable>
          <label>账号</label>
          <md-input v-model="username"></md-input>
        </md-field>

        <md-field :md-toggle-password="false">
          <label>密码</label>
          <md-input v-model="password" type="password"></md-input>
        </md-field>
      </md-card-content>

      <md-card-actions>
        <md-button class="btn" @click="login">登录</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<style lang="scss" scoped>
  .md-card {
    width: 400px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 100px;
  }

  .md-title,.md-subhead{
    text-align: center;
  }

  .btn{
    width:180px;
    margin-left: auto;
    margin-right: auto;
    color: white;
    background-color: #00BFFF;
  }
</style>

<script>
  import Vue from 'vue'

  import {MdCard, MdField} from 'vue-material/dist/components'

  Vue.use(MdField)
  Vue.use(MdCard)

  export default {
    name: 'LoginPage',
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      login: function () {
        this.$router.push({path: '/main'})
      }
    }
  }
</script>