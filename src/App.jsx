import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./PAGES/HomePage/Home";

import Cart from "./PAGES/CartPage/Cart";
import SignUp from "./PAGES/SignUp/SignUp";
import CartProvider from "./components/CartProvider.jsx";
import CheckOut from "./PAGES/CheckOut/CheckOut.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Success from "./PAGES/SuccessPage/Success.jsx";
// Make sure you have this component
import Protect from "./components/Protected.jsx";
import V2Pages from "./v2Pages.jsx";  // Changed to PascalCase


function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route
            path="/success"
            element={
              <Protect>
                <Success />
              </Protect>
            }
          />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/contact" element={<V2Pages />} /> 
          <Route path="/about" element={<V2Pages />} /> 
         
        </Routes>
        <ToastContainer />
      </CartProvider>
    </Router>
  );
}

export default App;
