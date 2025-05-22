import { useEffect } from 'react';
import Navbar from '../components/Navbar';


function Home() {
  useEffect(() => {
    document.title = 'Ratu Boga | Home';
  }, []);

  return (
    <>
      <Navbar />
    </>
  );
}

export default Home;
