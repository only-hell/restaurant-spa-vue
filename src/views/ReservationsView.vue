<template>
  <div class="reservations-view">
    <h1>Управление бронированиями</h1>

    <div class="controls">
      <button @click="openAddModal" class="btn btn-primary">Добавить бронирование</button>
    </div>

    <table v-if="reservations.length > 0" class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>ID Столика</th>
          <th>Имя гостя</th>
          <th>Телефон</th>
          <th>Время</th>
          <th>Гостей</th>
          <th>Пожелания</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reservation in reservations" :key="reservation.id">
          <td>{{ reservation.id }}</td>
          <td>{{ reservation.tableId }}</td>
          <td>{{ reservation.guestName }}</td>
          <td>{{ reservation.guestPhone }}</td>
          <td>{{ formatBookingTime(reservation.bookingTime) }}</td>
          <td>{{ reservation.numberOfGuests }}</td>
          <td>{{ reservation.specialRequests || '-' }}</td>
          <td>
            <button @click="openEditModal(reservation)" class="btn btn-sm btn-warning">Редактировать</button>
            <button @click="deleteReservation(reservation.id)" class="btn btn-sm btn-danger">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else class="empty-state">Бронирования пока не добавлены.</p>

    <!-- Модальное окно для добавления/редактирования бронирования -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h2>{{ isEditing ? 'Редактировать бронирование' : 'Добавить новое бронирование' }}</h2>
                <form @submit.prevent="saveReservation">
          <!-- Поле для Столика -->
          <div class="form-group">
            <label for="resTableId">Столик:</label>
            <!-- Вариант с select -->
            <select id="resTableId" v-model.number="currentReservation.tableId" required>
              <option :value="null" disabled>-- Выберите столик --</option>
              <option v-for="table in availableTables" :key="table.id" :value="table.id">
                {{ table.name }} (ID: {{ table.id }})
              </option>
            </select>
            <!-- Или вариант с input type="number", который был в первоначальном коде, если select пока не нужен: -->
            <!-- <input type="number" id="resTableId" v-model.number="currentReservation.tableId" required placeholder="ID столика"/> -->
          </div>

          <!-- Поле для Имени гостя -->
          <div class="form-group">
            <label for="resGuestName">Имя гостя:</label>
            <input type="text" id="resGuestName" v-model="currentReservation.guestName" required />
          </div>

          <!-- Поле для Телефона гостя -->
          <div class="form-group">
            <label for="resGuestPhone">Телефон гостя:</label>
            <input type="tel" id="resGuestPhone" v-model="currentReservation.guestPhone" required />
          </div>

          <!-- Поле для Даты и времени -->
          <div class="form-group">
            <label for="resBookingTime">Дата и время бронирования:</label>
            <input type="datetime-local" id="resBookingTime" v-model="currentReservation.bookingTime" required />
          </div>

          <!-- Поле для Количества гостей -->
          <div class="form-group">
            <label for="resNumberOfGuests">Количество гостей:</label>
            <input type="number" id="resNumberOfGuests" v-model.number="currentReservation.numberOfGuests" min="1" required />
          </div>

          <!-- Поле для Особых пожеланий -->
          <div class="form-group">
            <label for="resSpecialRequests">Особые пожелания:</label>
            <textarea id="resSpecialRequests" v-model="currentReservation.specialRequests" rows="3"></textarea>
          </div>

          <!-- Кнопки действий -->
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
import { ref, reactive, onMounted } from 'vue'; // Добавляем onMounted

// --- Начало секции для данных о столиках (для выпадающего списка) ---
// Это временное решение, в идеале столики должны приходить из общего хранилища (Vuex/Pinia) или через props/emits
// Пока просто захардкодим несколько для примера выбора
const availableTables = ref([
  { id: 1, name: 'Столик у окна №1' },
  { id: 2, name: 'VIP-кабина "Уют"' },
  { id: 3, name: 'Столик на веранде №5' },
  { id: 4, name: 'Барный стул №12' },
  // В реальном приложении этот список нужно будет получать динамически
]);
// --- Конец секции для данных о столиках ---


const reservations = ref([
  { id: 1, tableId: 2, guestName: 'Иван Петров', guestPhone: '+79001234567', bookingTime: '2024-07-20T19:00', numberOfGuests: 2, specialRequests: 'У окна, если возможно' },
  { id: 2, tableId: 1, guestName: 'Анна Сидорова', guestPhone: '+79017654321', bookingTime: '2024-07-21T20:30', numberOfGuests: 4, specialRequests: '' },
]);

