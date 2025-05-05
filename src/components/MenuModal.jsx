import axios from 'axios';
import React, { useState, useEffect } from 'react';

const MenuModal = ({ isEdit, initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState(initialData);
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/category');
        console.log(res)
        setCategories(res.data);
      } catch (err) {
        console.error('Gagal memuat kategori:', err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg w-full max-w-md p-6'>
        <h3 className='text-lg font-semibold mb-4'>
          {isEdit ? 'Edit Menu' : 'Add New Menu'}
        </h3>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium mb-1'>Name *</label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.name ? 'border-red-500' : ''
              }`}
            />
            {errors.name && (
              <p className='text-red-500 text-xs mt-1'>{errors.name}</p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium mb-1'>
              Description
            </label>
            <textarea
              name='description'
              value={formData.description}
              onChange={handleChange}
              className='w-full p-2 border rounded'
              rows='3'
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium mb-1'>Price *</label>
              <input
                type='number'
                name='price'
                value={formData.price}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${
                  errors.price ? 'border-red-500' : ''
                }`}
              />
              {errors.price && (
                <p className='text-red-500 text-xs mt-1'>{errors.price}</p>
              )}
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>
                Quantity *
              </label>
              <input
                type='number'
                name='quantity'
                value={formData.quantity}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${
                  errors.quantity ? 'border-red-500' : ''
                }`}
              />
              {errors.quantity && (
                <p className='text-red-500 text-xs mt-1'>{errors.quantity}</p>
              )}
            </div>
          </div>

          {/* Input Category (Dropdown) */}
          <div>
            <label className='block text-sm font-medium mb-1'>Category *</label>
            <select
              name='categoryId'
              value={formData.categoryId || ''}
              onChange={handleChange}
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

          <div>
            <label className='block text-sm font-medium mb-1'>Image URL</label>
            <input
              type='text'
              name='image'
              value={formData.image}
              onChange={handleChange}
              className='w-full p-2 border rounded'
            />
          </div>

          <div className='flex justify-end space-x-2 mt-6'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 border rounded hover:bg-gray-100'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            >
              {isEdit ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuModal;
