// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http = axios.create({
  baseURL: 'http://mengniu.prh5.com/api/v1/'
  // baseURL: 'http://mengniu.info/api/v1/'
})
var openid = document.querySelector('meta[name="openid"]').getAttribute('content')
Vue.prototype.$openid = openid
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
