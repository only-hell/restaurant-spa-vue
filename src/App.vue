<template>
  <div id="app-container">
    <nav class="navbar">
      <div class="nav-logo">
        <router-link to="/">Золотой Гусь</router-link>
      </div>
      <button class="nav-toggler" @click="toggleMobileMenu" :class="{ 'active': isMobileMenuOpen }" aria-label="Toggle navigation" aria-expanded="isMobileMenuOpen">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div class="nav-links-container" :class="{ 'open': isMobileMenuOpen }">
        <router-link to="/" class="nav-link" @click="closeMobileMenu">Главная</router-link>
        <router-link to="/menu" class="nav-link" @click="closeMobileMenu">Наше Меню</router-link> <!-- Ссылка на гостевое меню -->
        
        <!-- Ссылки для админ-панели можно сгруппировать или выделить -->
        <span class="nav-separator" v-if="!isMobileMenuOpen">|</span> <!-- Разделитель для десктопа -->
        
        <router-link to="/admin/tables" class="nav-link admin-link" @click="closeMobileMenu">План Зала</router-link>
        <router-link to="/admin/reservations" class="nav-link admin-link" @click="closeMobileMenu">Бронирования</router-link>
        <router-link to="/admin/menu" class="nav-link admin-link" @click="closeMobileMenu">Редактор Меню</router-link>
      </div>
    </nav>
    <main class="main-content">
      <router-view />
    </main>
    <footer class="app-footer" id="footer-contacts">
      <div class="footer-content-wrapper">
        <div class="footer-info">
            <p class="footer-logo-small">Золотой Гусь</p>
            <p>"Место, где каждый момент становится особенным"</p>
        </div>
        <div class="footer-contacts">
            <p><i class="fas fa-map-marker-alt"></i> ул. Гастрономическая, 10, г. Примербург</p>
            <p><i class="fas fa-phone"></i> +7 (123) 456-78-90</p>
        </div>
        <div class="footer-social">
            <p>Следите за нами:</p>
            <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="VK"><i class="fab fa-vk"></i></a>
        </div>
        <div class="footer-copy">
            <p>© {{ new Date().getFullYear() }} "Золотой Гусь". Все права защищены.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};
</script>

<style>

