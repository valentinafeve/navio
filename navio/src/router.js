import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home'
import Goals from './views/Goals'
import More from './views/More'

Vue.use(VueRouter)

const routes = [
  {
    path: '/more',
    name: 'more',
    component: More
  },
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/goals',
    name: 'goals',
    component: Goals
  },
]

const  router  =  new  VueRouter({
  routes
})

export default router;
