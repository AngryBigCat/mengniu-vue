<template>
  <div class="rule-container">
    <img src="../assets/product@close.png" class="close" @click="closeRuleMask">
  </div>
</template>

<script>
// import BScroll from 'better-scroll'
// import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'rule',
  methods: {
    closeRuleMask () {
      this.$emit('closeRuleMask')
    }
  }
}
</script>

<style lang="scss" type="text/css" scoped>
  .rule-container {
    background: url(../assets/bg@rule4.png) no-repeat;
    background-size: 100% 100%;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    position: absolute;
    z-index: 9999;
    .close {
      width: 9.86%;
      height: 6.12%;
      position: absolute;
      top: 6%;
      right: 2%;
    }
    .rule-text {
      font-size: 10px;
      width: 78%;
      position: absolute;
      left: 12%;
      top: 18%;
      .rule-list {
        padding-left: 1.6em;
      }
    }
  }
</style>