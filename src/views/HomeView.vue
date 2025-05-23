<template>
  <div class="home-view">
    <header class="hero-section">
      <div class="hero-content">
        <h1>Добро пожаловать в "Золотой Гусь"!</h1>
      </div>
    </header>

    <div class="main-page-content">
      <section id="quick-actions" class="content-section">
        <div class="actions-grid">
          <div class="action-card">
            <i class="fas fa-book-open action-icon"></i>
            <h3>Наше Меню</h3>
            <p>Откройте для себя изысканные блюда от наших шеф-поваров, приготовленные с любовью и мастерством.</p>
            <router-link to="/menu" class="btn btn-primary">Изучить Меню</router-link>
          </div>
          <div class="action-card">
            <i class="fas fa-map-marker-alt action-icon"></i>
            <h3>Как нас найти</h3>
            <p>Узнайте наш адрес, часы работы и как легко добраться до нашего уютного ресторана.</p>
            <a href="#footer-contacts" class="btn btn-primary">Контакты и Карта</a>
          </div>
          <div class="action-card">
            <i class="fas fa-calendar-alt action-icon"></i>
            <h3>Забронировать столик</h3>
            <p>Выберите удобное время и идеальный столик для вашего незабываемого визита в "Золотой Гусь".</p>
            <router-link to="/reservations" class="btn btn-primary">Забронировать</router-link>
          </div>
        </div>
      </section>

      <section id="about-us" class="content-section">
        <h2 class="section-title">О Нас</h2>
        <div class="about-us-content">
          <img src="/placeholder-restaurant-interior.jpg" alt="Интерьер Ресторана Золотой Гусь" class="about-us-image">
          <div class="about-us-text">
            <p class="about-us-intro">"Золотой Гусь" – это не просто ресторан, это <strong>место, где традиции встречаются с современностью</strong>. Мы открыли свои двери в 2010 году с одной целью – дарить нашим гостям радость от вкусной еды и безупречного сервиса.</p>
            <p>Наша философия – использование только свежайших локальных продуктов и авторский подход к каждому блюду. Мы верим, что истинное гастрономическое удовольствие начинается с уважения к ингредиентам и внимания к деталям.</p>
            <p>За годы работы мы стали любимым местом для семейных ужинов, романтических свиданий и деловых встреч. Приходите и станьте частью нашей истории!</p>
            <blockquote class="about-us-quote">
              <p>"Еда – это искусство, а каждый наш гость – самый важный критик."</p>
              <cite>– Август Лефевр, основатель</cite>
            </blockquote>
          </div>
        </div>
      </section>

      <section id="chefs" class="content-section bg-alt-section">
        <h2 class="section-title">Наши Повара</h2>
        <div class="chefs-grid">
          <div class="chef-card">
            <img src="/placeholder-chef-1.jpg" alt="Шеф-повар Иван Иванов">
            <h3>Иван Иванов</h3>
            <p class="chef-title">Шеф-повар</p>
            <p>Мастер европейской кухни с 15-летним опытом. Его блюда – это симфония вкуса и аромата.</p>
          </div>
          <div class="chef-card">
            <img src="/placeholder-chef-2.jpg" alt="Кондитер Мария Сидорова">
            <h3>Мария Сидорова</h3>
            <p class="chef-title">Шеф-кондитер</p>
            <p>Волшебница, создающая десерты, которые покоряют с первого взгляда и первого кусочка.</p>
          </div>
        </div>
      </section>

      <section id="awards" class="content-section">
        <h2 class="section-title">Награды и Признание</h2>
        <ul class="awards-list">
          <li><i class="fas fa-trophy"></i> Лучший ресторан города 2022 - по версии "Local Eats"</li>
          <li><i class="fas fa-star"></i> Золотая вилка 2021 - за выдающийся сервис</li>
          <li><i class="fas fa-certificate"></i> Сертификат качества от "Gastronomy Guide"</li>
        </ul>
      </section>

      <section id="famous-guests" class="content-section bg-alt-section">
        <h2 class="section-title">Наши Гости</h2>
        <p class="section-subtitle">Нас удостоили своим визитом многие известные личности. Вот лишь некоторые из них:</p>
        <div class="famous-guests-grid">
          <div class="guest-card">
            <img src="/guest-placeholder-1.jpg" alt="Известный Гость 1">
            <div class="guest-info">
              <h4>Маэстро Вкуса</h4>
              <p>Знаменитый кулинарный критик</p>
            </div>
          </div>
          <div class="guest-card">
            <img src="/guest-placeholder-2.jpg" alt="Известный Гость 2">
            <div class="guest-info">
              <h4>Дива Сцены</h4>
              <p>Популярная актриса театра и кино</p>
            </div>
          </div>
          <div class="guest-card">
            <img src="/guest-placeholder-3.jpg" alt="Известный Гость 3">
            <div class="guest-info">
              <h4>Легенда Спорта</h4>
              <p>Олимпийский чемпион</p>
            </div>
          </div>
           <div class="guest-card">
            <img src="/guest-placeholder-4.jpg" alt="Известный Гость 4">
            <div class="guest-info">
              <h4>Виртуоз Музыки</h4>
              <p>Всемирно известный композитор</p>
            </div>
          </div>
        </div>
      </section>

      <section id="expandable-story" class="content-section">
        <h2 class="section-title">Наша История</h2>
        <div class="expandable-content" :class="{ 'expanded': storyExpanded }">
          <p>Путешествие "Золотого Гуся" началось с мечты его основателя, шеф-повара Августа Лефевра, приехавшего из маленькой деревушки в Провансе. Он хотел создать место, где каждый гость мог бы ощутить тепло домашнего очага и одновременно насладиться изысканностью высокой кухни. Первые годы были непростыми: маленький зал, скромное меню, но огромное желание творить и удивлять.</p>
          <p v-if="storyExpanded">Со временем, благодаря упорному труду и уникальным рецептам Августа, ресторан завоевал сердца горожан. Секрет успеха крылся не только в мастерстве повара, но и в его отношении к продуктам – он лично отбирал их на местных рынках, поддерживая фермеров и гарантируя свежесть каждого ингредиента. "Золотой Гусь" стал синонимом качества и безупречного вкуса. В 2015 году ресторан пережил масштабную реконструкцию, расширив зал и обновив интерьер, сохранив при этом свою уютную и душевную атмосферу. Мы добавили летнюю веранду, ставшую излюбленным местом для теплых вечеров. Наша команда пополнилась молодыми и талантливыми поварами, которые, уважая традиции, привносят свежие идеи и современные техники. Сегодня "Золотой Гусь" – это не просто место, где можно поесть. Это место для встреч, для важных событий, для тихих семейных радостей и громких праздников. Мы продолжаем развиваться, искать новые вкусы и радовать вас каждый день, оставаясь верными главным принципам – любви к своему делу и уважению к каждому гостю.</p>
        </div>
        <button @click="toggleStory" class="btn btn-primary btn-expand">
          {{ storyExpanded ? 'Свернуть историю' : 'Читать полную историю' }}
        </button>
      </section>

            <section id="testimonials" class="content-section"> 
        <h2 class="section-title">Говорят о Нас</h2>
        <div class="testimonials-container">
          <div class="testimonial-card">
            <div class="testimonial-icon-quote">
              <i class="fas fa-quote-left"></i>
            </div>
            <blockquote class="testimonial-text">
              <p>"Незабываемый вечер! Кухня на высоте, обслуживание безупречное. Настоятельно рекомендую всем ценителям подлинного вкуса и атмосферы."</p>
            </blockquote>
            <cite class="testimonial-author">– Александр Гурманов, ресторанный критик</cite>
          </div>
          <div class="testimonial-card">
            <div class="testimonial-icon-quote">
              <i class="fas fa-quote-left"></i>
            </div>
            <blockquote class="testimonial-text">
              <p>"Золотой Гусь" стал нашим семейным фаворитом для особых случаев. Дети обожают десерты, а мы ценим уют и безупречный сервис."</p>
            </blockquote>
            <cite class="testimonial-author">– Семья Ивановых</cite>
          </div>
          <div class="testimonial-card">
            <div class="testimonial-icon-quote">
              <i class="fas fa-quote-left"></i>
            </div>
            <blockquote class="testimonial-text">
              <p>"Потрясающе уютное место с великолепной кухней! Идеально для встреч с друзьями. Мы обязательно вернемся сюда снова и снова!"</p>
            </blockquote>
            <cite class="testimonial-author">– Елена и Друзья</cite>
          </div>
        </div>
      </section>

      <section id="specials" class="content-section">
        <h2 class="section-title">Акции и Спецпредложения</h2>
        <div class="special-offer-card">
          <h3><i class="fas fa-briefcase"></i> Бизнес-ланч "Экспресс"</h3>
          <p>Каждый будний день с 12:00 до 16:00! Полноценный обед из трех блюд всего за 590₽.</p>
        </div>
         <div class="special-offer-card">
          <h3><i class="fas fa-birthday-cake"></i> Скидка Именинникам</h3>
          <p>Отметьте свой День Рождения и получите скидку 15% и комплимент!</p>
        </div>
      </section>

      <section id="menu-preview" class="content-section bg-alt-section">
        <h2 class="section-title">Загляните в наше меню</h2>
        <p>Мы гордимся разнообразием наших блюд. Полное меню доступно на соответствующей странице.</p>
        <router-link to="/menu" class="btn btn-primary btn-lg">К полному меню</router-link>
      </section>
    </div>

    <footer class="home-footer" id="footer-contacts">
      <div class="footer-content-wrapper">
        <div class="footer-info">
            <p class="footer-logo">Золотой Гусь</p>
            <p>"Место, где каждый момент становится особенным"</p>
        </div>
        <div class="footer-contacts">
            <p><i class="fas fa-map-marker-alt"></i> ул. Гастрономическая, 10, г. Примербург</p>
            <p><i class="fas fa-phone"></i> +7 (123) 456-78-90</p>
            <p><i class="fas fa-envelope"></i> info@zolotoygus.example</p>
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

