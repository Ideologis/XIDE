import { useContext, useState } from "react";
import {HiXMark} from "react-icons/hi2"
import { CartContext } from "../../components/CartProvider";
import { Button } from "@/components/ui/button";
import Footer from "../../components/Footer/Footer";
import { GiBattery100, GiBattery25 } from "react-icons/gi";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function Cart() {
    const { cartState, dispatch } = useContext(CartContext);
    const [showTotal, setShowTotal] = useState(false);
    const navigate = useNavigate();

    const removeFromCart = (id) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
    };

    const handleQuantityChange = (item, change) => {
        const newQuantity = item.quantity + change;
        if (newQuantity > 0) {
            dispatch({
                type: "UPDATE_QUANTITY",
                payload: { id: item.id, quantity: newQuantity },
            });
        }
    };

    const handleUpdateCart = () => {
        if (cartState.items.length === 0) {
            toast.info("Your cart is currently empty.", {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } else {
            setShowTotal(true);
        }
    };

    const handleCheckout = () => {
        if (cartState.userEmail) {
            // User is logged in
            navigate("/checkout");
        } else {
            // User is not logged in, redirect to SignUp
            navigate("/SignUp");
        }
    };

    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow mt-20 max-sm:mt-16">
          {cartState.items.length === 0 ? (
            <div className="flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 p-4 m-10 mx-auto max-sm:m-4">
              <div className="max-w-sm p-8 bg-white rounded-lg shadow-lg transform transition-transform duration-500 hover:-translate-y-1 hover:shadow-2xl max-sm:p-6">
                <p className="text-2xl font-semibold mb-5 text-gray-700 max-sm:text-xl max-sm:text-center">
                  Your Cart is Empty
                </p>
                <NavLink
                  to="/"
                  className="text-white bg-purple-700 hover:bg-green-600 font-semibold px-4 py-2 rounded-lg transition-colors duration-300 ease-in-out hover:scale-105 block text-center"
                >
                  Continue Shopping
                </NavLink>
              </div>
            </div>
          ) : (
            <div className="px-10 mt-20 max-sm:px-4 max-sm:mt-16">
              {/* Mobile Cart View */}
              <div className="hidden max-sm:block space-y-4">
                {cartState.items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-md p-4 relative"
                  >
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-600"
                    >
                      <HiXMark />
                    </button>
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">
                          {item.name}
                        </h3>
                        <p className="text-purple-700 font-bold mt-1">
                          ₦{item.price}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center bg-gray-100 rounded-lg p-1">
                            <button
                              onClick={() => handleQuantityChange(item, -1)}
                              className="w-8 h-8 flex items-center justify-center text-gray-600"
                            >
                              <GiBattery25 size={16} />
                            </button>
                            <span className="w-8 text-center font-semibold">
                              {item.quantity.toString().padStart(2, "0")}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item, 1)}
                              className="w-8 h-8 flex items-center justify-center text-gray-600"
                            >
                              <GiBattery100 size={16} />
                            </button>
                          </div>
                          <p className="font-bold text-green-600">
                            ₦{(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Cart View */}
              <table className="min-w-full bg-white border border-gray-300 mx-auto shadow-md max-sm:hidden">
                <thead>
                  <tr className="bg-gray-100 uppercase text-sm text-gray-500 leading-normal shadow-md">
                    <th className="p-2 text-center">Product</th>
                    <th className="p-2 text-center">Price</th>
                    <th className="p-2 text-center">Quantity</th>
                    <th className="p-2 text-center">Total</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {cartState.items.map((item) => (
                    <tr
                      key={item.id}
                      className="w-full max-w-md bg-white shadow-lg rounded-lg p-4 border-b-2 border-gray-300 border-spacing-4  hover:shadow-xl transition-shadow duration-300 ease-in-out"
                    >
                      <td className="font-semibold flex items-center justify-around p-2 gap-2 ">
                        <div className="relative">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="absolute top-0 right-full bg-red-500 text-white text-xs p-1 rounded-full hover:bg-red-600"
                          >
                            X
                          </button>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12"
                          />
                        </div>
                        {item.name}
                      </td>
                      <td className="text-center font-bold">{item.price}</td>
                      <td className="text-center">
                        <div className="flex items-center justify-center">
                          <div className="flex items-center">
                            <button
                              onClick={() => handleQuantityChange(item, -1)}
                              className="text-gray-500 hover:text-red-700"
                            >
                              <GiBattery25 size={16} />
                            </button>
                            <input
                              type="text"
                              value={item.quantity.toString().padStart(2, "0")}
                              className="w-12 text-center border rounded-md mx-2 font-semibold"
                              readOnly
                            />
                            <button
                              onClick={() => handleQuantityChange(item, 1)}
                              className="text-gray-500 hover:text-green-700"
                            >
                              <GiBattery100 size={16} />
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="text-center font-semibold">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="text-xl font-bold mt-4"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="up flex justify-between mb-8 px-10 py-4 max-sm:px-4 max-sm:flex-col max-sm:gap-4">
          <NavLink
            to="/"
            className="bg-purple-700 text-white px-6 py-3 rounded-lg transition duration-300 max-sm:text-center ease-in-out transform hover:scale-105 hover:bg-green-600 max-sm:w-full"
          >
            Return To Shop
          </NavLink>
          <Button
            onClick={handleUpdateCart}
            className="bg-purple-700 text-white px-6 py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-green-600 max-sm:w-full"
          >
            Proceed to Checkout
          </Button>
        </div>

        {/* Cart Total Section */}
        {showTotal && (
          <div className="border border-gray-300 rounded-lg px-[30%] py-10 m-8 max-sm:px-6 max-sm:m-4 max-sm:py-6 bg-white shadow-lg">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
              Cart Total
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b">
                <span className="text-gray-600">SubTotal</span>
                <span className="font-semibold text-purple-700">
                  ₦{cartState.total.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>
              <button
                onClick={handleCheckout}
                className="bg-purple-700 text-white px-6 py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-green-600 max-sm:w-full"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
        <Footer />
      </div>
    );
}

export default Cart;
