<template>
  <div class="hello">
    <swiper :options="swiperOption">
      <swiper-slide v-for="imgUrl in introImgUrl" v-if="introImgUrl">
        <img class="pic" :src="imgUrl">
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
// import BScroll from 'better-scroll'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'Demo',
  props: {
    introImgUrl: {
      type: Array
    }
  },
  data () {
    return {
      swiperOption: {
        direction: 'vertical',
        pagination: '.swiper-pagination'
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.hello {
  width: 100%;
  overflow: hidden;
  .pic {
    width: 100%;
    height: 20vh;
    background: #aaa;
  }
}
</style>
