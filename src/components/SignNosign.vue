<template>
    <div class="sign-nosign">
      <div class="errorMsg">
        <div v-if="errorCode == 1">
          <div>还没到下个签到日，请明天再来签到吧</div>
          <div>连续签到可获得更多积分</div>
        </div>
        <div v-if="errorCode == 2">不能隔日签到</div>
        <div v-if="errorCode == 3">您的签到时间已过期，请刷新后重试</div>
        <div v-if="errorCode == 4">积分不足，请继续努力</div>
      </div>
      <img src="../assets/know.png" class="know" @click="closeSignNosign">
    </div>
</template>

<script>
export default {
  name: 'SignNosign',
  props: {
    errorCode: {
      type: Number
    }
  },
  methods: {
    closeSignNosign () {
      this.$emit('closeSignNosign')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .sign-nosign {
    background: url(../assets/bg@nosign.png) no-repeat center;
    background-size: 100% 100%;
    max-width: 100vw;
    height: 100vh;
    position: relative;
    z-index: 9999;
    .errorMsg {
      position: absolute;
      z-index: 9999;
      top: 48vh;
      left: 14.7vw;
      width: 70.3vw;
      font-size: 3.5vw;
      text-align: center;
      color: #333;
      line-height: 26px;
    }
    .know {
      position: absolute;
      z-index: 9999;
      top: 58%;
      left: 25%;
      height: 5.85%;
      width: 51.25%;
    }
  }
</style>
