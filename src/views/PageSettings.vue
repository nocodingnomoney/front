<template>
  <md-content class="page-settings">
    <h1 class="md-title">更换主题</h1>
    <md-switch v-model="dark" @change="handleThemeChange"></md-switch>
    当前: {{dark ? '深色主题' : '浅色主题'}}
  </md-content>
</template>

<script>
  import Vue from 'vue'
  import {MdField} from 'vue-material/dist/components'
  import {mapActions} from 'vuex'

  Vue.use(MdField)
  export default {
    name: 'PageSettings',
    components: {},
    data() {
      return {
        dark: false
      }
    },
    methods: {
      handleThemeChange(dark) {
        this.changeTheme(dark ? 'dark' : 'light')
      },
      ...mapActions('common', [
        'changeTheme'
      ])
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