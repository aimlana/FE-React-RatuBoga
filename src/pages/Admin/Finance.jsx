import { useEffect } from "react";

function Finance() {
  useEffect(() => {
    document.title = 'Ratu Boga | Finance';
  }, []);

  return (
    <section className='w-full h-full bg-[#F5F3F0] p-4 flex items-center justify-start'>
      <h1 className='mx-auto text-7xl text-[#FF9900]'>Finance</h1>
    </section>
  );
}

export default Finance;