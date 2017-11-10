import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/page/Main'
import Login from '@/components/page/Login'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Main',
    //   component: Main
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
      path: '/Main/:hotelId',
      name: 'Main',
      component: Main
    }
  ]
})
