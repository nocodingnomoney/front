<template>
  <div class="product-detail">
    <div class="header">
      <div class="title">
        产品详情——{{product.productName}}
      </div>
    </div>

    <div class="middle">
      <div class="imageZone">
        <img src=https://s2.ax1x.com/2019/06/28/ZKzAvq.jpg width="500px" class="productImage">
      </div>

      <div class="product-info">
        <div class="product-info__subtitle">
          {{product.productName}}
        </div>
        <md-table v-if="product.configs" v-model="product.configs" md-card>
          <md-table-toolbar>
            <h1 class="md-title">产品相关信息详情</h1>
          </md-table-toolbar>

          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="属性名称">{{ item.configName }}</md-table-cell>
            <md-table-cell md-label="属性介绍">{{ item.configIntro }}</md-table-cell>
          </md-table-row>
        </md-table>
        <div class="product-info__price">
          <span class="product-info__price__word">
            价格：￥{{product.price}}
          </span>
          <span class="product-info__price__button">
            <md-button class="md-raised md-primary">购买</md-button>
          </span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import Vue from 'vue'

  import {MdCard, MdContent, MdButton, MdTable} from 'vue-material/dist/components'
  import apis from '@/apis/apis.js'

  Vue.use(MdCard)
  Vue.use(MdContent)
  Vue.use(MdButton)
  Vue.use(MdTable)

  export default {
    name: 'ProductDetail',
    components: {},
    mounted() {
      const productId = this.$route.path.split('/')[this.$route.path.split('/').length - 1]
      apis.products.getDetail(productId, (res) => {
        this.product = res.data
        this.product.price = 999
      })
    },
    data() {
      return {
        product: {
          id: null,
          name: '理财产品一号',
          intro: '理财产品一号的介绍，理财产品一号的介绍，理财产品一号的介绍，理财产品一号的介绍，理财产品一号的介绍，理财产品一号的介绍，理财产品一号的介绍，理财产品一号的介绍，理财产品一号的介绍，理财产品一号的介绍，理财产品一号的介绍，理财产品一号的介绍，理财产品一号的介绍，理财产品一号的介绍',
          price: 999
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .header {
    z-index: 2;
    width: 100%;
    height: 65px;
    background: rgba(0, 0, 0, .7);
    transition: background 0.3s;

    &:hover {
      background: #0f97ff;
    }
  }

  .title {
    color: white;
    font-size: 25px;
    line-height: 65px;
    margin-left: 45px;
  }

  .middle {
    max-width: 1500px;
    min-width: 700px;
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    margin: 100px auto 0px auto;
  }

  .imageZone {
    max-height: 100vh;
    min-height: 700px;
    flex: 1;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }

  .product-info {
    height: 100%;
    flex: 1;

    .product-info__subtitle {
      font-size: 40px;
      font-weight: 600;
      line-height: 40px;
      margin-bottom: 100px;
    }

    .product-info__price {
      width: 100%;
      margin-top: 50px;
      justify-content: space-between;
      align-items: center;
      display: flex;

      .product-info__price__word {
        font-size: 30px;
      }

      .product-info__price__button {
        .md-button {
          width: 150px;
        }
      }
    }
  }
</style>