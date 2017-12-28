<template>
    <div class="sign-success" @click="closeSignSuccess">
      <div class="sign-text">
        <p>您已连续签到{{ signObject.continue_day }}次</p>
        <p>获得积分{{ signObject.score }}分</p>
      </div>
    </div>
</template>

<script>
export default {
  name: 'SignSuccess',
  props: {
    signObject: {
      type: Object
    }
  },
  methods: {
    closeSignSuccess () {
      this.$emit('closeSignSuccess')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .sign-success {
    background: url(../assets/bg@signin.png) no-repeat center;
    background-size: 100% 100%;
    max-width: 100vw;
    height: 100vh;
    z-index: 9999;
    .sign-text {
      position: absolute;
      top: 48%;
      left: 20%;
      width: 56.2%;
      text-align: center;
      color: #03CA61;
      font-weight: bold;
    }
  }
</style>
