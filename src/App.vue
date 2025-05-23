<template>
  <div id="app-container">
    <nav class="navbar">
      <div class="nav-logo">
        <router-link to="/">Золотой Гусь</router-link>
      </div>
      <div class="nav-links-container">
        <router-link to="/" class="nav-link">Главная</router-link>
        <router-link to="/tables" class="nav-link">План зала</router-link> 
        <router-link to="/reservations" class="nav-link">Бронирование</router-link>
        <router-link to="/menu" class="nav-link">Редактор Меню</router-link> 
      </div>
    </nav>
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
// Логика для App.vue, если понадобится
</script>

<style>
/* ГЛОБАЛЬНЫЕ СТИЛИ */
:root {
  --bronze-gold: #b8860b; /* Более насыщенный бронзово-золотой, основной акцент */
  --soft-gold: #c5a47e;   /* Приглушенный золотисто-бежевый (для деталей, линий) */
  --cream-bg: #f4f0e8;    /* Новый основной фон - теплый, слоновая кость */
  --card-bg: #ffffff;     /* Чисто белый фон для карточек и светлых секций */
  --dark-text: #3a3a3a;   /* Темно-серый для основного текста */
  --light-text: #f0f0f0;  /* Светлый текст для темных фонов */
  --shadow-light: rgba(0, 0, 0, 0.06); /* Легкие тени */
  --shadow-medium: rgba(0, 0, 0, 0.12); /* Средние тени */
  --shadow-dark: rgba(0, 0, 0, 0.18); /* Более выраженные тени */
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
}

body {
  font-family: 'Lato', sans-serif;
  background-color: var(--cream-bg);
  color: var(--dark-text);
  line-height: 1.7;
  font-size: 16px; /* Базовый размер */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

/* Навбар */
.navbar {
  background-color: var(--card-bg); /* Светлый фон */
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 3px 12px var(--shadow-light); /* Мягкая, но заметная тень */
  height: 75px;
}

.nav-logo a {
  font-family: 'Playfair Display', serif;
  font-size: 1.9rem;
  color: var(--bronze-gold);
  text-decoration: none;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.nav-links-container {
  display: flex;
  gap: 15px;
}

.nav-link {
  color: var(--bronze-gold);
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 4px;
  transition: color 0.25s ease, background-color 0.25s ease;
  font-weight: 600;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--bronze-gold);
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link.router-link-exact-active::after {
  width: 60%;
}
.nav-link:hover{
    color: #a0720a; /* Темнее бронза при наведении */
}

.nav-link.router-link-exact-active {
  color: var(--bronze-gold);
  font-weight: 700;
}

.main-content {
  flex-grow: 1;
  width: 100%;
  box-sizing: border-box;
}

/* ОБЩИЕ СТИЛИ ДЛЯ КНОПОК */
.btn {
  display: inline-block;
  padding: 12px 30px;
  font-size: 0.95rem;
  text-decoration: none;
  border-radius: 6px;
  transition: background-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease, color 0.2s ease;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
  text-align: center;
  letter-spacing: 0.8px;
  font-family: 'Lato', sans-serif;
  box-shadow: 0 3px 8px var(--shadow-light);
}
.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 12px var(--shadow-medium);
}
.btn:active {
  transform: translateY(0px);
  box-shadow: 0 2px 5px var(--shadow-light);
}

.btn-primary {
  background-color: var(--bronze-gold);
  color: var(--cream-bg);
  border-color: var(--bronze-gold);
}
.btn-primary:hover {
  background-color: #a0720a;
  border-color: #a0720a;
  color: white;
}

.btn-secondary {
  background-color: transparent;
  color: var(--bronze-gold);
  border-color: var(--bronze-gold);
}
.btn-secondary:hover {
  background-color: var(--bronze-gold);
  color: var(--cream-bg);
}

/* Админские кнопки */
.btn-warning { background-color: #ffc107; color: #212529; border-color: #ffc107;}
.btn-warning:hover { background-color: #e0a800; border-color: #e0a800;}
.btn-danger { background-color: #dc3545; color: white; border-color: #dc3545;}
.btn-danger:hover { background-color: #c82333; border-color: #c82333;}
.btn-sm { padding: 6px 12px; font-size: 0.85rem;}
</style>