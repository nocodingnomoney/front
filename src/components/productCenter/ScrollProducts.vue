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
      <a class="scrollactive-item scrollactive-btn" v-for="(product, index) in products" :key="index"
         :href="'#product'+index">{{product.catalog}}</a>
    </scrollactive>

    <div class="product-block" v-for="(product, index) in products" :key="index" :id="'product'+index">
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
                name: '证券理财号',
                outline: '一号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRb1H.png'
              }, {
                id: 3,
                name: '理财产品证券理财一号',
                outline: '一号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRqcd.png'
              },
            ]
          }, {
            catalog: '私募基金',
            list: [
              {
                id: 4,
                name: '理财产品一号',
                outline: '一号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRH9e.png'
              }, {
                id: 5,
                name: '理财产品一号',
                outline: '一号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRqcd.png'
              }, {
                id: 6,
                name: '理财产品一号',
                outline: '一号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRqcd.png'
              },
            ]
          }, {
            catalog: '公募基金',
            list: [
              {
                id: 7,
                name: '理财产品一号',
                outline: '一号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRqcd.png'
              }, {
                id: 8,
                name: '理财产品一号',
                outline: '一号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRh0x.png'
              }, {
                id: 9,
                name: '理财产品一号',
                outline: '一号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRqcd.png'
              }, {
                id: 10,
                name: '理财产品一号',
                outline: '一号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRqcd.png'
              }, {
                id: 11,
                name: '理财产品一号',
                outline: '一号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRqcd.png'
              }, {
                id: 12,
                name: '理财产品一号',
                outline: '一号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRqcd.png'
              },
            ]
          }, {
            catalog: '银行理财',
            list: [
              {
                id: 13,
                name: '理财产品一号',
                outline: '一号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRqcd.png'
              }, {
                id: 14,
                name: '理财产品一号',
                outline: '一号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRqcd.png'
              }, {
                id: 15,
                name: '理财产品一号',
                outline: '一号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRqcd.png'
              },
            ]
          }, {
            catalog: '信托产品',
            list: [
              {
                id: 16,
                name: '理财产品一号',
                outline: '一号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRqcd.png'
              }
            ]
          }, {
            catalog: '债券产品',
            list: [
              {
                id: 17,
                name: '理财产品一号',
                outline: '一号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRqcd.png'
              }, {
                id: 18,
                name: '理财产品一号',
                outline: '一号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRqcd.png'
              }
            ]
          }, {
            catalog: '保险产品',
            list: [
              {
                id: 19,
                name: '理财产品一号',
                outline: '一号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRqcd.png'
              }, {
                id: 20,
                name: '理财产品一号',
                outline: '一号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRqcd.png'
              }, {
                id: 21,
                name: '理财产品一号',
                outline: '一号产品,仅用于测试',
                imageUrl: 'https://s2.ax1x.com/2019/06/29/ZQRqcd.png'
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

  }

  .product-block {
    height: 500px;
    max-width: 1200px;
    /*补15px,顶部留一些白*/
    margin: 15px auto 0px auto;
  }
</style>