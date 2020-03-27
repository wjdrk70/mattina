import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Guide from '@/views/Attractions'
import Login from '@/views/LogIn'
import FlightList from '@/views/FlightList'
 
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },

    {
      path: '/guide',
      name: 'Guide',
      component: Guide
    },
    {
      path: '/log-in',
      name: 'Login',
      component: Login
    },
    {
      path: '/flightlist',
      name: 'FlightList',
      component: FlightList,
      props: true
    }
  ]
})
