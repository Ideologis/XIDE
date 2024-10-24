// Start of Selection
import { FaUser, FaCreditCard, FaCalendar, FaLock } from "react-icons/fa6";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useEmailSender } from "../../Features/Email";
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../CartProvider';
import { useNavigate } from 'react-router-dom';


const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

const schema = yup.object().shape({
  cardholderName: yup
    .string()
    .matches(
      /^[A-Za-z\s]+$/,
      "Cardholder name must contain only letters and spaces"
    )
    .required("Cardholder Name is required"),
  cardNumber: yup
    .string()
    .test(
      "len",
      "Card number must be 16 digits",
      (val) => !val || val.replace(/\s/g, "").length === 16
    )
    .required("Card number is required"),
  expiryDate: yup
    .string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry date must be in MM/YY format")
    .test("is-valid-date", "Invalid expiry date", function (value) {
      if (!value) return false;
      const [month, year] = value.split("/").map(Number);
      const expYear = 2000 + year;
      if (
        expYear < currentYear ||
        (expYear === currentYear && month < currentMonth)
      ) {
        return false;
      }
      return true;
    })
    .required("Expiry date is required"),
  securityCode: yup
    .string()
    .matches(/^\d{4}$/, "Security code must be 4 digits")
    .required("Security code is required"),
});
const BankCard = () => {
  const navigate = useNavigate();
  const sendEmail = useEmailSender();
  const { cartState, dispatch } = useContext(CartContext);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    if (cartState.userEmail) {
      setUserEmail(cartState.userEmail);
    } else {
      console.error('No email found in cartState');
    }
  }, [cartState.userEmail]);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });
  const handleInput = (e) => {
    const input = e.target.value.replace(/\s/g, "");
    let formattedInput = "";
    for (let i = 0; i < input.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedInput += " ";
      }
      formattedInput += input[i];
    }
    setValue('cardNumber', formattedInput.trim(), { shouldValidate: true })
  }
  const handleKeyDown = (e) => {
    const { value } = e.target;
    const numericValue = value.replace(/\s/g, "");

    // Allow Backspace, Arrow keys, and Tab
    if (
      !/^\d$/.test(e.key) &&
      e.key !== "Backspace"
    ) {
      e.preventDefault();
      return;
    }

    // Prevent input if maximum length is reached
    if (numericValue.length >= 16 && e.key !== "Backspace") {
      e.preventDefault();
    }
  };
  const onSubmit = async (data) => {
    try {
      if (!userEmail) {
        console.error('User email not found. Please ensure you are logged in.');
        // You might want to show an error message to the user here
        return;
      }
      await sendEmail({ ...data, userEmail });
      console.log('Card added and email sent successfully');
          // Start of Selection
          dispatch({ type: "CLEAR_CART" });
      navigate('/success');
    } catch (error) {
      console.error('Error submitting card details or sending email:', error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg ">
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Add Card</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Cardholder Name
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                {...register("cardholderName")}
                type="text"
                placeholder="John Doe"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyDown={(e) => {
                  if (!/[A-Za-z\s]/.test(e.key) && e.key !== "Backspace") {
                    e.preventDefault();
                  }
                }}
              />
            </div>
            {errors.cardholderName && (
              <p className="text-sm text-red-600">
                {errors.cardholderName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Card Number
            </label>
            <div className="relative">
              <FaCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                // Start of Selection
                {...register("cardNumber")}
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onInput={handleInput}
                onKeyDown={handleKeyDown}
              />
            </div>
            {errors.cardNumber && (
              <p className="text-sm text-red-600">
                {errors.cardNumber.message}
              </p>
            )}
          </div>

          <div className="flex space-x-4">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Expiry Date
              </label>
              <div className="relative">
                <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  {...register("expiryDate")}
                  type="text"
                  placeholder="MM/YY"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              {errors.expiryDate && (
                <p className="text-sm text-red-600">
                  {errors.expiryDate.message}
                </p>
              )}
            </div>

            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Security Code
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  {...register("securityCode")}
                  type="password"
                  placeholder="***"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  maxLength={4}
                  onKeyDown={(e) => {
                    if (!/^\d$/.test(e.key) && e.key !== "Backspace") {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
              {errors.securityCode && (
                <p className="text-sm text-red-600">
                  {errors.securityCode.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Add Card
          </button>
        </form>

        <div className="mt-6">
          <img
            src="/Frame 834.png"
            alt="Supported payment methods"
            className="mx-auto max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default BankCard;
