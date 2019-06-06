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