const storyExpanded = ref(false);

const toggleStory = () => {
  storyExpanded.value = !storyExpanded.value;
};
</script>

<style scoped>
/* Общие стили для HomeView */
.home-view {
  font-size: 17px;
}

.home-view h1, .home-view h2, .home-view h3, .home-view h4 {
  font-family: 'Playfair Display', serif;
  color: var(--bronze-gold);
  font-weight: 700;
  margin-top: 0;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.05);
}

/* Hero Section */
.hero-section {
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('/placeholder-hero-bg.jpg');
  background-size: cover;
  background-attachment: fixed;
  background-position: center center;
  min-height: calc(100vh - 75px);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  box-shadow: inset 0 -15px 25px -15px rgba(0,0,0,0.3);
}
.hero-content h1 {
  font-size: clamp(3rem, 8vw, 6rem);
  text-shadow: 2px 3px 8px rgba(0,0,0,0.75);
  color: white;
  line-height: 1.1;
  letter-spacing: 1px;
  margin-bottom: 0;
}

.main-page-content {
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 30px;
  box-sizing: border-box;
}

#quick-actions {
  padding: 70px 0;
  background-color: var(--card-bg);
  box-shadow: 0 10px 35px rgba(0,0,0,0.07);
}
.main-page-content > #quick-actions {
    margin-left: -30px; margin-right: -30px; padding-left: 30px; padding-right: 30px;
}
.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 35px;
}
.action-card {
  background-color: var(--card-bg);
  padding: 35px 30px;
  border-radius: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #f0f0f0;
  box-shadow: 0 10px 30px var(--shadow-light);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.action-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px var(--shadow-medium);
}
.action-icon {
  font-size: 3rem;
  color: var(--bronze-gold);
  margin-bottom: 25px;
  line-height: 1;
}
.action-card h3 {
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: var(--bronze-gold);
}
.action-card p {
  font-size: 0.95em;
  color: var(--dark-text);
  flex-grow: 1;
  margin-bottom: 30px;
  line-height: 1.6;
  max-width: 90%;
}
.action-card .btn {
  margin-top: auto;
  width: auto;
  min-width: 200px;
  padding: 14px 28px;
  /* Все три кнопки теперь .btn-primary */
}

