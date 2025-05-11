import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../api/authApi';

import '../styles/App.css';
import bgLoginRegister from '../assets/images/bg-LoginRegister.png';
import logoBlack from '../assets/images/logo-black.png';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Register() {
  useEffect(() => {
    document.title = 'Ratu Boga | Register';
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState(null);
  const [passwordError, setPasswordError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordStrengthLabel, setPasswordStrengthLabel] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const evaluatePasswordStrength = (password) => {
    let strength = 0;

    // Tambah poin berdasarkan kriteria
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1; // karakter spesial

    setPasswordStrength(strength);

    // Label berdasarkan skor
    if (strength <= 1) setPasswordStrengthLabel('Sangat Lemah');
    else if (strength === 2) setPasswordStrengthLabel('Lemah');
    else if (strength === 3) setPasswordStrengthLabel('Sedang');
    else if (strength === 4) setPasswordStrengthLabel('Kuat');
    else setPasswordStrengthLabel('Sangat Kuat');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      if (name === 'password') {
        evaluatePasswordStrength(value);
        if (
          updated.confirmPassword !== '' &&
          updated.confirmPassword !== value
        ) {
          setPasswordError('Password tidak cocok');
        } else {
          setPasswordError('');
        }
      }

      if (name === 'confirmPassword') {
        setPasswordError(
          value !== updated.password ? 'Password tidak cocok' : ''
        );
      }

      return updated;
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Password dan Konfirmasi Password tidak cocok');
      return;
    }

    try {
      const { name, email, phone_number, password } = formData;
      await registerUser({ name, email, phone_number, password });

      const loginResponse = await loginUser({
        login: email || phone_number,
        password,
      });
      localStorage.setItem('token', loginResponse.token);

      const role = loginResponse.user.role;

      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Registrasi gagal');
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
          Buat Akun Baru
        </h1>

        {/* Login */}
        <p className='text-sm text-start mt-2'>
          Sudah punya akun?{' '}
          <a href='/login' className='text-pumpkin hover:text-amber-600'>
            Login disini
          </a>
        </p>

        {error && (
          <p className='text-red-600 text-sm text-center font-medium mt-4'>
            {error}
          </p>
        )}

        <form
          onSubmit={handleRegister}
          className='flex flex-col justify-center w-full mt-8'
        >
          <label className='text-sm mb-1'>Nama Lengkap</label>
          <input
            type='text'
            name='name'
            placeholder='Masukkan nama lengkap'
            className='p-2 ps-0 w-full border-b-1 mb-4 bg-transparent outline-0 focus:border-pumpkin'
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label className='text-sm mb-1'>Email</label>
          <input
            type='email'
            name='email'
            placeholder='Masukkan email anda'
            className='p-2 ps-0 w-full border-b-1 mb-4 bg-transparent outline-0 focus:border-pumpkin'
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label className='text-sm mb-1'>Nomor Telepon</label>
          <input
            type='tel'
            name='phone_number'
            placeholder='Masukkan nomor telepon'
            className='p-2 ps-0 w-full border-b-1 mb-4 bg-transparent outline-0 focus:border-pumpkin'
            value={formData.phone_number}
            onChange={handleChange}
            required
          />

          <div className='relative'>
            <label className='text-sm mb-1'>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name='password'
              placeholder='Masukkan password'
              className='p-2 ps-0 w-full border-b-1 mb-4 bg-transparent outline-0 focus:border-pumpkin'
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

          <div className='w-full h-2 rounded-sm mb-1 bg-gray-200'>
            <div
              className='h-full rounded-sm'
              style={{
                width: `${(passwordStrength / 5) * 100}%`,
                backgroundColor:
                  passwordStrength <= 1
                    ? '#f87171' // merah
                    : passwordStrength === 2
                    ? '#facc15' // kuning
                    : passwordStrength === 3
                    ? '#fbbf24' // oranye
                    : passwordStrength === 4
                    ? '#4ade80' // hijau muda
                    : '#22c55e', // hijau
              }}
            />
          </div>
          <p className='text-sm text-gray-700 mb-4'>{passwordStrengthLabel}</p>

          <div className='relative'>
            <label className='text-sm mb-1'>Konfirmasi Password</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name='confirmPassword'
              placeholder='Ulangi password'
              className='p-2 ps-0 w-full border-b-1 mb-2 bg-transparent outline-0 focus:border-pumpkin'
              value={formData.confirmPassword}
              onChange={(e) => {
                handleChange(e);
                setPasswordError(
                  e.target.value !== formData.password
                    ? 'Password tidak cocok'
                    : ''
                );
              }}
              required
            />
            <button
              type='button'
              onClick={toggleConfirmPasswordVisibility}
              className='absolute right-0 top-7 text-gray-500'
            >
              {showConfirmPassword ? (
                <FontAwesomeIcon icon={faEye} className='text-sm' />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} className='text-sm' />
              )}
            </button>
          </div>

          {passwordError && (
            <p className='text-red-600 text-sm font-medium mb-4'>
              {passwordError}
            </p>
          )}

          <button
            type='submit'
            className='bg-pumpkin text-white p-2 rounded-sm mt-8 font-medium cursor-pointer hover:bg-amber-600'
          >
            Daftar
          </button>
        </form>
      </div>
    </section>
  );
}

export default Register;
