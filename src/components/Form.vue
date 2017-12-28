<template>
  <div class="form">
    <div class="split-line"></div>
    <div class="form-group username">
      <input type="text" placeholder="请输入姓名" v-model="prizeSubmit.input_name">
    </div>
    <div class="form-group phone">
      <input type="text" placeholder="请输入手机号" v-model="prizeSubmit.input_phone" maxlength="11">
    </div>
    <div class="form-group address">
      <input type="text" placeholder="请输入地址" v-model="prizeSubmit.input_address">
    </div>
    <div class="score-des">
      <p>当前总积分：{{ playerObj.total_score }}</p>
      <p>兑换后积分：{{ playerObj.total_score - prizeObj.need_score }}</p>
    </div>
    <img src="../assets/product@submit.png" class="woyao" @click="onUserSubmit">
    <div class="submit-success" v-show="showSubmit" @click="closeSubmit"></div>
  </div>
</template>

<script>
  export default {
    name: 'Form',
    props: {
      prizeObj: {
        type: Object
      },
      playerObj: {
        type: Object
      }
    },
    data () {
      return {
        scroll: null,
        showSubmit: false,
        prizeSubmit: {
          input_name: '',
          input_phone: '',
          input_address: '',
          player_id: this.playerObj.id,
          prize_id: this.prizeObj.id,
          prize_name: this.prizeObj.name,
          prize_img_url: this.prizeObj.head_img_url,
          spend_score: this.prizeObj.need_score
        }
      }
    },
    methods: {
      onUserSubmit () {
        if (this.playerObj.total_score < this.prizeObj.spend_score) {
          alert('您没有足够的积分')
          return false
        }
        if (this.prizeObj.store_count < 1) {
          alert('库存不足')
          return false
        }
        this.prizeSubmit.player_id = this.playerObj.id
        this.prizeSubmit.prize_id = this.prizeObj.id
        this.prizeSubmit.prize_name = this.prizeObj.name
        this.prizeSubmit.prize_img_url = this.prizeObj.head_img_url
        this.prizeSubmit.spend_score = this.prizeObj.need_score
        this.$http.post('prize', this.prizeSubmit).then((res) => {
          this.playerObj.total_score = parseInt(this.playerObj.total_score) - parseInt(this.prizeObj.need_score)
          this.prizeObj.store_count = parseInt(this.prizeObj.store_count) - 1
          this.$emit('recordRefresh', res.data.record)
          this.showSubmit = true
        })
      },
      closeSubmit () {
        this.$emit('closeShowInfo')
        this.showSubmit = false
      }
    }
  }
</script>


<style lang="scss" type="text/css" scoped>
  .form {
    .submit-success {
      background: url(../assets/bg@submit.png) no-repeat;
      background-size: 100% 100%;
      width: 100vw;
      height: 100vh;
      position: absolute;
      left: -15vw;
      top: -33vh;
    }
    .split-line {
      background: url(../assets/splitline.png) no-repeat center;
      background-size: 120% 100%;
      height: 14px;
      margin-bottom: 14px;
    }
    .username {
      background: url(../assets/form@username.png) no-repeat;
    }
    .phone {
      background: url(../assets/form@phone.png) no-repeat;
    }
    .address {
      background: url(../assets/form@address.png) no-repeat;
    }
    .form-group {
      background-size: 100% 100%;
      height: 8vh;
      position: relative;
      input {
        position: absolute;
        top: 20%;
        left: 18%;
        height: 3vh;
        width: 72%;
        border: none;
        outline: none;
      }
    }
    .score-des {
      font-size: 12px;
      color: #333;
      p {
        margin: 0;
        padding: 0;
        height: 16px;
        line-height: 16px;
      }
    }
    .woyao {
      width: 100%;
      height: 20.2%;
      position: absolute;
      top: 48.5vh;
    }
  }
</style>