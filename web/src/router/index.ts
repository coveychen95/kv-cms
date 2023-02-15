import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/weather',
      name: 'weather',
      component: () => import('/@/views/weather/index.vue'),
      children: [
        {
          path: 'search',
          name: 'weatherSearch',
          component: () => import('/@/views/weather/SearchCity.vue'),
        },
        {
          path: ':city',
          name: 'weatherCity',
          component: () => import('/@/views/weather/CityView.vue'),
        },
      ],
    },
  ],
})

export default router
