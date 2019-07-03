<template>
  <div class="content">
    <div class="header">
      <div class="title">
        产品详情——{{product.name}}
      </div>
    </div>

    <div class="middle">
      <div class="imageZone">
        <img src=https://s2.ax1x.com/2019/06/28/ZKzAvq.jpg width="500px" class="productImage">
      </div>

      <div class="productInfo">
        <h2 class="subtitle">
          {{product.name}}
        </h2>
        <article class="intro">
          {{product.intro}}
        </article>
        <div class="buttom">
          <span class="price">
            价格：￥{{product.price}}
          </span>
          <span class="purchase">
            <md-button class="md-raised md-primary">购买</md-button>
          </span>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
  import Vue from 'vue'

  import {MdCard,MdContent, MdButton} from 'vue-material/dist/components'

  Vue.use(MdCard)
  Vue.use(MdContent)
  Vue.use(MdButton)

  export default {
    name: 'ProductDetail',
    components: {},
    data(){
      return {
        product:{
          id : null,
          name : '理财产品一号',
          intro : '理财产品一号的介绍，理财产品一号的介绍，理财产品一号的介绍，理财产品一号的介绍，理财产品一号的介绍，理财产品一号的介绍，理财产品一号的介绍，理财产品一号的介绍，理财产品一号的介绍，理财产品一号的介绍，理财产品一号的介绍，理财产品一号的介绍，理财产品一号的介绍，理财产品一号的介绍',
          price : 999
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .content{
    width: 100vw;
    height: 100vh;
  }

  .header{
    user-select: none;
    z-index: 2;
    width: 100%;
    height: 65px;
    background: rgba(0, 0, 0, .7);
    transition: background 0.3s;

    &:hover{
      background: #0f97ff;
    }
  }
  .title{
    color: white;
    font-size: 25px;
    line-height: 65px;
    margin-left: 45px;
  }

  .middle{
    margin-top: 100px;
    width : 100vw;
    height: 50vh;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .imageZone{
    height: 50vh;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .productInfo{
    height: 50vh;
    flex: 1;
  }
  .subtitle{
    font-size:40px;
    font-weight: 600;
  }
  .intro{
    display: block;
    font-size: 20px;
    padding-right: 150px;
    line-height: 30px;
    margin-bottom: 25px;
    height: 200px;
    overflow:hidden;
  }

  .purchase{
    float: right;
    margin-right: 150px;
  }
  .md-button{
    width: 150px;
    height: 40px;
  }
  .price{
    font-size: 30px;
  }
  .subtitle, .intro, .buttom{
    width: 100%;
    text-align: left;
  }

</style>