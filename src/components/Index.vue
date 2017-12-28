<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <div class="top">
      <img src="../assets/qiandao.png" class="qiandao">
      <img src="../assets/bi.png" class="bi">
      <img src="../assets/gold@1.png" class="gold1">
      <img src="../assets/gold@1.png" class="gold2">
      <img src="../assets/gold@2.png" class="gold3">
      <img src="../assets/gold@2.png" class="gold4">
    </div>
    <div class="middle">
      <img src="../assets/button@star1.png" class="jifen-star">
      <img src="../assets/jifen.png" class="jifen" @click="onEnterShop">
      <img :src="player.headimgurl" v-show="player.headimgurl" class="avatar">
      <div class="sign-container" @click="onSignEveryDay" v-show="signContainerShow">
        <audio ref="clickAudio">
          <source src="../assets/click.mp3" type="audio/mpeg">
        </audio>
        <div class="honor" ref="honorMask"></div>
        <div class="sign-top">
          <div class="sign-box">
            <div class="sign-bg-1">
              <span :data-value="signScoreConfig[0].score" :data-sign-day="1">{{ signScoreConfig[0].score }}积分</span>
            </div>
          </div>
          <div class="sign-box">
            <div class="sign-bg-2">
              <span :data-value="signScoreConfig[1].score" :data-sign-day="2">{{ signScoreConfig[1].score }}积分</span>
            </div>
          </div>
          <div class="sign-box">
            <div class="sign-bg-3">
              <span :data-value="signScoreConfig[2].score" :data-sign-day="3">{{ signScoreConfig[2].score }}积分</span>
            </div>
          </div>
          <div class="sign-box">
            <div class="sign-bg-4">
              <span :data-value="signScoreConfig[3].score" :data-sign-day="4">{{ signScoreConfig[3].score }}积分</span>
            </div>
          </div>
        </div>
        <div class="sign-bottom">
          <div class="sign-box">
            <div class="sign-bg-5">
              <span :data-value="signScoreConfig[4].score" :data-sign-day="5">{{ signScoreConfig[4].score }}积分</span>
            </div>
          </div>
          <div class="sign-box">
            <div class="sign-bg-6">
              <span :data-value="signScoreConfig[5].score" :data-sign-day="6">{{ signScoreConfig[5].score }}积分</span>
            </div>
          </div>
          <div class="sign-box">
            <div class="sign-bg-7">
              <span :data-value="signScoreConfig[6].score" :data-sign-day="7">{{ signScoreConfig[6].score }}积分</span>
            </div>
          </div>
        </div>
      </div>
      <div class="user-info">
        <div class="username">{{ player.nickname }}</div>
        <div class="score-text">当前总积分 <span class="score-count">{{ player.total_score }}分</span></div>
      </div>
    </div>
    <div class="bottom">
      <img src="../assets/rules.png" class="rule" @click="onShowRuleMask">
      <img src="../assets/paihang.png" class="paihang" @click="onShowRankMask">
      <img src="../assets/fx.png" class="fx" @click="onMaskShare">
    </div>
    <share v-show="maskShare" @closeMaskShare="closeMaskShare"></share>
    <rank v-show="showRank" @closeRankMask="closeRankMask" :bindScroll="bindScroll" :player="player"></rank>
    <rule v-show="showRule" @closeRuleMask="closeRuleMask"></rule>
    <sign-success v-show="showSignSuccess" @closeSignSuccess="closeSignSuccess" :signObject="signObjectSuccess"></sign-success>
    <sign-nosign v-show="showSignNosign" :error-code="errorCode" @closeSignNosign="closeSignNosign"></sign-nosign>
  </div>
</template>

<script>
import Rank from './Rank'
import Rule from './Rule'
import SignSuccess from './SignSuccess'
import SignNosign from './SignNosign'
import Share from './Share'

