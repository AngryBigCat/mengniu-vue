<template>
  <div class="share" @click="closeMaskShare">
    <img src="../assets/share@bubble.png" class="bubble">
  </div>
</template>

<script>
  export default {
    methods: {
      closeMaskShare () {
        this.$emit('closeMaskShare')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .share {
    background: url(../assets/share@bg.png) no-repeat;
    background-size: 100% 100%;
    height: 100vh;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
    .bubble {
      width: 52.13%;
      height: 18.62%;
      position: absolute;
      top: 10%;
      left: 10%;
      animation: showHide 0.8s linear infinite alternate;
    }
  }

  @keyframes showHide{
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
</style>