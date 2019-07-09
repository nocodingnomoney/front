<template>
  <md-content class="page-settings">
    <h1 class="md-title">更换主题</h1>
    <div>
      <md-switch v-model="dark" @change="handleThemeChange"></md-switch>
      <p>当前: {{dark ? '深色主题' : '浅色主题'}}</p>
    </div>
  </md-content>
</template>

<script>
  import Vue from 'vue'
  import {MdField} from 'vue-material/dist/components'
  import {mapActions, mapState} from 'vuex'

  Vue.use(MdField)
  export default {
    name: 'PageSettings',
    components: {},
    data() {
      return {
        dark: false
      }
    },
    mounted() {
      if (this.theme) {
        this.dark = this.theme === 'dark'
      }
    },
    computed: {
      ...mapState('common', ['theme'])
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
    box-sizing: border-box;
    width: 700px;
    padding: 20px;
    margin: 20px auto;

    div {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
</style>