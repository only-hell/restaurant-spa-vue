<template>
  <div class="admin-view tables-view"> 
    <header class="admin-header">
      <div class="admin-header-content">
        <h1>Управление Столиками</h1>
        <p>Обзор, добавление и редактирование столиков вашего ресторана.</p>
      </div>
    </header>

    <div class="admin-main-content"> 
      <section class="controls-section content-section">
        <button @click="openAddModal" class="btn btn-primary btn-lg">
          <i class="fas fa-plus-circle"></i> Добавить новый столик
        </button>
      </section>

      <section class="table-list-section content-section">
        <h2 class="section-title-admin">Список Столиков</h2>
        <table v-if="tables.length > 0" class="table stylish-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Название/Номер</th>
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
              <td class="text-center">{{ table.capacity }}</td>
              <td>
                <span :class="['status-badge', getStatusClass(table.status)]">
                  {{ getStatusText(table.status) }}
                </span>
              </td>
              <td>{{ table.location }}</td>
              <td class="text-center">{{ table.isSmokingAllowed ? 'Да' : 'Нет' }}</td>
              <td class="actions-cell">
                <button @click="openEditModal(table)" class="btn btn-sm btn-action-edit">
                  <i class="fas fa-edit"></i> Редактировать
                </button>
                <button @click="deleteTable(table.id)" class="btn btn-sm btn-action-delete">
                  <i class="fas fa-trash-alt"></i> Удалить
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else class="empty-state">
          <i class="fas fa-info-circle"></i> Столики пока не добавлены. Нажмите "Добавить новый столик", чтобы начать.
        </p>
      </section>

      <section class="info-block-section content-section bg-alt-section">
        <h2 class="section-title-admin">Полезная Информация</h2>
        <div class="info-cards-grid">
          <div class="info-card">
            <i class="fas fa-chart-pie info-icon"></i>
            <h3>Анализ Загруженности</h3>
            <p>Отслеживайте популярность столиков в разные дни и время, чтобы оптимизировать рассадку и работу персонала. Используйте статусы "Занят" и "Зарезервирован" для сбора данных.</p>
          </div>
          <div class="info-card">
            <i class="fas fa-lightbulb info-icon"></i>
            <h3>Советы по Размещению</h3>
            <p>Группируйте столики по зонам (например, "Тихая зона", "У окна", "Для больших компаний"). Это поможет гостям при выборе, а вам – в управлении бронированием.</p>
          </div>
          <div class="info-card">
            <i class="fas fa-sync-alt info-icon"></i>
            <h3>Регулярное Обновление</h3>
            <p>Не забывайте своевременно обновлять статусы столиков, особенно в часы пик. Актуальная информация – ключ к эффективной работе и довольным гостям.</p>
          </div>
        </div>
      </section>
    </div>

    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h2 class="modal-title">{{ isEditing ? 'Редактировать столик' : 'Добавить новый столик' }}</h2>
        <form @submit.prevent="saveTable">
          <div class="form-group">
            <label for="tableName">Название/Номер столика:</label>
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
            <label for="tableLocation">Расположение (зона):</label>
            <input type="text" id="tableLocation" v-model="currentTable.location" placeholder="Например, Основной зал, Веранда" />
          </div>
          <div class="form-group checkbox-group">
            <input type="checkbox" id="tableSmoking" v-model="currentTable.isSmokingAllowed" />
            <label for="tableSmoking">Разрешено курение</label>
          </div>

          <div class="form-actions">
            <button type="button" @click="closeModal" class="btn btn-secondary">Отмена</button>
            <button type="submit" class="btn btn-primary">{{ isEditing ? 'Сохранить' : 'Добавить' }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const tables = ref([
  { id: 1, name: 'Столик у окна №1', capacity: 4, status: 'free', location: 'Основной зал', isSmokingAllowed: false },
  { id: 2, name: 'VIP-кабина "Уют"', capacity: 6, status: 'reserved', location: 'VIP-зона', isSmokingAllowed: false },
  { id: 3, name: 'Столик на веранде №5', capacity: 2, status: 'occupied', location: 'Веранда', isSmokingAllowed: true },
  { id: 4, name: 'Барный стул №12', capacity: 1, status: 'free', location: 'Бар', isSmokingAllowed: true },
]);

const showModal = ref(false);
const isEditing = ref(false);
const defaultTableForm = () => ({
  name: '',
  capacity: 1,
  status: 'free',
  location: '',
  isSmokingAllowed: false,
});
const currentTable = reactive(defaultTableForm());

const getStatusText = (status) => {
  const statuses = { free: 'Свободен', reserved: 'Зарезервирован', occupied: 'Занят' };
  return statuses[status] || status;
};
const getStatusClass = (status) => `status-${status}`;

const reindexTableIds = () => {
  tables.value.forEach((table, index) => { table.id = index + 1; });
};
const getNextId = () => {
  if (tables.value.length === 0) return 1;
  return tables.value.length + 1;
};

const openAddModal = () => {
  isEditing.value = false;
  Object.assign(currentTable, defaultTableForm());
  showModal.value = true;
};
const openEditModal = (tableToEdit) => {
  isEditing.value = true;
  Object.assign(currentTable, { ...tableToEdit });
  showModal.value = true;
};
const closeModal = () => { showModal.value = false; };

const saveTable = () => {
  if (!currentTable.name || currentTable.capacity < 1) {
    alert('Пожалуйста, введите название столика и корректное количество мест.');
    return;
  }
  if (isEditing.value) {
    const index = tables.value.findIndex(t => t.id === currentTable.id);
    if (index !== -1) {
      tables.value[index] = { ...currentTable, id: tables.value[index].id };
    }
  } else {
    tables.value.push({ ...currentTable, id: getNextId() });
  }
  closeModal();
};

const deleteTable = (tableIdToDelete) => {
  if (confirm('Вы уверены, что хотите удалить этот столик?')) {
    tables.value = tables.value.filter(t => t.id !== tableIdToDelete);
    reindexTableIds();
  }
};
</script>

<style scoped>
/* Общие стили для админ-страниц */
.admin-view {
  background-color: var(--cream-bg); /* Основной фон страницы */
}

.admin-header {
  background-color: var(--bronze-gold); /* Акцентный цвет для хедера */
  color: var(--cream-bg); /* Светлый текст */
  padding: 40px 30px;
  text-align: center;
  box-shadow: 0 4px 12px var(--shadow-medium);
  margin-bottom: 40px;
}
.admin-header-content h1 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 5vw, 3rem);
  margin: 0 0 10px 0;
  color: var(--cream-bg); /* Явно светлый */
  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
}
.admin-header-content p {
  font-size: 1.1rem;
  margin: 0;
  opacity: 0.9;
}

