<template>
  <div>
    <md-card>
      <md-card-header>
        <div class="md-title">注册账号</div>
        <div class="md-subhead"></div>
      </md-card-header>

      <md-card-content>
        <md-field>
          <label>账号</label>
          <md-input type="number" v-model="account"></md-input>
        </md-field>

        <md-field md-clearable>
          <label>名称</label>
          <md-input v-model="name"></md-input>
        </md-field>

        <md-field>
          <label>密码</label>
          <md-input type="password" v-model="password"></md-input>
        </md-field>
      </md-card-content>

      <md-card-actions>
        <md-button class="btn" @click="handleSignUp">注册</md-button>
      </md-card-actions>

      <md-card-content v-if="showHint" class="hint">{{hint}}</md-card-content>
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
import Vue from "vue";

import { MdCard, MdField } from "vue-material/dist/components";

import apis from "@/apis/apis.js";

Vue.use(MdField);
Vue.use(MdCard);

export default {
  name: "LoginPage",
  data() {
    return {
      hint: "两次输入密码不一致",
      showHint: false,
      account: null,
      name: null,
      password: null,
      firstPassword: null,
      secondPassword: null
    };
  },
  methods: {
    handleSignUp: function() {
      apis.signUp(
        {
          method: "POST",
          url: `/common/register`,
          data: {
              ID: 125,
              name: this.name,
              password: this.password
          }
        },

        () => {},
        () => {}
      );

      alert("注册成功")
    }
  }
};
</script>