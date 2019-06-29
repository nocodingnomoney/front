<template>
  <div>
    <!--    offset的值跟产品导航栏的高度一致, 为了顶部留白, 加了15px-->
    <scrollactive
            class="scrollactive-btns"
            active-class="active"
            :offset="80"
            :duration="800"
            bezier-easing-value=".5,0,.35,1"
    >
      <a class="scrollactive-item scrollactive-btn" :class="{'scrollactive-btn_selected': index == selectedCatalog}"
         v-for="(product, index) in products" :key="index"
         :href="'#catalog'+index" @click="selectedCatalog = index">{{product.catalog}}</a>
    </scrollactive>

    <div class="product-block" v-for="(product, index) in products" :key="index" :id="'catalog'+index">
      <product-type>{{product.catalog}}</product-type>
      <!--      products-outline 缺少 products 属性-->
      <products-outline :products="product.list"></products-outline>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueScrollactive from 'vue-scrollactive'
  import ProductType from './ProductType'
  import ProductsOutline from './ProductsOutline'

  Vue.use(VueScrollactive)

  export default {
    name: 'ScrollProducts',
    components: {
      ProductType: ProductType,
      ProductsOutline: ProductsOutline
    },
    data() {
      return {
        services: ['资讯类产品', '投研类产品', '服务类产品'],
        selectedCatalog: -1,
        products: [
          {
            catalog: '证券理财',
            list: [
              {
                id: 1,
                name: '证券理财一号',
                outline: '一号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRqcd.png'
              }, {
                id: 2,
                name: '证券理财二号',
                outline: '二号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRb1H.png',
              }, {
                id: 3,
                name: '证券理财三号',
                outline: '三号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRH9e.png',
              },
            ]
          }, {
            catalog: '私募基金',
            list: [
              {
                id: 4,
                name: '私募基金1号',
                outline: '1号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRThD.png',
              }, {
                id: 5,
                name: '私募基金2号',
                outline: '2号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRotO.png',
              }, {
                id: 6,
                name: '私募基金3号',
                outline: '3号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRIAK.png',
              },
            ]
          }, {
            catalog: '公募基金',
            list: [
              {
                id: 6,
                name: '公募基金1号',
                outline: '1号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQR476.png',
              }, {
                id: 8,
                name: '公募基金2号',
                outline: '2号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRh0x.png'
              }, {
                id: 9,
                name: '公募基金一号',
                outline: '一号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRqcd.png',
              }, {
                id: 10,
                name: '公募基金一号',
                outline: '一号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRb1H.png',
              }, {
                id: 11,
                name: '公募基金一号',
                outline: '一号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRH9e.png',
              }, {
                id: 12,
                name: '公募基金一号',
                outline: '一号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRThD.png',
              }, {
                id: 6,
                name: '公募基金1号',
                outline: '1号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQR476.png',
              }, {
                id: 8,
                name: '公募基金2号',
                outline: '2号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRh0x.png'
              }, {
                id: 9,
                name: '公募基金一号',
                outline: '一号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRqcd.png',
              }, {
                id: 10,
                name: '公募基金一号',
                outline: '一号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRb1H.png',
              }, {
                id: 11,
                name: '公募基金一号',
                outline: '一号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRH9e.png',
              }, {
                id: 12,
                name: '公募基金一号',
                outline: '一号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRThD.png',
              },
            ]
          }, {
            catalog: '银行理财',
            list: [
              {
                id: 13,
                name: '银行理财一号',
                outline: '一号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRotO.png',
              }, {
                id: 14,
                name: '银行理财一号',
                outline: '一号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRIAK.png',
              }, {
                id: 15,
                name: '银行理财一号',
                outline: '一号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQR476.png',
              },
            ]
          }, {
            catalog: '信托产品',
            list: [
              {
                id: 16,
                name: '信托产品一号',
                outline: '一号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRh0x.png'
              }
            ]
          }, {
            catalog: '债券产品',
            list: [
              {
                id: 16,
                name: '债券产品一号',
                outline: '一号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRqcd.png',
              }, {
                id: 18,
                name: '债券产品一号',
                outline: '一号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRb1H.png',
              }
            ]
          }, {
            catalog: '保险产品',
            list: [
              {
                id: 19,
                name: '保险产品一号',
                outline: '一号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRH9e.png',
              }, {
                id: 20,
                name: '保险产品一号',
                outline: '一号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRThD.png',
              }, {
                id: 21,
                name: '保险产品一号',
                outline: '一号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRotO.png',
              },
            ]
          },
        ]
      }
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>

  .scrollactive-btns {
    width: 100%;
    background: white;
    height: 65px;
    display: flex;
    justify-content: center;
    color: black;
    transition: 0.3s color;
    position: sticky;
    top: 0px;
    /*如果不够高的话, 会被md-button的字挡到...*/
    z-index: 7;

    .scrollactive-btn {
      font-size: 18px;
      height: calc(100% - 2px);
      margin: 0 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      word-break: keep-all;
      color: black;
      transition: 0.3s color;
      text-decoration: none;
      position: relative;

      &:after {
        content: "";
        background: #0f97ff;
        height: 2px;
        width: 0px;
        transition: 0.3s width;
        position: absolute;
        bottom: -2px;
      }

      &:hover {
        color: #0f97ff;
        transition: 0.3s color;
      }

      &:hover:after {
        width: 100%;
        transition: 0.3s width;
      }
    }

    .scrollactive-btn_selected {
      color: #0f97ff;

      &:after {
        width: 100%;
      }
    }

  }

  .product-block {
    max-width: 1200px;
    /*补15px,顶部留一些白*/
    margin: 15px auto 150px auto;
  }
</style>