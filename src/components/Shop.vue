<template>
    <div id="shop">
      <div class="top">
        <img src="../assets/money1.png" class="money1">
        <img src="../assets/money2.png" class="money2">
        <img src="../assets/money3.png" class="money3">
      </div>
      <div class="other">
        <img :src="player.headimgurl" v-show="player.headimgurl" class="avatar">
        <div class="user-info">
          <div class="username">{{ player.nickname }}</div>
          <div class="score-text">当前总积分 <span class="score-count">{{ player.total_score }}分</span></div>
        </div>
        <img src="../assets/return.png" class="return" @click="onBackHome">
        <img src="../assets/prize.png" class="prize" @click="onShowRecord">
      </div>
      <div class="middle">
        <div class="scroll" ref="scroll">
          <ul>
            <li class="product-item" v-for="prize in prizes">
              <div class="item-top">
                <img :src="prize.head_img_url" class="product-img">
                <img src="../assets/coversion@none.png" v-if="prize.store_count === 0" class="coversion">
                <img @click="onShowInfo(prize.id)" src="../assets/coversion@active.png" v-else class="coversion">
              </div>
              <div class="item-text">
                <p>{{ prize.name }}</p>
                <p>所需积分：{{ prize.need_score }}</p>
                <p>（剩余{{ prize.store_count }}个）</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="bottom">
        <img src="../assets/rules.png" class="rule" @click="onShowRuleMask">
        <img src="../assets/paihang.png" class="paihang" @click="onShowRankMask">
        <img src="../assets/fx.png" class="fx" @click="onMaskShare">
      </div>
      <share v-show="maskShare" @closeMaskShare="closeMaskShare"></share>
      <ProductInfo v-show="showInfo" @recordRefresh="recordRefresh" @closeShowInfo="closeShowInfo" :playerObj="player" :prizeObj="prizeObj"></ProductInfo>
      <rank v-show="showRank" :bindScroll="bindRankScroll" @closeRankMask="closeRankMask" :player="player"></rank>
      <Record v-show="showRecord" @closeRecordMask="closeRecordMask" :bindScroll="bindScroll" :player="player" :records="records" :bindRefresh="bindRefresh"></Record>
      <rule v-show="showRule" @closeRuleMask="closeRuleMask"></rule>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import ProductInfo from './ProductInfo'
import Swiper from './Demo'
import Rank from './Rank'
import Record from './Record'
import Rule from './Rule'
import Share from './Share'

