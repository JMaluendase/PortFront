//import { createRouter, createWebHistory } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProducidoView from '../views/ProducidoView.vue'
import LoginView from '../views/LoginView.vue'
import MisVehiculosView from '../views/MisVehiculosView.vue'
import ExtractosView from '../views/ExtractosView.vue'
import InfoView from  '../views/InfoView.vue'
import Tributaria from  '../views/TributariaView.vue'
import PQR from  '../views/PQRView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },

  {
    path: '/vehiculos',
    name: 'vehiculos',
    component: MisVehiculosView
  },
  {
    path: '/extractos',
    name: 'extractos',
    component: ExtractosView
  },
  {
    path: '/producido',
    name: 'producido',
    component: ProducidoView
  },
  {
    path: '/info',
    name: 'info',
    component: InfoView
  },
  {
    path: '/tributaria',
    name: 'tributaria',
    component: Tributaria
  },
  {
    path: '/pqr',
    name: 'pqr',
    component: PQR
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
