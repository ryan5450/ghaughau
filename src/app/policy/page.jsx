import React from 'react';
import Navbar from '../../../components/Navbar';
import Navbar2 from '../../../components/Navbar2';
import Footer from '../../../components/Footer';
const Policy = () => {
  return (
    <div className='flex flex-col h-screen justify-between'>
        <header>
        <Navbar/>
        <Navbar2/>
        </header>
      <div style={{ fontFamily: 'Acme, sans-serif' }} className="bg-[#F1DBE2] min-h-screen">
        <h1 className="text-center text-4xl font-bold text-[#8174A0] py-8">
          Policy
        </h1>
      </div>
      <footer>
          <Footer/>
    </footer>
    </div>
  );
};

export default Policy;
