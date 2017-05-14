import Vue from 'vue'
import Router from 'vue-router'
import NameCardMaker from '@/components/NameCardMaker'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'NameCardMaker',
      component: NameCardMaker
    }
  ]
})
