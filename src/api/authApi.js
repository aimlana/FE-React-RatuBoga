import API from './api';

const loginUser = async (formData) => {
  try {
    const res = await API.post('/auth/login', formData);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err.response ? err.response.data : err.message;
  }
};

const registerUser = async (formData) => {
  try {
    const res = await API.post('/auth/register', formData);
    return res.data;
  } catch (err) {
    throw err.response ? err.response.data : err.message;
  }
};

const logoutUser = () => {
  localStorage.removeItem('token');
};

export { loginUser, registerUser, logoutUser };
