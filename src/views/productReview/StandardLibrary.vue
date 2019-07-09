<template>
  <!--  标准库的内容在这里-->
  <md-content class="standard-library">
    <md-table v-model="products" md-sort="name" md-sort-order="asc" md-card>
      <md-table-toolbar>
        <h1 class="md-title">标准库产品</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-numeric>{{ item.productID }}</md-table-cell>
        <md-table-cell md-label="名称" md-sort-by="name">{{ item.productName }}</md-table-cell>
        <md-table-cell md-label="介绍" md-sort-by="email">{{ item.productIntro }}</md-table-cell>
        <md-table-cell md-label="种类" md-sort-by="gender">{{ item.catalog }}</md-table-cell>
        <md-table-cell md-label="风险等级" md-sort-by="title">{{ item.riskRank }}</md-table-cell>
        <md-table-cell md-label="配置">
          <md-menu v-if="item.configs" md-size="big" md-direction="top-start">
            <md-button class="md-icon-button" md-menu-trigger>
              <md-icon>apps</md-icon>
            </md-button>

            <md-menu-content>
              <div class="configs">
                <div v-for="(config, index) in item.configs" :key="index">
                  <div class="config__name">配置名称: {{config.configName}}</div>
                  <div class="config__value">配置介绍: {{config.configIntro}}</div>
                </div>
              </div>
            </md-menu-content>
          </md-menu>
        </md-table-cell>
        <md-table-cell md-label="操作">
          <md-button class="md-primary md-raised" @click="uploadProduct(item.productID)" :disabled="item.uploaded">
            {{item.uploaded ? '已上架': '上架商品'}}
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </md-content>
</template>

<script>
  import Vue from 'vue'
  import {MdTable, MdMenu, MdButton, MdIcon} from 'vue-material/dist/components'
  import apis from '@/apis/apis.js'

  Vue.use(MdTable)
  Vue.use(MdMenu)
  Vue.use(MdButton)
  Vue.use(MdIcon)

  export default {
    name: 'StandardLibrary',
    data() {
      return {
        products: []
      }
    },
    mounted() {
      apis.products.libraries.getStandard((res) => {
        this.products = res.data.map((product) => {
          return Object.assign(product, {uploaded: product.processID === 6})
        })
      })
    },
    methods: {
      uploadProduct(id) {
        apis.products.submit.upload(id, () => {
          for (let i = 0; i < this.products.length; ++i) {
            if (this.products[i].productID === id) {
              let tempProducts = this.products
              tempProducts[i].uploaded = true
              break
            }
          }
          this.$snackbar({message: '上架商品成功'})
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .standard-library {
    width: 1200px;
    margin: 20px auto;

    .md-table {
      width: 100%;
      margin: 0 auto;
    }
  }
</style>