.section-title {
  font-size: clamp(2.2rem, 5.5vw, 3.2rem);
  margin-bottom: 60px;
  position: relative;
  padding-bottom: 25px;
  text-shadow: 1px 1px 3px rgba(184, 134, 11, 0.2); /* Тень с бронзовым оттенком */
}
.section-title::after {
  content: '';
  display: block;
  width: 80px;
  height: 4px;
  background-color: var(--soft-gold);
  margin: 25px auto 0;
  box-shadow: 0 2px 5px var(--shadow-light);
  border-radius: 2px;
}
.section-subtitle {
  font-size: 1.2em;
  color: #666;
  margin-top: -35px;
  margin-bottom: 50px;
  max-width: 750px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.65;
}

.content-section {
  padding: 90px 0;
  text-align: center;
}
.bg-alt-section {
  background-color: var(--card-bg); /* Белый */
  box-shadow: 0 0 50px rgba(0,0,0,0.04) inset;
}
.main-page-content > .bg-alt-section {
    margin-left: -30px; margin-right: -30px; padding-left: 30px; padding-right: 30px;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.05);
    margin-top: 40px;
    margin-bottom: 40px;
}

.about-us-content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 50px;
  text-align: left;
}
.about-us-image {
  flex: 1 1 400px;
  max-width: 100%;
  border-radius: 12px;
  box-shadow: 0 15px 45px var(--shadow-medium);
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.about-us-image:hover {
    transform: scale(1.03) rotate(-1.5deg);
}
.about-us-text {
  flex: 1.5 1 500px;
}
.about-us-text p {
  margin-bottom: 1.4em;
  font-size: 1.1em;
  color: var(--dark-text);
  line-height: 1.85;
}
.about-us-text p.about-us-intro {
    font-size: 1.2em; /* Первый абзац чуть крупнее */
    color: var(--dark-text); 
    margin-bottom: 1.5em;
}
.about-us-text strong {
    font-weight: 600; 
    color: var(--bronze-gold); 
}
.about-us-quote {
    margin-top: 30px;
    padding-left: 20px;
    border-left: 3px solid var(--soft-gold);
    font-style: italic;
    color: #555;
}
.about-us-quote p {
    margin-bottom: 5px;
    font-size: 1.1em;
}
.about-us-quote cite {
    display: block;
    font-size: 0.95em;
    color: #777;
    font-style: normal;
}

.chefs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  gap: 35px;
  margin-top: 25px;
}
.chef-card {
  background-color: var(--card-bg);
  padding: 35px;
  border-radius: 12px;
  box-shadow: 0 10px 30px var(--shadow-light);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.chef-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px var(--shadow-medium);
}
.chef-card img {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 25px;
  border: 6px solid var(--soft-gold);
  box-shadow: 0 5px 15px var(--shadow-light);
}
.chef-card h3 {
  font-size: 1.6rem;
  margin-bottom: 10px;
  color: var(--bronze-gold);
}
.chef-title {
  font-style: italic;
  color: #888;
  margin-bottom: 15px;
  font-size: 0.95rem;
}
.chef-card p:not(.chef-title) {
  font-size: 0.95rem;
  color: var(--dark-text);
  line-height: 1.65;
}

