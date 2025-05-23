<template>
  <div class="menu-view">
    <h1>Управление меню</h1>

    <div class="controls">
      <button @click="openAddModal" class="btn btn-primary">Добавить позицию</button>
    </div>

    <table v-if="menuItems.length > 0" class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Название</th>
          <th>Категория</th>
          <th>Цена (₽)</th>
          <th>Описание</th>
          <th>Вегетарианское</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in menuItems" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.price.toFixed(2) }}</td>
          <td>{{ item.description || '-' }}</td>
          <td>{{ item.isVegetarian ? 'Да' : 'Нет' }}</td>
          <td>
            <button @click="openEditModal(item)" class="btn btn-sm btn-warning">Редактировать</button>
            <button @click="deleteMenuItem(item.id)" class="btn btn-sm btn-danger">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else class="empty-state">Позиции меню пока не добавлены.</p>

    <!-- Модальное окно для добавления/редактирования позиции меню -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h2>{{ isEditing ? 'Редактировать позицию' : 'Добавить новую позицию' }}</h2>
        <form @submit.prevent="saveMenuItem">
          <div class="form-group">
            <label for="itemName">Название:</label>
            <input type="text" id="itemName" v-model="currentItem.name" required />
          </div>
          <div class="form-group">
            <label for="itemCategory">Категория:</label>
            <select id="itemCategory" v-model="currentItem.category" required>
              <option disabled value="">-- Выберите категорию --</option>
              <option v-for="cat in availableCategories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="itemPrice">Цена (₽):</label>
            <input type="number" id="itemPrice" v-model.number="currentItem.price" min="0" step="0.01" required />
          </div>
          <div class="form-group">
            <label for="itemDescription">Описание:</label>
            <textarea id="itemDescription" v-model="currentItem.description" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label for="itemVegetarian" class="checkbox-label">
              <input type="checkbox" id="itemVegetarian" v-model="currentItem.isVegetarian" />
              Вегетарианское
            </label>
          </div>

          <div class="form-actions">
            <button type="button" @click="closeModal" class="btn">Отмена</button>
            <button type="submit" class="btn btn-primary">{{ isEditing ? 'Сохранить изменения' : 'Добавить' }}</button>
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
  // id будет присвоен при сохранении или редактировании
  name: '',
  category: '',
  price: 0,
  description: '',
  isVegetarian: false,
});

const currentItem = reactive(defaultMenuItemForm()); // Для полей формы

// Функция для переиндексации ID позиций меню
const reindexMenuItemIds = () => {
  menuItems.value.forEach((item, index) => {
    item.id = index + 1;
  });
};

// Обновленная функция getNextMenuItemId
const getNextMenuItemId = () => {
  if (menuItems.value.length === 0) return 1;
  return menuItems.value.length + 1;
};

const openAddModal = () => {
  isEditing.value = false;
  Object.assign(currentItem, defaultMenuItemForm());
  // Устанавливаем категорию по умолчанию или оставляем пустой для выбора
  currentItem.category = ''; // Чтобы в select отображалось "-- Выберите категорию --"
  showModal.value = true;
};

const openEditModal = (itemToEdit) => {
  isEditing.value = true;
  Object.assign(currentItem, { ...itemToEdit });
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

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
    menuItems.value.push({
      ...currentItem,
      id: getNextMenuItemId(),
    });
    // reindexMenuItemIds(); // Обычно не нужно, если getNextId корректен
  }
  closeModal();
};

const deleteMenuItem = (itemIdToDelete) => {
  if (confirm('Вы уверены, что хотите удалить эту позицию из меню?')) {
    menuItems.value = menuItems.value.filter(item => item.id !== itemIdToDelete);
    reindexMenuItemIds(); // Вызываем переиндексацию после удаления
  }
};

</script>

<style scoped>
.menu-view {
  padding: 20px;
}
.controls {
  margin-bottom: 20px;
}
.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.table th, .table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
  vertical-align: top;
}
.table th {
  background-color: #f2f2f2;
  font-weight: bold;
}
.table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}
.table tbody tr:hover {
  background-color: #e9e9e9;
}
.empty-state {
  color: #777;
  font-style: italic;
  text-align: center;
  margin-top: 30px;
}

.btn { padding: 8px 15px; border: none; border-radius: 4px; cursor: pointer; font-size: 0.9em; margin-right: 5px; transition: background-color 0.2s ease; }
.btn-primary { background-color: #007bff; color: white; }
.btn-primary:hover { background-color: #0056b3; }
.btn-warning { background-color: #ffc107; color: #212529; }
.btn-warning:hover { background-color: #e0a800; }
.btn-danger { background-color: #dc3545; color: white; }
.btn-danger:hover { background-color: #c82333; }
.btn-sm { padding: 5px 10px; font-size: 0.8em; }

.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.6); display: flex; justify-content: center; align-items: center; z-index: 1000; }
.modal-content { background-color: white; padding: 25px 30px; border-radius: 8px; box-shadow: 0 5px 20px rgba(0,0,0,0.25); width: 90%; max-width: 550px; }
.modal-content h2 { margin-top: 0; margin-bottom: 25px; color: #333; }
.form-group { margin-bottom: 15px; }
.form-group label { display: block; margin-bottom: 5px; font-weight: bold; }
.form-group input[type="text"],
.form-group input[type="number"],
.form-group select,
.form-group textarea { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
.form-group input[type="checkbox"] {
  margin-right: 8px;
  vertical-align: middle;
}
.checkbox-label {
  display: flex;
  align-items: center;
  font-weight: normal;
}
.form-actions { margin-top: 20px; text-align: right; }
.form-actions .btn { margin-left: 10px; }
</style>