import { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Sidebar from '../components/Sidebar';

const AdminLayout = () => {
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || jwtDecode(token).role !== 'admin') {
      Navigate('/login');
    } else {
      setIsLoading(false); 
    }
  }, []);

  if (isLoading) {
    return (
      <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white'></div>
      </div>
    );
  }

  return (
    <div className='flex h-screen bg-gray-100'>
      <Sidebar />
      <div className='flex-1 overflow-auto ml-64 p-8'>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
