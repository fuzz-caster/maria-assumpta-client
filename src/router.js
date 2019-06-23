import Vue from 'vue'
import Router from 'vue-router'
import Placeholder from '@/components/Placeholder'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/app',
      name: 'app',
      component: () => import('./views/app/App.vue'),
      children: [
        {
          path: 'employers/list',
          name: 'employers',
          component: () => import('./views/app/employers/list.vue')
        },
        {
          path: 'employers/add',
          name: 'employers-add',
          component: () => import('./views/app/employers/add.vue')
        },
        {
          path: 'members',
          alias: '/app/members/list',
          component: () => import('./views/app/members/list.vue')
        },
        {
          path: 'members/list',
          name: 'members-list',
          component: () => import('./views/app/members/list.vue')
        },
        {
          path: 'members/add',
          component: () => import('./views/app/members/add.vue')
        },
        {
          path: 'members/:id/edit',
          props: true,
          component: () => import('./views/app/members/edit.vue')
        },
        {
          path: 'questions',
          component: () => import('./views/app/questions/list.vue')
        },
        {
          path: 'questions/:id/edit',
          props: true,
          component: () => import('./views/app/questions/edit.vue')
        },
        {
          path: 'questions/:questionId/add-answer',
          props: true,
          component: () => import('./views/app/questions/add.answer.vue')
        },
        {
          path: 'questions/add',
          component: () => import('./views/app/questions/add.vue')
        },
        {
          path: 'answers/:id/edit',
          props: true,
          component: () => import('./views/app/questions/edit.answer.vue')
        },
        {
          path: 'credit-requests',
          component: () => import('./views/app/credit-requests/list.vue')
        },
        {
          path: 'credit-requests/add',
          component: () => import('./views/app/credit-requests/add.vue')
        },
        {
          path: 'credit-requests/:id/edit',
          props: true,
          component: () => import('./views/app/credit-requests/edit.vue')
        },
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
