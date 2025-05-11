import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MenuModal = ({ isEdit, initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    categoryId: '',
    imageUrl: '',
    image: null,
    ...initialData, 
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/category');
        setCategories(res.data);
      } catch (err) {
        console.error('Gagal memuat kategori:', err);
      }
    };
    fetchCategories();
  }, []);

  // Handle file upload + preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', Number(formData.price));
    data.append('quantity', Number(formData.quantity));
    data.append('categoryId', formData.categoryId);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      await onSubmit(data);
      onClose();
    } catch (error) {
      toast.error(error.message || 'Gagal menyimpan menu');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto'>
      <div className='bg-white rounded-lg w-full max-w-2xl'>
        {' '}
        <div className='p-6 max-h-[80vh] overflow-y-auto'>
          {' '}
          <div className='flex justify-between items-center mb-4'>
            <h3 className='text-xl font-semibold'>
              {isEdit ? 'Edit Menu' : 'Tambah Menu Baru'}
            </h3>
            <button
              onClick={onClose}
              className='text-gray-500 hover:text-gray-700 cursor-pointer'
            >
              <FontAwesomeIcon icon={faClose} className='text-xl' />
            </button>
          </div>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {/* Kolom Kiri */}
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Nama Menu *
                  </label>
                  <input
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className='w-full p-2 border rounded'
                    required
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Deskripsi
                  </label>
                  <textarea
                    name='description'
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className='w-full p-2 border rounded'
                    rows='3'
                  />
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium mb-1'>
                      Harga *
                    </label>
                    <input
                      type='number'
                      name='price'
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: Number(e.target.value),
                        })
                      }
                      className='w-full p-2 border rounded'
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium mb-1'>
                      Stok *
                    </label>
                    <input
                      type='number'
                      name='quantity'
                      value={formData.quantity}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          quantity: Number(e.target.value),
                        })
                      }
                      className='w-full p-2 border rounded'
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Kategori *
                  </label>
                  <select
                    name='categoryId'
                    value={formData.categoryId || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, categoryId: e.target.value })
                    }
                    className='w-full p-2 border rounded'
                    required
                  >
                    <option value=''>Pilih Kategori</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Kolom Kanan */}
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Gambar Menu
                  </label>
                  <div className='border-2 border-dashed border-gray-300 rounded-lg p-4 text-center'>
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt='Preview'
                        className='mx-auto h-48 object-contain rounded'
                      />
                    ) : formData.imageUrl ? (
                      <img
                        src={`http://localhost:5001${formData.imageUrl}`}
                        alt='Menu saat ini'
                        className='mx-auto h-48 object-contain rounded'
                      />
                    ) : (
                      <div className='h-48 flex flex-col items-center justify-center text-gray-500'>
                        <svg
                          className='w-12 h-12 mb-2'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                          />
                        </svg>
                        <p>Belum ada gambar</p>
                        <p className='text-xs mt-2'>Upload gambar (max 5MB)</p>
                      </div>
                    )}
                  </div>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handleFileChange}
                    className='mt-2 block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100'
                  />
                </div>
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className='flex justify-end space-x-3 pt-4 border-t'>
              <button
                type='button'
                onClick={onClose}
                className='px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer'
              >
                Batal
              </button>
              <button
                type='submit'
                disabled={isLoading}
                className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 cursor-pointer'
              >
                {isLoading ? (
                  <span className='flex items-center'>
                    <svg
                      className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                    {isEdit ? 'Menyimpan...' : 'Membuat...'}
                  </span>
                ) : isEdit ? (
                  'Simpan perubahan'
                ) : (
                  'Buat menu'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MenuModal;
