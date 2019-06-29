<template>
  <div class="product-toolbar">
    <div class="logo">
      <md-icon>code</md-icon>
      <div class="logo__word">NoCodingNoMoney</div>
      <md-icon>attach_money</md-icon>
    </div>
    <div class="navs">
      <div class="navs__button" v-for="(nav, index) in navs" :key="index">
        <div class="navs__button__word" @click="navigateTo(index)">{{nav}}</div>
        <div class="navs__button__bottom" :class="{navs__button__bottom_selected: index==selectedNav}"></div>
      </div>
    </div>
    <md-snackbar :md-active.sync="toggleSnackbar" md-persistent>
      <span>敬请期待</span>
      <md-button class="md-primary" @click="toggleSnackbar = false">好的</md-button>
    </md-snackbar>
  </div>
</template>

<script>
  import Vue from 'vue'
  import 'vue-material/dist/vue-material.min.css'

  import {MdIcon} from 'vue-material/dist/components'

  Vue.use(MdIcon)

  export default {
    name: 'ProductToolbar',
    data() {
      return {
        toggleSnackbar: false,
        selectedNav: 1,
        navs: ['首页', '产品中心', '产品商城', '广告服务', '开放平台', '关于我们', '投资者关系']
      }
    },
    methods: {
      navigateTo(index) {
        switch (index) {
          case 1: // 原地不动
            break
          case 2: // 跳转到商城
            this.$router.push('/mall')
            break
          default: // 未开放
            this.toggleSnackbar = true
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .product-toolbar {
    user-select: none;
    z-index: 2;
    width: 100%;
    height: 65px;
    background: rgba(0, 0, 0, .7);
    transition: 0.3s background;
    display: flex;
    justify-content: space-around;

    &:hover {
      background: #0f97ff;
      transition: 0.3s background;
    }
  }

  .logo {
    font-size: 20px;
    color: white;
    display: flex;
    width: 250px;
    justify-content: center;
    align-items: center;
    height: 100%;

    .md-icon {
      color: white;
      font-size: 40px !important;
    }

    .logo__word {
      margin-left: 10px;
      display: inline;
    }
  }

  .navs {
    color: white;
    display: flex;
    justify-content: space-between;

    .navs__button {
      width: fit-content;
      margin: 0 15px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      .navs__button__word {
        font-size: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: calc(100% - 2px);
        cursor: pointer;
      }

      .navs__button__bottom {
        height: 2px;
        width: 0px;
        background: white;
        transition: 0.3s width;
      }

      &:hover > .navs__button__bottom {
        width: 100%;
        transition: 0.3s width;
      }

      .navs__button__bottom_selected {
        width: 100%;
      }
    }
  }

</style>