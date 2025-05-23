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
        <button @click="openAddModal" class="btn btn-primary btn-lg-admin"> 
          <i class="fas fa-plus-circle"></i> Добавить новую позицию
        </button>
      </section>

      <section class="table-list-section content-section">
        <h2 class="section-title-admin">Все Позиции Меню</h2>
        
        <div v-if="menuItems.length > 0" class="table-container"> 
          <table class="table stylish-table responsive-table"> 
            <thead>
              <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Категория</th>
                <th class="text-right">Цена (₽)</th>
                <th>Описание</th>
                <th class="text-center">Вегетарианское</th>
                <th class="actions-header text-right">Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in menuItems" :key="item.id">
                <td data-label="ID">{{ item.id }}</td>
                <td data-label="Название" class="item-name">{{ item.name }}</td>
                <td data-label="Категория"><span class="category-badge">{{ item.category }}</span></td>
                <td data-label="Цена (₽)" class="text-right item-price">{{ item.price.toFixed(2) }}</td>
                <td data-label="Описание" class="item-description">{{ item.description || '-' }}</td>
                <td data-label="Вегетарианское" class="text-center">{{ item.isVegetarian ? 'Да' : 'Нет' }}</td>
                <td data-label="Действия" class="actions-cell">
                  <button @click="openEditModal(item)" class="btn btn-sm btn-action-edit">
                    <i class="fas fa-edit"></i> <span class="btn-text-desktop">Редактировать</span>
                  </button>
                  <button @click="deleteMenuItem(item.id)" class="btn btn-sm btn-action-delete">
                    <i class="fas fa-trash-alt"></i> <span class="btn-text-desktop">Удалить</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p v-else class="empty-state">
          <i class="fas fa-info-circle"></i> В меню пока нет позиций. Начните с добавления новой!
        </p>
      </section>

      
      <section class="info-block-section content-section bg-alt-section-admin"> 
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
// ... (весь <script setup> остается таким же, как в твоем коде)
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
  name: '', category: '', price: 0.00, description: '', isVegetarian: false,
});

const currentItem = reactive(defaultMenuItemForm());

const reindexMenuItemIds = () => { menuItems.value.forEach((item, index) => { item.id = index + 1; }); };
const getNextMenuItemId = () => (menuItems.value.length === 0 ? 1 : menuItems.value.length + 1);

const openAddModal = () => { isEditing.value = false; Object.assign(currentItem, defaultMenuItemForm()); currentItem.category = ''; showModal.value = true; };
const openEditModal = (itemToEdit) => { isEditing.value = true; Object.assign(currentItem, { ...itemToEdit }); showModal.value = true; };
const closeModal = () => { showModal.value = false; };

