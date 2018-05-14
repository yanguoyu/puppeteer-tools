import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import MenuTitle from '@/components/MenuTitle'
import HomePage from '@/components/HomePage'
import WorkDetail from '@/components/WorkDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'MenuTitle',
      component: MenuTitle,
      children: [
        {
          path: '',
          name: 'HomePage',
          component: HomePage
        },
        {
          path: '/workDetail/:workId',
          name: 'WorkDetail',
          component: WorkDetail
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
