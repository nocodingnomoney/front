<template>
  <md-snackbar :md-active.sync="toggleSnackbar" md-persistent>
    <span>{{message}}</span>
    <md-button class="md-primary" @click="toggleSnackbar = false">{{btnText}}</md-button>
  </md-snackbar>
</template>

<script>
  /**
   * @Description: 全局的snackbar, 不需要在每个组件中独立添加
   * @Author: littlebugyang
   * @Date: 2019/7/5
   */
  import Vue from 'vue'
  import {MdSnackbar} from 'vue-material/dist/components'

  Vue.use(MdSnackbar)

  export default {
    name: 'Snackbar',
    mounted() {
      Vue.prototype.$snackbar = this.showSnackbar
    },
    data() {
      return {
        toggleSnackbar: false,
        message: '',
        btnText: ''
      }
    },
    methods: {
      showSnackbar(option) {
        this.toggleSnackbar = true
        this.message = option.message || '出现了未知错误~'
        this.btnText = option.btnText || '好的'
      }
    }
  }
</script>

<style scoped>

</style>