<template>
  <div class="admin-view reservations-view">
    <header class="admin-header">
      <div class="admin-header-content">
        <h1>Управление Бронированиями</h1>
        <p>Просмотр, создание и редактирование всех активных и будущих бронирований.</p>
      </div>
    </header>

    <div class="admin-main-content">
      <section class="controls-section content-section">
        <button @click="openAddModal" class="btn btn-primary btn-lg-admin">
          <i class="fas fa-calendar-plus"></i> Добавить новое бронирование
        </button>
      </section>

      <section class="table-list-section content-section">
        <h2 class="section-title-admin">Список Бронирований</h2>
        
        <!-- Обертка для таблицы НЕ нужна для этого подхода адаптивности -->
        <div v-if="reservations.length > 0" class="table-container"> 
          <table class="table stylish-table responsive-table"> 
            <thead>
              <tr>
                <th>ID</th>
                <th class="text-center">ID Столика</th>
                <th>Имя гостя</th>
                <th>Телефон</th>
                <th>Время брони</th>
                <th class="text-center">Гостей</th>
                <th>Пожелания</th>
                <th class="actions-header text-right">Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="reservation in reservations" :key="reservation.id">
                <td data-label="ID">{{ reservation.id }}</td>
                <td data-label="ID Столика" class="text-center">{{ reservation.tableId }}</td>
                <td data-label="Имя гостя">{{ reservation.guestName }}</td>
                <td data-label="Телефон">{{ reservation.guestPhone }}</td>
                <td data-label="Время брони">{{ formatBookingTime(reservation.bookingTime) }}</td>
                <td data-label="Гостей" class="text-center">{{ reservation.numberOfGuests }}</td>
                <td data-label="Пожелания" class="special-requests-cell">{{ reservation.specialRequests || '-' }}</td>
                <td data-label="Действия" class="actions-cell">
                  <button @click="openEditModal(reservation)" class="btn btn-sm btn-action-edit">
                    <i class="fas fa-edit"></i> <span class="btn-text-desktop">Редактировать</span>
                  </button>
                  <button @click="deleteReservation(reservation.id)" class="btn btn-sm btn-action-delete">
                    <i class="fas fa-trash-alt"></i> <span class="btn-text-desktop">Удалить</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p v-else class="empty-state">
          <i class="fas fa-info-circle"></i> Активных бронирований пока нет.
        </p>
      </section>

      
      <section class="info-block-section content-section bg-alt-section-admin">
        <h2 class="section-title-admin">Эффективное Управление Бронями</h2>
        <div class="info-cards-grid">
          <div class="info-card">
            <i class="fas fa-phone-volume info-icon"></i>
            <h3>Подтверждение Брони</h3>
            <p>Рекомендуется связываться с гостем за день до визита для подтверждения бронирования. Это снижает количество неявок и помогает лучше планировать загрузку.</p>
          </div>
          <div class="info-card">
            <i class="fas fa-user-clock info-icon"></i>
            <h3>Время Ожидания</h3>
            <p>Четко определите время, в течение которого столик удерживается для гостя в случае опоздания (например, 15-20 минут), и информируйте об этом при бронировании.</p>
          </div>
          <div class="info-card">
            <i class="fas fa-comments info-icon"></i>
            <h3>Особые Пожелания</h3>
            <p>Всегда внимательно относитесь к специальным запросам гостей (аллергии, предпочтения по месту, праздничные атрибуты). Это повышает лояльность.</p>
          </div>
        </div>
      </section>
    </div>

    
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h2 class="modal-title">{{ isEditing ? 'Редактировать бронирование' : 'Новое бронирование' }}</h2>
        <form @submit.prevent="saveReservation">
          <div class="form-row">
            <div class="form-group column">
              <label for="resTableId">Столик:</label>
              <select id="resTableId" v-model.number="currentReservation.tableId" required>
                <option :value="null" disabled>-- Выберите столик --</option>
                <option v-for="table in availableTables" :key="table.id" :value="table.id">
                  {{ table.name }} (Мест: {{table.capacity}}, ID: {{ table.id }})
                </option>
              </select>
            </div>
            <div class="form-group column">
              <label for="resNumberOfGuests">Количество гостей:</label>
              <input type="number" id="resNumberOfGuests" v-model.number="currentReservation.numberOfGuests" min="1" required />
            </div>
          </div>
          <div class="form-group">
            <label for="resGuestName">Имя гостя:</label>
            <input type="text" id="resGuestName" v-model="currentReservation.guestName" required />
          </div>
          <div class="form-group">
            <label for="resGuestPhone">Телефон гостя:</label>
            <input type="tel" id="resGuestPhone" v-model="currentReservation.guestPhone" placeholder="+7 (___) ___-__-__" required />
          </div>
          <div class="form-group">
            <label for="resBookingTime">Дата и время бронирования:</label>
            <input type="datetime-local" id="resBookingTime" v-model="currentReservation.bookingTime" required />
          </div>
          <div class="form-group">
            <label for="resSpecialRequests">Особые пожелания (необязательно):</label>
            <textarea id="resSpecialRequests" v-model="currentReservation.specialRequests" rows="3" placeholder="Например, аллергии, предпочтения по месту..."></textarea>
          </div>
          <div class="form-actions">
            <button type="button" @click="closeModal" class="btn btn-secondary">Отмена</button>
            <button type="submit" class="btn btn-primary">{{ isEditing ? 'Сохранить изменения' : 'Создать бронь' }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
// ... (весь <script setup> остается таким же)
import { ref, reactive } from 'vue';

const availableTables = ref([
  { id: 1, name: 'Столик у окна №1', capacity: 4 },
  { id: 2, name: 'VIP-кабина "Уют"', capacity: 6 },
  { id: 3, name: 'Столик на веранде №5', capacity: 2 },
  { id: 4, name: 'Барный стул №12', capacity: 1 },
]);

const reservations = ref([
  { id: 1, tableId: 2, guestName: 'Иван Петров', guestPhone: '+79001234567', bookingTime: '2024-08-15T19:00', numberOfGuests: 2, specialRequests: 'У окна, если возможно, пожалуйста. Будем отмечать годовщину, хотелось бы что-то особенное.' },
  { id: 2, tableId: 1, guestName: 'Анна Сидорова', guestPhone: '+79017654321', bookingTime: '2024-08-16T20:30', numberOfGuests: 4, specialRequests: '' },
]);

const showModal = ref(false);
const isEditing = ref(false);

const defaultReservationForm = () => {
  const now = new Date();
  now.setHours(now.getHours() + 2);
  now.setMinutes(Math.ceil(now.getMinutes() / 15) * 15);
  now.setSeconds(0);
  now.setMilliseconds(0);
  return {
    tableId: availableTables.value.length > 0 ? null : null,
    guestName: '',
    guestPhone: '',
    bookingTime: now.toISOString().substring(0, 16),
    numberOfGuests: 2,
    specialRequests: '',
  };
};

const currentReservation = reactive(defaultReservationForm());

const reindexReservationIds = () => reservations.value.forEach((r, index) => { r.id = index + 1; });
const getNextReservationId = () => (reservations.value.length === 0 ? 1 : reservations.value.length + 1);

const formatBookingTime = (dateTimeString) => {
  if (!dateTimeString) return '-';
  try {
    const date = new Date(dateTimeString);
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  } catch (e) { return dateTimeString; }
};

const openAddModal = () => { isEditing.value = false; Object.assign(currentReservation, defaultReservationForm()); showModal.value = true; };
const openEditModal = (resToEdit) => { isEditing.value = true; Object.assign(currentReservation, { ...resToEdit }); showModal.value = true; };
const closeModal = () => { showModal.value = false; };

const saveReservation = () => {
  if (!currentReservation.tableId || !currentReservation.guestName || !currentReservation.guestPhone || !currentReservation.bookingTime) {
    alert('Пожалуйста, заполните все обязательные поля: Столик, Имя гостя, Телефон, Время.');
    return;
  }
  const selectedTable = availableTables.value.find(t => t.id === currentReservation.tableId);
  if (selectedTable && currentReservation.numberOfGuests > selectedTable.capacity) {
    alert(`Количество гостей (${currentReservation.numberOfGuests}) превышает вместимость столика "${selectedTable.name}" (${selectedTable.capacity} мест).`);
    return;
  }
  if (new Date(currentReservation.bookingTime) < new Date()) {
    alert('Нельзя создать бронирование на прошедшее время.');
    return;
  }

  if (isEditing.value) {
    const index = reservations.value.findIndex(r => r.id === currentReservation.id);
    if (index !== -1) reservations.value[index] = { ...currentReservation, id: reservations.value[index].id };
  } else {
    reservations.value.push({ ...currentReservation, id: getNextReservationId() });
  }
  closeModal();
};

const deleteReservation = (resIdToDelete) => {
  if (confirm('Вы уверены, что хотите отменить это бронирование?')) {
    reservations.value = reservations.value.filter(r => r.id !== resIdToDelete);
    reindexReservationIds();
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
  overflow: hidden; /* Для скругления углов */
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
  white-space: nowrap; /* Заголовки не переносим */
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

.special-requests-cell {
    white-space: normal; 
    word-break: break-word;
    font-size: 0.85em;
    color: #555;
    min-width: 180px; 
}
.actions-cell {
  text-align: right;
  white-space: nowrap; /* Кнопки в одну строку */
}
.actions-cell .btn {
  margin-left: 8px;
  padding: 6px 10px;
  font-size: 0.8rem;
}
.actions-cell .btn i { margin-right: 5px; }
.btn-text-desktop { /* Текст для кнопок, который будет виден на десктопе */
}


/* Адаптивная таблица: превращение в "карточки" на мобильных */
@media (max-width: 768px) {
  .stylish-table thead {
    display: none; /* Скрываем заголовки таблицы */
  }
  .stylish-table, .stylish-table tbody, .stylish-table tr, .stylish-table td {
    display: block; /* Каждая ячейка становится блоком */
    width: 100% !important; /* Занимает всю ширину */
    box-sizing: border-box;
  }
  .stylish-table tr {
    margin-bottom: 15px; /* Отступ между "карточками" */
    border-radius: 8px;
    box-shadow: 0 4px 10px var(--shadow-light);
    overflow: hidden;
    border: 1px solid #e0dacd;
  }
  .stylish-table td {
    text-align: right;
    padding-left: 50%; 
    position: relative;
    border-bottom: 1px dotted #eee; /* Разделитель между "полями" карточки */
  }
  .stylish-table td:last-child {
    border-bottom: none;
  }
  .stylish-table td::before {
    content: attr(data-label); 
    position: absolute;
    left: 10px;
    width: calc(50% - 20px); 
    padding-right: 10px;
    font-weight: 600;
    text-align: left;
    white-space: nowrap; /* Заголовки не переносим */
    color: var(--bronze-gold);
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
  .special-requests-cell { 
      min-width: auto; 
      text-align: left; 
      padding-left: 10px; 
  }
  .special-requests-cell::before {
      width: 100%; 
      position: static; 
      display: block;
      margin-bottom: 5px;
      text-align: left;
  }
}


.empty-state {
  color: #666; font-style: normal; text-align: center; margin-top: 30px;
  padding: 30px; background-color: var(--card-bg); border-radius: 10px;
  box-shadow: 0 6px 20px var(--shadow-light); font-size: 1.05em;
  border: 1px dashed var(--soft-gold);
}
.empty-state i { margin-right: 12px; color: var(--bronze-gold); font-size: 1.2em; }
.info-block-section { padding-top: 30px; }
.info-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px; margin-top: 20px;
}
.info-card {
  background-color: var(--card-bg); padding: 25px; border-radius: 10px;
  box-shadow: 0 7px 22px var(--shadow-light); text-align: left;
  border-top: 4px solid var(--bronze-gold);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.info-card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px var(--shadow-medium); }
.info-icon { font-size: 2rem; color: var(--bronze-gold); margin-bottom: 18px; display: block; }
.info-card h3 { font-size: 1.3rem; margin-bottom: 12px; color: var(--bronze-gold); }
.info-card p { font-size: 0.9rem; line-height: 1.65; color: var(--dark-text); }
.modal-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background-color: rgba(30, 20, 10, 0.7);
  display: flex; justify-content: center; align-items: center; z-index: 1050;
}
.modal-content {
  background-color: var(--card-bg); padding: 30px 35px; border-radius: 10px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.25);
  width: 90%; max-width: 600px;
}
.modal-title {
  font-family: 'Playfair Display', serif; font-size: 1.7rem;
  margin-top: 0; margin-bottom: 25px; color: var(--bronze-gold);
  text-align: center; padding-bottom: 15px; border-bottom: 1px solid #e0dacd;
}
.form-row { display: flex; gap: 20px; margin-bottom: 18px; }
.form-group.column { flex: 1; margin-bottom: 0; }
.form-group { margin-bottom: 18px; }
.form-group label {
  display: block; margin-bottom: 7px; font-weight: 600;
  font-size: 0.9rem; color: var(--dark-text);
}
.form-group input[type="text"],
.form-group input[type="number"],
.form-group input[type="tel"],
.form-group input[type="datetime-local"],
.form-group select,
.form-group textarea {
  width: 100%; padding: 10px 14px; border: 1px solid #d0c9bf;
  border-radius: 5px; box-sizing: border-box; font-family: 'Lato', sans-serif;
  font-size: 0.95em; transition: border-color 0.2s ease, box-shadow 0.2s ease;
  background-color: #fff;
}
.form-group input:focus, .form-group select:focus, .form-group textarea:focus {
    border-color: var(--soft-gold);
    box-shadow: 0 0 0 2px rgba(184, 134, 11, 0.2);
    outline: none;
}
.form-group textarea { min-height: 70px; }
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

    /* .table-responsive-wrapper удаляем, т.к. таблица сама адаптируется */
    
    .info-cards-grid { grid-template-columns: 1fr; }
    .modal-content { padding: 20px; width: calc(100% - 20px); margin: 10px;}
    .modal-title { font-size: 1.4rem; }
    .form-row { flex-direction: column; gap: 0; margin-bottom: 0; }
    .form-group.column { margin-bottom: 18px; }
}

@media (max-width: 480px) {
    .admin-header-content p { font-size: 0.9rem; }
    .btn-lg-admin { padding: 10px 20px; font-size: 0.95rem; }
}

</style>