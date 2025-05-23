<template>
  <div id="app-container">
    <nav class="navbar">
      <router-link to="/" class="nav-link">Столики</router-link>
      <router-link to="/reservations" class="nav-link">Бронирования</router-link>
      <router-link to="/menu" class="nav-link">Меню</router-link>
    </nav>

    <main class="main-content">
      <router-view /> <!-- Здесь будут отображаться компоненты страниц -->
    </main>

    <footer class="footer">
      <p>© {{ new Date().getFullYear() }} Мой Ресторан. Все права защищены.</p>
    </footer>
  </div>
</template>

<script setup>
// Логика для App.vue, если понадобится
</script>

<style>
/* Глобальные стили или стили для App.vue */
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: #f4f4f4;
  color: #333;
}

#app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.navbar {
  background-color: #333;
  padding: 15px 30px;
  display: flex;
  justify-content: center; /* или flex-start */
  gap: 20px; /* Пространство между ссылками */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 8px 15px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.nav-link:hover,
.nav-link.router-link-exact-active { /* Стиль для активной ссылки */
  background-color: #555;
}

.main-content {
  flex-grow: 1; /* Занимает все доступное пространство между навбаром и футером */
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto; /* Центрирование контента */
  width: 100%;
  box-sizing: border-box;
}

.footer {
  background-color: #2c3e50;
  color: white;
  text-align: center;
  padding: 15px;
  margin-top: auto; /* Прижимает футер к низу, если контента мало */
}

/* Удаление стандартных стилей Vite, если они есть в App.vue или style.css,
   которые центрируют все и добавляют логотипы.
   Если у тебя есть файл src/style.css, проверь и его.
   Vite по умолчанию мог создать такой файл:
   src/style.css
   :root {
     font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
     line-height: 1.5;
     font-weight: 400;

     color-scheme: light dark;
     color: rgba(255, 255, 255, 0.87);
     background-color: #242424;

     font-synthesis: none;
     text-rendering: optimizeLegibility;
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
   }
   #app {
     max-width: 1280px;
     margin: 0 auto;
     padding: 2rem;
     text-align: center;
   }
   ... и т.д.
   Эти стили можно удалить или закомментировать из style.css, так как мы задаем свои в App.vue
*/
</style>