.awards-list {
  list-style: none;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  max-width: 700px;
  margin: 0 auto;
}
.awards-list li {
  font-size: 1.1em;
  display: flex;
  align-items: center;
  gap: 18px;
  color: var(--dark-text);
  background-color: var(--card-bg);
  padding: 20px 30px;
  border-radius: 10px;
  box-shadow: 0 8px 25px var(--shadow-light);
  width: 100%;
  box-sizing: border-box;
  text-align: left;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.awards-list li:hover {
    transform: translateX(5px);
    box-shadow: 0 10px 30px var(--shadow-medium);
}
.awards-list i {
  color: var(--bronze-gold);
  font-size: 1.8em;
  width: 35px;
  text-align: center;
  flex-shrink: 0;
}

.famous-guests-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  gap: 30px;
  margin-top: 20px;
}
.guest-card {
  background-color: var(--card-bg);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px var(--shadow-medium);
  transition: transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.guest-card:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow: 0 15px 40px var(--shadow-dark);
}
.guest-card img {
  width: 100%;
  aspect-ratio: 3 / 4.2; /* Сделал еще чуть выше */
  object-fit: cover;
  display: block;
  transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.guest-card:hover img {
    transform: scale(1.1);
}
.guest-card .guest-info {
  padding: 20px 25px 25px;
  text-align: center;
}
.guest-card .guest-info h4 {
  font-size: 1.4rem;
  margin-bottom: 8px;
  color: var(--bronze-gold);
  font-weight: 600;
}
.guest-card .guest-info p {
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 0;
  line-height: 1.5;
}

#expandable-story .expandable-content {
  max-height: 13em;
  overflow: hidden;
  position: relative;
  transition: max-height 0.7s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease-in-out;
  text-align: left;
  margin-bottom: 30px;
  color: var(--dark-text);
  font-size: 1.1em;
  line-height: 1.85;
  padding: 20px;
  background-color: var(--card-bg);
  border-radius: 10px;
  box-shadow: 0 8px 25px var(--shadow-light);
}
#expandable-story .expandable-content::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 7em;
  background: linear-gradient(to bottom, transparent, var(--card-bg) 80%);
  pointer-events: none;
  transition: opacity 0.4s ease-in-out;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
