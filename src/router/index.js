import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Home from '@/page/home'
import Getstart from '@/page/getstart'
import Api from '@/page/api'
import About from '@/page/about'
import TopicList from "@/page/topiclist"
import Signin from "@/page/signin"
import User from "@/page/user"
import Topic from "@/page/topiccreate"

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
    },
    {
      path: '/topic/:id',
      name: 'TopicList',
      component: TopicList
    },
    {
      path: '/user/:id',
      name: 'User',
      component: User
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path:"/signout",
      redirect:"/",
      component: Home
    },
    {
      path:"/create",
      name: 'Topic',
      component: Topic
    }
  ]
})
