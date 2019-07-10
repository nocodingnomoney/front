<template>
  <md-menu md-size="big" md-direction="top-start">
    <md-button class="md-icon-button" md-menu-trigger>
      <md-icon>apps</md-icon>
    </md-button>

    <md-menu-content>
      <div class="configs">
        <div class="config" v-for="(config, index) in configs" :key="'config'+index">
          <div class="config__name"><b>配置名称:</b> {{config.configName}}</div>
          <div class="config__value"><b>配置介绍:</b> {{config.configIntro}}</div>
        </div>
      </div>
    </md-menu-content>
  </md-menu>
</template>

<script>
  import Vue from 'vue'
  import {MdMenu, MdButton, MdIcon} from 'vue-material/dist/components'

  Vue.use(MdMenu)
  Vue.use(MdButton)
  Vue.use(MdIcon)
  export default {
    name: 'ConfigMenu',
    props: ['configs']
  }
</script>

<style lang="scss" scoped>
  .configs {
    box-sizing: border-box;
    padding: 0 10px;
    max-width: 300px;

    .config {
      border-bottom: solid 1px #bfbfbf;
      padding: 5px 0;
      max-width: 300px;

      .config__name {
        line-height: 30px;
        white-space: normal;
        word-wrap: break-word;
        word-break: break-all;
      }

      .config__value {
        line-height: 30px;
        white-space: normal;
        word-wrap: break-word;
        word-break: break-all;
      }
    }
  }
</style>