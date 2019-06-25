<template>
  <md-empty-state
          md-icon="error"
          md-label="路径错误!!"
          md-description="路径错误咯~请后退或者手动输入正确的地址栏">
  </md-empty-state>
</template>

<script>
  import Vue from 'vue'
  import 'vue-material/dist/vue-material.min.css'
  import {MdEmptyState} from 'vue-material/dist/components'

  Vue.use(MdEmptyState)

  export default {
    name: 'WrongPath'
  }
</script>

<style scoped>

</style>