#expandable-story .expandable-content.expanded {
  max-height: 1500px;
  box-shadow: 0 10px 30px var(--shadow-light);
}
#expandable-story .expandable-content.expanded::after {
  opacity: 0;
}
.btn-expand {
  margin-top: 10px;
  padding: 12px 30px;
  font-size: 0.95rem;
  /* Теперь btn-primary */
}

#testimonials {
    background-color: var(--cream-bg); 
}
.testimonials-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
  margin-top: 20px;
}
.testimonial-card {
  background-color: var(--card-bg); 
  padding: 35px;
  border-radius: 12px;
  box-shadow: 0 12px 35px var(--shadow-light); 
  display: flex;
  flex-direction: column;
  text-align: center;
  border-top: none;
}
.testimonial-icon-quote { 
    font-size: 2.5rem;
    color: var(--soft-gold);
    margin-bottom: 15px;
    line-height: 1;
}
.testimonial-text { 
  margin: 0 0 20px 0;
  font-style: italic;
  color: #505050;
  flex-grow: 1;
  font-size: 1.05em; 
  line-height: 1.7;
}
.testimonial-author { 
  display: block;
  font-weight: 600;
  color: var(--bronze-gold);
  font-style: normal;
  margin-top: auto;
  font-size: 0.9em;
}

.special-offer-card {
  background-color: var(--card-bg);
  padding: 30px 35px;
  border-radius: 12px;
  border: 1px solid #e8e3da;
  border-left: 6px solid var(--soft-gold);
  box-shadow: 0 10px 30px var(--shadow-light); /* Тень */
}
.special-offer-card h3 { font-size: 1.75rem; }

