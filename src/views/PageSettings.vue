<template>
  <div class="page-settings">
    <h1 class="md-title">更换主题</h1>
    <md-switch v-model="dark"></md-switch>
    当前: {{dark ? '深色主题' : '浅色主题'}}
  </div>
</template>

<script>
  import Vue from 'vue'
  import {MdField} from 'vue-material/dist/components'
  import Globals from '@/global.js'

  Vue.use(MdField)
  export default {
    name: 'PageSettings',
    components: {},
    data() {
      return {
        dark: false
      }
    },
    watch: {
      /**
       * @Description: 触发更换主题动作
       * @Author: littlebugyang
       * @Date: 2019/7/4
       */
      dark(newDark) {
        this.$theme = newDark ? 'dark' : 'light'
        this.$emit('changeTheme', newDark)
      }
    }
  }
</script>
<style lang="scss" scoped>

  .page-settings {
    width: 700px;
    margin: 20px auto;
    background: white;
  }
</style>