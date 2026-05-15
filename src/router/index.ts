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
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/lab12',
      name: 'lab12',
      component: () => import('../views/Lab12View.vue'),
    },
    {
      path: '/lab13',
      name: 'lab13',
      component: () => import('../views/Lab13View.vue'),
    },
    {
      path: '/lab14',
      name: 'lab14',
      component: () => import('../views/Lab14View.vue'),
      children: [
        {
          path: '',
          name: 'lab14.list',
          component: () => import('../components/TaskList.vue'),
        },
        {
          path: 'add',
          name: 'lab14.add',
          component: () => import('../components/TaskForm.vue'),
        },
        {
          path: 'task/:id',
          name: 'lab14.task',
          component: () => import('../components/TaskDetails.vue'),
        },
        {
          path: 'task/:id/delete',
          name: 'lab14.delete',
          component: () => import('../components/TaskDelete.vue'),
        },
        {
          path: 'task/:id/complete',
          name: 'lab14.complete',
          component: () => import('../components/TaskComplete.vue'),
        },
        {
          path: 'about',
          name: 'lab14.about',
          component: () => import('../components/About.vue'),
        },
      ],
    },
    {
      path: '/lab15',
      name: 'lab15',
      component: () => import('../views/Lab15View.vue'),
    },
  ],
})

export default router