#menu-preview p {
  max-width: 700px;
  margin: 0 auto 40px auto;
  font-size: 1.15em;
  color: var(--dark-text);
  line-height: 1.75;
}
#menu-preview .btn-primary {
    padding: 16px 40px;
    font-size: 1.1rem;
}

.home-footer {
  background-color: #222;
  color: #a9a9a9;
  text-align: left;
  padding: 25px 40px;
  margin-top: 80px;
  font-size: 0.9rem;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 -5px 15px var(--shadow-medium);
}
.home-footer .footer-content-wrapper {
    max-width: 1140px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 25px;
    align-items: start;
}
.footer-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.6rem;
    color: var(--soft-gold);
    margin-bottom: 8px;
}
.footer-info p, .footer-contacts p {
  margin: 5px 0;
  line-height: 1.6;
}
.footer-contacts i {
    margin-right: 10px;
    color: var(--soft-gold);
    width: 15px;
    text-align: center;
}
.footer-social {
    margin-top: 10px;
}
.footer-social p {
    margin-bottom: 10px;
    font-weight: 600;
    color: #ccc;
}
.footer-social a {
    color: #ccc;
    margin-right: 15px;
    font-size: 1.3rem;
    transition: color 0.2s ease;
}
.footer-social a:hover {
    color: var(--soft-gold);
}
.footer-social a:last-child {
    margin-right: 0;
}
.footer-copy {
    grid-column: 1 / -1;
    text-align: center;
    margin-top: 25px;
    padding-top: 20px;
    border-top: 1px solid #383838;
    font-size: 0.8rem;
    color: #888;
}

@media (max-width: 992px) {
  .main-page-content { padding: 0 25px; }
  .main-page-content > .bg-alt-section,
  .main-page-content > #quick-actions { margin-left: -25px; margin-right: -25px; padding-left: 25px; padding-right: 25px;}
  .hero-content h1 { font-size: clamp(2.5rem, 7vw, 3.8rem); }
  .section-title { font-size: clamp(1.8rem, 5vw, 2.6rem); }
  .actions-grid { grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));}
}

@media (max-width: 768px) {
  .home-view { font-size: 16px; }
  .hero-section { min-height: 60vh; }
  .hero-content h1 { font-size: clamp(2.2rem, 8vw, 3.2rem); }

  .main-page-content { padding: 0 20px; }
  .main-page-content > .bg-alt-section,
  .main-page-content > #quick-actions { margin-left: -20px; margin-right: -20px; padding-left: 20px; padding-right: 20px;}
  .content-section { padding: 60px 0; }
  .section-title { font-size: clamp(1.7rem, 6vw, 2.4rem); margin-bottom: 40px; }

  .actions-grid { grid-template-columns: 1fr; }
  .famous-guests-grid img { aspect-ratio: 4 / 3; }
  .home-footer .footer-content-wrapper { grid-template-columns: 1fr; text-align: center; }
}

@media (max-width: 480px) {
  .hero-content h1 { font-size: clamp(2rem, 9vw, 2.8rem); }
  .section-title { font-size: clamp(1.6rem, 7vw, 2.2rem); }
  .main-page-content { padding: 0 15px; }
  .main-page-content > .bg-alt-section,
  .main-page-content > #quick-actions { margin-left: -15px; margin-right: -15px; padding-left: 15px; padding-right: 15px;}
}

@media (min-width: 1400px) {
  .main-page-content { max-width: 1200px; padding: 0 30px;}
  .main-page-content > .bg-alt-section,
  .main-page-content > #quick-actions { margin-left: -30px; margin-right: -30px; padding-left: 30px; padding-right: 30px;}
  .home-view { font-size: 18px; }
  .hero-content h1 { font-size: clamp(4rem, 6vw, 5.5rem); }
  .section-title { font-size: clamp(2.8rem, 4vw, 3.5rem); }
}

@media (min-width: 1920px) {
  .main-page-content { max-width: 1400px; }
  .hero-content h1 { font-size: clamp(4.5rem, 5.5vw, 6.5rem); }
}
</style>