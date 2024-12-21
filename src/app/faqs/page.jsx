"use client";

import React, { useState } from 'react';
import Navbar from '../../../components/Navbar';
import Navbar2 from '../../../components/Navbar2';
import Footer from '../../../components/Footer';

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const faqs = [
    { question: "How can I adopt a pet?", answer: "To adopt a pet, browse our available animals, select the one you're interested in, and fill out an adoption application." },
    { question: "What are the adoption fees?", answer: "Adoption fees vary depending on the pet's age, size, and breed. Check the pet's details page for specific fee information." },
    { question: "Can I adopt a pet if I live in an apartment?", answer: "Yes, you can adopt a pet if you live in an apartment. Make sure the pet is suitable for apartment living, and your building's pet policy allows it." },
    { question: "What happens if I can't keep my adopted pet?", answer: "If you're unable to keep your adopted pet, please contact us. We will help find the best solution, including rehoming if necessary." },
    { question: "Do you have pets available for adoption outside of my area?", answer: "Yes, we work with shelters across the country. Pets from other areas can be available, but transportation may take extra time." },
    { question: "Can I volunteer to help with pet adoption?", answer: "Yes, volunteers are welcome to assist with pet care, event coordination, and administrative tasks. Contact us to learn more." },
    { question: "What should I bring when adopting a pet?", answer: "Bring a valid ID, proof of address, and your adoption application form. Depending on the pet, you may need a crate or leash." },
    { question: "How do I prepare my home for a new pet?", answer: "Pet-proof your home by securing dangerous items. Set up a designated area for the pet, including bedding, toys, and food." },
    { question: "What if I have other pets at home?", answer: "Introduce your new pet to your existing pets slowly and under supervision. Some pets may need time to adjust." },
    { question: "Can I adopt a pet if I have allergies?", answer: "Yes, but you should consider adopting hypoallergenic breeds and speak with an allergist to find the best pet for you." },
    { question: "Are the pets vaccinated?", answer: "No all our pets are not, but will be vaccinated according to their age and health status. You will receive their medical records when adopting." },
    { question: "Can I adopt a pet if I work full-time?", answer: "Yes, but ensure your pet will have proper care during the day, such as a pet sitter or dog walker." },
    { question: "Do you offer pet insurance?", answer: "We don't offer insurance directly, but we can recommend providers that offer coverage for adopted pets." },
    { question: "How do I know if a pet is the right fit for me?", answer: "We provide detailed profiles of each pet, including temperament, energy levels, and care needs to help you find the right match." },
    { question: "Do you have senior pets available for adoption?", answer: "Yes, we have senior pets looking for loving homes. They make great companions and are often already trained." },
    { question: "Can I adopt a pet for someone else?", answer: "Yes, you can adopt a pet on behalf of someone else, but the adoption process must be completed in the name of the person adopting." },
    { question: "What happens after I submit an adoption application?", answer: "After submission, we review your application, and if approved, we schedule a meet-and-greet with the pet." },
    { question: "Can I return an adopted pet?", answer: "We hope it never comes to this, but if necessary, contact us, and we will assist with the return or rehoming of your pet." },
    { question: "Do you have pets that are good with children?", answer: "Yes, we have pets that are child-friendly. Each pet's profile includes details about their compatibility with children." },
    { question: "Can I adopt a pet from abroad?", answer: "Yes, we facilitate international adoptions, but please be aware that travel arrangements and permits can take additional time." },
    { question: "Do you provide training for newly adopted pets?", answer: "We offer basic guidance on pet care and behavior, but we recommend enrolling in a local training program for specific needs." },
    { question: "What if I am unsure about adopting?", answer: "If you're unsure, we can help guide you through the decision-making process by providing more information on specific pets and their needs." },
    { question: "Can I adopt a pet if I'm a first-time pet owner?", answer: "Yes, first-time pet owners are welcome. We provide resources to help you get prepared and ensure a successful adoption." },
    { question: "How do I schedule a visit with a pet?", answer: "You can schedule a visit by contacting us through the pet's profile page. We will arrange a suitable time for you to meet the pet." },
    { question: "Can I adopt a pet if I'm under 18?", answer: "To adopt a pet, you must be at least 18 years old. However, you can still volunteer to help with pet care." },
    { question: "What is the adoption process timeline?", answer: "The adoption process typically takes 1-2 weeks, including the application review, meet-and-greet, and home check." },
    { question: "Are there any special programs for pet adoption?", answer: "We offer special programs like senior pet adoption discounts, adoption events, and pet sponsorships." },
    { question: "Can I adopt a pet if I have a busy lifestyle?", answer: "Yes, but consider adopting a pet with lower activity needs, or arrange for additional care during your busy hours." },
    { question: "How do I know if my home is ready for a pet?", answer: "We recommend reviewing your home environment, time commitment, and financial readiness before adopting a pet." },
    { question: "Do you allow pet adoption trials?", answer: "We do not offer trial adoptions, but we provide support and guidance to ensure a smooth transition for both you and your new pet." },
    { question: "Can I adopt a pet from your platform if I live in a different country?", answer: "Yes, we facilitate international adoptions. Please check the adoption guidelines for specific country requirements." },
    { question: "What kind of follow-up care do you offer?", answer: "We offer follow-up calls and advice for the first few weeks after adoption to ensure the pet is settling in well." }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='flex bg-[#F1DBE2] flex-col h-screen justify-between'>
      <header>
        <Navbar />
        <Navbar2 />
      </header>
    
      <div style={{ fontFamily: 'Acme, sans-serif' }} className="bg-[#F1DBE2] min-h-screen">
        <h1 className="text-center text-4xl font-bold text-[#8174A0] py-8">FAQs</h1>
        <div className="max-w-3xl mx-auto">
          <div className="mb-4">
            <input 
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search questions..."
              className="w-full p-2 border rounded-lg text-[#4B3F72] focus:outline-none focus:ring-2 focus:ring-[#4B3F72]"
            />
          </div>
          {filteredFaqs.slice(0, 8).map((faq, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md mb-4 cursor-pointer"
              onClick={() => toggleAnswer(index)}
            >
              <h2 className="text-lg font-semibold text-[#4B3F72]">{faq.question}</h2>
              {activeIndex === index && (
                <p className="mt-2 text-[#6B5B8C]">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Faqs;
