import { useContext, useState } from "react";
import { CartContext } from "../../components/CartProvider";
import { Button } from "@/components/ui/button";
import Navbar from "../../components/Navbar/Navbar";
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
            <Navbar />
            <div className="flex-grow mt-9">
                {cartState.items.length === 0 ? (
                    <div className="flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 p-4 m-10 mx-auto">
                        <div className="max-w-sm p-8 bg-white rounded-lg shadow-lg transform transition-transform duration-500 hover:-translate-y-1 hover:shadow-2xl">
                            <p className="text-2xl font-semibold mb-5 text-gray-700">
                                Your Cart is Empty
                            </p>
                            <NavLink
                                to="/"
                                className="text-white bg-blue-500 hover:bg-blue-600 font-semibold px-4 py-2 rounded-lg transition-colors duration-300 ease-in-out hover:underline"
                            >
                                Continue Shopping
                            </NavLink>
                        </div>
                    </div>
                ) : (
                    <div className="overflow-y-auto px-10 mt-20">
                        <table className="min-w-full bg-white border border-gray-300 mx-auto shadow-md ">
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
            <div className="up flex justify-between mb-8 px-10 py-4">
                <NavLink
                    to="/"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105 hover:bg-green-600"
                >
                    Return To Shop
                </NavLink>
                <Button
                    onClick={handleUpdateCart}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105 hover:bg-green-600"
                >
                    Update Cart
                </Button>
            </div>

            {/* //Subtotal */}
            {showTotal && (
                <div className="border border-gray-300 rounded px-[30%] py-10 m-8">
                    <h2 className="text-lg font-semibold mb-4">Cart Total</h2>
                    <div className="flex justify-between mb-2">
                        <span className="font-semibold">SubTotal</span>
                        <span className="font-semibold">
                            ₦{cartState.total.toLocaleString()}
                        </span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="font-semibold">Shipping:</span>
                        <span className="font-semibold">Free</span>
                    </div>

                    <button
                        onClick={handleCheckout}
                        className="bg-red-500 hover:bg-green-600 mt-8 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 w-full max-sm:py-1 max-sm:px-2 max-sm:items-center"
                    >
                        Checkout
                    </button>
                </div>
            )}
            <Footer />
        </div>
    );
}

export default Cart;
