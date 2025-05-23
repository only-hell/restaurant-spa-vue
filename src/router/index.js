import { createRouter, createWebHistory } from 'vue-router';
import TablesView from '../views/TablesView.vue';
import ReservationsView from '../views/ReservationsView.vue';
import MenuView from '../views/MenuView.vue';

const routes = [
  {
    path: '/', // Главная страница будет показывать столики
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
  // Можно добавить страницу "Не найдено" (404) позже
  // { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Используем HTML5 History API
  routes,
});

export default router;