import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import AdminDashboard from '../pages/Admin/Dashboard';
import AdminMenu from '../pages/Admin/Menu';
import AdminLayout from '../layouts/AdminLayout'; 
import UserManagement from '../pages/Admin/Users';
import OrdersManagement from '../pages/Admin/Orders';
import Finance from '../pages/Admin/Finance';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password/:token' element={<ResetPassword />} />

      {/* Admin routes */}
      <Route path='/admin' element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} /> 
        <Route path='dashboard' element={<AdminDashboard />} />
        <Route path='menu' element={<AdminMenu />} />
        <Route path='users' element={<UserManagement />} />
        <Route path='orders' element={<OrdersManagement />} />
        <Route path='finance' element={<Finance />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
