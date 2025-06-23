import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllMenus } from '../api/menuApi';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReviewCard from '../components/ReviewCardHome';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import heroBg from '../assets/images/hero-bg.jpg';
import logo from '../assets/images/logo-black.png';
import baksoBg from '../assets/images/bakso.jpg';

function Home() {
  const navigate = useNavigate();

  const [randomMenus, setRandomMenus] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    document.title = 'Ratu Boga | Home';
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const res = await getAllMenus();

      // 6 item acak
      const filteredMenus = res.data.filter((menu) => menu.categoryId === 1);
      const shuffled = [...filteredMenus].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 6);

      setRandomMenus(selected);
    } catch (err) {
      console.error(err);
    }
  };

  const faqs = [
    {
      question: 'Apakah harga di web sama dengan harga di tempat?',
      answer:
        'Ya, semua harga di website sama persis seperti harga di rumah makan kami. Tidak ada biaya tambahan kecuali ongkos kirim dari kurir (jika berlaku).',
    },
    {
      question: 'Apakah makanannya dibuat setelah dipesan?',
      answer:
        'Ya. Semua pesanan kami siapkan setelah Anda memesan, menggunakan bahan segar dan higienis untuk menjaga kualitas rasa dan kebersihan.',
    },
    {
      question: 'Bisa pesan untuk acara atau dalam jumlah besar?',
      answer:
        'Saat ini kami belum menerima pesanan dalam jumlah besar atau untuk acara. Kami masih fokus melayani pemesanan harian agar kualitas dan kecepatan tetap terjaga. Terima kasih atas pengertiannya!',
    },
    {
      question: 'Apakah bisa membatalkan pesanan setelah dikirim?',
      answer:
        'Mohon maaf, pesanan yang sudah dikirim atau sedang diproses tidak dapat dibatalkan. Pastikan pesanan Anda sudah benar sebelum menyelesaikan transaksi.',
    },
    {
      question: 'Jam berapa saya bisa mulai memesan?',
      answer:
        'Pemesanan dibuka setiap hari, untuk hari Senin - Jumat dari pukul 09.00 - 22.00 WITA dan Sabtu - Minggu dari pukul 10.00 - 22.00 WITA. Pesan di luar jam tersebut tidak akan kami proses.',
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const reviews = [
    {
      name: 'Sarah Miles',
      username: '@sarahmiles',
      avatar: 'https://randomuser.me/api/portraits/women/94.jpg',
      rating: 5,
      text: 'Nasi gorengnya enak banget, porsinya pas dan bumbunya meresap. Rasanya kayak masakan rumahan, tapi lebih niat!',
    },
    {
      name: 'Liam Carter',
      username: '@liamcarter22',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      rating: 4,
      text: 'Ayam geprek di sini juara sih. Crispy-nya dapet, sambalnya nampol, tapi nggak bikin perut sakit. Suka banget',
    },
    {
      name: 'Emma Brooks',
      username: '@emmabrooks',
      avatar: 'https://randomuser.me/api/portraits/women/72.jpg',
      rating: 5,
      text: 'Pesan lewat website gampang banget, tinggal klik-klik langsung sampai. Ayam gorengnya masih hangat waktu sampai!',
    },
  ];

  return (
    <div className='font-poppins'>
      <Navbar />

      <section className='px-8 mt-40 mb-20 mx-3'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-8'>
          <div className='flex-1'>
            <h1 className='font-semibold text-3xl md:text-6xl leading-tight'>
              Harga Kaki Lima <br />
              Rasa Bintang Lima
            </h1>
          </div>

          <div className='flex-1 flex justify-end'>
            <div className='flex flex-col items-start ps-17'>
              <p className='mb-16'>
                Nikmati sajian kami yang dimasak sepenuh hati. Dari nasi goreng,
                aneka mie, ayam geprek, hingga bakso — semua dengan bahan
                pilihan dan cita rasa istimewa.
              </p>
              <button
                className='bg-chineseOraange py-2.5 px-7 text-white font-medium hover:bg-[#e05a3a] transition-colors rounded-full'
                onClick={() => navigate('/menu')}
              >
                Pesan Sekarang
              </button>
            </div>
          </div>
        </div>

        <div
          className='w-full h-[580px] bg-cover bg-center mt-16 rounded-2xl'
          style={{ backgroundImage: `url(${heroBg})` }}
        ></div>
      </section>

      <section className='px-8 bg-[#F9F6EE] flex justify-end py-10'>
        <img
          src={logo}
          className='h-130 absolute left-1 ms-18 self-center opacity-15'
        />
        <h2 className='text-5xl w-3/4 ps-12 my-44 font-serif leading-16'>
          Tanpa{' '}
          <span className='text-chineseOraange italic font-semibold'>antre</span>,
          tanpa{' '}
          <span className='text-chineseOraange italic font-semibold'>repot</span> —
          cukup pesan lewat web dan tunggu di tempat. Semua menu kami dibuat
          dari bahan{' '}
          <span className='text-chineseOraange italic font-semibold'>segar</span> dan{' '}
          <span className='text-chineseOraange italic font-semibold'>higienis</span>,
          siap memanjakan lidahmu.
        </h2>
      </section>

      <section className='bg-[#2C4133] px-11 py-20'>
        <div className='mx-auto'>
          <div className='flex justify-between items-end mb-12'>
            <h3 className='text-white text-4xl font-medium'>
              Cicipi Menu Kami
            </h3>
            <button 
              onClick={() => navigate('/menu')}
              className='text-white text-lg'>
              Selengkapnya
              <FontAwesomeIcon icon={faArrowRight} className='ms-3' />
            </button>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {randomMenus.map((menu) => (
              <div key={menu.id} className='overflow-hidden'>
                <div className='h-96 overflow-hidden rounded-t-xl'>
                  {menu.imageUrl && (
                    <img
                      src={`http://localhost:5001${menu.imageUrl}`}
                      alt={menu.name}
                      className='w-full h-full object-cover'
                    />
                  )}
                </div>
                <div className='flex justify-between items-start py-3'>
                  <h4 className='text-xl font-medium mb-2 text-white'>
                    {menu.name}
                  </h4>
                  <p className='text-neutral-400 font-medium text-lg'>
                    Rp {menu.price?.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='max-w-5xl mx-auto py-32 px-4'>
        <h2 className='text-5xl font-bold text-center mb-16'>
          Ada Pertanyaan?
        </h2>

        <div className='space-y-6'>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`cursor-pointer w-full border px-8 py-6 flex flex-col justify-center items-start 
                mb-4 transition-all duration-300 rounded-lg ${
                  activeIndex === index
                    ? 'border-chineseOraange bg-chineseOraange bg-opacity-10'
                    : 'border-gray-300'
                }`}
              onClick={() => toggleFAQ(index)}
            >
              <h4
                className={`text-xl font-medium flex justify-between items-center w-full ${
                  activeIndex == index ? 'text-white' : ''
                }`}
              >
                {faq.question}
                <span className='text-2xl ml-4'>
                  {activeIndex === index ? '−' : '+'}
                </span>
              </h4>

              <p
                className={`text-lg me-8 text-white mt-4 overflow-hidden transition-all duration-300 ${
                  activeIndex === index
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className='bg-[#F9F6EE] py-28'>
        <div className='max-w-7xl mx-auto flex justify-between gap-24'>
          <div className='mb-10'>
            <h2 className='text-6xl font-semibold text-gray-800 pb-4'>
              4.9<span className='text-2xl'>/5</span>
            </h2>
            <p className='text-md text-gray-700 w-60'>
              Lebih dari <strong>450</strong>
              <br />
              memberikan nilai<span className='font-semibold'>
                {' '}
                5 bintang
              </span>{' '}
              untuk menu dan pelayanan kami.
            </p>
          </div>

          {/* Review Cards */}
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
            {reviews.map((rev, index) => (
              <ReviewCard key={index} review={rev} />
            ))}
          </div>
        </div>
      </section>

      <section className='p-96 flex justify-center items-center'>
        <h3 className='text-3xl'>Ini section sementara</h3>
      </section>

      <section className='mx-3 my-8'>
        <div className='relative w-full h-[520px] overflow-hidden rounded-3xl'>
          <img src={baksoBg} className='w-full h-full object-cover' />
          <div class='absolute inset-0 bg-black opacity-60'></div>

          <div className='absolute inset-0 flex flex-col items-center justify-center z-10'>
            <h4 className='text-5xl text-white text-center w-4/5 font-semibold'>
              Waktunya manjain perutmu dengan rasa terbaik. Pilih menu dan pesan
              sekarang juga!
            </h4>
            <button
              onClick={() => navigate('/menu')}
              className='py-2.5 px-7 text-white font-medium bg-chineseOraange
                    transition-colors rounded-full mt-12'
            >
              Pesan Sekarang
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
