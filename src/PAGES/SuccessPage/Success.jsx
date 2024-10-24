import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
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
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md w-full">
          <div className="text-green-500">
            <FaCheckCircle className="mx-auto text-6xl" />
          </div>
          <h2 className="text-2xl font-bold text-green-600 mt-4">
            Payment Successful
          </h2>
          <p className="mt-4 text-gray-600">
            Thank you for choosing <b>XIDE</b> , your order will be generated based on
            your delivery request.
          </p>
          <p className="text-gray-600">
            The receipt has been sent to your email.
          </p>

          <div className="mt-6 text-gray-500">
            <p>Please contact us for any query:</p>
            <p className="font-medium">{contactInfo.phone}</p>
            <p className="font-medium">{contactInfo.email}</p>
          </div>

          <button
            onClick={handleReturnHome}
            className="mt-8 bg-blue-500  text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-green-600 transform hover:scale-105"
          >
            Return to Home
          </button>
        </div>
      </div>
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
    </>
  );
};



export default Success;
