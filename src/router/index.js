import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import NewWork from '@/components/NewWork'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/newWork',
      name: 'NewWork',
      component: NewWork
    }
  ]
})
