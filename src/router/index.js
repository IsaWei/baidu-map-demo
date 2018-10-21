import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Debug from '@/components/Debug'
import Home from '@/components/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'test1',
          component: HelloWorld
        },
        {
          path: 'debug',
          name: 'debug',
          component: Debug
        }
      ]
    }
  ]
})
