// components/MenuCard.jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const MenuCard = ({ menu, onAddToCart }) => {
  return (
    <div className='bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow'>
      {/* Gambar Menu */}
      <div className='h-48 overflow-hidden'>
        {menu.imageUrl ? (
          <img
            src={`http://localhost:5001${menu.imageUrl}`}
            alt={menu.name}
            className='w-full h-full object-cover'
          />
        ) : (
          <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
            <span className='text-gray-500'>No Image</span>
          </div>
        )}
      </div>

      {/* Detail Menu */}
      <div className='p-4'>
        <h3 className='font-bold text-lg mb-1'>{menu.name}</h3>
        <p className='text-gray-600 text-sm mb-3 line-clamp-2'>
          {menu.description}
        </p>
        <div className='flex justify-between items-center'>
          <span className='font-bold'>
            Rp {menu.price.toLocaleString('id-ID')}
          </span>
          <button
            className='bg-blue-500 hover:bg-blue-600 text-white w-8 h-8 rounded-full'
            onClick={() => onAddToCart(menu)}
          >
            <FontAwesomeIcon icon={faPlus} size='sm' className='text-center' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
