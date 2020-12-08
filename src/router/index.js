import Vue from 'vue'
import Router from 'vue-router'
import cropperContent from '@/page/cropperContent'
import Index from '@/page/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/cropperContent',
      name: 'cropperContent',
      component: cropperContent
    }
  ]
})
