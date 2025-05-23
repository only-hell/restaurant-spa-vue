<template>
  <div class="tables-view">
    <h1>Управление столиками</h1>

    <div class="controls">
      <button @click="openAddModal" class="btn btn-primary">Добавить столик</button>
    </div>

    <table v-if="tables.length > 0" class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Название</th>
          <th>Мест</th>
          <th>Статус</th>
          <th>Расположение</th>
          <th>Курение</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="table in tables" :key="table.id">
          <td>{{ table.id }}</td>
          <td>{{ table.name }}</td>
          <td>{{ table.capacity }}</td>
          <td>
            <span :class="['status-badge', getStatusClass(table.status)]">
              {{ getStatusText(table.status) }}
            </span>
          </td>
          <td>{{ table.location }}</td>
          <td>{{ table.isSmokingAllowed ? 'Да' : 'Нет' }}</td>
          <td>
            <button @click="openEditModal(table)" class="btn btn-sm btn-warning">Редактировать</button>
            <button @click="deleteTable(table.id)" class="btn btn-sm btn-danger">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else class="empty-state">Столики пока не добавлены.</p>

    <!-- Модальное окно для добавления/редактирования столика -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h2>{{ isEditing ? 'Редактировать столик' : 'Добавить новый столик' }}</h2>
        <form @submit.prevent="saveTable">
          <div class="form-group">
            <label for="tableName">Название столика:</label>
            <input type="text" id="tableName" v-model="currentTable.name" required />
          </div>
          <div class="form-group">
            <label for="tableCapacity">Количество мест:</label>
            <input type="number" id="tableCapacity" v-model.number="currentTable.capacity" min="1" required />
          </div>
          <div class="form-group">
            <label for="tableStatus">Статус:</label>
            <select id="tableStatus" v-model="currentTable.status" required>
              <option value="free">Свободен</option>
              <option value="reserved">Зарезервирован</option>
              <option value="occupied">Занят</option>
            </select>
          </div>
          <div class="form-group">
            <label for="tableLocation">Расположение:</label>
            <input type="text" id="tableLocation" v-model="currentTable.location" />
          </div>
          <div class="form-group">
            <label for="tableSmoking">Разрешено курение:</label>
            <input type="checkbox" id="tableSmoking" v-model="currentTable.isSmokingAllowed" />
          </div>

          <div class="form-actions">
            <button type="button" @click="closeModal" class="btn">Отмена</button>
            <button type="submit" class="btn btn-primary">{{ isEditing ? 'Сохранить изменения' : 'Добавить столик' }}</button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'; // Добавляем reactive

// Реактивная переменная для хранения списка столиков
const tables = ref([
  { id: 1, name: 'Столик у окна №1', capacity: 4, status: 'free', location: 'Основной зал', isSmokingAllowed: false },
  { id: 2, name: 'VIP-кабина "Уют"', capacity: 6, status: 'reserved', location: 'VIP-зона', isSmokingAllowed: false },
  { id: 3, name: 'Столик на веранде №5', capacity: 2, status: 'occupied', location: 'Веранда', isSmokingAllowed: true },
  { id: 4, name: 'Барный стул №12', capacity: 1, status: 'free', location: 'Бар', isSmokingAllowed: true },
]);

// Состояние для модального окна
const showModal = ref(false);
const isEditing = ref(false); // true, если редактируем, false если добавляем
const defaultTableForm = () => ({ // Функция для получения объекта столика по умолчанию
  id: null,
  name: '',
  capacity: 1,
  status: 'free',
  location: '',
  isSmokingAllowed: false,
});
// currentTable будет хранить данные формы. Используем reactive для объекта
const currentTable = reactive(defaultTableForm());


// Функции для отображения статуса
const getStatusText = (status) => {
  const statuses = {
    free: 'Свободен',
    reserved: 'Зарезервирован',
    occupied: 'Занят',
  };
  return statuses[status] || status;
};

const getStatusClass = (status) => {
  return `status-${status}`;
};

// Открыть модальное окно для добавления
const openAddModal = () => {
  isEditing.value = false;
  // Сбрасываем currentTable к значениям по умолчанию
  Object.assign(currentTable, defaultTableForm());
  showModal.value = true;
};

// Открыть модальное окно для редактирования
const openEditModal = (table) => {
  isEditing.value = true;
  // Копируем данные редактируемого столика в currentTable
  // Object.assign(target, source) копирует свойства из source в target
  Object.assign(currentTable, table);
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  // Не обязательно сбрасывать currentTable здесь, т.к. openAddModal/openEditModal это сделают
};

const saveTable = () => {
  if (isEditing.value) {
    // Редактирование существующего столика
    const index = tables.value.findIndex(t => t.id === currentTable.id);
    if (index !== -1) {
      // Важно: создаем новый объект, чтобы Vue точно отследил изменения
      tables.value[index] = { ...currentTable };
    }
  } else {
    // Добавление нового столика
    const newTable = {
      ...currentTable, // Копируем данные из формы
      id: Date.now(), // Генерируем новый ID
    };
    tables.value.push(newTable);
  }
  closeModal();
};

const deleteTable = (tableId) => {
  if (confirm('Вы уверены, что хотите удалить этот столик?')) {
    tables.value = tables.value.filter(t => t.id !== tableId);
  }
};

</script>

<style scoped>
/* ... предыдущие стили ... */
/* Добавляем стили для формы в модальном окне */
.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box; /* Чтобы padding не увеличивал общую ширину */
}

.form-group input[type="checkbox"] {
  margin-right: 5px;
  vertical-align: middle;
}

.form-actions {
  margin-top: 20px;
  text-align: right;
}

.form-actions .btn {
  margin-left: 10px;
}

/* Стили для модального окна */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* Чуть темнее фон */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 25px 30px; /* Немного изменил паддинги */
  border-radius: 8px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.25); /* Чуть выразительнее тень */
  width: 90%;
  max-width: 500px;
}

.modal-content h2 {
  margin-top: 0;
  margin-bottom: 25px; /* Увеличил отступ */
  color: #333;
}
/* ... остальные стили остаются как были ... */
.tables-view {
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

.status-badge {
  padding: 5px 10px;
  border-radius: 15px;
  color: white;
  font-size: 0.9em;
  min-width: 110px; /* Чтобы ширина была примерно одинаковой */
  display: inline-block;
  text-align: center;
}

.status-free {
  background-color: #28a745; /* Зеленый */
}
.status-reserved {
  background-color: #ffc107; /* Желтый */
  color: #333;
}
.status-occupied {
  background-color: #dc3545; /* Красный */
}

.btn {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  margin-right: 5px;
  transition: background-color 0.2s ease;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}
.btn-primary:hover {
  background-color: #0056b3;
}

.btn-warning {
  background-color: #ffc107;
  color: #212529;
}
.btn-warning:hover {
  background-color: #e0a800;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}
.btn-danger:hover {
  background-color: #c82333;
}

.btn-sm {
  padding: 5px 10px;
  font-size: 0.8em;
}

.empty-state {
  color: #777;
  font-style: italic;
  text-align: center;
  margin-top: 30px;
}
</style>