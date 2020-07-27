import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CategoryView from '../views/CategoryView.vue'
import PostView from '../views/PostView.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/404',
    name: 'notfound',
    component: NotFound
  },
  {
    path: '*',
    redirect: {name: 'notfound'}
  },
  {
    path: '/blog/:key',
    name: 'category',
    component: CategoryView,
    children: [
      {
        path: ':keypost',
        name: 'post',
        component: PostView
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