.admin-main-content {
  width: 100%;
  max-width: 1200px; /* Чуть шире для админки */
  margin: 0 auto;
  padding: 0 30px;
  box-sizing: border-box;
}

.content-section {
  padding: 40px 0; /* Отступы между секциями */
}

.section-title-admin {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  color: var(--bronze-gold);
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  position: relative;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.05);
}
.section-title-admin::after {
  content: '';
  display: block;
  width: 70px;
  height: 3px;
  background-color: var(--soft-gold);
  margin: 15px auto 0;
  border-radius: 2px;
  box-shadow: 0 1px 2px var(--shadow-light);
}

.controls-section {
  text-align: center; 
  margin-bottom: 30px;
}
.controls-section .btn-lg { /* Если кнопка будет большая */
    padding: 14px 30px;
    font-size: 1.1rem;
}
.controls-section .btn i {
    margin-right: 8px;
}


/* Стилизация таблицы */
.stylish-table {
  width: 100%;
  border-collapse: separate; /* Для использования border-spacing и border-radius на ячейках */
  border-spacing: 0;
  margin-top: 20px;
  box-shadow: 0 8px 25px var(--shadow-light);
  border-radius: 10px; /* Скругление всей таблицы */
  overflow: hidden; /* Чтобы скругление работало для a:first-child/last-child */
  background-color: var(--card-bg); /* Фон таблицы */
}
.stylish-table th,
.stylish-table td {
  padding: 15px 18px; /* Увеличил паддинги */
  text-align: left;
  border-bottom: 1px solid #e8e3da; /* Светлая граница между строками */
  vertical-align: middle;
}
.stylish-table th {
  background-color: #f8f5f0; /* Чуть темнее основного фона для заголовков */
  font-weight: 600; /* Жирнее заголовки */
  color: var(--bronze-gold);
  font-family: 'Lato', sans-serif;
  text-transform: uppercase;
  font-size: 0.9em;
  letter-spacing: 0.5px;
}
.stylish-table tbody tr:last-child td {
  border-bottom: none; /* Убираем границу у последней строки */
}
.stylish-table tbody tr:hover {
  background-color: #fdfaf6; /* Легкая подсветка строки при наведении */
}
.text-center {
  text-align: center;
}
.status-badge {
  padding: 6px 12px;
  border-radius: 15px;
  color: white;
  font-size: 0.85em;
  font-weight: 500;
  min-width: 100px;
  display: inline-block;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
.status-free { background-color: #28a745; }
.status-reserved { background-color: #ffc107; color: #333; }
.status-occupied { background-color: #dc3545; }

.actions-cell {
  text-align: right; /* Кнопки действий справа */
  white-space: nowrap; /* Чтобы кнопки не переносились */
}
.actions-cell .btn {
  margin-left: 8px;
}
.btn-action-edit {
  background-color: var(--soft-gold);
  color: var(--dark-text);
  border-color: var(--soft-gold);
}
.btn-action-edit:hover {
  background-color: #b8946e;
  border-color: #b8946e;
  color: white;
}
.btn-action-delete {
  background-color: #e74c3c; /* Более мягкий красный */
  color: white;
  border-color: #e74c3c;
}
.btn-action-delete:hover {
  background-color: #c0392b;
  border-color: #c0392b;
}
.actions-cell .btn i {
    margin-right: 5px;
}


.empty-state {
  color: #777;
  font-style: italic;
  text-align: center;
  margin-top: 40px;
  padding: 30px;
  background-color: var(--card-bg);
  border-radius: 8px;
  box-shadow: 0 5px 15px var(--shadow-light);
  font-size: 1.1em;
}
.empty-state i {
    margin-right: 10px;
    color: var(--soft-gold);
}

/* Информационные карточки */
.info-block-section {
    padding-top: 60px; /* Отступ сверху для этой секции */
}
.info-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin-top: 20px;
}
.info-card {
  background-color: var(--card-bg);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 8px 25px var(--shadow-light);
  text-align: left;
  border-top: 4px solid var(--bronze-gold); /* Акцент сверху */
}
.info-icon {
  font-size: 2.2rem;
  color: var(--bronze-gold);
  margin-bottom: 15px;
  display: block; /* Для отступа снизу */
}
.info-card h3 {
  font-size: 1.4rem;
  margin-bottom: 10px;
  color: var(--bronze-gold);
}
.info-card p {
  font-size: 0.95em;
  line-height: 1.6;
  color: var(--dark-text);
}


/* Стили для модального окна */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65); /* Чуть темнее фон */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050; /* Выше навбара */
}
.modal-content {
  background-color: var(--card-bg);
  padding: 35px 40px; /* Больше паддинги */
  border-radius: 12px; /* Больше скругление */
  box-shadow: 0 10px 40px var(--shadow-medium);
  width: 90%;
  max-width: 550px; /* Чуть шире */
}
.modal-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem; /* Крупнее заголовок модалки */
  margin-top: 0;
  margin-bottom: 30px;
  color: var(--bronze-gold);
  text-align: center;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}
