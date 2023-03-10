import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { defineAsyncComponent } from 'vue'

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
      component: defineAsyncComponent(
        () => import('../views/weather/IndexView.vue')
      ),
      redirect: '/weather/search',
      children: [
        {
          path: 'search',
          name: 'weatherSearch',
          component: defineAsyncComponent(
            () => import('/@/views/weather/SearchCity.vue')
          ),
        },
        {
          path: ':city',
          name: 'weatherCity',
          component: defineAsyncComponent(
            () => import('/@/views/weather/CityView.vue')
          ),
        },
      ],
    },
    {
      path: '/markdown',
      component: defineAsyncComponent(
        () => import('/@/views/markdown/MarkdownView.vue')
      ),
    },
  ],
})

export default router
