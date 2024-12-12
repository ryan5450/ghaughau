"use client";

import React, { useState } from 'react';
import Navbar from '../../../components/Navbar';
import Navbar2 from '../../../components/Navbar2';
import Footer from '../../../components/Footer';

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [userQuestion, setUserQuestion] = useState('');
  const [submittedQuestions, setSubmittedQuestions] = useState([]);
  
  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleQuestionChange = (e) => {
    setUserQuestion(e.target.value);
  };

  const handleSubmitQuestion = (e) => {
    e.preventDefault();
    if (userQuestion.trim()) {
      setSubmittedQuestions([...submittedQuestions, { question: userQuestion, answer: "Thanks for your question! We will get back to you soon." }]);
      setUserQuestion(''); // Clear the input after submission
    }
  };

  const faqs = [
    {
      question: "How can I adopt a pet?",
      answer: "To adopt a pet, browse our available animals, select the one you’re interested in, and fill out an adoption application. Once approved, you'll be guided through the adoption process."
    },
    {
      question: "What are the adoption fees?",
      answer: "Adoption fees vary depending on the pet's age, size, and breed. Please check the pet’s details page for specific fee information."
    },
    {
      question: "Can I adopt a pet if I live in an apartment?",
      answer: "Yes, you can adopt a pet if you live in an apartment. However, make sure the pet you choose is suitable for apartment living, and ensure your building's pet policy allows it."
    },
    {
      question: "What happens if I can't keep my adopted pet?",
      answer: "If you're unable to keep your adopted pet, please contact us. We will work with you to find the best solution, including rehoming the pet if necessary."
    },
    {
      question: "Do you have pets available for adoption outside of my area?",
      answer: "Yes, we work with a network of shelters across the country. Pets from other areas can be available for adoption, but transportation may take extra time."
    },
    {
      question: "Can I volunteer to help with pet adoption?",
      answer: "Yes, we welcome volunteers to help with various tasks like pet care, event coordination, and administrative support. Contact us to learn more about volunteer opportunities."
    },

  ];

  return (
    <div className='flex bg-[#F1DBE2] flex-col h-screen justify-between'>
      <header>
        <Navbar />
        <Navbar2 />
      </header>
    
      <div style={{ fontFamily: 'Acme, sans-serif' }} className="bg-[#F1DBE2] min-h-screen">
        <h1 className="text-center text-4xl font-bold text-[#8174A0] py-8">FAQs</h1>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
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
          {/* Render submitted user questions */}
          {submittedQuestions.map((submitted, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md mb-4 cursor-pointer"
            >
              <h2 className="text-lg font-semibold text-[#4B3F72]">{submitted.question}</h2>
              <p className="mt-2 text-[#6B5B8C]">{submitted.answer}</p>
            </div>
          ))}
          
          {/* Question Submission Form */}
          <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-[#4B3F72]">Have a Question?</h2>
            <form onSubmit={handleSubmitQuestion} className="mt-4">
              <textarea
                value={userQuestion}
                onChange={handleQuestionChange}
                rows="4"
                className="w-full p-2 border rounded-lg"
                placeholder="Ask us anything!"
              />
              <button
                type="submit"
                className="mt-4 bg-[#FFC585] text-white px-6 py-2 rounded-lg"
              >
                Submit Question
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Faqs;
