import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api/menu';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const useMenuData = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0
  });

  const fetchMenus = async () => {
    setLoading(true);
    try {
      const res = await api.get(
        `/?page=${pagination.page}&limit=${pagination.limit}`
      );
      setMenus(res.data.data);
      setPagination(prev => ({
        ...prev,
        total: res.data.total
      }));
    } catch (err) {
      console.error('Failed to fetch menus:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const createMenu = async (menuData) => {
    try {
      const res = await api.post('/create', menuData); 
      setMenus((prev) => [...prev, res.data.newMenu]);
      return res.data;
    } catch (err) {
      console.error('Failed to create menu:', err.response?.data);
      throw err.response?.data;
    }
  };

  const updateMenu = async (id, menuData) => {
    try {
      const res = await api.put(`/${id}`, menuData);
      setMenus((prev) =>
        prev.map((menu) => (menu.id === id ? res.data.menu : menu))
      );
      return res.data;
    } catch (err) {
      console.error('Failed to update menu:', err.response?.data);
      throw err.response?.data;
    }
  };

  const deleteMenu = async (id) => {
    try {
      await api.delete(`/${id}`);
      setMenus((prev) => prev.filter((menu) => menu.id !== id));
    } catch (err) {
      console.error('Failed to delete menu:', err.response?.data);
      throw err.response?.data;
    }
  };

  useEffect(() => {
    fetchMenus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page]);

  return {
    menus,
    pagination,
    loading,
    error,
    handlePageChange,
    createMenu,
    updateMenu,
    deleteMenu,
    refreshMenus: fetchMenus,
  };
};
