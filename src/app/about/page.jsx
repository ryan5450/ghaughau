import React from 'react';
import Navbar from '../../../components/Navbar';
import Navbar2 from '../../../components/Navbar2';
import Footer from '../../../components/Footer';
const About = () => {
  return (
    <div className='flex flex-col h-screen justify-between'>
        <header>
        <Navbar/>
        <Navbar2/>
        </header>
    
    <div className="bg-[#F1DBE2] min-h-screen">
      <h1 className="text-center text-4xl font-bold text-[#8174A0] py-8">
        About Us
      </h1>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <p className="text-[#8174A0] text-lg">
          Welcome to our Pet Adoption Platform! We are dedicated to
          connecting loving homes with adorable pets in need of a family.
          Our mission is to make pet adoption a simple, seamless, and
          joyful experience for both pets and their new owners. Whether you
          are looking for a furry friend or hoping to give one a forever
          home, we are here to guide you every step of the way.
        </p>
        <p className="mt-6 text-[#8174A0] text-lg">
          Our platform provides a wide range of pets for adoption, from
          dogs and cats to small animals and exotic pets. We carefully
          vet each pet and ensure that they are ready for adoption by
          reviewing their health status and temperament. Our goal is to
          provide pets with the best care and help them find their perfect
          match.
        </p>
        <p className="mt-6 text-[#8174A0] text-lg">
          We believe that every pet deserves a loving home, and we are
          committed to making that happen. Thank you for supporting our
          mission and being part of our community. We hope you find the
          perfect companion!
        </p>
      </div>
    </div>
    <footer>
          <Footer/>
    </footer>
    </div>
  );
};

export default About;
