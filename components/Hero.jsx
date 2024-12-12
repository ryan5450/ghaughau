import React from 'react';

const Hero = () => {
  return (
    <div
      style={{
        backgroundColor: '#F1DBE2',
        fontFamily: 'Acme, sans-serif',
        height: 'calc(100vh - 64px)', 
        marginTop: '0px',
      }}
      className="flex flex-col items-center justify-center text-center"
    >
      <h2 className="text-6xl mb-2 lg:text-8xl font-extrabold text-[#8174A0] text-center leading-tight px-4">
        Planning to adopt your new companion?
      </h2>
      <div className="w-full">
        <img
          src="/heroimage.svg"
          className="w-full object-cover mt-8"
        />
      </div>
    </div>
  );
};

export default Hero;
