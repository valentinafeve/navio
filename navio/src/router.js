import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home'
import Add from './views/Add'
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
    path: '/add',
    name: 'add',
    component: Add
  },
]

const  router  =  new  VueRouter({
  routes
})

export default router;