const saveMenuItem = () => {
  if (!currentItem.name || !currentItem.category || currentItem.price < 0) {
    alert('Пожалуйста, заполните все обязательные поля (Название, Категория) и убедитесь, что цена не отрицательная.'); return;
  }
  if (isEditing.value) {
    const index = menuItems.value.findIndex(i => i.id === currentItem.id);
    if (index !== -1) menuItems.value[index] = { ...currentItem, id: menuItems.value[index].id };
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
.admin-view { background-color: var(--cream-bg); padding-bottom: 60px; }
.admin-header { background: linear-gradient(135deg, var(--bronze-gold) 0%, var(--soft-gold) 100%); color: white; padding: 50px 30px; text-align: center; box-shadow: 0 5px 20px var(--shadow-medium); margin-bottom: 40px; border-bottom: 4px solid var(--bronze-gold); }
.admin-header-content h1 { font-family: 'Playfair Display', serif; font-size: clamp(2.2rem, 5.5vw, 3.2rem); margin: 0 0 15px 0; color: white; text-shadow: 2px 2px 5px rgba(0,0,0,0.35); }
.admin-header-content p { font-size: 1.15rem; margin: 0; opacity: 0.95; font-weight: 300; }
.admin-main-content { width: 100%; max-width: 1280px; margin: 0 auto; padding: 0 30px; box-sizing: border-box; }
.content-section { padding: 30px 0; margin-bottom: 30px; }
.bg-alt-section-admin { background-color: var(--card-bg); padding: 35px; border-radius: 12px; box-shadow: 0 10px 30px var(--shadow-light); }
.admin-main-content > .bg-alt-section-admin { margin-left: -30px; margin-right: -30px; padding-left: 30px; padding-right: 30px; }
.section-title-admin { font-family: 'Playfair Display', serif; font-size: clamp(1.7rem, 3.5vw, 2.2rem); color: var(--bronze-gold); text-align: center; margin-bottom: 30px; padding-bottom: 15px; position: relative; }
.section-title-admin::after { content: ''; display: block; width: 65px; height: 3px; background-color: var(--soft-gold); margin: 15px auto 0; border-radius: 2px; box-shadow: 0 1px 3px var(--shadow-light); }
.controls-section { text-align: center; margin-bottom: 30px; }
.btn-lg-admin { padding: 14px 30px; font-size: 1.1rem; box-shadow: 0 4px 12px var(--shadow-medium); font-family: 'Lato', sans-serif; }
.controls-section .btn i { margin-right: 10px; }

.table-container {
  width: 100%;
  margin-bottom: 25px;
}

.stylish-table {
  width: 100%;
  border-collapse: collapse;
  background-color: var(--card-bg);
  box-shadow: 0 8px 25px var(--shadow-light);
  border-radius: 10px;
  overflow: hidden;
}
.stylish-table th,
.stylish-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #f0ebe3;
  vertical-align: middle;
  font-size: 0.9em;
}
.stylish-table th {
  background-color: #f9f6f2;
  font-weight: 600;
  color: var(--bronze-gold);
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.75px;
  white-space: nowrap;
}
.stylish-table th.actions-header,
.stylish-table th.text-right { text-align: right; }
.stylish-table tbody tr:last-child td { border-bottom: none; }
.stylish-table tbody tr:hover { background-color: #fdfaf6; }
.text-center { text-align: center !important; }
.text-right { text-align: right !important; }

.item-name { font-weight: 600; color: var(--dark-text); }
.item-price { font-weight: 500; white-space: nowrap; }
.item-description {
    font-size: 0.85em;
    color: #555;
    white-space: normal; 
    word-break: break-word;
    min-width: 200px; 
}
.category-badge {
    background-color: var(--soft-gold);
    color: var(--dark-text);
    padding: 5px 12px; 
    border-radius: 15px; 
    font-size: 0.75em; 
    font-weight: 600;
    display: inline-block;
    box-shadow: 0 1px 3px var(--shadow-light);
}

.actions-cell { text-align: right; white-space: nowrap; }
.actions-cell .btn { margin-left: 8px; padding: 6px 10px; font-size: 0.8rem; }
.actions-cell .btn i { margin-right: 5px; }
.btn-text-desktop { /* Скрывается на мобильных */ }

.empty-state { 
.info-block-section { 
.bg-alt-section { 
.info-cards-grid { 
.info-card {
.info-icon {
.modal-overlay, .modal-content, .modal-title, .form-row, .form-group, .form-actions {
.empty-state { color: #666; font-style: normal; text-align: center; margin-top: 30px; padding: 30px; background-color: var(--card-bg); border-radius: 10px; box-shadow: 0 6px 20px var(--shadow-light); font-size: 1.05em; border: 1px dashed var(--soft-gold); }
.empty-state i { margin-right: 12px; color: var(--bronze-gold); font-size: 1.2em; }
.info-block-section { padding-top: 30px; }
.info-cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; margin-top: 20px; }
.info-card { background-color: var(--card-bg); padding: 25px; border-radius: 10px; box-shadow: 0 7px 22px var(--shadow-light); text-align: left; border-top: 4px solid var(--bronze-gold); transition: transform 0.3s ease, box-shadow 0.3s ease; }
.info-card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px var(--shadow-medium); }
.info-icon { font-size: 2rem; color: var(--bronze-gold); margin-bottom: 18px; display: block; }
.info-card h3 { font-size: 1.3rem; margin-bottom: 12px; color: var(--bronze-gold); }
.info-card p { font-size: 0.9rem; line-height: 1.65; color: var(--dark-text); }
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(30, 20, 10, 0.7); display: flex; justify-content: center; align-items: center; z-index: 1050; }
.modal-content { background-color: var(--card-bg); padding: 30px 35px; border-radius: 10px; box-shadow: 0 10px 40px rgba(0,0,0,0.25); width: 90%; max-width: 600px; }
.modal-title { font-family: 'Playfair Display', serif; font-size: 1.7rem; margin-top: 0; margin-bottom: 25px; color: var(--bronze-gold); text-align: center; padding-bottom: 15px; border-bottom: 1px solid #e0dacd; }
.form-row { display: flex; gap: 20px; margin-bottom: 18px; }
.form-group.column { flex: 1; margin-bottom: 0; }
.form-group { margin-bottom: 18px; }
.form-group label { display: block; margin-bottom: 7px; font-weight: 600; font-size: 0.9rem; color: var(--dark-text); }
.form-group input[type="text"], .form-group input[type="number"], .form-group select, .form-group textarea { width: 100%; padding: 10px 14px; border: 1px solid #d0c9bf; border-radius: 5px; box-sizing: border-box; font-family: 'Lato', sans-serif; font-size: 0.95em; transition: border-color 0.2s ease, box-shadow 0.2s ease; background-color: #fff; }
.form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: var(--soft-gold); box-shadow: 0 0 0 2px rgba(184, 134, 11, 0.2); outline: none; }
.form-group textarea { min-height: 100px; }
.checkbox-group { display: flex; align-items: center; }
.checkbox-group input[type="checkbox"] { margin-right: 10px; width: auto; height: 1.1em; accent-color: var(--bronze-gold); }
.checkbox-group label { margin-bottom: 0; font-weight: normal; }
.form-actions { margin-top: 25px; text-align: right; }
.form-actions .btn { margin-left: 10px; padding: 9px 22px; }


/* Адаптивная таблица: превращение в "карточки" на мобильных */
@media (max-width: 768px) {
  .stylish-table.responsive-table thead {
    display: none;
  }
  .stylish-table.responsive-table, 
  .stylish-table.responsive-table tbody, 
  .stylish-table.responsive-table tr, 
  .stylish-table.responsive-table td {
    display: block;
    width: 100% !important;
    box-sizing: border-box;
  }
  .stylish-table.responsive-table tr {
    margin-bottom: 15px;
    border-radius: 8px;
    box-shadow: 0 4px 10px var(--shadow-light);
    overflow: hidden;
    border: 1px solid #e0dacd;
    background-color: var(--card-bg);
  }
  .stylish-table.responsive-table td {
    text-align: right;
    padding-left: 45%;
    position: relative;
    border-bottom: 1px dotted #eee;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .stylish-table.responsive-table td:last-child {
    border-bottom: none;
  }
  .stylish-table.responsive-table td::before {
    content: attr(data-label);
    position: absolute;
    left: 10px;
    width: calc(45% - 20px);
    padding-right: 10px;
    font-weight: 600;
    text-align: left;
    white-space: nowrap;
    color: var(--bronze-gold);
    font-size: 0.8em;
  }
  .stylish-table.responsive-table td.text-center, 
  .stylish-table.responsive-table td.text-right {
      text-align: right;
  }
  .actions-cell { /* Для мобильной версии таблицы */
    text-align: center;
    padding-top: 15px;
  }
  .actions-cell .btn {
    display: inline-block;
    margin: 5px;
    width: auto;
  }
  .btn-text-desktop {
    display: none;
  }
   .item-description { /* На мобильных описание занимает всю ширину "поля" */
      min-width: auto;
      text-align: left;
      padding-left: 10px; 
  }
  .item-description::before {
      width: 100%;
      position: static;
      display: block;
      margin-bottom: 5px;
      text-align: left;
  }
}

/* Общая адаптивность для админки */
@media (max-width: 992px) {
    .admin-main-content { max-width: 100%; padding: 0 20px; }
    .admin-main-content > .bg-alt-section-admin { margin-left: -20px; margin-right: -20px; padding-left: 20px; padding-right: 20px;}
}
@media (max-width: 768px) {
    .admin-header { padding: 30px 15px; margin-bottom: 25px; }
    .admin-header-content h1 { font-size: clamp(1.7rem, 5vw, 2.3rem); }
    .admin-main-content { padding: 0 10px; }
    .admin-main-content > .bg-alt-section-admin { margin-left: -10px; margin-right: -10px; padding-left: 10px; padding-right: 10px;}
    .section-title-admin { font-size: clamp(1.4rem, 4vw, 1.8rem); }
    .info-cards-grid { grid-template-columns: 1fr; }
    .modal-content { padding: 20px; width: calc(100% - 20px); margin: 10px;}
    .modal-title { font-size: 1.3rem; }
    .form-row { flex-direction: column; gap: 0; margin-bottom: 0; }
    .form-group.column { margin-bottom: 18px; }
}
@media (max-width: 480px) {
    .admin-header-content p { font-size: 0.9rem; }
    .btn-lg-admin { padding: 10px 20px; font-size: 0.95rem; }
}
</style>