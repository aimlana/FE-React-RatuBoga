import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logoutUser } from '../api/authApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUsers,
  faUtensils,
  faClipboardList,
  faChartColumn,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname.split('/')[2] || 'dashboard';
  const navigate = useNavigate();

  const menuItems = [
    { path: 'dashboard', icon: faHome, label: 'Beranda' },
    { path: 'users', icon: faUsers, label: 'Pengguna' },
    { path: 'menu', icon: faUtensils, label: 'Menu' },
    { path: 'orders', icon: faClipboardList, label: 'Pesanan' },
    { path: 'finance', icon: faChartColumn, label: 'Keuangan' },
  ];

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <div className='w-64 h-screen bg-white text-black fixed flex flex-col'>
      <div className='flex-grow'>
        <div className='p-4 text-xl font-bold border-b border-gray-700'>
          Admin Panel
        </div>
        <nav className='mt-4'>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={`/admin/${item.path}`}
              className={`flex items-center w-full p-4 hover:bg-[#FF9900] hover:text-white transition-colors ${
                currentPath === item.path
                  ? 'bg-[#FF9900] border-r-4 border-amber-600 text-white'
                  : ''
              }`}
            >
              <FontAwesomeIcon
                icon={item.icon}
                className='text-xl w-6 text-center'
              />
              <span className='ms-5'>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className='mt-auto py-4 border-t border-gray-200'>
        <button
          onClick={handleLogout}
          className='flex items-center w-full p-4 hover:bg-[#FF9900] hover:text-white transition-colors rounded cursor-pointer'
        >
          <FontAwesomeIcon
            icon={faArrowRightFromBracket}
            className='text-xl w-6 me-5 transform scale-x-[-1]'
          />
          Keluar
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
