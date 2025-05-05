import { useEffect, useState } from 'react';
import axios from 'axios';
import bgLoginRegister from '../assets/images/bg-LoginRegister.png';
import logoBlack from '../assets/images/logo-black.png';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    document.title = 'Ratu Boga | Forgot Password';
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5001/api/auth/forgot-password', {
        email,
      });
      console.log(email);
      setMessage(res.data.message); 
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Gagal kirim email reset');
    }
  };

  return (
    <section
      className='h-screen w-screen bg-center bg-cover'
      style={{ backgroundImage: `url(${bgLoginRegister})` }}
    >
      <div className='flex flex-col justify-center items-center h-screen w-[45vw] bg-gray-100 px-24 py-1'>
        <img
          src={logoBlack}
          alt='Logo Ratu Boga'
          className='w-20 h-20 object-contain mb-4'
        />
        <h1 className='font-jakarta text-3xl font-semibold text-center'>
          Lupa password yah?
        </h1>

        <form
          onSubmit={handleSubmit}
          className='flex flex-col justify-center w-full mt-12'
        >
          <label className='text-sm mb-1'>Email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Masukkan email anda'
            className='p-2 ps-0 w-full border-b-1 mb-4 bg-transparent outline-0 focus:outline-0 focus:border-pumpkin'
          />

          <button
            type='submit'
            className='bg-pumpkin text-white p-2 rounded-sm mt-8 font-medium cursor-pointer hover:bg-amber-600'
          >
            Kirim
          </button>
        </form>

        {message && (
          <p className='text-sm text-center text-red-500 mt-4'>{message}</p>
        )}
      </div>
    </section>
  );
}

export default ForgotPassword;
