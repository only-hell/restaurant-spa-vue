import { ref } from 'vue';

export const menuItems = ref([
  { id: 1, name: 'Цезарь с курицей', category: 'Салаты', price: 450.00, description: 'Классический салат Цезарь с обжаренной куриной грудкой.', isVegetarian: false },
  { id: 2, name: 'Борщ украинский', category: 'Супы', price: 350.00, description: 'Наваристый борщ с говядиной, подается со сметаной.', isVegetarian: false },
  { id: 3, name: 'Паста Карбонара', category: 'Горячее', price: 550.00, description: 'Спагетти с беконом, яйцом и сыром Пармезан.', isVegetarian: false },
  { id: 4, name: 'Грибной крем-суп', category: 'Супы', price: 320.00, description: 'Нежный крем-суп из шампиньонов.', isVegetarian: true },
  { id: 5, name: 'Чизкейк Нью-Йорк', category: 'Десерты', price: 280.00, description: 'Классический чизкейк на песочной основе.', isVegetarian: true },
  { id: 6, name: 'Морс клюквенный', category: 'Напитки', price: 150.00, description: 'Домашний клюквенный морс, 0.5л.', isVegetarian: true },
]);

export const availableCategories = ref(['Закуски', 'Салаты', 'Супы', 'Горячее', 'Гарниры', 'Десерты', 'Напитки', 'Алкоголь']);

// Функция для получения следующего ID (гарантирует уникальность)
const getNextMenuItemId = () => {
  return menuItems.value.length > 0 ? Math.max(...menuItems.value.map(item => item.id)) + 1 : 1;
};

// Функции для управления меню
export const addMenuItem = (newItemData) => {
  if (!newItemData.name || !newItemData.category || newItemData.price < 0) {
    alert('Пожалуйста, заполните все обязательные поля (Название, Категория) и убедитесь, что цена не отрицательная.');
    return false; 
  }
  menuItems.value.push({ ...newItemData, id: getNextMenuItemId() });
  return true; 
};

export const updateMenuItem = (updatedItemData) => {
  if (!updatedItemData.name || !updatedItemData.category || updatedItemData.price < 0) {
    alert('Пожалуйста, заполните все обязательные поля (Название, Категория) и убедитесь, что цена не отрицательная.');
    return false;
  }
  const index = menuItems.value.findIndex(i => i.id === updatedItemData.id);
  if (index !== -1) {
    menuItems.value[index] = { ...updatedItemData }; 
    return true;
  }
  console.error("Элемент для обновления не найден:", updatedItemData.id);
  return false;
};

export const removeMenuItem = (itemIdToDelete) => {
  const initialLength = menuItems.value.length;
  menuItems.value = menuItems.value.filter(item => item.id !== itemIdToDelete);
  return menuItems.value.length < initialLength; 
};