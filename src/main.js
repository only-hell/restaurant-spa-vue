import { createApp } from 'vue';
import './style.css'; // Или как называется твой главный файл стилей
import App from './App.vue';
import router from './router'; // <--- ИМПОРТИРУЕМ НАШ РОУТЕР

const app = createApp(App);

app.use(router); // <--- ПОДКЛЮЧАЕМ РОУТЕР К ПРИЛОЖЕНИЮ

app.mount('#app');