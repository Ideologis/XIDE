import {
  HiOutlineShoppingCart,
  HiMiniBars3BottomRight,
  HiXMark,
} from "react-icons/hi2";
import { BiSearch } from "react-icons/bi";
import { FiHeart } from "react-icons/fi";
import "./Navbar.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../CartProvider";

// Navbar component definition
const Navbar = () => {
  const { cartState } = useContext(CartContext);
  const getUserInitial = (email) => {
    return email ? email[0].toUpperCase() : "";
  };

  // State for language selection
  const [language, setLanguage] = useState("English");
  // State for menu visibility
  const [isOpen, setIsOpen] = useState(false);

  const [scrollY, setScrollY] = useState(0);

  // Function to toggle the menu visibility
  const toggleMenu = () => setIsOpen(!isOpen);

  // Update the useEffect hook
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        setScrollY(window.scrollY);
      };
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  // Variants for menu animation
  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  // Array of menu items
  const menuItems = ["Home", "Contact", "About", "SignUp"];

  // Function to handle language selection
  function handleLanguage(event) {
    setLanguage(event.target.value);
  }

  return (
    <div>
      <div className="banner bg-black flex justify-center items-center gap-20 p-3 max-sm:flex-col max-sm:gap-2 max-sm:p-2">
        <div className="flex max-sm:flex-col max-sm:items-center">
          <p className="mx-4  text-white max-sm:mx-2 max-sm:text-xs max-sm:text-center">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
            <a
              href=""
              className="font-bold underline text-white max-sm:text-xs max-sm:mt-1"
            >
              {" "}
              ShopNow
            </a>
          </p>
        </div>
        <div className="flex items-center gap-2 max-sm:text-xs">
          <label htmlFor="language-select" className="text-white">
            Choose a language{" "}
          </label>
          <select
            id="language-select"
            onChange={handleLanguage}
            value={language}
            className="max-sm:text-xs"
          >
            <option value="English">English</option>
            <option value="Deutsch">Deutsch</option>
            <option value="French">French</option>
          </select>
        </div>
      </div>
      <nav
        className={`fixed w-full bg-white z-50 transition-all duration-300 ${
          scrollY > 0 ? "top-0" : "top-[60px]"
        } ${scrollY > 0 ? "max-sm:top-0" : "max-sm:top-[80px]"}`}
      >
        <div className="mx-auto px-4 max-sm:px-3">
          <div className="flex justify-between items-center h-16 max-sm:h-14">
            <h2 className="font-bold text-xl max-sm:text-lg">XIDE</h2>

            {/* Desktop Menu */}
            <div className=" max-sm:hidden lg:flex items-center space-x-8">
              {menuItems.map((item) => (
                <NavLink
                  key={item}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-gray-700 hover:text-gray-900"
                >
                  {item}
                </NavLink>
              ))}
            </div>

            {/* Mobile Menu Button - Move to right side */}
            <div className="hidden max-sm:flex items-center gap-8 ">
              <NavLink to="/Cart" className="relative">
                <HiOutlineShoppingCart
                  size={20}
                  className="text-gray-700 hover:text-gray-900 cursor-pointer"
                />
                {cartState.items.length > 0 && (
                  <span className="bg-red-500 text-white rounded-full px-1.5 py-0.5 text-xs absolute -top-2 -right-2">
                    {cartState.items.length}
                  </span>
                )}
              </NavLink>
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-gray-900"
              >
                <HiMiniBars3BottomRight size={24} />
              </button>
            </div>

            {/* Desktop Search and Icons */}
            <div className="flex items-center  justify-around  gap-5 space-x-4 max-sm:hidden">
              <div className="relative">
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  className="w-full py-2 px-4 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent placeholder:text-sm"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <BiSearch size={19} />
                </button>
              </div>
              <FiHeart
                size={20}
                className="text-gray-700 hover:text-gray-900 cursor-pointer"
              />
              <NavLink to="/Cart">
                <HiOutlineShoppingCart
                  size={20}
                  className="text-gray-700 hover:text-gray-900 cursor-pointer"
                />
                {cartState.items.length > 0 && (
                  <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs absolute transform translate-x-1/2 -translate-y-1/2">
                    {cartState.items.length}
                  </span>
                )}
              </NavLink>
              <div className="flex items-center">
                {cartState.userEmail && cartState.showProfile && (
                  <NavLink to="/SignUp" className="relative group">
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white cursor-pointer">
                      {getUserInitial(cartState.userEmail)}
                    </div>
                    <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      <div className="px-4 py-2 text-sm text-gray-700 truncate">
                        {cartState.userEmail}
                      </div>
                    </div>
                  </NavLink>
                )}
                {/* {cartState.userEmail ? (
                  <span>Welcome, {cartState.userEmail}</span>
                ) : (
                  <span>Not logged in</span>
                )} */}
              </div>
            </div>
          </div>

          {/* Mobile Slide-in Menu update */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
                className="fixed top-0 right-0 bottom-0 w-full bg-white shadow-lg z-50 lg:hidden"
              >
                <div className="p-4 flex flex-col h-full">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-bold text-xl">Menu</h2>
                    <button
                      onClick={toggleMenu}
                      className="text-gray-700 hover:text-gray-900"
                    >
                      <HiXMark size={24} />
                    </button>
                  </div>

                  <div className="relative mb-6">
                    <input
                      type="text"
                      placeholder="What are you looking for?"
                      className="w-full py-2 px-4 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                    />
                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <BiSearch size={19} />
                    </button>
                  </div>

                  <ul className="space-y-4 flex flex-col items-center gap-8 mt-8">
                    {menuItems.map((item) => (
                      <li key={item}>
                        <NavLink
                          to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                          className="bg-purple-700 hover:bg-green-600 hover:text-black  text-white font-bold  py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 w-full text-center"
                          onClick={toggleMenu}
                        >
                          {item}
                        </NavLink>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex justify-around py-4 border-t">
                    <FiHeart
                      size={24}
                      className="text-gray-700 hover:text-gray-900 cursor-pointer"
                    />
                    {cartState.userEmail && cartState.showProfile && (
                      <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                        {getUserInitial(cartState.userEmail)}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
