import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// 1. Buat Context
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// 2. Buat Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Cek status login saat pertama load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const res = await axios.get('http://localhost:5001/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data.user);
        }
      } catch (err) {
        console.error(err.message);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Fungsi Login
  const login = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:5001/api/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      toast.success('Login berhasil');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login gagal');
    }
  };

  // Fungsi Logout
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logout berhasil');
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