const showModal = ref(false);
const isEditing = ref(false);

const defaultReservationForm = () => ({
  id: null,
  tableId: null,
  guestName: '',
  guestPhone: '',
  bookingTime: new Date(Date.now() + 3600 * 1000).toISOString().substring(0, 16), // По умолчанию через час от текущего
  numberOfGuests: 1,
  specialRequests: '',
});

const currentReservation = reactive(defaultReservationForm());

const getNextReservationId = () => {
  if (reservations.value.length === 0) return 1;
  return Math.max(...reservations.value.map(r => r.id)) + 1;
};

const formatBookingTime = (dateTimeString) => {
  if (!dateTimeString) return '-';
  try {
    const date = new Date(dateTimeString);
    return date.toLocaleString('ru-RU', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch (e) {
    return dateTimeString; // Если формат неверный, вернуть как есть
  }
};

const openAddModal = () => {
  isEditing.value = false;
  Object.assign(currentReservation, defaultReservationForm());
  showModal.value = true;
};

const openEditModal = (reservation) => {
  isEditing.value = true;
  Object.assign(currentReservation, reservation);
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const saveReservation = () => {
  // Проверка, чтобы количество гостей не превышало вместимость столика (если есть данные)
  // const selectedTable = availableTables.value.find(t => t.id === currentReservation.tableId);
  // if (selectedTable && selectedTable.capacity && currentReservation.numberOfGuests > selectedTable.capacity) {
  //   alert(`Количество гостей (${currentReservation.numberOfGuests}) превышает вместимость столика "${selectedTable.name}" (${selectedTable.capacity} мест).`);
  //   return;
  // }

  if (isEditing.value) {
    const index = reservations.value.findIndex(r => r.id === currentReservation.id);
    if (index !== -1) {
      reservations.value[index] = { ...currentReservation };
    }
  } else {
    reservations.value.push({
      ...currentReservation,
      id: getNextReservationId(),
    });
  }
  closeModal();
};

const deleteReservation = (reservationId) => {
  if (confirm('Вы уверены, что хотите отменить это бронирование?')) {
    reservations.value = reservations.value.filter(r => r.id !== reservationId);
  }
};

// Если бы мы хотели подгружать столики из TablesView.vue, это было бы сложнее без общего хранилища.
// onMounted(() => {
//   // Здесь могла бы быть логика загрузки столиков, если бы они были в localStorage или другом общем месте
// });

</script>

<style scoped>
/* Можно скопировать стили из TablesView.vue и адаптировать или использовать общие стили */
.reservations-view {
  padding: 20px;
}
.controls { margin-bottom: 20px; }
.table { width: 100%; border-collapse: collapse; margin-top: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
.table th, .table td { border: 1px solid #ddd; padding: 10px; text-align: left; } /* Уменьшил паддинги для броней */
.table th { background-color: #f2f2f2; font-weight: bold; }
.table tbody tr:nth-child(even) { background-color: #f9f9f9; }
.table tbody tr:hover { background-color: #e9e9e9; }
.empty-state { color: #777; font-style: italic; text-align: center; margin-top: 30px; }

.btn { padding: 8px 15px; border: none; border-radius: 4px; cursor: pointer; font-size: 0.9em; margin-right: 5px; transition: background-color 0.2s ease; }
.btn-primary { background-color: #007bff; color: white; }
.btn-primary:hover { background-color: #0056b3; }
.btn-warning { background-color: #ffc107; color: #212529; }
.btn-warning:hover { background-color: #e0a800; }
.btn-danger { background-color: #dc3545; color: white; }
.btn-danger:hover { background-color: #c82333; }
.btn-sm { padding: 5px 10px; font-size: 0.8em; }

/* Стили для модального окна и формы (можно вынести в глобальные стили, если будут одинаковые) */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.6); display: flex; justify-content: center; align-items: center; z-index: 1000; }
.modal-content { background-color: white; padding: 25px 30px; border-radius: 8px; box-shadow: 0 5px 20px rgba(0,0,0,0.25); width: 90%; max-width: 550px; /* Чуть шире для броней */ }
.modal-content h2 { margin-top: 0; margin-bottom: 25px; color: #333; }
.form-group { margin-bottom: 15px; }
.form-group label { display: block; margin-bottom: 5px; font-weight: bold; }
.form-group input[type="text"],
.form-group input[type="number"],
.form-group input[type="tel"],
.form-group input[type="datetime-local"],
.form-group select,
.form-group textarea { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
.form-actions { margin-top: 20px; text-align: right; }
.form-actions .btn { margin-left: 10px; }
</style>