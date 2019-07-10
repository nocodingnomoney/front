<template>
  <md-dialog class="loading-dialog" :md-active.sync="showLoading">
    <md-dialog-title>请稍等</md-dialog-title>
    <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
  </md-dialog>
</template>

<script>
  import Vue from 'vue'
  import {MdDialog} from 'vue-material/dist/components'

  Vue.use(MdDialog)
  export default {
    name: 'LoadingDialog',
    data() {
      return {
        showLoading: false
      }
    },
    mounted() {
      Vue.prototype.$loading = this.toggleLoading
    },
    methods: {
      toggleLoading(toggle) {
        this.showLoading = toggle
      }
    }
  }
</script>

<style lang="scss">
  .loading-dialog {
    min-width: 200px;
    width: 200px;
    height: 200px;

    .md-dialog-container {
      justify-content: center;
      align-items: center;
    }

    .md-progress-spinner {
      width: 100px;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>