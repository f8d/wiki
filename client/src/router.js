import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/special/home'
    },
    {
      path: '/:scope/:name',
      name: 'wiki',
      component: () => import(/* webpackChunkName: "wiki" */ './views/Wiki')
    },
    {
      path: '*',
      redirect: '/special/not_found'
    }
  ]
})
