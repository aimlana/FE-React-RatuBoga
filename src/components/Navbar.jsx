import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingCart,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

function Navbar({ cartCount, onCartClick, user, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown jika klik di luar
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className='bg-white shadow-sm p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        {/* Nama di kiri */}
        <h1 className='text-xl font-bold'>Ratu Boga</h1>

        {/* Bagian kanan: Cart dan Profil */}
        <div className='flex items-center space-x-4 relative'>
          {/* Cart Icon */}
          <button
            className='relative p-2'
            onClick={onCartClick}
            aria-label='Buka keranjang'
          >
            <FontAwesomeIcon icon={faShoppingCart} size='lg' />
            {cartCount > 0 && (
              <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
                {cartCount}
              </span>
            )}
          </button>

          {/* Profil dengan dropdown */}
          <div className='relative' ref={dropdownRef}>
            <button
              className='flex items-center space-x-2 focus:outline-none'
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-haspopup='true'
              aria-expanded={dropdownOpen}
              aria-label='Menu profil'
            >
              {user?.photoUrl ? (
                <img
                  src={user.photoUrl}
                  alt='Foto Profil'
                  className='w-8 h-8 rounded-full object-cover'
                />
              ) : (
                <FontAwesomeIcon icon={faUser} size='lg' />
              )}
            </button>

            {dropdownOpen && (
              <div className='absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50'>
                <button
                  className='block w-full text-left px-4 py-2 hover:bg-gray-100'
                  onClick={() => {
                    setDropdownOpen(false);
                    window.location.href = '/profile'; // ganti sesuai route profile
                  }}
                >
                  Profile
                </button>
                <button
                  className='block w-full text-left px-4 py-2 hover:bg-gray-100'
                  onClick={() => {
                    setDropdownOpen(false);
                    window.location.href = '/riwayat'; // ganti sesuai route riwayat pemesanan
                  }}
                >
                  Riwayat
                </button>
                <button
                  className='block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600'
                  onClick={() => {
                    setDropdownOpen(false);
                    onLogout();
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
