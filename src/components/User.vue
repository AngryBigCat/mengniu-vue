<template>
  <div class="hello">
    <h1>{{ msg }} {{ $route.params.id }}</h1>
    <div>
      <router-link to="/user/1/profile">profile</router-link> 
      <router-link to="/user/1/posts">posts</router-link> 
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      msg: 'User'
    }
  },
  watch: {
    '$route' (to, from) {
      console.log(to, from)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