.form-group {
  margin-bottom: 20px; /* Больше отступ между полями */
}
.form-group label {
  display: block;
  margin-bottom: 8px; /* Больше отступ у лейбла */
  font-weight: 600;
  font-size: 0.95em;
  color: var(--dark-text);
}
.form-group input[type="text"],
.form-group input[type="number"],
.form-group select {
  width: 100%;
  padding: 12px 15px; /* Комфортнее паддинги */
  border: 1px solid #ccc;
  border-radius: 6px; /* Скругление полей */
  box-sizing: border-box;
  font-family: 'Lato', sans-serif;
  font-size: 1em;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.form-group input:focus, .form-group select:focus {
    border-color: var(--soft-gold);
    box-shadow: 0 0 0 3px rgba(197, 164, 126, 0.25); /* Подсветка при фокусе */
    outline: none;
}
.checkbox-group {
  display: flex;
  align-items: center;
}
.checkbox-group input[type="checkbox"] {
  margin-right: 10px;
  width: auto; /* Чтобы чекбокс не растягивался */
  height: 1.1em; /* Для лучшего вида */
  accent-color: var(--bronze-gold); /* Цвет самого чекбокса */
}
.checkbox-group label {
    margin-bottom: 0; /* Убираем отступ у лейбла чекбокса */
    font-weight: normal;
}
.form-actions {
  margin-top: 30px;
  text-align: right;
}
.form-actions .btn {
  margin-left: 10px;
  padding: 10px 25px; /* Кнопки в модалке побольше */
}
.form-actions .btn-secondary {
  /* Стили из App.vue */
}
.form-actions .btn-primary {
  /* Стили из App.vue */
}

/* Адаптивность для админ-страниц */
@media (max-width: 768px) {
    .admin-header { padding: 30px 20px; margin-bottom: 30px; }
    .admin-header-content h1 { font-size: clamp(1.8rem, 4.5vw, 2.5rem); }
    .admin-header-content p { font-size: 1rem; }
    .admin-main-content { padding: 0 20px; }
    .section-title-admin { font-size: clamp(1.6rem, 4vw, 2rem); margin-bottom: 25px; }

    .stylish-table th, .stylish-table td { padding: 10px 12px; font-size: 0.9em; }
    .status-badge { min-width: 90px; font-size: 0.8em; padding: 5px 10px;}
    .actions-cell { text-align: center; }
    .actions-cell .btn { display: block; width: 100%; margin: 5px 0; }

    .info-cards-grid { grid-template-columns: 1fr; } /* Карточки информации в одну колонку */
    .modal-content { padding: 25px; }
    .modal-title { font-size: 1.5rem; margin-bottom: 20px; }
}

@media (max-width: 480px) {
    .admin-main-content { padding: 0 15px; }
    .stylish-table { font-size: 0.85em; } /* Весь текст в таблице мельче */
    .stylish-table th, .stylish-table td { padding: 8px 10px; }
}

</style>