import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faHistory,
  faSignOutAlt,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar({ onCartClick }) {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className='bg-white shadow-sm p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link to='/' className='text-xl font-bold'>
          Ratu Boga
        </Link>

        <div className='flex items-center space-x-4'>
          <button
            className='relative p-2 hover:bg-gray-100 rounded-full'
            onClick={onCartClick}
          >
            <FontAwesomeIcon icon={faShoppingCart} size='lg' />
          </button>

          {user ? (
            <div className='relative'>
              <button
                className='flex items-center space-x-2 hover:bg-gray-100 px-3 py-2 rounded-full'
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <span className='font-medium'>{user.name}</span>
                <FontAwesomeIcon icon={faUser} />
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50'>
                  <Link
                    to='/profile'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  >
                    <FontAwesomeIcon icon={faUser} className='mr-2' />
                    Profile
                  </Link>
                  <Link
                    to='/orders'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  >
                    <FontAwesomeIcon icon={faHistory} className='mr-2' />
                    Riwayat
                  </Link>
                  <button
                    onClick={logout}
                    className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className='mr-2' />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to='/login'
              className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
