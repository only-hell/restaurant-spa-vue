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
        <button @click="openAddModal" class="btn btn-primary btn-lg-admin">
          <i class="fas fa-plus-circle"></i> Добавить новый столик
        </button>
      </section>

      <section class="table-list-section content-section">
        <h2 class="section-title-admin">Список Столиков</h2>
        
        <div v-if="tables.length > 0" class="table-container"> 
          <table class="table stylish-table responsive-table"> 
            <thead>
              <tr>
                <th>ID</th>
                <th>Название/Номер</th>
                <th class="text-center">Мест</th>
                <th>Статус</th>
                <th>Расположение</th>
                <th class="text-center">Курение</th>
                <th class="actions-header text-right">Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="table in tables" :key="table.id">
                <td data-label="ID">{{ table.id }}</td>
                <td data-label="Название/Номер">{{ table.name }}</td>
                <td data-label="Мест" class="text-center">{{ table.capacity }}</td>
                <td data-label="Статус">
                  <span :class="['status-badge', getStatusClass(table.status)]">
                    {{ getStatusText(table.status) }}
                  </span>
                </td>
                <td data-label="Расположение">{{ table.location }}</td>
                <td data-label="Курение" class="text-center">{{ table.isSmokingAllowed ? 'Да' : 'Нет' }}</td>
                <td data-label="Действия" class="actions-cell">
                  <button @click="openEditModal(table)" class="btn btn-sm btn-action-edit">
                    <i class="fas fa-edit"></i> <span class="btn-text-desktop">Редактировать</span>
                  </button>
                  <button @click="deleteTable(table.id)" class="btn btn-sm btn-action-delete">
                    <i class="fas fa-trash-alt"></i> <span class="btn-text-desktop">Удалить</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p v-else class="empty-state">
          <i class="fas fa-info-circle"></i> Столики пока не добавлены. Нажмите "Добавить новый столик", чтобы начать.
        </p>
      </section>

     
      <section class="info-block-section content-section bg-alt-section-admin">
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
// ... (весь <script setup> остается таким же, как в твоем коде)
import { ref, reactive } from 'vue';

const tables = ref([
  { id: 1, name: 'Столик у окна №1', capacity: 4, status: 'free', location: 'Основной зал', isSmokingAllowed: false },
  { id: 2, name: 'VIP-кабина "Уют"', capacity: 6, status: 'reserved', location: 'VIP-зона', isSmokingAllowed: false },
  { id: 3, name: 'Столик на веранде №5', capacity: 2, status: 'occupied', location: 'Веранда', isSmokingAllowed: true },
  { id: 4, name: 'Барный стул №12 с очень очень очень длинным названием чтобы проверить перенос', capacity: 1, status: 'free', location: 'Бар у центрального входа и рядом с панорамным окном', isSmokingAllowed: true },
]);

const showModal = ref(false);
const isEditing = ref(false);
const defaultTableForm = () => ({
  name: '', capacity: 1, status: 'free', location: '', isSmokingAllowed: false,
});
const currentTable = reactive(defaultTableForm());

const getStatusText = (status) => ({ free: 'Свободен', reserved: 'Зарезервирован', occupied: 'Занят' }[status] || status);
const getStatusClass = (status) => `status-${status}`;
const reindexTableIds = () => tables.value.forEach((table, index) => { table.id = index + 1; });
const getNextId = () => (tables.value.length === 0 ? 1 : tables.value.length + 1);

const openAddModal = () => { isEditing.value = false; Object.assign(currentTable, defaultTableForm()); showModal.value = true; };
const openEditModal = (tableToEdit) => { isEditing.value = true; Object.assign(currentTable, { ...tableToEdit }); showModal.value = true; };
const closeModal = () => { showModal.value = false; };

