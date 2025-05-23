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
        <button @click="openAddModal" class="btn btn-primary btn-lg">
          <i class="fas fa-calendar-plus"></i> Добавить новое бронирование
        </button>
      </section>

      <section class="table-list-section content-section">
        <h2 class="section-title-admin">Список Бронирований</h2>
        <table v-if="reservations.length > 0" class="table stylish-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>ID Столика</th>
              <th>Имя гостя</th>
              <th>Телефон</th>
              <th>Время</th>
              <th class="text-center">Гостей</th>
              <th>Пожелания</th>
              <th class="text-right">Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="reservation in reservations" :key="reservation.id">
              <td>{{ reservation.id }}</td>
              <td class="text-center">{{ reservation.tableId }}</td>
              <td>{{ reservation.guestName }}</td>
              <td>{{ reservation.guestPhone }}</td>
              <td>{{ formatBookingTime(reservation.bookingTime) }}</td>
              <td class="text-center">{{ reservation.numberOfGuests }}</td>
              <td class="special-requests-cell">{{ reservation.specialRequests || '-' }}</td>
              <td class="actions-cell">
                <button @click="openEditModal(reservation)" class="btn btn-sm btn-action-edit">
                  <i class="fas fa-edit"></i> Редактировать
                </button>
                <button @click="deleteReservation(reservation.id)" class="btn btn-sm btn-action-delete">
                  <i class="fas fa-trash-alt"></i> Удалить
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else class="empty-state">
          <i class="fas fa-info-circle"></i> Активных бронирований пока нет.
        </p>
      </section>

      <section class="info-block-section content-section bg-alt-section">
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
                  {{ table.name }} (ID: {{ table.id }})
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
import { ref, reactive } from 'vue';

const availableTables = ref([
  { id: 1, name: 'Столик у окна №1', capacity: 4 },
  { id: 2, name: 'VIP-кабина "Уют"', capacity: 6 },
  { id: 3, name: 'Столик на веранде №5', capacity: 2 },
  { id: 4, name: 'Барный стул №12', capacity: 1 },
]);

const reservations = ref([
  { id: 1, tableId: 2, guestName: 'Иван Петров', guestPhone: '+79001234567', bookingTime: '2024-07-20T19:00', numberOfGuests: 2, specialRequests: 'У окна, если возможно' },
  { id: 2, tableId: 1, guestName: 'Анна Сидорова', guestPhone: '+79017654321', bookingTime: '2024-07-21T20:30', numberOfGuests: 4, specialRequests: '' },
]);

const showModal = ref(false);
const isEditing = ref(false);

const defaultReservationForm = () => {
  const now = new Date();
  now.setHours(now.getHours() + 1); // Через час от текущего
  now.setMinutes(0); // Обнуляем минуты для удобства выбора
  return {
    tableId: availableTables.value.length > 0 ? availableTables.value[0].id : null,
    guestName: '',
    guestPhone: '',
    bookingTime: now.toISOString().substring(0, 16),
    numberOfGuests: 2, // По умолчанию 2 гостя
    specialRequests: '',
  };
};

const currentReservation = reactive(defaultReservationForm());

const reindexReservationIds = () => {
  reservations.value.forEach((reservation, index) => { reservation.id = index + 1; });
};
const getNextReservationId = () => {
  if (reservations.value.length === 0) return 1;
  return reservations.value.length + 1;
};

const formatBookingTime = (dateTimeString) => {
  if (!dateTimeString) return '-';
  try {
    const date = new Date(dateTimeString);
    return date.toLocaleString('ru-RU', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(',', '');
  } catch (e) { return dateTimeString; }
};

const openAddModal = () => {
  isEditing.value = false;
  Object.assign(currentReservation, defaultReservationForm());
  showModal.value = true;
};
const openEditModal = (reservationToEdit) => {
  isEditing.value = true;
  Object.assign(currentReservation, { ...reservationToEdit });
  showModal.value = true;
};
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

  if (isEditing.value) {
    const index = reservations.value.findIndex(r => r.id === currentReservation.id);
    if (index !== -1) {
      reservations.value[index] = { ...currentReservation, id: reservations.value[index].id };
    }
  } else {
    reservations.value.push({ ...currentReservation, id: getNextReservationId() });
  }
  closeModal();
};

const deleteReservation = (reservationIdToDelete) => {
  if (confirm('Вы уверены, что хотите отменить это бронирование?')) {
    reservations.value = reservations.value.filter(r => r.id !== reservationIdToDelete);
    reindexReservationIds();
  }
};
</script>

<style scoped>
/* Стили admin-view, admin-header, admin-main-content, content-section, section-title-admin,
   modal-overlay, modal-content, modal-title, form-group, form-actions
   идентичны или очень похожи на те, что в TablesView.vue, можно их вынести в глобальные,
   если не хочется дублировать, но для примера я их здесь повторю с небольшими адаптациями */

