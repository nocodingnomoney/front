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
          <md-input v-model="username" required></md-input>
          <!-- <span class="md-error">There is an error</span> -->
        </md-field>

        <md-field>
          <label>密码</label>
          <md-input v-model="password" type="password" required></md-input>
        </md-field>
      </md-card-content>

      <md-card-actions>
        <md-button class="btn" @click="login">登录</md-button>
        <md-button class="signUp" @click="goToSignup">注册</md-button>
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
import Vue from "vue";

import { MdCard, MdField } from "vue-material/dist/components";

import apis from "@/apis/apis.js";

Vue.use(MdField);
Vue.use(MdCard);

export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
      isNameEmpty: null,
      hint: "账号或密码错误",
      showHint: false
    };
  },
  methods: {
    login: function() {
      apis.login(
        {
          method: "POST",
          url: `/common/login`,
          data: {
            id: this.username,
            password: this.password
          }
        },

        () => {},
        () => {}
      );

      this.$router.push({ path: "/main" });
    },

    goToSignup: function() {
      this.$router.push({ path: "/signup" });
    }
  },

  // computed: {
  //   messageClass() {
  //     return {
  //       "md-invalid": this.isNameEmpty
  //     };
  //   }
  // }
};
</script>