<template>
  <div class="product-info">
    <sign-nosign v-show="showSignNosign" @closeSignNosign="closeSignNosign" :errorCode="errorCode"></sign-nosign>
    <img src="../assets/product@close.png" class="close" @click="closeShowInfo">
    <div class="slide">
      <swiper :introImgUrl="prizeObj.intro_img_url"></swiper>
    </div>
    <div class="describe">
      <div class="top">
        <div class="info">
          <p>{{ prizeObj.name }}</p>
          <p>所需积分：{{ prizeObj.need_score }}</p>
        </div>
        <div class="residue">
          <span>剩余：{{ prizeObj.store_count }}份</span>
        </div>
      </div>
      <div class="content">
        <div class="content-text" v-show="hasDuihuan">
          <p>{{ prizeObj.description }}</p>
        </div>
        <custom-form v-show="formShow" @closeShowInfo="closeShowInfo" :prizeObj="prizeObj" @recordRefresh="recordRefresh" :playerObj="playerObj"></custom-form>
      </div>
    </div>
    <img src="../assets/product@woyao.png" v-show="hasDuihuan" class="woyao" @click="onHasDuihuan">
  </div>
</template>

<script>
  import Swiper from './Swiper'
  import customForm from './Form'
  import SignNosign from './SignNosign'

  export default {
    name: 'ProductInfo',
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
        maskShare: false,
        formShow: false,
        hasDuihuan: true,
        showSignNosign: false,
        errorCode: 0
      }
    },
    methods: {
      closeShowInfo () {
        this.$emit('closeShowInfo')
        this.hasDuihuan = true
        this.formShow = false
      },
      showSignNosign () {
        this.showSignNosign = true
      },
      closeSignNosign () {
        this.showSignNosign = false
      },
      onHasDuihuan () {
        if (this.playerObj.total_score >= this.prizeObj.need_score) {
          this.hasDuihuan = false
          this.formShow = true
        } else {
          this.showSignNosign = true
          this.errorCode = 4
        }
      },
      recordRefresh (data) {
        this.$emit('recordRefresh', data)
      }
    },
    components: {
      Swiper,
      customForm,
      SignNosign
    }
  }
</script>


<style lang="scss" type="text/css" scoped>
  .product-info {
    background: url(../assets/product@bg.png) no-repeat;
    background-size: 100% 100%;
    height: 100vh;
    width: 100vw;
    z-index: 9998;
    position: absolute;
    .close {
      width: 9.86%;
      height: 6.12%;
      position: absolute;
      top: 6%;
      right: 2%;
    }
    .describe {
      width: 70%;
      position:absolute;
      top: 33%;
      left: 15%;
      font-size: 4vw;
      .top {
        display: flex;
        justify-content: space-between;
        color: #333;
        margin-bottom: 20px;
        .info {
          p {
            margin: 0 0 5px 0;
          }
        }
        .residue {
          span {
            color: white;
            padding: 5px;
            position: relative;
            top: 5px;
            background: #bbb;
            border-radius: 5px;
          }
        }
      }
      .content {
        font-size: 4vw;
        line-height: 8vw;
      }
    }
    .slide {
      height: 19.5%;
      width: 56.5%;
      position: absolute;
      top: 11.5%;
      left: 21.5%;
      overflow: hidden;
      border-radius: 8px;
      .wrapper {
        ul {
          width: 100%;
          height: 98%;
          overflow: hidden;
          list-style-type: none;
          margin: 0;
          padding: 0;
          .info-img {
            width: 100%;
            height: 19.4vh;
            border-radius: 8px;
          }
        }
      }
    }
    .woyao {
      width: 70%;
      height: 8.4%;
      position: absolute;
      bottom: 10%;
      left: 15%;
    }
  }
</style>