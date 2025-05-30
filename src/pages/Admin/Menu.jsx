import { useState, useEffect } from 'react';
import { useMenuData } from '../../hooks/useMenuData';
import { toast } from 'react-toastify';
import MenuModal from '../../components/MenuModal';

import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Menu() {
  useEffect(() => {
    document.title = 'Ratu Boga | Menu Management';
  }, []);

  const BASE_URL = 'http://localhost:5001';

  const {
    menus,
    pagination,
    loading,
    error,
    handlePageChange,
    createMenu,
    updateMenu,
    deleteMenu,
    refreshMenus,
  } = useMenuData();

  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentMenu, setCurrentMenu] = useState(null);

  const handleOpenCreate = () => {
    setIsEdit(false);
    setCurrentMenu({
      name: '',
      description: '',
      price: '',
      quantity: '',
      imageUrl: '',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (menu) => {
    setIsEdit(true);
    setCurrentMenu({
      ...menu,
      price: menu.price.toString(),
      quantity: menu.quantity.toString(),
    });
    setModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (isEdit) {
        await updateMenu(currentMenu.id, formData);
        await refreshMenus();
      } else {
        await createMenu(formData);
        await refreshMenus();
      }
      setModalOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Gagal update menu');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this menu?')) {
      try {
        await deleteMenu(id);
        toast.success('Menu berhasil dihapus');
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || 'Gagal menghapus menu');
      }
    }
  };

  if (loading) return <div className='p-4'>Loading...</div>;
  if (error) return <div className='p-4 text-red-500'>Error: {error}</div>;

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-semibold'>Menu List</h2>
        <button
          onClick={handleOpenCreate}
          className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer'
        >
          Tambah Menu
        </button>
      </div>

      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white rounded-lg overflow-hidden'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='py-3 px-4 text-left'>Name</th>
              <th className='py-3 px-4 text-left'>Description</th>
              <th className='py-3 px-4 text-left'>Price</th>
              <th className='py-3 px-4 text-left'>Quantity</th>
              <th className='py-3 px-4 text-left'>Image</th>
              <th className='py-3 px-4 text-left'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu) => (
              <tr key={menu.id} className='border-b hover:bg-gray-50'>
                <td className='py-3 px-4'>{menu.name}</td>
                <td className='py-3 px-4'>{menu.description}</td>
                <td className='py-3 px-4'>Rp {menu.price}</td>
                <td className='py-3 px-4'>{menu.quantity}</td>
                <td className='py-3 px-4'>
                  {menu.imageUrl && (
                    <img
                      src={`${BASE_URL}${menu.imageUrl}`}
                      alt={menu.name}
                      className='h-10 w-16 object-cover'
                    />
                  )}
                </td>
                <td className='py-3 px-4 space-x-2'>
                  <button
                    onClick={() => handleOpenEdit(menu)}
                    className='bg-yellow-400 hover:bg-yellow-600 text-white px-3 py-1 rounded cursor-pointer'
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => handleDelete(menu.id)}
                    className='bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded cursor-pointer'
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='flex justify-center mt-4'>
        <button
          onClick={() => handlePageChange(pagination.page - 1)}
          disabled={pagination.page === 1}
          className='p-2 disabled:opacity-50'
        >
          {'<'}
        </button>

        <span className='mx-4'>
          Page {pagination.page} of{' '}
          {Math.ceil(pagination.total / pagination.limit)}
        </span>

        <button
          onClick={() => handlePageChange(pagination.page + 1)}
          disabled={pagination.page * pagination.limit >= pagination.total}
          className='p-2 disabled:opacity-50'
        >
          {'>'}
        </button>
      </div>

      {modalOpen && (
        <MenuModal
          isEdit={isEdit}
          initialData={currentMenu}
          onSubmit={handleSubmit}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}

export default Menu;
