import API from './api';

const getAllMenus = async (page = 1, limit = 10) => {
  try {
    const res = await API.get(`/menu?page=${page}&limit=${limit}`);
    return res.data;
  } catch (err) {
    throw err.response ? err.response.data : err.message;
  }
};

const getMenuById = async (id) => {
  try {
    const res = await API.get(`/menu/${id}`);
    return res.data;
  } catch (err) {
    throw err.response ? err.response.data : err.message;
  }
};

const createMenu = async (formData) => {
  try {
    const res = await API.post('/menu/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (err) {
    throw err.message ? err.response.data : err.message;
  }
};

const updateMenu = async (id, formData) => {
  try {
    const res = await API.put(`/menu/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (err) {
    throw err.message ? err.response.data : err.message;
  }
};

const deleteMenu = async (id) => {
  try {
    const res = API.delete(`/menu/${id}`);
    return res.data;
  } catch (err) {
    throw err.message ? err.response.data : err.message;
  }
};

export { getAllMenus, getMenuById, createMenu, updateMenu, deleteMenu };
