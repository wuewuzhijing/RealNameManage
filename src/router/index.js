import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/page/HelloWorld'
import Login from '@/components/page/Login'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Hello',
    //   component: HelloWorld
    // },
    // {
    //   path: '/Login/:id',
    //   name: 'Login',
    //   component: Login
    // }


    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/HelloWorld/:hotelId',
      name: 'Hello',
      component: HelloWorld
    }
  ]
})