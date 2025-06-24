// pages/Customer/Menu.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { logoutUser } from '../api/authApi';
import { getAllMenus } from '../api/menuApi';
import { toast } from 'react-toastify';
import MenuCard from '../components/MenuCard';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';

function Menu() {
  const navigate = useNavigate();
  const location = useLocation();

  const { addToCart, cartCount } = useCart();

  const [user, setUser] = useState(null);
  const [menus, setMenus] = useState([]);
  const [outOfStockMenus, setOutOfStockMenus] = useState([]);
  const [availableMenus, setAvailableMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    document.title = 'Ratu Boga | Menu';
    fetchMenus();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search') || '';
    setSearchTerm(searchParam);

    // Jika tidak ada parameter search, tampilkan semua menu
    if (!params.has('search')) {
      setSearchTerm('');
    }
  }, [location.search]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (menus.length > 0) {
      const outOfStock = menus.filter((menu) => menu.quantity === 0);
      const available = menus.filter((menu) => menu.quantity > 0);
      setOutOfStockMenus(outOfStock);
      setAvailableMenus(available);
    }
  }, [menus]);

  const fetchMenus = async () => {
    setLoading(true);
    try {
      const res = await getAllMenus();
      setMenus(res.data);
    } catch (err) {
      setError(err.message);
      toast.error('Gagal memuat menu');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    navigate('/');
  };

  const filteredAvailableMenus = availableMenus.filter(
    (menu) =>
      menu.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (activeCategory === null || menu.categoryId === activeCategory)
  );

  const filteredOutOfStockMenus = outOfStockMenus.filter(
    (menu) =>
      menu.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (activeCategory === null || menu.categoryId === activeCategory)
  );

  const categories = [
    { label: 'Semua', id: null },
    { label: 'Makanan', id: 1 },
    { label: 'Minuman', id: 2 },
  ];

  if (loading) return <div className='text-center py-8'>Memuat menu...</div>;
  if (error)
    return <div className='text-center py-8 text-red-500'>Error: {error}</div>;

  return (
    <div className='flex flex-col h-screen bg-gray-50'>
      <Navbar
        cartCount={cartCount}
        user={user}
        onLogout={handleLogout}
        onSearch={(term) => setSearchTerm(term)} // Add this
      />

      {/* Main Content */}
      <div className='flex flex-1 mt-28'>
        {/* Menu Section */}
        <div className='flex-1 overflow-y-auto p-6 w-full'>
          <div className='container mx-auto'>
            <div className='flex justify-between items-center'>
              <h2 className='text-2xl font-bold mb-6'>Daftar Menu</h2>
            </div>

            {/* Categories */}
            <div className='flex space-x-2 mb-6 overflow-x-auto pb-2'>
              {categories.map((category) => (
                <button
                  key={category.label}
                  className={`px-4 py-2 rounded-full whitespace-nowrap ${
                    activeCategory === category.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Menu Grid */}
            <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
              {filteredAvailableMenus.length > 0 ? (
                filteredAvailableMenus.map((menu) => (
                  <MenuCard key={menu.id} menu={menu} onAddToCart={addToCart} />
                ))
              ) : (
                <div className='text-center text-gray-500 col-span-full'>
                  {activeCategory === 1 && 'Makanan tidak ada.'}
                  {activeCategory === 2 && 'Minuman tidak ada.'}
                  {activeCategory === null && 'Menu tidak ditemukan.'}
                </div>
              )}
            </div>

            {filteredOutOfStockMenus.length > 0 && (
              <>
                <div className='border-t my-6'></div>
                <h3 className='text-lg font-semibold text-gray-500 mb-4'>
                  Stok Kosong
                </h3>
                <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
                  {filteredOutOfStockMenus.map((menu) => (
                    <div key={`out-${menu.id}`} className='opacity-50'>
                      <MenuCard
                        menu={menu}
                        onAddToCart={() => {}}
                        disabled={true}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
