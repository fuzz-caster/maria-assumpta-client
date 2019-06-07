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
          path: 'employers',
          component: () => import('./views/app/employers/list.vue'),
          children: [
            {
              path: '',
              name: 'fill-employers',
              component: Placeholder
            },
            {
              path: 'add',
              name: 'employers-add',
              component: () => import('./components/EmployersAdd.vue')
            }
          ]
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
          path: 'questions',
          component: () => import('./views/app/questions/list.vue')
        },
        {
          path: 'questions/:id',
          props: true,
          component: () => import('./views/app/questions/edit.vue')
        },
        {
          path: 'questions/add',
          component: () => import('./views/app/questions/add.vue')
        }
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
