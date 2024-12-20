import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Home from "./PAGES/HomePage/Home";
import Navbar from "./components/Navbar/Navbar"; // Adjusted path
import Cart from "./PAGES/CartPage/Cart";
// import SignUp from "./PAGES/SignUp/SignUp";
import CartProvider from "./components/CartProvider.jsx";
import CheckOut from "./PAGES/CheckOut/CheckOut.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Success from "./PAGES/SuccessPage/Success.jsx";
// Make sure you have this component
import Protect from "./components/Protected.jsx";
import V2Pages from "./v2Pages.jsx";  // Changed to PascalCase

const SignUp  = lazy(() => import("./PAGES/SignUp/SignUp"))
function App() {
  return (
    <Router>
      <CartProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar /> {/* Navbar is included here, so it appears on all pages */}
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
        </Suspense>
      </CartProvider>
    </Router>
  );
}

export default App;
