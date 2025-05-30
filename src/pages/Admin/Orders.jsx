import { useEffect } from "react";

function Orders() {
  useEffect(() => {
      document.title = 'Ratu Boga | Orders Management';
    }, []);
    
  return (
    <section className='w-full h-full bg-[#F5F3F0] p-4 flex items-center justify-start'>
      <h1 className='mx-auto text-7xl text-[#FF9900]'>Orders Management</h1>
    </section>
  );
}

export default Orders;
