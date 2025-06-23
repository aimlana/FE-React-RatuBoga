import { ArrowUpRight } from 'lucide-react';
import bgGreen from '../assets/images/bg-green.png';

const Footer = () => {
  return (
    <footer
      className='bg-kombuGreen px-11 py-12 flex justify-between bg-cover bg-center bg-no-repeat'
      style={{ backgroundImage: `url(${bgGreen})` }}
    >
      <div className='h-full flex flex-col-reverse justify-between items-start'>
        <h5 className='font-kalnia text-9xl text-white font-semibold'>
          Ratu Boga
        </h5>

        <div className='mb-36'>
          <p className='text-white text-2xl w-3/5 mb-12'>
            Dari dapur kami ke meja makanmu, nikmati masakan kami yang tidak
            pernah gagal memanjakan lidah anda
          </p>
          <a
            href='/menu'
            className='py-2.5 px-7 text-white font-medium bg-transparent hover:bg-chineseOraange hover:border-chineseOraange

                    transition-colors rounded-full mt-12 cursor-pointer border-2 border-white'
          >
            Daftar Sekarang
          </a>
        </div>
      </div>

      <div className='flex flex-col justify-between items-end'>
        <div className='flex flex-col text-xl gap-6 text-white'>
          <p className='text-end'>
            Jl. Poros Bira, Kel. Tanah Lemo, Kec. Bonto Bahari, Kab. Bulukumba
          </p>
          <p className='text-end'>+62 822990886512</p>
        </div>

        <div className='flex flex-col text-xl gap-6 items-end text-white'>
          <a className='flex gap-1 items-center cursor-pointer hover:text-chineseOraange transition-colors'>
            Facebook
            <ArrowUpRight size={32} />
          </a>
          <a className='flex gap-1 items-center cursor-pointer hover:text-chineseOraange transition-colors'>
            Instagram
            <ArrowUpRight size={32} />
          </a>
          <a className='flex gap-1 items-center cursor-pointer hover:text-chineseOraange transition-colors'>
            Whatsapp
            <ArrowUpRight size={32} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