const saveTable = () => {
  if (!currentTable.name || currentTable.capacity < 1) { alert('Пожалуйста, введите название столика и корректное количество мест.'); return; }
  if (isEditing.value) {
    const index = tables.value.findIndex(t => t.id === currentTable.id);
    if (index !== -1) tables.value[index] = { ...currentTable, id: tables.value[index].id };
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

/* Общие стили админки (идентичны ReservationsView) */
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
.stylish-table th.text-right {
    text-align: right;
}

.stylish-table tbody tr:last-child td {
  border-bottom: none;
}
.stylish-table tbody tr:hover {
  background-color: #fdfaf6;
}
.text-center { text-align: center !important; }

.status-badge {
  padding: 6px 12px; border-radius: 18px; color: white; font-size: 0.75rem;
  font-weight: 600; min-width: 95px; display: inline-block; text-align: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.15);
}
.status-free { background-color: #27ae60; }
.status-reserved { background-color: #f39c12; color: #fff; }
.status-occupied { background-color: #c0392b; }

.actions-cell { 
  text-align: right;
  white-space: nowrap;
}
.actions-cell .btn {
  margin-left: 8px; padding: 6px 10px; font-size: 0.8rem;
  box-shadow: 0 1px 3px var(--shadow-light);
}
.actions-cell .btn i { margin-right: 5px; }
.btn-text-desktop { /* Текст для кнопок, скрываемый на мобильных */ }


/* Адаптивная таблица: превращение в "карточки" на мобильных */
@media (max-width: 768px) {
  .stylish-table thead {
    display: none;
  }
  .stylish-table, .stylish-table tbody, .stylish-table tr, .stylish-table td {
    display: block;
    width: 100% !important;
    box-sizing: border-box;
  }
  .stylish-table tr {
    margin-bottom: 15px;
    border-radius: 8px;
    box-shadow: 0 4px 10px var(--shadow-light);
    overflow: hidden;
    border: 1px solid #e0dacd;
    background-color: var(--card-bg); /* Фон для каждой карточки */
  }
  .stylish-table td {
    text-align: right;
    padding-left: 45%;
    position: relative;
    border-bottom: 1px dotted #eee;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .stylish-table td:last-child {
    border-bottom: none;
  }
  .stylish-table td::before {
    content: attr(data-label);
    position: absolute;
    left: 10px;
    width: calc(45% - 20px); /* Ширина для заголовка */
    padding-right: 10px;
    font-weight: 600;
    text-align: left;
    white-space: nowrap;
    color: var(--bronze-gold);
    font-size: 0.8em;
  }
  .stylish-table td.text-center, .stylish-table td.text-right {
      text-align: right;
  }
  .actions-cell {
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
}

/* ... (остальные стили для empty-state, info-block, modal и их адаптивности как в ReservationsView) ... */
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
.modal-content { background-color: var(--card-bg); padding: 30px 35px; border-radius: 10px; box-shadow: 0 10px 40px rgba(0,0,0,0.25); width: 90%; max-width: 520px; }
.modal-title { font-family: 'Playfair Display', serif; font-size: 1.7rem; margin-top: 0; margin-bottom: 25px; color: var(--bronze-gold); text-align: center; padding-bottom: 15px; border-bottom: 1px solid #e0dacd; }
.form-group { margin-bottom: 18px; }
.form-group label { display: block; margin-bottom: 7px; font-weight: 600; font-size: 0.9rem; color: var(--dark-text); }
.form-group input[type="text"], .form-group input[type="number"], .form-group select { width: 100%; padding: 10px 14px; border: 1px solid #d0c9bf; border-radius: 5px; box-sizing: border-box; font-family: 'Lato', sans-serif; font-size: 0.95em; transition: border-color 0.2s ease, box-shadow 0.2s ease; background-color: #fff; }
.form-group input:focus, .form-group select:focus { border-color: var(--soft-gold); box-shadow: 0 0 0 2px rgba(184, 134, 11, 0.2); outline: none; }
.checkbox-group { display: flex; align-items: center; }
.checkbox-group input[type="checkbox"] { margin-right: 10px; width: auto; height: 1.1em; accent-color: var(--bronze-gold); }
.checkbox-group label { margin-bottom: 0; font-weight: normal; }
.form-actions { margin-top: 25px; text-align: right; }
.form-actions .btn { margin-left: 10px; padding: 9px 22px; }

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
}
@media (max-width: 480px) {
    .admin-header-content p { font-size: 0.9rem; }
    .btn-lg-admin { padding: 10px 20px; font-size: 0.95rem; }
}
</style>