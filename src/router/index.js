import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store/index'
import MusicListView from '@/views/MusicListView'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/musiclist',
    name: 'MusicListView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/MusicListView.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "Search" */ '../views/SearchView.vue')
  },
  {
    path: '/vedio',
    name: 'Vedio',
    component: () => import(/* webpackChunkName: "Login" */ '../views/VedioView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  },
  {
    path: '/userinfo',
    name: 'UserInfo',
    beforeEnter: (to, from, next) => {
      if (store.state.m_user.isLogin || store.state.m_user.token!==' ' || localStorage.getItem('token')) {
        console.log('已登录');
        next()
      }else{
        console.log('未登录');
        next('/login')
      }
      // ...
    },
    
    component: () => import(/* webpackChunkName: "UserInfo" */ '../views/UserInfo.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from)=>{
  if (to.path=='/login') {
    store.state.m_music.isShowFooter = false
  }else{
    store.state.m_music.isShowFooter = true
  }
})

export default router