export default {
  name: 'Shop',
  data () {
    return {
      showInfo: false,
      maskShare: false,
      scroll: null,
      showRank: true,
      showRecord: true,
      showRule: true,
      prizes: null,
      records: [],
      bindScroll: null,
      bindRefresh: false,
      bindRankScroll: null,
      prizeObj: {
        name: ''
      },
      player: {
        nickname: '',
        total_score: '',
        headimgurl: ''
      }
    }
  },
  created () {
    this.$http.get('player', {
      params: {
        openid: this.$openid
      }
    }).then((res) => {
      this.player = res.data.player
      this.$http.get('record/' + this.player.id).then((res) => {
        this.records = res.data.records
      })
    })
  },
  mounted () {
    this.showRank = false
    this.showRecord = false
    this.showRule = false

    this.$http('prize').then((res) => {
      this.prizes = res.data.prizes
      setTimeout(() => {
        this.scroll = new BScroll(this.$refs.scroll, {
          scrollbar: true,
          click: true
        })
      }, 20)
    })
  },
  methods: {
    onBackHome () {
      this.$router.push('Index')
    },
    onMaskShare (event) {
      this.maskShare = true
    },
    closeMaskShare (event) {
      this.maskShare = false
    },
    onShowInfo (id, event) {
      this.$http.get('prize/' + id).then((res) => {
        this.prizeObj = res.data.prize
      })
    },
    closeShowInfo () {
      this.showInfo = false
    },
    onShowRankMask (event) {
      this.bindRankScroll = true
      this.showRank = true
    },
    closeRankMask (event) {
      this.showRank = false
    },
    onShowRecord () {
      this.bindScroll = true
      this.bindRefresh = true
      this.showRecord = true
    },
    closeRecordMask () {
      this.showRecord = false
      this.bindRefresh = false
    },
    onShowRuleMask (event) {
      this.showRule = true
    },
    closeRuleMask (event) {
      this.showRule = false
    },
    recordRefresh (record) {
      this.records.unshift(record)
    }
  },
  watch: {
    prizeObj (newValue) {
      this.showInfo = true
    }
  },
  computed: {
    // 计算属性的 getter
    productImgUrl: function () {
      // `this` 指向 vm 实例
      return '@/assets/product@1.jpg'
    }
  },
  components: {
    ProductInfo,
    Swiper,
    Rank,
    Record,
    Rule,
    Share
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
  @keyframes translateY
  {
    from {
      transform: translateY(0px);
    }
    to {
      transform: translateY(10px);
    }
  }
  #shop {
    background: url(../assets/bg2.png) no-repeat;
    background-size: 100% 100%;
    width: 100vw;
    height: 100vh;
    .top {
      .money1 {
        width: 5.27%;
        height: 2.89%;
        position: absolute;
        left: 60%;
        top: 0.5%;
        animation: translateY 1s linear  infinite alternate;
      }
      .money2 {
        width: 5.27%;
        height: 2.89%;
        position: absolute;
        left: 24%;
        top: 10%;
        animation: translateY 1s linear 0.5s  infinite alternate;
      }
      .money3 {
        width: 13.05%;
        height: 6.95%;
        position: absolute;
        left: 75%;
        top: 10%;
        animation: translateY 1s linear 1s  infinite alternate;
      }
    }
    .other {
      .avatar {
        width: 11vh;
        height: 11vh;
        border-radius: 100px;
        border: 3px solid #03CA61;
        position: absolute;
        top: 15.5%;
        left: 11%;
      }
      .user-info {
        position: absolute;
        left: 35%;
        top: 17.8%;
        height: 8.1vh;
        width: 65%;
        color: #fff;
        box-sizing: border-box;
        padding-top: 6px;
        font-size: 3.5vw;
        .username {
          margin-bottom: 3px;
        }
        .score-text {
          .score-count {
            font-size: 4vw;
            font-weight: bold;
          }
        }
      }
      .return {
        width: 20.4%;
        height: 3.47%;
        position: absolute;
        left: 0%;
        top: 10%;
      }
      .prize {
        width: 18%;
        height: 4.22%;
        position: absolute;
        left: 78%;
        top: 19.5%;
      }
    }
    .middle {
      position: absolute;
      top: 29.5%;
      left: 6.8%;
      width: 86.3%;
      height: 53.2%;
      overflow: hidden;
      // display: flex;
      // flex-wrap: wrap;
      // justify-content: flex-start;
      // align-content: flex-start;
      // overflow: hidden;
      .scroll {
        height: 100%;
        overflow: hidden;
        ul {
          list-style-type: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          .product-item {
            padding-top: 5px;
            padding-bottom: 5px;
            .item-top {
              position: relative;
              padding-bottom: 10px;
              .product-img {
                border: 2px dashed green;
                border-radius: 100px;
                width: 90px;
                height: 90px;
                padding: 1px;
              }
              .coversion {
                position: absolute;
                top: 83px;
                left: 4px;
                width: 95%;
              }
            },
            .item-text {
              font-size: 10px;
              p {
                margin: 0 0 3px 0;
                text-align: center;
              }
            }
          }
        }
      }
      // .product-item {
      //   display: flex;
      //   flex-direction: column;
      //   background: red;
      //   margin: 0;
      //   padding: 5.5px;
      //   dt {
      //     border: 1.5px dashed green;
      //     padding: 2px 3px 0 2px;
      //     border-radius: 200px;
      //     background: white;
      //     .pic {
      //       width: 100px;
      //       height: 100px;
      //       border-radius: 200px;
      //     }
      //   }
      //   dd {
      //     margin: 0;
      //     width: 100px;
      //     padding: 0 3px;
      //     position: relative;
      //     top: -15px;
      //     .coversion {
      //       width: 100%;
      //       height: 100%;
      //     }
      //     .product-text {
      //       display: flex;
      //       flex-direction: column;
      //       align-items: center;
      //       font-size: 10px;
      //     }
      //   }
      // }
    }
    .bottom {
      .rule {
        height: 6.7%;
        width: 23.46%;
        position: absolute;
        bottom: 7%;
        left: 1.5%;
        margin-left: 20px;
      }
      .paihang {
        height: 6.87%;
        width: 30%;
        position: absolute;
        bottom: 7%;
        left: 35%;
      }
      .fx {
        height: 6.7%;
        width: 23.46%;
        /*margin-right: 20px;*/
        position: absolute;
        bottom: 7%;
        left: 69%;
      }
    }
    .mask {
      background: url(../assets/share.png) no-repeat;
      background-size: 100% 100%;
      height: 100vh;
      width: 100vw;
      z-index: 9999;
      position: absolute;
    }
    .product-info {
      background: url(../assets/product@bg.png) no-repeat;
      background-size: 100% 100%;
      height: 100vh;
      width: 100vw;
      z-index: 9999;
      position: absolute;
    }
  }

  $iphone5-width : 320px;
  $iphone6-width : 375px;
  $iphone6plus-width : 414px;
  @media (min-width: $iphone5-width) {
    .product-item {
      padding-left: 27.5px;
    } 
  }
  @media (min-width: $iphone6-width) {
    .product-item {
      padding-left: 8.5px;
    } 
  }
  @media (min-width: $iphone6plus-width) {
    .product-item {
      padding-left: 17.5px;
    } 
  }
</style>
