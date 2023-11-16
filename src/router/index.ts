import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'FTV.kz'
      }
    },
    {
      path: '/films/:id',
      name: 'film',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/FilmView.vue')
    },
    {
      path: '/films/payed/:id',
      name: 'filmPayed',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/FilmPayedView.vue')
    },
    {
      path: '/films/player/:id',
      name: 'player',
      component: () => import('../views/PlayerView.vue')
    },
    {
      path: '/pay/:id',
      name: 'pay',
      component: () => import('../views/KaspiPayView.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: -10, behavior: 'instant' }
  }
})

router.afterEach((to) => {
  document.title = to.meta.title || 'Default Title'
})

export default router
