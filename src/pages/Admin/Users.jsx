import { useEffect } from "react";

function Users() {
  useEffect(() => {
      document.title = 'Ratu Boga | Users Management';
    }, []);

  return (
    <section className='w-full h-full bg-[#F5F3F0] p-4 flex items-center justify-start'>
      <h1 className='mx-auto text-7xl text-[#FF9900]'>Users Management</h1>
    </section>
  );
}

export default Users;