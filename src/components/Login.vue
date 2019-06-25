<template>
  <div>
    <md-card>
      <md-card-header>
        <div class="md-title">登录系统</div>
        <div class="md-subhead">sign in with exsiting account</div>
      </md-card-header>

      <md-card-content>
        <md-field md-clearable>
          <label>账号</label>
          <md-input v-model="initial"></md-input>
        </md-field>

        <md-field :md-toggle-password="false">
          <label>密码</label>
          <md-input v-model="password" type="password"></md-input>
        </md-field>
      </md-card-content>

      <md-card-actions id="">
        <md-button id="btn" @click="login">登录</md-button>
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
  #btn{
    color:white;
    background-color: #00BFFF;
  } 
</style>

<script>
export default {
  name: 'RegularCards',
  methods: {
    login : function(){
      this.$router.push({path:'/main'});
    }
  }
}
</script>