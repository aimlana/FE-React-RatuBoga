import { useState, useEffect } from 'react';
import { useUsersData } from '../../hooks/useUsersData';
import { toast } from 'react-toastify';
import UserModal from '../../components/UserModal'; 

import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Users = () => {
  useEffect(() => {
      document.title = 'Ratu Boga | Users Management';
    }, []);

  const {
    users,
    pagination,
    loading,
    error,
    handlePageChange,
    createUser,
    updateUser,
    deleteUser,
    refreshUsers,
  } = useUsersData();

  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleOpenCreate = () => {
    setIsEdit(false);
    setCurrentUser({
      name: '',
      email: '',
      phone_number: '',
      role_id: 2, 
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (user) => {
    setIsEdit(true);
    setCurrentUser(user);
    setModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (isEdit) {
        await updateUser(currentUser.uuid, formData);
        toast.success('User updated successfully');
        await refreshUsers();
      } else {
        await createUser(formData);
        toast.success('User created successfully');
        
        await refreshUsers();
      }
      setModalOpen(false);
    } catch (error) {
      toast.error(error.message || 'Operation failed');
    }
  };

  const handleDelete = async (uuid) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(uuid);
        toast.success('User deleted successfully');
      } catch (error) {
        toast.error(error.message || 'Delete failed');
      }
    }
  };

  if (loading) return <div className='p-4'>Loading...</div>;
  if (error) return <div className='p-4 text-red-500'>{error}</div>;

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-semibold'>User Management</h2>
        <button
          onClick={handleOpenCreate}
          className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer'
        >
          Tambah User
        </button>
      </div>

      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white rounded-lg overflow-hidden'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='py-3 px-4 text-left'>Name</th>
              <th className='py-3 px-4 text-left'>Email</th>
              <th className='py-3 px-4 text-left'>Phone</th>
              <th className='py-3 px-4 text-left'>Role</th>
              <th className='py-3 px-4 text-left'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className='border-b hover:bg-gray-50'>
                <td className='py-3 px-4'>{user.name}</td>
                <td className='py-3 px-4'>{user.email}</td>
                <td className='py-3 px-4'>{user.phone_number}</td>
                <td className='py-3 px-4'>
                  {user.role_id === 1 ? 'Admin' : 'User'}
                </td>
                <td className='py-3 px-4 space-x-2'>
                  <button
                    onClick={() => handleOpenEdit(user)}
                    className='bg-yellow-400 hover:bg-yellow-600 text-white px-3 py-1 rounded cursor-pointer'
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => handleDelete(user.uuid)}
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

      {/* Pagination */}
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

      {/* User Modal */}
      {modalOpen && (
        <UserModal
          isEdit={isEdit}
          initialData={currentUser}
          onSubmit={handleSubmit}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Users;