.admin-view {
  background-color: var(--cream-bg);
}
.admin-header {
  background-color: var(--bronze-gold);
  color: var(--cream-bg);
  padding: 40px 30px;
  text-align: center;
  box-shadow: 0 4px 12px var(--shadow-medium);
  margin-bottom: 40px;
}
.admin-header-content h1 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 5vw, 3rem);
  margin: 0 0 10px 0;
  color: var(--cream-bg);
  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
}
.admin-header-content p {
  font-size: 1.1rem;
  margin: 0;
  opacity: 0.9;
}
.admin-main-content {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 30px;
  box-sizing: border-box;
}
.content-section {
  padding: 40px 0;
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
.controls-section .btn-lg {
    padding: 14px 30px;
    font-size: 1.1rem;
}
.controls-section .btn i {
    margin-right: 8px;
}

.stylish-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 20px;
  box-shadow: 0 8px 25px var(--shadow-light);
  border-radius: 10px;
  overflow: hidden;
  background-color: var(--card-bg);
}
.stylish-table th,
.stylish-table td {
  padding: 14px 16px; /* Чуть меньше паддинги для большего кол-ва колонок */
  text-align: left;
  border-bottom: 1px solid #e8e3da;
  vertical-align: middle;
  font-size: 0.95em; /* Текст в таблице чуть меньше */
}
.stylish-table th {
  background-color: #f8f5f0;
  font-weight: 600;
  color: var(--bronze-gold);
  font-family: 'Lato', sans-serif;
  text-transform: uppercase;
  font-size: 0.85em;
  letter-spacing: 0.5px;
}
.stylish-table tbody tr:last-child td {
  border-bottom: none;
}
.stylish-table tbody tr:hover {
  background-color: #fdfaf6;
}
.text-center { text-align: center; }
.text-right { text-align: right; }
.special-requests-cell {
    max-width: 200px; /* Ограничиваем ширину колонки с пожеланиями */
    white-space: normal; /* Разрешаем перенос текста */
    word-break: break-word;
}

.actions-cell {
  text-align: right;
  white-space: nowrap;
}
.actions-cell .btn { margin-left: 8px; }
.btn-action-edit {
  background-color: var(--soft-gold); color: var(--dark-text); border-color: var(--soft-gold);
}
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
    margin-top: 40px;
    margin-bottom: 40px;
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
  background-color: rgba(0, 0, 0, 0.7); /* Темнее фон */
  display: flex; justify-content: center; align-items: center; z-index: 1050;
}
.modal-content {
  background-color: var(--card-bg); padding: 35px 40px; border-radius: 12px;
  box-shadow: 0 12px 45px var(--shadow-medium); /* Более выраженная тень */
  width: 90%; max-width: 600px; /* Чуть шире для формы бронирования */
}
.modal-title {
  font-family: 'Playfair Display', serif; font-size: 1.9rem; /* Крупнее */
  margin-top: 0; margin-bottom: 30px; color: var(--bronze-gold);
  text-align: center; padding-bottom: 15px; border-bottom: 1px solid #eee;
}
.form-row {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
}
.form-group.column {
    flex: 1;
    margin-bottom: 0; /* Убираем нижний отступ, так как он у .form-row */
}
.form-group { margin-bottom: 20px; }
.form-group label {
  display: block; margin-bottom: 8px; font-weight: 600;
  font-size: 0.95em; color: var(--dark-text);
}
.form-group input[type="text"],
.form-group input[type="number"],
.form-group input[type="tel"],
.form-group input[type="datetime-local"],
.form-group select,
.form-group textarea {
  width: 100%; padding: 12px 15px; border: 1px solid #ccc;
  border-radius: 6px; box-sizing: border-box; font-family: 'Lato', sans-serif;
  font-size: 1em; transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.form-group input:focus, .form-group select:focus, .form-group textarea:focus {
    border-color: var(--soft-gold);
    box-shadow: 0 0 0 3px rgba(184, 134, 11, 0.2); /* Используем переменную, если есть */
    outline: none;
}
.form-group textarea {
    min-height: 80px; /* Минимальная высота для textarea */
}
.form-actions { margin-top: 30px; text-align: right; }
.form-actions .btn { margin-left: 10px; padding: 10px 25px; }

@media (max-width: 768px) {
    .admin-header { padding: 30px 20px; margin-bottom: 30px; }
    .admin-header-content h1 { font-size: clamp(1.8rem, 4.5vw, 2.5rem); }
    .admin-main-content { padding: 0 20px; }
    .main-page-content > .bg-alt-section { margin-left: -20px; margin-right: -20px; padding-left: 20px; padding-right: 20px;}
    .section-title-admin { font-size: clamp(1.6rem, 4vw, 2rem); }
    .stylish-table th, .stylish-table td { padding: 10px 12px; font-size: 0.9em; }
    .actions-cell .btn { display: inline-block; width: auto; margin: 5px; } /* Кнопки в строку на мобильных, если влезут */
    .info-cards-grid { grid-template-columns: 1fr; }
    .form-row { flex-direction: column; gap: 0; margin-bottom: 0; } /* Поля в модалке в столбец */
    .form-group.column { margin-bottom: 20px; }
}
@media (max-width: 480px) {
    .admin-main-content { padding: 0 15px; }
    .main-page-content > .bg-alt-section { margin-left: -15px; margin-right: -15px; padding-left: 15px; padding-right: 15px;}
    .stylish-table { font-size: 0.85em; }
}
</style>