:root {
  --bronze-gold: #b8860b;
  --soft-gold: #c5a47e;
  --cream-bg: #f9f6f2;
  --card-bg: #ffffff;
  --dark-text: #3a3a3a;
  --light-text: #f0f0f0;
  --shadow-light: rgba(0, 0, 0, 0.06);
  --shadow-medium: rgba(0, 0, 0, 0.12);
  --shadow-dark: rgba(0, 0, 0, 0.18);
  --admin-link-color: #d2691e;
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
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

.navbar {
  background-color: var(--card-bg);
  padding: 0 20px;
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
  box-shadow: 0 3px 12px var(--shadow-light);
  height: 70px;
}

.nav-logo a {
  font-family: 'Playfair Display', serif;
  font-size: 1.7rem;
  color: var(--bronze-gold);
  text-decoration: none;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.nav-links-container {
  display: flex;
  align-items: center; 
  gap: 10px;
}

.nav-link {
  color: var(--bronze-gold);
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 4px;
  transition: color 0.25s ease, background-color 0.25s ease;
  font-weight: 600;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
}
.nav-link::after {
  content: ''; position: absolute; width: 0; height: 2px;
  bottom: -4px; left: 50%; transform: translateX(-50%);
  background-color: var(--bronze-gold); transition: width 0.3s ease;
}
.nav-link:hover::after,
.nav-link.router-link-exact-active::after { width: 60%; }
.nav-link:hover{ color: #a0720a; }
.nav-link.router-link-exact-active { color: var(--bronze-gold); font-weight: 700; }


.nav-link.admin-link {
  color: var(--admin-link-color);
}
.nav-link.admin-link::after {
  background-color: var(--admin-link-color);
}
.nav-link.admin-link:hover {
  color: #a55010; 
}
.nav-link.admin-link.router-link-exact-active {
  color: var(--admin-link-color);
}
.nav-separator {
  color: #ccc;
  margin: 0 5px;
  font-size: 1.2rem;
  line-height: 1;
}


.nav-toggler {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 25px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1010;
  margin-left: auto;
}
.nav-toggler span {
  width: 30px; height: 3px; background: var(--bronze-gold);
  border-radius: 10px; transition: all 0.3s linear;
  position: relative; transform-origin: 1px;
}
.nav-toggler.active span:nth-child(1) { transform: translateY(0px) rotate(45deg); transform-origin: center; margin-top:11px; }
.nav-toggler.active span:nth-child(2) { opacity: 0; transform: translateX(20px); }
.nav-toggler.active span:nth-child(3) { transform: translateY(0px) rotate(-45deg); transform-origin: center; margin-top:-11px; }

.main-content {
  flex-grow: 1;
  width: 100%;
  box-sizing: border-box;
}

.app-footer {
  background-color: #262626;
  color: #a0a0a0;
  padding: 25px 30px;
  text-align: center;
  font-size: 0.85rem;
  border-top: 1px solid #383838;
  margin-top: auto;
  width: 100%;
  box-sizing: border-box;
}
.app-footer .footer-content-wrapper {
    max-width: 1140px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    align-items: start;
    text-align: left; 
}
.footer-logo-small {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem;
    color: var(--soft-gold);
    margin-bottom: 5px;
    font-weight: 600;
}
.app-footer .footer-info p, .app-footer .footer-contacts p {
  margin: 4px 0;
  line-height: 1.6;
}
.app-footer .footer-contacts i {
    margin-right: 8px;
    color: var(--soft-gold);
    width: 15px;
    text-align: center;
}
.app-footer .footer-social { margin-top: 5px; }
.app-footer .footer-social p { margin-bottom: 8px; font-weight: 600; color: #ccc; }
.app-footer .footer-social a {
    color: #ccc; margin-right: 12px; font-size: 1.2rem; transition: color 0.2s ease;
}
.app-footer .footer-social a:hover { color: var(--soft-gold); }
.app-footer .footer-social a:last-child { margin-right: 0; }
.app-footer .footer-copy {
    grid-column: 1 / -1; text-align: center; margin-top: 20px;
    padding-top: 15px; border-top: 1px solid #383838;
    font-size: 0.8rem; color: #888;
}

.btn {
  display: inline-block; padding: 12px 30px; font-size: 0.95rem;
  text-decoration: none; border-radius: 6px;
  transition: background-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease, color 0.2s ease;
  font-weight: 600; cursor: pointer; border: 1px solid transparent;
  text-align: center; letter-spacing: 0.8px; font-family: 'Lato', sans-serif;
  box-shadow: 0 3px 8px var(--shadow-light);
}
.btn:hover { transform: translateY(-2px); box-shadow: 0 5px 12px var(--shadow-medium); }
.btn:active { transform: translateY(0px); box-shadow: 0 2px 5px var(--shadow-light); }
.btn-primary {
  background-color: var(--bronze-gold); color: var(--cream-bg); border-color: var(--bronze-gold);
}
.btn-primary:hover { background-color: #a0720a; border-color: #a0720a; color: white; }
.btn-secondary {
  background-color: transparent; color: var(--bronze-gold); border-color: var(--bronze-gold);
}
.btn-secondary:hover { background-color: var(--bronze-gold); color: var(--cream-bg); }
.btn-warning { background-color: #ffc107; color: #212529; border-color: #ffc107;}
.btn-warning:hover { background-color: #e0a800; border-color: #e0a800;}
.btn-danger { background-color: #dc3545; color: white; border-color: #dc3545;}
.btn-danger:hover { background-color: #c82333; border-color: #c82333;}
.btn-sm { padding: 6px 12px; font-size: 0.85rem;}

@media (max-width: 920px) {
  .nav-links-container {
    display: none;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 70px; 
    left: 0;
    width: 100%;
    background-color: var(--card-bg);
    box-shadow: 0 5px 10px var(--shadow-light);
    padding: 10px 0; 
    border-top: 1px solid #eee;
  }
  .nav-links-container.open {
    display: flex;
  }
  .nav-link {
    width: 90%;
    text-align: center;
    padding: 12px 0;
    margin: 5px 0;
    border-bottom: none;
  }
  .nav-link::after { display: none; }
  .nav-link.router-link-exact-active, .nav-link:hover {
      background-color: var(--cream-bg);
  }
  .nav-link.admin-link.router-link-exact-active,
  .nav-link.admin-link:hover {
      color: var(--admin-link-color);
      background-color: #f0e0d0; 
  }
  .nav-toggler {
    display: flex;
  }
}

@media (max-width: 768px) {
    .app-footer .footer-content-wrapper { grid-template-columns: 1fr; text-align: center; }
    .app-footer .footer-info, .app-footer .footer-contacts, .app-footer .footer-social {
        text-align: center;
        margin-bottom: 15px;
    }
     .app-footer .footer-social a { margin: 0 8px; }
}
</style>