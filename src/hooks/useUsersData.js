import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api/user';

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

export const useUsersData = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get(
        `?page=${pagination.page}&limit=${pagination.limit}`
      ); 
      setUsers(res.data.data);
      setPagination(prev => ({
        ...prev,
        total: res.data.pagination.total,
      }));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const createUser = async (userData) => {
    try {
      const res = await api.post('/', userData);
      setUsers((prev) => [...prev, res.data.user]);
      return res.data;
    } catch (err) {
      throw err.response?.data;
    }
  };

  const updateUser = async (uuid, userData) => {
    try {
      const res = await api.put(`/${uuid}`, userData);
      setUsers((prev) =>
        prev.map((user) => (user.uuid === uuid ? res.data.user : user))
      );
      return res.data;
    } catch (err) {
      throw err.response?.data;
    }
  };

  const deleteUser = async (uuid) => {
    try {
      await api.delete(`/${uuid}`);
      setUsers((prev) => prev.filter((user) => user.uuid !== uuid));
    } catch (err) {
      throw err.response?.data;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [pagination.page]);

  return {
    users,
    pagination,
    loading,
    error,
    handlePageChange,
    createUser,
    updateUser,
    deleteUser,
    refreshUsers: fetchUsers,
  };
};
