// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import TablesView from '../views/TablesView.vue';
import ReservationsView from '../views/ReservationsView.vue';
import MenuView from '../views/MenuView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/tables',
    name: 'Tables',
    component: TablesView,
  },
  {
    path: '/reservations',
    name: 'Reservations',
    component: ReservationsView,
  },
  {
    path: '/menu',
    name: 'Menu',
    component: MenuView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' };
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return { left: 0, top: 0, behavior: 'smooth' };
    }
  }
});

export default router;