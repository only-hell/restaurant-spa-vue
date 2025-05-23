<template>
  <div class="admin-view menu-view">
    <header class="admin-header">
      <div class="admin-header-content">
        <h1>Редактор Меню</h1>
        <p>Создавайте, обновляйте и управляйте позициями в меню вашего ресторана.</p>
      </div>
    </header>

    <div class="admin-main-content">
      <section class="controls-section content-section">
        <button @click="openAddModal" class="btn btn-primary btn-lg">
          <i class="fas fa-plus-circle"></i> Добавить новую позицию
        </button>
      </section>

      <section class="table-list-section content-section">
        <h2 class="section-title-admin">Все Позиции Меню</h2>
        <table v-if="menuItems.length > 0" class="table stylish-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Название</th>
              <th>Категория</th>
              <th class="text-right">Цена (₽)</th>
              <th>Описание</th>
              <th class="text-center">Вегетарианское</th>
              <th class="text-right">Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in menuItems" :key="item.id">
              <td>{{ item.id }}</td>
              <td class="item-name">{{ item.name }}</td>
              <td><span class="category-badge">{{ item.category }}</span></td>
              <td class="text-right item-price">{{ item.price.toFixed(2) }}</td>
              <td class="item-description">{{ item.description || '-' }}</td>
              <td class="text-center">{{ item.isVegetarian ? 'Да' : 'Нет' }}</td>
              <td class="actions-cell">
                <button @click="openEditModal(item)" class="btn btn-sm btn-action-edit">
                  <i class="fas fa-edit"></i> Редактировать
                </button>
                <button @click="deleteMenuItem(item.id)" class="btn btn-sm btn-action-delete">
                  <i class="fas fa-trash-alt"></i> Удалить
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else class="empty-state">
          <i class="fas fa-info-circle"></i> В меню пока нет позиций. Начните с добавления новой!
        </p>
      </section>

      <section class="info-block-section content-section bg-alt-section">
        <h2 class="section-title-admin">Советы по Меню</h2>
        <div class="info-cards-grid">
          <div class="info-card">
            <i class="fas fa-star info-icon"></i>
            <h3>Хиты Продаж</h3>
            <p>Выделяйте популярные блюда специальными отметками или размещайте их на видных местах. Это помогает гостям с выбором и увеличивает продажи.</p>
          </div>
          <div class="info-card">
            <i class="fas fa-carrot info-icon"></i>
            <h3>Опции для Всех</h3>
            <p>Предлагайте вегетарианские, безглютеновые или другие диетические опции. Расширение выбора привлекает больше гостей с различными предпочтениями.</p>
          </div>
          <div class="info-card">
            <i class="fas fa-images info-icon"></i>
            <h3>Аппетитные Описания</h3>
            <p>Используйте яркие и "вкусные" описания для блюд. Кратко, но емко расскажите об ингредиентах и особенностях приготовления. Фотографии блюд также повышают интерес.</p>
          </div>
        </div>
      </section>
    </div>

    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h2 class="modal-title">{{ isEditing ? 'Редактировать позицию' : 'Новая позиция в меню' }}</h2>
        <form @submit.prevent="saveMenuItem">
          <div class="form-group">
            <label for="itemName">Название блюда/напитка:</label>
            <input type="text" id="itemName" v-model="currentItem.name" required />
          </div>
          <div class="form-row">
            <div class="form-group column">
              <label for="itemCategory">Категория:</label>
              <select id="itemCategory" v-model="currentItem.category" required>
                <option disabled value="">-- Выберите категорию --</option>
                <option v-for="cat in availableCategories" :key="cat" :value="cat">{{ cat }}</option>
              </select>
            </div>
            <div class="form-group column">
              <label for="itemPrice">Цена (₽):</label>
              <input type="number" id="itemPrice" v-model.number="currentItem.price" min="0" step="0.01" required />
            </div>
          </div>
          <div class="form-group">
            <label for="itemDescription">Описание (необязательно):</label>
            <textarea id="itemDescription" v-model="currentItem.description" rows="4" placeholder="Расскажите о блюде..."></textarea>
          </div>
          <div class="form-group checkbox-group">
            <input type="checkbox" id="itemVegetarian" v-model="currentItem.isVegetarian" />
            <label for="itemVegetarian">Вегетарианское блюдо</label>
          </div>

          <div class="form-actions">
            <button type="button" @click="closeModal" class="btn btn-secondary">Отмена</button>
            <button type="submit" class="btn btn-primary">{{ isEditing ? 'Сохранить изменения' : 'Добавить в меню' }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const menuItems = ref([
  { id: 1, name: 'Цезарь с курицей', category: 'Салаты', price: 450.00, description: 'Классический салат Цезарь с обжаренной куриной грудкой.', isVegetarian: false },
  { id: 2, name: 'Борщ украинский', category: 'Супы', price: 350.00, description: 'Наваристый борщ с говядиной, подается со сметаной.', isVegetarian: false },
  { id: 3, name: 'Паста Карбонара', category: 'Горячее', price: 550.00, description: 'Спагетти с беконом, яйцом и сыром Пармезан.', isVegetarian: false },
  { id: 4, name: 'Грибной крем-суп', category: 'Супы', price: 320.00, description: 'Нежный крем-суп из шампиньонов.', isVegetarian: true },
  { id: 5, name: 'Чизкейк Нью-Йорк', category: 'Десерты', price: 280.00, description: 'Классический чизкейк на песочной основе.', isVegetarian: true },
  { id: 6, name: 'Морс клюквенный', category: 'Напитки', price: 150.00, description: 'Домашний клюквенный морс, 0.5л.', isVegetarian: true },
]);

const availableCategories = ref(['Закуски', 'Салаты', 'Супы', 'Горячее', 'Гарниры', 'Десерты', 'Напитки', 'Алкоголь']);

const showModal = ref(false);
const isEditing = ref(false);

const defaultMenuItemForm = () => ({
  name: '',
  category: '',
  price: 0.00,
  description: '',
  isVegetarian: false,
});

const currentItem = reactive(defaultMenuItemForm());

const reindexMenuItemIds = () => {
  menuItems.value.forEach((item, index) => { item.id = index + 1; });
};
const getNextMenuItemId = () => {
  if (menuItems.value.length === 0) return 1;
  return menuItems.value.length + 1;
};

const openAddModal = () => {
  isEditing.value = false;
  Object.assign(currentItem, defaultMenuItemForm());
  currentItem.category = '';
  showModal.value = true;
};
const openEditModal = (itemToEdit) => {
  isEditing.value = true;
  Object.assign(currentItem, { ...itemToEdit });
  showModal.value = true;
};
const closeModal = () => { showModal.value = false; };

const saveMenuItem = () => {
  if (!currentItem.name || !currentItem.category || currentItem.price < 0) {
    alert('Пожалуйста, заполните все обязательные поля (Название, Категория) и убедитесь, что цена не отрицательная.');
    return;
  }
  if (isEditing.value) {
    const index = menuItems.value.findIndex(i => i.id === currentItem.id);
    if (index !== -1) {
      menuItems.value[index] = { ...currentItem, id: menuItems.value[index].id };
    }
  } else {
    menuItems.value.push({ ...currentItem, id: getNextMenuItemId() });
  }
  closeModal();
};

const deleteMenuItem = (itemIdToDelete) => {
  if (confirm('Вы уверены, что хотите удалить эту позицию из меню?')) {
    menuItems.value = menuItems.value.filter(item => item.id !== itemIdToDelete);
    reindexMenuItemIds();
  }
};
</script>

<style scoped>
/* Копируем стили из ReservationsView.vue и адаптируем */
.admin-view { background-color: var(--cream-bg); }
.admin-header {
  background-color: var(--bronze-gold); color: var(--cream-bg);
  padding: 40px 30px; text-align: center;
  box-shadow: 0 4px 12px var(--shadow-medium); margin-bottom: 40px;
}
.admin-header-content h1 {
  font-family: 'Playfair Display', serif; font-size: clamp(2rem, 5vw, 3rem);
  margin: 0 0 10px 0; color: var(--cream-bg); text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
}
.admin-header-content p { font-size: 1.1rem; margin: 0; opacity: 0.9; }
.admin-main-content {
  width: 100%; max-width: 1200px; margin: 0 auto;
  padding: 0 30px; box-sizing: border-box;
}
.content-section { padding: 40px 0; }
.section-title-admin {
  font-family: 'Playfair Display', serif; font-size: clamp(1.8rem, 4vw, 2.4rem);
  color: var(--bronze-gold); text-align: center; margin-bottom: 30px;
  padding-bottom: 15px; position: relative; text-shadow: 1px 1px 2px rgba(0,0,0,0.05);
}
.section-title-admin::after {
  content: ''; display: block; width: 70px; height: 3px;
  background-color: var(--soft-gold); margin: 15px auto 0;
  border-radius: 2px; box-shadow: 0 1px 2px var(--shadow-light);
}
.controls-section { text-align: center; margin-bottom: 30px; }
.controls-section .btn-lg { padding: 14px 30px; font-size: 1.1rem; }
.controls-section .btn i { margin-right: 8px; }

.stylish-table {
  width: 100%; border-collapse: separate; border-spacing: 0;
  margin-top: 20px; box-shadow: 0 8px 25px var(--shadow-light);
  border-radius: 10px; overflow: hidden; background-color: var(--card-bg);
}
.stylish-table th, .stylish-table td {
  padding: 14px 16px; text-align: left;
  border-bottom: 1px solid #e8e3da; vertical-align: middle;
}
.stylish-table th {
  background-color: #f8f5f0; font-weight: 600; color: var(--bronze-gold);
  font-family: 'Lato', sans-serif; text-transform: uppercase;
  font-size: 0.85em; letter-spacing: 0.5px;
}
.stylish-table tbody tr:last-child td { border-bottom: none; }
.stylish-table tbody tr:hover { background-color: #fdfaf6; }

.item-name { font-weight: 500; color: var(--dark-text); }
.item-price { font-weight: 500; }
.item-description {
    font-size: 0.9em;
    color: #555;
    max-width: 300px; /* Ограничение ширины для описания */
    white-space: normal;
    word-break: break-word;
}
.category-badge {
    background-color: var(--soft-gold);
    color: var(--dark-text);
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 0.8em;
    font-weight: 500;
    display: inline-block;
}

.text-center { text-align: center; }
.text-right { text-align: right; }
.actions-cell { text-align: right; white-space: nowrap; }
.actions-cell .btn { margin-left: 8px; }
.btn-action-edit { background-color: var(--soft-gold); color: var(--dark-text); border-color: var(--soft-gold); }
.btn-action-edit:hover { background-color: #b8946e; border-color: #b8946e; color: white; }
.btn-action-delete { background-color: #e74c3c; color: white; border-color: #e74c3c; }
.btn-action-delete:hover { background-color: #c0392b; border-color: #c0392b; }
.actions-cell .btn i { margin-right: 5px; }

.empty-state {
  color: #777; font-style: italic; text-align: center; margin-top: 40px;
  padding: 30px; background-color: var(--card-bg); border-radius: 8px;
  box-shadow: 0 5px 15px var(--shadow-light); font-size: 1.1em;
}
.empty-state i { margin-right: 10px; color: var(--soft-gold); }

.info-block-section { padding-top: 60px; }
.bg-alt-section {
  background-color: var(--card-bg);
  box-shadow: 0 0 50px rgba(0,0,0,0.04) inset;
}
.admin-main-content > .bg-alt-section {
    margin-left: -30px; margin-right: -30px; padding-left: 30px; padding-right: 30px;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.05);
    margin-top: 40px; margin-bottom: 40px;
}
.info-cards-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px; margin-top: 20px;
}
.info-card {
  background-color: var(--card-bg); padding: 30px; border-radius: 10px;
  box-shadow: 0 8px 25px var(--shadow-light); text-align: left;
  border-top: 4px solid var(--bronze-gold);
}
.info-icon {
  font-size: 2.2rem; color: var(--bronze-gold); margin-bottom: 15px; display: block;
}
.info-card h3 {
  font-size: 1.4rem; margin-bottom: 10px; color: var(--bronze-gold);
}
.info-card p {
  font-size: 0.95em; line-height: 1.6; color: var(--dark-text);
}

.modal-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex; justify-content: center; align-items: center; z-index: 1050;
}
.modal-content {
  background-color: var(--card-bg); padding: 35px 40px; border-radius: 12px;
  box-shadow: 0 12px 45px var(--shadow-medium);
  width: 90%; max-width: 600px;
}
.modal-title {
  font-family: 'Playfair Display', serif; font-size: 1.9rem;
  margin-top: 0; margin-bottom: 30px; color: var(--bronze-gold);
  text-align: center; padding-bottom: 15px; border-bottom: 1px solid #eee;
}
.form-row { display: flex; gap: 20px; margin-bottom: 20px; }
.form-group.column { flex: 1; margin-bottom: 0; }
.form-group { margin-bottom: 20px; }
.form-group label {
  display: block; margin-bottom: 8px; font-weight: 600;
  font-size: 0.95em; color: var(--dark-text);
}
.form-group input[type="text"],
.form-group input[type="number"],
.form-group select,
.form-group textarea {
  width: 100%; padding: 12px 15px; border: 1px solid #ccc;
  border-radius: 6px; box-sizing: border-box; font-family: 'Lato', sans-serif;
  font-size: 1em; transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.form-group input:focus, .form-group select:focus, .form-group textarea:focus {
    border-color: var(--soft-gold);
    box-shadow: 0 0 0 3px rgba(184, 134, 11, 0.2);
    outline: none;
}
.form-group textarea { min-height: 100px; } /* Больше высота для описания */
.checkbox-group { display: flex; align-items: center; }
.checkbox-group input[type="checkbox"] {
  margin-right: 10px; width: auto; height: 1.1em; accent-color: var(--bronze-gold);
}
.checkbox-group label { margin-bottom: 0; font-weight: normal; }
.form-actions { margin-top: 30px; text-align: right; }
.form-actions .btn { margin-left: 10px; padding: 10px 25px; }

@media (max-width: 768px) {
    .admin-header { padding: 30px 20px; margin-bottom: 30px; }
    .admin-header-content h1 { font-size: clamp(1.8rem, 4.5vw, 2.5rem); }
    .admin-main-content { padding: 0 20px; }
    .main-page-content > .bg-alt-section { margin-left: -20px; margin-right: -20px; padding-left: 20px; padding-right: 20px;}
    .section-title-admin { font-size: clamp(1.6rem, 4vw, 2rem); }
    .stylish-table th, .stylish-table td { padding: 10px 12px; font-size: 0.9em; }
    .item-description { max-width: 150px; } /* Уменьшаем для мобильных */
    .actions-cell .btn { display: inline-block; width: auto; margin: 5px; }
    .info-cards-grid { grid-template-columns: 1fr; }
    .form-row { flex-direction: column; gap: 0; margin-bottom: 0; }
    .form-group.column { margin-bottom: 20px; }
}
@media (max-width: 480px) {
    .admin-main-content { padding: 0 15px; }
    .main-page-content > .bg-alt-section { margin-left: -15px; margin-right: -15px; padding-left: 15px; padding-right: 15px;}
    .stylish-table { font-size: 0.85em; }
}
</style>