export default {
  name: 'Index',
  data () {
    return {
      maskShare: false,
      showRank: true,
      showRule: true,
      showSignSuccess: false,
      showSignNosign: false,
      signContainerShow: false,
      signCount: 0,
      bindScroll: null,
      errorCode: 0,
      signObjectSuccess: {
        continue_day: 0
      },
      signScoreConfig: [
        {score: 0},
        {score: 0},
        {score: 0},
        {score: 0},
        {score: 0},
        {score: 0},
        {score: 0}
      ],
      player: {
        nickname: '',
        score: '',
        headimgurl: ''
      },
      flag: false
    }
  },
  created () {
    this.$http.get('player', {
      params: {
        openid: this.$openid
      }
    }).then((res) => {
      this.player = res.data.player
      this.$http.get('sign/count', {
        params: {
          id: this.player.id
        }
      }).then((res) => {
        this.signContainerShow = true
        this.$http.get('sign/score').then((res) => {
          this.signScoreConfig = res.data.sign_score
        })
        if (res.data.day === 7) {
          for (let i = 1; i <= 7; i++) {
            let sign = document.querySelector('.sign-bg-' + i)
            if (sign.firstChild.tagName === 'DIV') {
              sign.removeChild(sign.firstChild)
            }
          }
        } else {
          for (let i = 1; i <= res.data.day; i++) {
            let sign = document.querySelector('.sign-bg-' + i)
            let honor = this.$refs.honorMask.cloneNode(true)
            let span = sign.firstChild
            sign.insertBefore(honor, span)
          }
        }
      })
    })
  },
  mounted () {
    this.showRank = false
    this.showRule = false
  },
  methods: {
    onEnterShop (event) {
      this.$router.push('Shop')
    },
    onMaskShare (event) {
      this.maskShare = true
    },
    closeMaskShare (event) {
      this.maskShare = false
    },
    onShowRankMask (event) {
      this.$http.get('player', {
        params: {
          openid: this.$openid
        }
      }).then((res) => {
        this.player = res.data.player
      })
      this.bindScroll = true
      this.showRank = true
    },
    closeRankMask (event) {
      this.showRank = false
    },
    onShowRuleMask (event) {
      this.showRule = true
    },
    closeRuleMask (event) {
      this.showRule = false
    },
    onSignEveryDay (event) {
      if (this.flag) {
        return false
      }
      this.flag = true

      let sign = event.target

      if ((/^sign-bg-\d$/.test(sign.className) || sign.tagName === 'SPAN') && !sign.previousSibling) {
        let element = sign
        if (sign.tagName === 'SPAN') {
          this.$refs.clickAudio.play()
          this.$refs.clickAudio.onended = function () {
            this.pause()
          }
          element = sign.parentNode
          let preSign = '.sign-bg-' + (element.className.split('-')[2] - 1)
          // console.log(document.querySelector(preSign).firstChild.tagName)
          // console.log(preSign)
          if (preSign === '.sign-bg-0' || document.querySelector(preSign).firstChild.tagName === 'DIV') {
            this.$http.post('player/sign', {
              id: this.player.id,
              score: sign.getAttribute('data-value'),
              sign_day: sign.getAttribute('data-sign-day')
            }).then((res) => {
              this.flag = false
              if (res.data.code === 1) {
                this.errorCode = 1
                this.showSignNosign = true
              } else if (res.data.code === 2) {
                this.errorCode = 3
                this.showSignNosign = true
                for (let i = 1; i <= 7; i++) {
                  let sign = document.querySelector('.sign-bg-' + i)
                  if (sign.firstChild.tagName === 'DIV') {
                    sign.removeChild(sign.firstChild)
                  }
                }
              } else if (res.data.code === 0) {
                let div = this.$refs.honorMask.cloneNode(true)
                sign.parentNode.insertBefore(div, sign)
                this.player.total_score = parseInt(this.player.total_score) + parseInt(res.data.score)
                this.showSignSuccess = true
                this.signObjectSuccess = res.data
              }
            })
            // console.log(sign.getAttribute('data-value'))
          } else {
            this.flag = false
            this.errorCode = 2
            this.showSignNosign = true
          }
        }
      }
    },
    closeSignSuccess () {
      this.showSignSuccess = false
    },
    closeSignNosign () {
      this.showSignNosign = false
    }
  },
  components: {
    Rank,
    Rule,
    SignSuccess,
    SignNosign,
    Share
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @keyframes updown
  {
    from {
      transform: scale(1, 1)
    }
    to {
      transform: scale(1.2, 1.2)
    }
  }
  @keyframes CheckMark
  {
    0%   {
      position: absolute;
      top: 10%;
      right: 13%;
    }
    50%  {
      position: absolute;
      top: 10.5%;
      right: 11.8%;
    }
    100% {
      position: absolute;
      top: 9.5%;
      right: 10%;
    }
  }
  @keyframes translateY
  {
    from {
      transform: translateY(0px);
    }
    to {
      transform: translateY(10px);
    }
  }
  @keyframes RotateStar
  {
    0% {
      transform: rotate(0deg);
      transform-origin: 50% 50%;
    }
    100% {
      transform: rotate(360deg);
      transform-origin: 50% 50%;
    }
  }
  #app {
    background: url(../assets/bg.png) no-repeat center;
    background-size: 100% 100%;
    max-width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .top {
      .gold1 {
        position: absolute;
        width: 8.4%;
        height: 3.98%;
        top: 18%;
        right: 3%;
        animation: translateY 1s linear infinite alternate;
      }
      .gold2 {
        position: absolute;
        width: 8.4%;
        height: 3.98%;
        top: 23%;
        left: 45%;
        animation: translateY 1s linear 0.3s infinite alternate;
      }
      .gold3 {
        position: absolute;
        width: 8.4%;
        height: 3.98%;
        top: 3%;
        right: 2%;
        animation: translateY 1s linear 0.5s infinite alternate;
      }
      .gold4 {
        position: absolute;
        width: 8.4%;
        height: 3.98%;
        top: 25%;
        left: 2%;
        animation: translateY 1s linear 0.8s  infinite alternate;
      }
    }
    .sign-success {
      background: url(../assets/bg@signin.png) no-repeat center;
      background-size: 100% 100%;
      max-width: 100vw;
      height: 100vh;
      z-index: 9999;
    }
    .middle {
      .sign-container {
        position: absolute;
        width: 100%;
        height: 67.4%;
        padding-top: 52.5%;
        top: 0;
        .sign-top {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          padding: 0 8vw;
          margin-bottom: 10px;
          .sign-box {
            position: relative;
            .honor {
              background: url(../assets/sign@honor.png) no-repeat;
              background-size: 100% 100%;
              position: absolute;
              width: 17.1vw;
              height: 21.5vw;
              z-index:9996;
              top: -0.6vw;
              left: 0.4vw;
            }
            // img {
            //   width: 18vw;
            //   height: 18vw;
            // }
            @for $i from 1 through 4 {
              .sign-bg-#{$i} {
                width: 18vw;
                height: 18vw;
                background: url(../assets/sign@#{$i}.png) no-repeat;
                background-size: 100% 100%;
                position: relative;
                span {
                  position: absolute;
                  color: #fff;
                  font-size: 4.4vw;
                  width: 100%;
                  height: 100%;
                  line-height: 500%;
                  text-align: center;
                  text-shadow: 2px 2px 2px #F59C38;
                }
              }
            }
          }
        }
        .sign-bottom {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          padding: 0 18vw;
          .sign-box {
            position: relative;
            .honor {
              background: url(../assets/sign@honor.png) no-repeat;
              background-size: 100% 100%;
              position: absolute;
              width: 17.1vw;
              height: 21.5vw;
              top: -0.6vw;
              left: 0.4vw;
              z-index:9996;
            }
            // img {
            //   width: 18vw;
            //   height: 18vw;
            // }
            @for $i from 5 through 7 {
              .sign-bg-#{$i} {
                width: 18vw;
                height: 18vw;
                background: url(../assets/sign@#{$i}.png) no-repeat;
                background-size: 100% 100%;
                span {
                  position: absolute;
                  color: #fff;
                  font-size: 4.4vw;
                  width: 100%;
                  height: 100%;
                  line-height: 500%;
                  text-align: center;
                  text-shadow: 2px 2px 2px #F59C38;
                }
              }
            }
          }
        }
      }
    }
  }
  .user-info {
    position: absolute;
    left: 35%;
    top: 60.8%;
    height: 8.1vh;
    width: 65%;
    color: #fff;
    box-sizing: border-box;
    padding-top: 5px;
    font-size: 4vw;
    .username {
      margin-bottom: 3px;
    }
    .score-text {
      .score-count {
        font-size: 5vw;
        font-weight: bold;
      }
    }
  }
  .avatar {
    width: 11vh;
    height: 11vh;
    border-radius: 100px;
    border: 3px solid #03CA61;
    position: absolute;
    top: 58.7%;
    left: 11%;
  }
  .qiandao {
    height: 15.78%;
    width: 35.41%;
    position: absolute;
    top: 8%;
    left: 12%;
    animation: updown 1s linear infinite alternate;
  }
  .bi {
    height: 8.28%;
    width: 10.41%;
    position: absolute;
    top: 10%;
    right: 13%;
    animation: CheckMark 1s linear infinite alternate;
  }
  .jifen {
    height: 10.09%;
    width: 44.66%;
    position: absolute;
    bottom: 20%;
    left: 30.5%;
    z-index: 1;
    animation: updown 1s linear infinite alternate;
  }
  .jifen-star {
    width: 8.4%;
    height: 5.29;
    position: absolute;
    bottom: 21.6%;
    left: 27.5%;
    z-index: 999;
    animation: RotateStar 2s linear infinite;
  }
  .rule {
    height: 6.7%;
    width: 23.46%;
    position: absolute;
    bottom: 10%;
    left: 1.5%;
    margin-left: 20px;
  }
  .paihang {
    height: 6.87%;
    width: 30%;
    position: absolute;
    bottom: 10%;
    left: 35%;
  }
  .fx {
    height: 6.7%;
    width: 23.46%;
    /*margin-right: 20px;*/
    position: absolute;
    bottom: 10%;
    left: 69%;
  }
  .mask {
    background: url(../assets/share.png) no-repeat;
    background-size: 100% 100%;
    height: 100vh;
    width: 100vw;
    z-index: 9998;
  }
</style>
