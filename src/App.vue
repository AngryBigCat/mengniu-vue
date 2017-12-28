<template>
  <div>
    <!-- <img src="./assets/logo.png"> -->
    <img src="./assets/music.png" class="signal rotate-active" @click="toggleMusicStart">
    <audio id="music" ref="bgAudio" loop="loop">
      <source src="./assets/bg.mp3" type="audio/mpeg">
    </audio>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      transitionName: ''
    }
  },
  mounted () {
    function autoPlayMusic () {
      // 自动播放音乐效果，解决浏览器或者APP自动播放问题
      function musicInBrowserHandler () {
        musicPlay(true)
        document.body.removeEventListener('touchstart', musicInBrowserHandler)
      }
      document.body.addEventListener('touchstart', musicInBrowserHandler)
      // 自动播放音乐效果，解决微信自动播放问题
      function musicInWeixinHandler () {
        musicPlay(true)
        document.addEventListener('WeixinJSBridgeReady', function () {
          musicPlay(true)
        }, false)
        document.removeEventListener('DOMContentLoaded', musicInWeixinHandler)
      }
      document.addEventListener('DOMContentLoaded', musicInWeixinHandler)
    }
    function musicPlay (isPlay) {
      var audio = document.getElementById('music')
      if (isPlay && audio.paused) {
        audio.play()
      }
      if (!isPlay && !audio.paused) {
        audio.pause()
      }
    }
    autoPlayMusic()
  },
  methods: {
    onEnterShop () {
      this.$router.push('Shop')
    },
    toggleMusicStart (event) {
      if (event.target.className.indexOf('rotate-active') !== -1) {
        event.target.setAttribute('class', 'signal')
        this.$refs.bgAudio.pause()
      } else {
        event.target.setAttribute('class', 'signal rotate-active')
        this.$refs.bgAudio.play()
      }
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'Index') {
        this.transitionName = 'slide-right'
      } else if (to.name === 'Shop') {
        this.transitionName = 'slide-left'
      }
    }
  }
}
</script>

<style scoped>
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
  .signal {
    width: 30px;
    height: 30px;
    position: absolute;
    top: 15px;
    right: 18px;
    z-index: 1;
  }
  .rotate-active {
    animation: RotateStar 3s linear infinite;
  }
  .slide-left-enter-active {
    transition: all .3s ease;
  }
  .slide-left-enter, .slide-left-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(30%);
  }


  .slide-right-enter-active {
    transition: all .3s ease;
  }
  .slide-right-enter, .slide-right-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(-30%);
  }
</style>
