import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { logoutUser } from '../../api/authApi';

import Sidebar from '../../components/Sidebar';

function Dashboard() {
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = 'Ratu Boga | Admin Dashboard';
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/login');
    }

    try {
      const decodedToken = jwtDecode(token);

      if (decodedToken.role !== 'admin') {
        navigate('/dashboard');
        return;
      }

      const currentTime = Date.now() / 1000;

      if (decodedToken.exp && decodedToken.exp < currentTime) {
        logoutUser();
        navigate('/login');
      }
    } catch (err) {
      console.error('Token decoded error: ', err);
      logoutUser();
      navigate('/login');
    }
  }, [navigate]);


  return (
    <section className='w-full h-full bg-[#F5F3F0] p-4 flex items-center justify-start'>
      <h1 className='mx-auto text-7xl text-[#FF9900]'>Dashboard Admin</h1>
    </section>
  );

}
console.log('admin rendered')

export default Dashboard;
