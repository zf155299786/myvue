import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/home'
import Getstart from '@/page/getstart'
import Api from '@/page/api'
import About from '@/page/about'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/getstart',
      name: 'Getstart',
      component: Getstart
    },
    {
      path: '/api',
      name: 'Api',
      component: Api
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})
