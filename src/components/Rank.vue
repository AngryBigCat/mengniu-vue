<template>
  <div class="rank-container">
    <img src="../assets/product@close.png" class="close" @click="closeRankMask">
    <div class="personal">
      <img :src="player.headimgurl" v-show="player.headimgurl" class="avatar">
      <div class="user-info" style="width:58%;">
        <div class="user-info-top">
          <div class="username">{{ player.nickname }}</div>
          <div class="nowRank" style="padding-right: 5px;">当前排名：<span style="font-weight: bold;">{{ personalRank }}</span></div>
        </div>
        <div class="score-text">当前总积分 <span class="score-count">{{ player.total_score }}分</span></div>
      </div>
    </div>
    <div class="userlist" ref="userlist">
      <ul>
        <li v-for="player,k in players">
          <div class="rank-img">
            <img v-if="k == 0" src="../assets/rank@1.png">
            <img v-else-if="k == 1" src="../assets/rank@2.png">
            <img v-else-if="k == 2" src="../assets/rank@3.png">
            <div v-else style="text-align:center;">{{ parseInt(k) + 1 }}</div>
          </div>
          <div class="rank-avatar">
            <img :src="player.headimgurl">
          </div>
          <div class="rank-nickname">{{ player.nickname.length >= 7 ? player.nickname.substr(0, 7) + '...' : player.nickname }}</div>
          <div class="rank-score">{{ player.score }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
// import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'Rank',
  props: {
    player: {
      type: Object
    },
    bindScroll: {
      type: Boolean
    }
  },
  data () {
    return {
      players: null,
      page: 0,
      y: -711,
      personalRank: '...'
    }
  },
  mounted () {
    this.$http.get('player/rank').then((res) => {
      this.players = res.data.players
    })
  },
  methods: {
    closeRankMask () {
      this.$emit('closeRankMask')
    },
    isChn (str) {
      var reg = /^[\u4E00-\u9FA5]+$/
      if (!reg.test(str)) {
        return false
      }
      return true
    },
    subNickname (str, limit) {
      if (str.length >= limit) {
        return str.substr(0, limit) + '...'
      }
      return str
    },
    pushPlayersData (currentPage) {
      let getUrl = 'player/rank?page=' + currentPage
      // console.log(getUrl)
      this.$http.get(getUrl).then((res) => {
        res.data.players.forEach((player) => {
          this.players.push(player)
        })
        // console.log(this.players)
      })
    }
  },
  computed: {
    nickname () {
      let originNickname = this.player.nickname
      if (this.isChn(originNickname)) {
        return this.subNickname(originNickname, 4)
      } else {
        return this.subNickname(originNickname, 7)
      }
    }
  },
  watch: {
    bindScroll () {
      let time = setInterval(() => {
        if (this.players && this.$refs.userlist) {
          if (this.player.id) {
            let getUrl = 'player/' + this.player.id + '/rank'
            this.$http.get(getUrl).then((res) => {
              this.personalRank = res.data.rank
            })
          }

          this.scroll = new BScroll(this.$refs.userlist, {
            scrollbar: true
          })

          this.scroll.on('scrollEnd', (pos) => {
            // console.log(pos)
            if (pos.y <= this.y) {
              this.y -= 1120
              // console.log(this.y)
              this.pushPlayersData(this.page += 1)
            }
          })
          clearInterval(time)
        }
      }, 100)
    }
  }
}
</script>

<style lang="scss" type="text/css" scoped>
  .rank-container {
    background: url(../assets/bg@rank.png) no-repeat;
    background-size: 100% 100%;
    height: 100vh;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
    .personal {
      .avatar {
        width: 11vh;
        height: 11vh;
        border-radius: 100px;
        border: 3px solid #03CA61;
        position: absolute;
        top: 15%;
        left: 11%;
      }
      .user-info {
        position: absolute;
        left: 35%;
        top: 17%;
        height: 8.1vh;
        width: 65%;
        color: #fff;
        box-sizing: border-box;
        padding-top: 6px;
        font-size: 3.5vw;
        .user-info-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1.5%;
        }
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
    }
    .close {
      width: 9.86%;
      height: 6.12%;
      position: absolute;
      top: 6%;
      right: 2%;
    }
    .userlist {
      position: absolute;
      top: 32%;
      left: 10%;
      width: 80%;
      height: 60vh;
      overflow: hidden;
      ul {
        margin: 0;
        padding: 0;
        list-style-type: none;
        li {
          display:flex;
          align-items: center;
          margin-bottom: 8px;
          .rank-img {
            flex-grow: 0;
            width: 10vw;
            margin-left: 1.5vw;
            img {
              width: 100%;
            }
          }
          .rank-avatar {
            padding-left: 2.5vw;
            img {
              width: 12vw;
              height: 12vw;
              border-radius: 100px;
            }
          }
          .rank-nickname {
            margin-left: 6vw;
            font-size: 4vw;
            width: 25vw;
          }
          .rank-score {
            margin-left: 1vw;
            font-size: 4vw;
          }
        }
      }
    }
  }
</style>
