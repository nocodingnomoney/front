<template>
  <!--  只负责一类产品的展示-->
  <div class="products">
    <template v-for="(product, index) in products">
      <div class="product" :key="index">
        <div class="product__icon">
          <img :src="product.imageUrl"/>
        </div>
        <div class="product__intro">
          <div class="product__intro__name">{{product.name}}</div>
          <div class="product__intro__outline">{{product.outline}}</div>
        </div>
        <md-button class="md-primary md-raised" @click="goToDetail(product.id)">查看详情</md-button>
      </div>
      <div v-if="products.length != 1 && index % 2 == 0" :key="index+'gap'" class="products__gap">
        <div class="products__gap__padding"></div>
        <div class="products__gap__line"></div>
        <div class="products__gap__padding"></div>
      </div>
    </template>
    <md-snackbar :md-active.sync="toggleSnackbar" md-persistent>
      <span>暂未开放</span>
      <md-button class="md-primary" @click="toggleSnackbar = false">好的</md-button>
    </md-snackbar>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {MdButton, MdSnackbar} from 'vue-material/dist/components'

  Vue.use(MdButton)
  Vue.use(MdSnackbar)

  export default {
    name: 'ProductsOutline',
    // 产品信息由父组件提供
    props: ['products'],
    data() {
      return {
        toggleSnackbar: false
      }

    },
    methods: {
      // 跳转到相对应的产品详情
      goToDetail(productId) {
        let path='/productDetail/'+productId
        this.$router.push(path)
        
      }
    }
  }
</script>

<style lang="scss" scoped>
  .products {
    width: 100%;
    display: grid;
    grid-template-columns: 47.5% 5% 47.5%;
    grid-column-gap: 2px;

    .products__gap {
      height: 100%;
      display: flex;
      width: 100%;

      .products__gap__line {
        width: 1px;
        background: #d2d2d2;
      }

      .products__gap__padding {
        width: calc((100% - 1px) / 2);
      }
    }

    /*这里命名可能有些不规范~~*/
    .product {
      height: 80px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 25px 0;

      .product__icon {
        height: 100%;

        img {
          height: 100%;
          width: auto;
        }
      }

      .product__intro {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 100%;

        .product__intro__name {
          font-size: 22px;
        }

        .product__intro__outline {
          font-size: 16px;
        }
      }

    }

  }
</style>