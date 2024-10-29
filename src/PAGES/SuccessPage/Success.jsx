import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { FaCheckCircle } from 'react-icons/fa';

const contactInfo = {
  phone: '(+234) 810 000 0000',
  email: 'support@xide.com'
};

const Success = () => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    localStorage.setItem('showConfetti', 'true');
  }, []);

  const handleReturnHome = () => {
    setShowConfetti(true);
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-50 px-6">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full mx-auto max-sm:p-6 backdrop-blur-lg bg-white/80">
          <div className="text-green-500 mb-6 max-sm:mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-green-100 rounded-full scale-150 blur-xl opacity-50"></div>
              <FaCheckCircle className="mx-auto text-5xl relative z-10 max-sm:text-4xl" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mt-4 max-sm:text-xl">
            Payment Successful!
          </h2>

          <div className="mt-6 space-y-4 max-sm:mt-4">
            <p className="text-gray-600 max-sm:text-xs">
              Thank you for choosing <span className="font-bold text-purple-700">XIDE</span>, 
              your order will be generated based on your delivery request.
            </p>
            <p className="text-gray-600 max-sm:text-sm">
              The receipt has been sent to your email.
            </p>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-xl space-y-3 max-sm:mt-6 max-sm:p-3">
            <p className="text-gray-600 font-medium max-sm:text-sm">
              Contact Support
            </p>
            <div className="space-y-2">
              <p className="text-purple-700 font-semibold max-sm:text-sm">
                {contactInfo.phone}
              </p>
              <p className="text-purple-700 font-semibold max-sm:text-sm">
                {contactInfo.email}
              </p>
            </div>
          </div>

          <button
            onClick={handleReturnHome}
            className="mt-8 bg-purple-700 text-white font-semibold py-3.5 px-8 rounded-xl 
            transition duration-300 hover:bg-green-600 transform hover:scale-105 shadow-md
            w-full max-sm:mt-6 max-sm:py-3 max-sm:text-sm"
          >
            Return to Home
          </button>
        </div>
      </div>
      {showConfetti && (
        <Confetti 
          recycle={false} 
          numberOfPieces={200}
          colors={['#7C3AED', '#10B981', '#3B82F6', '#EC4899']}
        />
      )}
    </>
  );
};

export default Success;
