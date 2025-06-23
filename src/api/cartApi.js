// api/cartApi.js
import API from './api';

const getOrCreateUserCart = async () => {
  try {
    const res = await API.get('/cart');
    return res.data;
  } catch (err) {
    throw err.response ? err.response.data : err.message;
  }
};

const addItem = async (menuId, quantity = 1, notes = '') => {
  try {
    const res = await API.post('/cart/items', {
      menuId,
      quantity,
      notes,
    });
    return res.data;
  } catch (err) {
    throw err.response ? err.response.data : err.message;
  }
};

const updateItem = async (id, formData) => {
  try {
    const res = await API.put(`/cart/items/${id}`, formData);
    return res.data;
  } catch (err) {
    throw err.response ? err.response.data : err.message;
  }
};

const deleteItem = async (id) => {
  try {
    const res = await API.delete(`/cart/items/${id}`);
    return res.data;
  } catch (err) {
    throw err.response ? err.response.data : err.message;
  }
};

export { getOrCreateUserCart, addItem, updateItem, deleteItem };
