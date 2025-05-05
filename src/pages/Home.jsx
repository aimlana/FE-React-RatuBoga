import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// React Toastify
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Home() {
  useEffect(() => {
    document.title = 'Ratu Boga | Home';
  }, []);
  const navigate = useNavigate();

  const notify = () => {
    toast.success('Go to login', {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      transition: Bounce,
    });
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <h1 className='text-3xl font-bold'>Welcome to Ratu Boga</h1>
      <button
        className='bg-pumpkin py-2 px-8 rounded-sm text-white font-semibold mt-8'
        onClick={notify}
      >
        Login
      </button>
      <ToastContainer />
    </div>
  );
}

export default Home;
