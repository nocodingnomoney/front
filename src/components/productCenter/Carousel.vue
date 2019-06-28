<template>
  <div class="carousel">
    <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
      <!-- slides -->
      <swiper-slide v-for="(url, index) in posters" :key="index">
        <div class="poster-container" :style='"background-image:url("+url+")"'>
          <img :src="url"/>
        </div>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {MdButton, MdIcon, MdSnackbar} from 'vue-material/dist/components'
  // require styles
  import 'swiper/dist/css/swiper.css'

  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  Vue.use(MdIcon)
  Vue.use(MdButton)
  Vue.use(MdSnackbar)

  export default {
    name: 'Carousel',
    components: {
      Swiper: swiper,
      SwiperSlide: swiperSlide
    },
    data() {
      return {
        posters: [
          'https://s2.ax1x.com/2019/06/28/ZKzAvq.jpg',
          'https://s2.ax1x.com/2019/06/28/ZKzk2n.jpg',
          'https://s2.ax1x.com/2019/06/28/ZKzF8s.jpg',
          'https://s2.ax1x.com/2019/06/28/ZKziCj.jpg'
        ],
        // option是根据 vue-awesome-swiper 官网上的API文档填写的
        swiperOption: {
          grabCursor: true,
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .carousel {
    width: 100%;
    position: relative;
    z-index: 1;
  }

  .poster-container {
    width: 100%;
    height: 400px;
    display: flex;
    justify-content: center;
    background-size: 100% 100%;
    background-repeat: repeat-x;
    position: relative;
    z-index: 0;

    &:after {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      background: inherit;
      z-index: 1;
      filter: blur(5px);
      top: 0;
      left: 0;
    }


    img {
      height: 100%;
      z-index: 2;
    }
  }
</style>