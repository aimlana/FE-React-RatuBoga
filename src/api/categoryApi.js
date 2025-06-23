import API from './api';

const getAllCategories = async () => {
  try {
    const res = await API.get('/category');
    return res.data;
  } catch (err) {
    throw err.response ? err.response.data : err.message;
  }
};

export { getAllCategories };
