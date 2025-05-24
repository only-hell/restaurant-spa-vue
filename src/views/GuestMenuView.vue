<template>
  <div class="guest-menu-view">
    <!-- ИЗМЕНЕННАЯ ШАПКА -->
    <header class="admin-header">
      <div class="admin-header-content">
        <h1>Наше Меню</h1>
        <p>Откройте для себя мир вкусов "Золотого Гуся"</p>
      </div>
    </header>
    <!-- КОНЕЦ ИЗМЕНЕННОЙ ШАПКИ -->

    <div class="menu-content-wrapper-guest">
      <section v-if="menuItems.length > 0" class="menu-list-section-guest">
        <div class="table-container-guest">
          <table class="table stylish-table-guest responsive-table-guest">
            <thead>
              <tr>
                <th>Название</th>
                <th>Описание</th>
                <th class="text-right">Цена (₽)</th>
                <th>Категория</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in menuItems" :key="item.id" :class="{'vegetarian-item': item.isVegetarian}">
                <td data-label="Название" class="item-name-guest">
                  {{ item.name }}
                  <i v-if="item.isVegetarian" class="fas fa-leaf vegetarian-icon-guest" title="Вегетарианское блюдо"></i>
                </td>
                <td data-label="Описание" class="item-description-guest">{{ item.description || 'Приятного аппетита!' }}</td>
                <td data-label="Цена (₽)" class="text-right item-price-guest">{{ item.price.toFixed(2) }}</td>
                <td data-label="Категория"><span class="category-badge-guest">{{ item.category }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section v-else class="empty-menu-state-guest">
        <p>
          <i class="fas fa-concierge-bell"></i> Меню в данный момент обновляется. Пожалуйста, зайдите позже или уточните у персонала.
        </p>
      </section>

      <section class="guest-info-block-section">
        <h2 class="guest-section-title">Особые Предложения и Интересности</h2>
        <div class="guest-info-cards-grid">
          <div class="guest-info-card">
            <i class="fas fa-pepper-hot info-icon-guest"></i>
            <h3>Блюдо Сезона</h3>
            <p>Попробуйте наш новый тыквенный суп-пюре с имбирем и кокосовым молоком – идеальное согревающее блюдо для осенних вечеров!</p>
          </div>
          <div class="guest-info-card">
            <i class="fas fa-cocktail info-icon-guest"></i>
            <h3>Коктейль Недели</h3>
            <p>Освежающий "Золотой Мохито" с добавлением секретного ингредиента от нашего бартендера. Спросите у официанта!</p>
          </div>
          <div class="guest-info-card">
            <i class="fas fa-seedling info-icon-guest"></i>
            <h3>Фермерские Продукты</h3>
            <p>Мы гордимся тем, что используем свежайшие локальные продукты от проверенных фермерских хозяйств для приготовления наших блюд.</p>
          </div>
        </div>
      </section>
    </div> <!-- Закрывающий тег для menu-content-wrapper-guest -->
  </div> <!-- Закрывающий тег для guest-menu-view -->
</template>

<script setup>
import { menuItems } from '@/stores/menuStore';
</script>

<style scoped>
.guest-menu-view {
  background-color: #fdfcf9;
  padding-bottom: 60px;
  font-family: 'Lato', sans-serif;
}


.admin-header {
  background: linear-gradient(135deg, var(--bronze-gold) 0%, var(--soft-gold) 100%);
  color: white;
  padding: 50px 30px;
  text-align: center;
  box-shadow: 0 5px 20px var(--shadow-medium);
  margin-bottom: 40px;
  border-bottom: 4px solid var(--bronze-gold);
}
.admin-header-content h1 { 
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.2rem, 5.5vw, 3.2rem); 
  margin: 0 0 15px 0;
  color: white;
  text-shadow: 2px 2px 5px rgba(0,0,0,0.35);
}
.admin-header-content p { 
  font-size: 1.15rem; 
  margin: 0;
  opacity: 0.95;
  font-weight: 300;
}



.menu-content-wrapper-guest {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
}


.stylish-table-guest {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 5px 20px rgba(0,0,0,0.08);
  border-radius: 8px;
  overflow: hidden;
}

.stylish-table-guest th,
.stylish-table-guest td {
  padding: 14px 18px;
  text-align: left;
  border-bottom: 1px solid #f2f2f2;
  vertical-align: middle;
  font-size: 0.95em;
  color: #333;
}

.stylish-table-guest th {
  background-color: #f8f8f8;
  font-weight: 600;
  color: var(--bronze-gold);
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.5px;
  white-space: nowrap;
}
.stylish-table-guest th.text-right { text-align: right; }

