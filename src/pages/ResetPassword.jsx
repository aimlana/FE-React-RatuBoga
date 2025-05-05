import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // buat ambil token dari URL
import axios from 'axios';
import bgLoginRegister from '../assets/images/bg-LoginRegister.png';
import logoBlack from '../assets/images/logo-black.png';

function ResetPassword() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Ratu Boga | Reset Password';
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('Password tidak cocok');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5001/api/auth/reset-password', {
        token,
        newPassword,
      });
      console.log(token)
      setMessage(res.data.message); // success

    setTimeout(() => {
      navigate('/login');
    }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Gagal reset password');
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
          Ganti passwordmu sekarang!
        </h1>

        <form
          onSubmit={handleSubmit}
          className='flex flex-col justify-center w-full mt-12'
        >
          <label className='text-sm mb-1'>New Password</label>
          <input
            type='password'
            placeholder='Masukkan password baru'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className='p-2 ps-0 w-full border-b-1 mb-4 bg-transparent outline-0 focus:outline-0 focus:border-pumpkin'
          />

          <label className='text-sm mb-1'>Konfirmasi Password</label>
          <input
            type='password'
            placeholder='Ulangi password baru'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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

export default ResetPassword;
