
import Navbar from './components/Navbar/Navbar'; // Assuming this is the correct path
import {NavLink} from "react-router-dom";
const V2Pages = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 ">
        <div className="flex flex-col items-center justify-center ">
          {" "}
          {/* Adjust based on Navbar height */}
          <div className="bg-white p-2 rounded-lg shadow-lg text-center max-w-md w-full mt-40">
            <div className="text-purple-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-20 w-20 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-purple-600 mt-6">
              The wait is almost over...
            </h2>
            <p className="mt-4 text-gray-700 text-lg">
              You → The reason we keep innovating Thank you for choosing us! ❤️
            </p>
            <h1 className="text-gray-600 mt-2 font-bold">
              Expect this page in the next release
            </h1>

            <div className="mt-8 space-y-4">
              <NavLink
                to="/"
                className="bg-blue-500 text-white px-6 py-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105  hover:bg-purple-600"
              >
                Return To Shop
              </NavLink>
              
              <p className="text-sm text-gray-500">
                Share your experience with us on social media using #Ideologist
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default V2Pages;
