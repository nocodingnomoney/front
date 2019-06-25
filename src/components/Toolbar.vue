<template>
  <div class="toolbar">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <md-button class="md-icon-button" @click="toggleMenu">
          <md-icon>menu</md-icon>
        </md-button>

        <span class="md-title">理财产品管理系统</span>
      </div>

      <div class="md-toolbar-section-end">
        <md-button class="md-icon-button">
          <md-icon>more_vert</md-icon>
        </md-button>
      </div>
    </div>
    <div class="md-toolbar-row">
      <md-tabs class="md-primary">
        <md-tab md-label="系统管理"></md-tab>
        <md-tab md-label="财务中心"></md-tab>
        <md-tab md-label="产品中心"></md-tab>
        <md-tab md-label="订单中心"></md-tab>
        <md-tab md-label="数据统计"></md-tab>
      </md-tabs>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Toolbar',
    methods: {
      toggleMenu: function () {
        this.$emit('toggle-menu')
      }
    }
  }
</script>

<style scoped>
  .toolbar {
    width: 100%;
  }
</style>