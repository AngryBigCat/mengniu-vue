import Vue from 'vue'
import Router from 'vue-router'
import Shop from '@/components/Shop'
import Index from '@/components/Index'
import Demo from '@/components/Demo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Index'
    },
    {
      path: '/Index',
      name: 'Index',
      component: Index
    },
    {
      path: '/Shop',
      name: 'Shop',
      component: Shop
    },
    {
      path: '/Demo',
      name: 'Demo',
      component: Demo
    }
  ]
})
