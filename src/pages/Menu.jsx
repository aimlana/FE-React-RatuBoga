// pages/Customer/Menu.jsx
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faShoppingCart,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import MenuCard from '../components/MenuCard';

const API_BASE_URL = 'http://localhost:5001/api/menu';

function Menu() {
  const [menus, setMenus] = useState([]);
  const [outOfStockMenus, setOutOfStockMenus] = useState([]);
  const [availableMenus, setAvailableMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);
  // const [notes, setNotes] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    document.title = 'Ratu Boga | Menu';
    fetchMenus();
  }, []);

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
      const res = await axios.get(`${API_BASE_URL}/`);
      setMenus(res.data.data);
    } catch (err) {
      setError(err.message);
      toast.error('Gagal memuat menu');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (menu) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === menu.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === menu.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...menu, quantity: 1 }];
    });
    toast.success(`${menu.name} ditambahkan ke keranjang`);
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
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
      {/* Header */}
      <header className='bg-white shadow-sm p-4'>
        <div className='container mx-auto flex justify-between items-center'>
          <h1 className='text-xl font-bold'>Ratu Boga</h1>
          <div className='flex items-center space-x-4'>
            <button
              className='relative p-2'
              onClick={() => setShowCart(!showCart)}
            >
              <FontAwesomeIcon icon={faShoppingCart} size='lg' />
              {cart.length > 0 && (
                <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className='flex flex-1 overflow-hidden'>
        {/* Menu Section */}
        <div
          className={`flex-1 overflow-y-auto p-6 ${
            showCart ? 'w-2/3' : 'w-full'
          }`}
        >
          <div className='container mx-auto'>
            <div className='flex justify-between items-center'>
              <h2 className='text-2xl font-bold mb-6'>Daftar Menu</h2>
              <div className='relative'>
                <input
                  type='text'
                  placeholder='Cari menu...'
                  className='pl-10 pr-4 py-2 border rounded-lg'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className='absolute left-3 top-3 text-gray-400'
                />
              </div>
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

            {/* Menu Grid - 4 kolom */}
            <div
              className={`grid gap-6 ${
                showCart
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
              }`}
            >
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
                <div
                  className={`grid gap-6 ${
                    showCart
                      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                  }`}
                >
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

        {showCart && (
          <div className='w-md bg-white border-l overflow-hidden flex flex-col'>
            {/* Cart Header */}
            <div className='p-4 sticky top-0 bg-white border-b flex justify-between items-center'>
              <h2 className='text-xl font-bold'>Pesanan</h2>
              <button onClick={() => setShowCart(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            {/* Cart Items - Scrollable Area */}
            <div className='flex-1 overflow-y-auto p-4'>
              {cart.length === 0 ? (
                <p className='text-gray-500 text-center py-8'>
                  Keranjang kosong
                </p>
              ) : (
                <div className='space-y-4'>
                  {cart.map((item) => (
                    <div key={item.id} className='border-b pb-4'>
                      <div className='flex items-center gap-3'>
                        {/* Menu Image */}
                        <div className='w-16 h-16 rounded-md overflow-hidden flex-shrink-0'>
                          {item.imageUrl ? (
                            <img
                              src={`http://localhost:5001${item.imageUrl}`}
                              alt={item.name}
                              className='w-full h-full object-cover'
                            />
                          ) : (
                            <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
                              <span className='text-xs text-gray-500'>
                                No Image
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Menu Details */}
                        <div className='flex-1'>
                          <div className='flex justify-between'>
                            <h3 className='font-medium'>{item.name}</h3>
                          </div>
                          <p className='text-gray-600'>
                            Rp {item.price.toLocaleString('id-ID')} x
                            {item.quantity}
                          </p>
                        </div>

                        <div className='flex items-center me-6'>
                          <button
                            className='bg-gray-200 px-2 py-1 rounded'
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            -
                          </button>
                          <span className='mx-2'>{item.quantity}</span>
                          <button
                            className='bg-gray-200 px-2 py-1 rounded'
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className='text-gray-400 hover:text-red-500'
                        >
                          <FontAwesomeIcon icon={faTimes} size='sm' />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sticky Notes and Payment Summary */}
            <div className='sticky bottom-0 bg-white border-t'>
              {/* Customer Notes Textarea - Sticky above total */}
              <div className='p-4 border-b'>
                <label
                  htmlFor='customerNotes'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Catatan Pesanan
                </label>
                <textarea
                  id='customerNotes'
                  rows={3}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  placeholder='Contoh: Pedas level 2, tidak pakai bawang, dll'
                />
              </div>

              {/* Payment Summary */}
              <div className='p-4'>
                <div className='mb-4'>
                  <div className='flex justify-between items-center py-2'>
                    <span className='font-medium'>Total</span>
                    <span className='font-medium'>
                      Rp{' '}
                      {cart
                        .reduce(
                          (sum, item) => sum + item.price * item.quantity,
                          0
                        )
                        .toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
                <button className='w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 font-medium'>
                  Pesan Sekarang
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Menu;
