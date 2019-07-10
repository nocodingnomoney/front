<template>
  <!--  配置库的内容在这里-->
  <div class="config-library">
    <md-table v-model="products" md-sort="name" md-sort-order="asc" md-card>
      <md-table-toolbar>
        <h1 class="md-title">配置库产品</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-numeric>{{ item.productID }}</md-table-cell>
        <md-table-cell md-label="名称" md-sort-by="name">{{ item.productName }}</md-table-cell>
        <md-table-cell md-label="介绍" md-sort-by="email">{{ item.productIntro }}</md-table-cell>
        <md-table-cell md-label="种类" md-sort-by="gender">{{ item.catalog }}</md-table-cell>
        <md-table-cell md-label="风险等级" md-sort-by="title">{{ item.riskRank }}</md-table-cell>
        <md-table-cell md-label="配置">
          <config-menu v-if="item.configs" :configs="item.configs"></config-menu>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {MdTable, MdMenu, MdButton, MdIcon} from 'vue-material/dist/components'
  import apis from '@/apis/apis.js'
  import ConfigMenu from '@/components/ConfigMenu'

  Vue.use(MdTable)
  Vue.use(MdMenu)
  Vue.use(MdButton)
  Vue.use(MdIcon)

  export default {
    name: 'ConfigLibrary',
    data() {
      return {
        products: []
      }
    },
    components: {
      ConfigMenu
    },
    mounted() {
      apis.products.libraries.getConfigLib({}, (res) => {
        this.products = res.data
      }, () => {
      })
    }
  }
</script>

<style lang="scss" scoped>
  .config-library {
    width: 1200px;
    margin: 20px auto;
    background: white;

    .md-table {
      width: 100%;
      margin: 0 auto;
    }
  }
</style>