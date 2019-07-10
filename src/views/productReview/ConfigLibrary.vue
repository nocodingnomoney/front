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
        <md-table-cell md-label="操作">
          <md-button :class="{'md-primary': !item.uploaded, 'md-accent': item.uploaded}" class="md-raised"
                     @click="submitProduct(item.productID)">
            {{item.uploaded ? '下架商品': '上架商品'}}
          </md-button>
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
    components: {
      ConfigMenu
    },
    data() {
      return {
        products: []
      }
    },
    async mounted() {
      // 分步获取配置库中已上架和未上架的产品
      let downloadedProducts = null
      let uploadedProducts = null
      await apis.products.libraries.getConfigLib({params: {processID: 4}}, (res) => {
        downloadedProducts = res.data.map((product) => {
          return Object.assign(product, {uploaded: false})
        })
      })
      await apis.products.libraries.getConfigLib({params: {processID: 6}}, (res) => {
        uploadedProducts = res.data.map((product) => {
          return Object.assign(product, {uploaded: true})
        })
      })
      // 拼接
      this.products = downloadedProducts.concat(uploadedProducts)
    },
    methods: {
      async submitProduct(id) {
        for (let i = 0; i < this.products.length; ++i) {
          if (this.products[i].productID === id) {
            let tempProducts = this.products
            // 如果目标产品已经上架, 则将其下架; 否则将目标产品上架
            if (tempProducts[i].uploaded) {
              await apis.products.submit.download(id, () => {
                this.$snackbar({message: '下架商品成功'})
                tempProducts[i].uploaded = false
              })
            } else {
              await apis.products.submit.upload(id, () => {
                this.$snackbar({message: '上架商品成功'})
                tempProducts[i].uploaded = true
              })
            }
            this.products = tempProducts
            break
          }
        }
      }
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