.stylish-table-guest tbody tr:last-child td {
  border-bottom: none;
}

.stylish-table-guest tbody tr:hover {
  background-color: #fdfaf6;
}
.stylish-table-guest .text-right { text-align: right !important; }

.item-name-guest {
  font-weight: 600;
  color: var(--dark-text);
}
.vegetarian-icon-guest {
  color: #28a745;
  margin-left: 8px;
  font-size: 0.9em;
}

.item-price-guest {
  font-weight: 600;
  color: var(--bronze-gold);
  white-space: nowrap;
}

.item-description-guest {
  font-size: 0.9em;
  color: #555;
  line-height: 1.5;
  white-space: normal;
  word-break: break-word;
}

.category-badge-guest {
  background-color: var(--soft-gold);
  color: #fff;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.78em;
  font-weight: 500;
  display: inline-block;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.empty-menu-state-guest {
  color: #555;
  text-align: center;
  margin-top: 40px;
  padding: 40px 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.07);
  font-size: 1.1em;
  border: 1px dashed #ddd;
}

.empty-menu-state-guest i {
  margin-right: 10px;
  color: var(--bronze-gold);
  font-size: 1.3em;
}

.guest-info-block-section {
  padding: 40px 0;
  margin-top: 30px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.06);
}
.menu-content-wrapper-guest > .guest-info-block-section {
    margin-left: -20px; margin-right: -20px; padding-left: 20px; padding-right: 20px;
}

.guest-section-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  color: var(--bronze-gold);
  text-align: center;
  margin-bottom: 35px;
  padding-bottom: 15px;
  position: relative;
}

.guest-section-title::after {
  content: '';
  display: block;
  width: 70px;
  height: 3px;
  background-color: var(--soft-gold);
  margin: 15px auto 0;
  border-radius: 2px;
}

.guest-info-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin-top: 25px;
}

.guest-info-card {
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.07);
  text-align: center;
  border-top: 4px solid var(--bronze-gold);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.guest-info-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.info-icon-guest {
  font-size: 2.2rem;
  color: var(--bronze-gold);
  margin-bottom: 20px;
  display: block;
}

.guest-info-card h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  margin-bottom: 12px;
  color: #333;
}

.guest-info-card p {
  font-size: 0.95rem;
  line-height: 1.7;
  color: #666;
}

/* Адаптивность для таблицы на гостевой странице */
@media (max-width: 768px) {
  .menu-content-wrapper-guest { padding: 0 15px; }
  .menu-content-wrapper-guest > .guest-info-block-section { margin-left: -15px; margin-right: -15px; padding-left: 15px; padding-right: 15px;}

  .stylish-table-guest.responsive-table-guest thead {
    display: none;
  }
  .stylish-table-guest.responsive-table-guest,
  .stylish-table-guest.responsive-table-guest tbody,
  .stylish-table-guest.responsive-table-guest tr,
  .stylish-table-guest.responsive-table-guest td {
    display: block;
    width: 100% !important;
    box-sizing: border-box;
  }
  .stylish-table-guest.responsive-table-guest tr {
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    overflow: hidden;
    border: 1px solid #e8e8e8;
    background-color: #fff;
  }
  .stylish-table-guest.responsive-table-guest td {
    text-align: right;
    padding-left: 50%;
    position: relative;
    border-bottom: 1px dotted #eee;
    padding-top: 12px;
    padding-bottom: 12px;
  }
  .stylish-table-guest.responsive-table-guest td:last-child {
    border-bottom: none;
  }
  .stylish-table-guest.responsive-table-guest td::before {
    content: attr(data-label);
    position: absolute;
    left: 15px;
    width: calc(50% - 25px); 
    padding-right: 10px;
    font-weight: 600;
    text-align: left;
    white-space: nowrap;
    color: var(--bronze-gold);
    font-size: 0.85em;
  }
  .stylish-table-guest.responsive-table-guest td.item-description-guest {
    text-align: left;
    padding-left: 15px;
  }
  .stylish-table-guest.responsive-table-guest td.item-description-guest::before {
     display: block; 
     position: static;
     margin-bottom: 5px;
     width: auto; 
     padding-right: 0;
  }

  .guest-section-title { font-size: clamp(1.5rem, 5vw, 2rem); }
  .guest-info-cards-grid { grid-template-columns: 1fr; }
  .guest-info-card { padding: 25px; }

 
  .admin-header { padding: 40px 15px; }
  .admin-header-content h1 { font-size: clamp(2rem, 5vw, 2.8rem); }
}
</style>