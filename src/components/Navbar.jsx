import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useCart } from '../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import { X } from 'lucide-react';

function Navbar({ onLogout }) {
  const navigate =  useNavigate();
  const location = useLocation();

  const { cartCount, fetchCart } = useCart();

  const [searchInput, setSearchInput] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef();

  const handleSearch = (e) => {
    e.preventDefault();
    const term = searchInput.trim();

    if (location.pathname === '/') {
      // Behavior di Home: HARUS tekan Enter
      if (term) {
        navigate(`/menu?search=${encodeURIComponent(term)}`);
      }
    } else {
      // Behavior di Menu: Real-time update
      if (term) {
        navigate(`?search=${encodeURIComponent(term)}`, { replace: true });
      } else {
        navigate('/menu'); // Kembali ke menu tanpa filter
      }
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    // Real-time update HANYA jika sudah di /menu
    if (location.pathname === '/menu') {
      const params = new URLSearchParams(location.search);
      if (value) {
        params.set('search', value);
      } else {
        params.delete('search');
      }
      navigate(`?${params.toString()}`, { replace: true });
    }
  };

  const handleClearSearch = () => {
    setSearchInput(''); 
    navigate('/menu'); 
  };

  useEffect(() => {
    if (location.pathname === '/menu') {
      const params = new URLSearchParams(location.search);
      setSearchInput(params.get('search') || '');
      fetchCart();
    } else {
      setSearchInput('');
    }
  }, [location]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const loggedInUser = decoded.uuid;
        setUser(loggedInUser);
      } catch (err) {
        console.error('Token invalid:', err);
        setUser(null);
      }
    }
  }, []);

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
    <header className='bg-darkCharcoal py-5 px-8 m-3 font-poppins fixed top-0 left-0 right-0 z-20 rounded-full'>
      <div className='w-full flex items-center'>
        <div className='relative flex-1'>
          <form onSubmit={(e) => e.preventDefault()} className='relative w-76'>
            <input
              type='text'
              placeholder='Cari makanan & minuman'
              className='ps-12 pr-8 w-full py-2 bg-white placeholder rounded-3xl'
              value={searchInput}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch(e)
              }}
            />
            <FontAwesomeIcon
              icon={faSearch}
              className='absolute left-1 top-1/2 transform -translate-y-1/2 text-white bg-chineseOraange p-2 rounded-full'
            />

            {/* Tombol clear (×) */}
            {searchInput && (
              <button
                type='button'
                onClick={handleClearSearch}
                className='absolute top-1/2 right-3 text-2xl transform -translate-y-1/2 text-neutral-600 hover:text-gray-400 cursor-pointer'
                aria-label='Hapus pencarian'
              >
                <X size={20} />
              </button>
            )}
          </form>
        </div>

        <button
          onClick={() => navigate('/')}
          className='text-2xl font-semibold font-kalnia text-white mx-auto cursor-pointer'
        >
          Ratu Boga
        </button>

        <div className='flex-1 flex justify-end items-center space-x-4 relative'>
          {/* User section */}
          {user ? (
            <div className='flex items-center gap-8'>
              <button
                className='relative p-2 cursor-pointer'
                onClick={() => navigate('/cart')}
                aria-label='Buka keranjang'
              >
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  size='lg'
                  className='text-white'
                />
                {cartCount > 0 && (
                  <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
                    {cartCount}
                  </span>
                )}
              </button>
              <div className='relative' ref={dropdownRef}>
                <button
                  className='flex items-center space-x-2 focus:outline-none cursor-pointer'
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-haspopup='true'
                  aria-expanded={dropdownOpen}
                  aria-label='Menu profil'
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    size='lg'
                    className='text-white'
                  />
                </button>

                {dropdownOpen && (
                  <div className='absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50'>
                    <button
                      className='block w-full text-left px-4 py-2 hover:bg-gray-100'
                      onClick={() => {
                        setDropdownOpen(false);
                        window.location.href = '/profile';
                      }}
                    >
                      Profile
                    </button>
                    <button
                      className='block w-full text-left px-4 py-2 hover:bg-gray-100'
                      onClick={() => {
                        setDropdownOpen(false);
                        window.location.href = '/riwayat';
                      }}
                    >
                      Riwayat
                    </button>
                    <button
                      className='block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600'
                      onClick={() => {
                        setDropdownOpen(false);
                        localStorage.removeItem('token');
                        setUser(null); // Reset user
                        if (onLogout) onLogout();
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <button
              onClick={() => (window.location.href = '/login')}
              className='py-2 px-8 bg-chineseOraange text-white cursor-pointer font-medium rounded-full'
              aria-label='Login'
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
