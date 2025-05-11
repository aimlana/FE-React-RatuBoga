import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { loginUser } from '../api/authApi';

import '../styles/App.css';
import bgLoginRegister from '../assets/images/bg-LoginRegister.png';
import logoBlack from '../assets/images/logo-black.png';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Login() {
  useEffect(() => {
    document.title = 'Ratu Boga | Login';
  }, []);

  const [formData, setFormData] = useState({
    login: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(formData);
      localStorage.setItem('token', data.token);

      const decodedToken = jwtDecode(data.token);
      const role = decodedToken.role;
      console.log(role);

      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/menu');
      }
    } catch (err) {
      setError(err.message || 'Login gagal');
    }
  };

  return (
    <section
      className='h-screen w-screen bg-center bg-cover'
      style={{
        backgroundImage: `url(${bgLoginRegister})`,
      }}
    >
      <div className='flex flex-col justify-center items-center h-screen w-[45vw] bg-gray-100 px-24 py-1'>
        <img
          src={logoBlack}
          alt='Logo Ratu Boga'
          className='w-20 h-20 object-contain mb-4'
        />
        <h1 className='font-jakarta text-3xl font-semibold text-center'>
          Hai, Selamat Datang
        </h1>

        {/* Register */}
        <p className='text-sm text-start mt-2'>
          Belum punya akun?{' '}
          <a href='/register' className='text-pumpkin hover:text-amber-600'>
            Daftar disini
          </a>
        </p>

        {error && (
          <p className='text-red-600 text-sm font-medium mt-4'>{error}</p>
        )}

        <form
          onSubmit={handleLogin}
          className='flex flex-col justify-center w-full mt-12'
        >
          <label className='text-sm mb-1'>Email / Nomor Handphone</label>
          <input
            type='text'
            name='login'
            placeholder='Masukkan email atau nomor hp anda'
            className='p-2 ps-0 w-full border-b-1 mb-4 bg-transparent outline-0 focus:outline-0 focus:border-pumpkin'
            value={formData.login}
            onChange={handleChange}
            required
          />
          <div className='relative'>
            <label className='text-sm mb-1'>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name='password'
              placeholder='Masukkan password anda'
              className='p-2 ps-0 w-full border-b-1 mb-2 bg-transparent outline-0 focus:outline-0 focus:border-pumpkin'
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type='button'
              onClick={togglePasswordVisibility}
              className='absolute right-0 top-7 text-gray-500'
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEye} className='text-sm' />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} className='text-sm' />
              )}
            </button>
          </div>

          <a
            href='/forgot-password'
            className='text-sm text-right mt-3 text-pumpkin hover:text-amber-600'
          >
            Lupa password?
          </a>

          <button
            type='submit'
            className='bg-pumpkin text-white p-2 rounded-sm mt-8 font-medium cursor-pointer
                        hover:bg-amber-600'
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
