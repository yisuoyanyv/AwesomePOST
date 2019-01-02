/* eslint-disable */ 
import Vue from 'vue'
import Router from 'vue-router'
import POS from '@/components/page/POS'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'POS',
      component: POS
    }
  ]
})
