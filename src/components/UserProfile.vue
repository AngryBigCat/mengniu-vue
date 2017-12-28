<template>
  <transition name="fade">
    <div class="hello">
      <h1>{{ msg }}</h1>
      <p>
        <button @click="triggerAlert">hello world</button>
      </p>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'UserProfile',
  data () {
    return {
      msg: 'Hello UserProfile'
    }
  },
  methods: {
    triggerAlert (event) {
      this.$router.push({
        name: 'User',
        params: {
          id: 10
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0
}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
