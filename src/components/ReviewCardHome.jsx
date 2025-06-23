const ReviewCardHome = ({ review }) => {
  return (
    <div className='bg-white rounded-md shadow-sm p-5 flex flex-col justify-between'>
      <div className='flex items-center mb-3 gap-3'>
        <img
          src={review.avatar}
          alt={review.name}
          className='w-10 h-10 rounded-full'
        />
        <div>
          <p className='text-sm font-bold'>{review.name}</p>
          <p className='text-sm text-gray-500'>{review.username}</p>
        </div>
      </div>
      <div className='text-yellow-500 text-sm mb-2'>
        {'★'.repeat(review.rating)}
      </div>
      <p className='text-sm text-gray-800 mt-10 mb-2'>{review.text}</p>
    </div>
  );
};

export default ReviewCardHome;
