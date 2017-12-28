<template>
  <div class="record-container">
    <img src="../assets/product@close.png" class="close" @click="closeRecordMask">
    <div class="personal">
      <img :src="player.headimgurl" v-show="player.headimgurl" class="avatar">
      <div class="user-info">
        <div class="username">{{ player.nickname }}</div>
        <div class="score-text">当前总积分 <span class="score-count">{{ player.total_score }}分</span></div>
      </div>
    </div>
    <div class="recordList" ref="recordList">
      <ul>
        <li class="zanwu" v-if="records.length == 0">
          暂无兑奖记录
        </li>
        <li v-else v-for="record in records">
          <div class="record-item">
            <div class="record-img">
              <img :src="record.prize_img_url">
            </div>
            <div class="record-text">
              <div class="title">{{ record.prize_name }}</div>
              <div class="prize_date">兑换时间：
              {{ new Date(parseInt(record.created_at) * 1000).getFullYear() }}/{{ new Date(parseInt(record.created_at) * 1000).getMonth() + 1 }}/{{ new Date(parseInt(record.created_at) * 1000).getDate() }}
              </div>
              <div>消耗积分： {{ record.spend_sscore }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
// import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'Record',
  props: {
    player: {
      type: Object
    },
    records: {
      type: Array
    },
    bindScroll: {
      type: Boolean
    },
    bindRefresh: {
      type: Boolean
    }
  },
  methods: {
    closeRecordMask () {
      this.$emit('closeRecordMask')
    }
  },
  watch: {
    bindScroll () {
      let time = setInterval(() => {
        if (this.records) {
          this.scroll = new BScroll(this.$refs.recordList, {
            scrollbar: true
          })
          clearInterval(time)
        }
      }, 100)
    }
  }
}
</script>

<style lang="scss" type="text/css" scoped>
  .record-container {
    background: url(../assets/bg@record.png) no-repeat;
    background-size: 100% 100%;
    height: 100vh;
    width: 100vw;
    position: absolute;
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
        z-index: 9997;
      }
      .user-info {
        position: absolute;
        left: 35%;
        top: 17.7%;
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
    }
    .close {
      width: 9.86%;
      height: 6.12%;
      position: absolute;
      top: 6%;
      right: 2%;
    }
    .recordList {
      position: absolute;
      top: 25.3%;
      left: 7.4%;
      width: 85.7%;
      height: 67.5%;
      border-bottom-left-radius: 14px;
      border-bottom-right-radius: 14px;
      overflow: hidden;
      ul {
        margin: 0;
        padding: 20px 20px 10px 20px;
        list-style-type: none;
        li.zanwu {
          text-align: center;
          color: #ccc;
        }
        li {
          .record-item {
            height: 115px;
            background:#fff;
            display:flex;
            align-items: center;
            border-radius: 10px;
            margin-bottom: 10px;
            .record-img {
              padding: 0 10px;
              img {
                width: 80px;
                height: 80px;
                border-radius: 50px;
                border: 3px solid #2FB15F;
              }
            }
            .record-text {
              color: #333;
              font-size: 13px;
              .title {
                padding-bottom: 10px;
              }
              .prize_date {
                margin-bottom: 5px;
              }
            }
          }
        }
      }
    }
  }
</style>