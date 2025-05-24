import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import TablesView from '../views/TablesView.vue'; 
import ReservationsView from '../views/ReservationsView.vue'; 
import AdminMenuView from '../views/AdminMenuView.vue'; 
import GuestMenuView from '../views/GuestMenuView.vue'; 

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/admin/tables', 
    name: 'AdminTables',
    component: TablesView, 
  },
  {
    path: '/admin/reservations', 
    name: 'AdminReservations',
    component: ReservationsView, 
  },
  {
    path: '/admin/menu', 
    name: 'AdminMenu',
    component: AdminMenuView, 
  },
  {
    path: '/menu', 
    name: 'GuestMenu',
    component: GuestMenuView, 
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