import React from 'react';
import Navbar from '../../../components/Navbar';
import Navbar2 from '../../../components/Navbar2';
import Footer from '../../../components/Footer';
import RefineSearchAndPets from '../../../components/RefineSearchAndPets';


const Adopt = () => {
  return (
    <div className='flex flex-col h-screen justify-between'>
        <header>
        <Navbar/>
        <Navbar2/>
        </header>

        <div className=' bg-nav_color'>

          <RefineSearchAndPets/>
        </div>

        <footer>
          <Footer/>
        </footer>
        

    </div>
  );
};

export default Adopt;
