import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Mi Informacion',
    component: Home
  },
  {
    path: '/courses',
    name: 'Mis Materias',
    component: () => import('../views/CoursesLists.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
