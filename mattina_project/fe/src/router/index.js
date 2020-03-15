import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },

    {
      path: '/guide',
      name: 'guide',
      component: () => import('../views/Attractions.vue')
    },
    {
      path: '/log-in',
      name: 'LogIn',
      component: () => import('../views/LogIn.vue')
    },
    {
      path: '/flightlist',
      name: 'FlightList',
      component: () => import('../views/FlightList'),
      props: true
    }
  ]
})
