import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { logoutUser } from '../api/authApi';

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Ratu Boga | Dashboard';
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    }

    try {
      const decodedToken = jwtDecode(token);

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
    <section className='w-screen h-screen bg-[#F5F3F0] p-4 flex items-center justify-start'>
      
      <h1 className='mx-auto text-7xl text-[#FF9900]'>Dashboard User</h1>
    </section>
  );
}

export default Dashboard;
