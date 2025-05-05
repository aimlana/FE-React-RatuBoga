import { useEffect, useState } from 'react';
import axios from 'axios';

const MenuTable = () => {
  const [menus, setMenus] = useState([]);

  const fetchMenus = async () => {
    try {
      const response = await axios.get('http://localhost:5000/menus'); 
      setMenus(response.data); 
    } catch (err) {
      console.error('Gagal mengambil data menu:', err);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  return (
    <div className='p-4'>
      <h2 className='text-xl font-semibold mb-4'>Daftar Menu</h2>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border rounded shadow'>
          <thead className='bg-gray-100 text-left'>
            <tr>
              <th className='py-2 px-4 border'>Nama</th>
              <th className='py-2 px-4 border'>Deskripsi</th>
              <th className='py-2 px-4 border'>Harga</th>
              <th className='py-2 px-4 border'>Stok</th>
              <th className='py-2 px-4 border'>Gambar</th>
              <th className='py-2 px-4 border'>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu) => (
              <tr key={menu.id}>
                <td className='py-2 px-4 border'>{menu.name}</td>
                <td className='py-2 px-4 border'>{menu.description}</td>
                <td className='py-2 px-4 border'>
                  Rp{menu.price.toLocaleString()}
                </td>
                <td className='py-2 px-4 border'>{menu.qty}</td>
                <td className='py-2 px-4 border'>
                  {menu.image ? (
                    <img
                      src={menu.image}
                      alt={menu.name}
                      className='w-16 h-16 object-cover rounded'
                    />
                  ) : (
                    '-'
                  )}
                </td>
                <td className='py-2 px-4 border'>
                  <button className='bg-blue-500 text-white px-2 py-1 rounded mr-2'>
                    Edit
                  </button>
                  <button className='bg-red-500 text-white px-2 py-1 rounded'>
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MenuTable;
