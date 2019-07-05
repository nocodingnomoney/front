<template>
  <!--  只负责一类产品的展示-->
  <div class="products">
    <template v-for="(product, index) in products">
      <div class="product" :key="index">
        <div class="product__icon">
          <img :src="imageUrls[product.productID % imageUrls.length]"/>
        </div>
        <div class="product__intro">
          <div class="product__intro__name">{{product.productName}}</div>
          <div class="product__intro__outline">{{product.productIntro}}</div>
        </div>
        <md-button class="md-primary md-raised" @click="goToDetail(product.productID)">查看详情</md-button>
      </div>
      <div v-if="products.length != 1 && index % 2 == 0" :key="index+'gap'" class="products__gap">
        <div class="products__gap__padding"></div>
        <div class="products__gap__line"></div>
        <div class="products__gap__padding"></div>
      </div>
    </template>
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
        imageUrls: [
          'https://s2.ax1x.com/2019/06/29/ZQRqcd.png',
          'https://s2.ax1x.com/2019/06/29/ZQRb1H.png',
          'https://s2.ax1x.com/2019/06/29/ZQRH9e.png',
          'https://s2.ax1x.com/2019/06/29/ZQRThD.png',
          'https://s2.ax1x.com/2019/06/29/ZQRotO.png',
          'https://s2.ax1x.com/2019/06/29/ZQRIAK.png',
          'https://s2.ax1x.com/2019/06/29/ZQR476.png',
          'https://s2.ax1x.com/2019/06/29/ZQRh0x.png'
        ]
      }
    },
    methods: {
      // 跳转到相对应的产品详情
      goToDetail(productId) {
        let path = '/productDetail/' + productId
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