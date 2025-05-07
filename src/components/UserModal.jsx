import { useState } from 'react';

const UserModal = ({ isEdit, initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState(initialData);
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg w-full max-w-md p-6'>
        <h3 className='text-lg font-semibold mb-4'>
          {isEdit ? 'Edit User' : 'Add New User'}
        </h3>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium mb-1'>Nama *</label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              className='w-full p-2 border rounded'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium mb-1'>Email *</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='w-full p-2 border rounded'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium mb-1'>
              No. Handphone *
            </label>
            <input
              type='text'
              name='phone_number'
              value={formData.phone_number}
              onChange={handleChange}
              className='w-full p-2 border rounded'
              required
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

export default UserModal;
