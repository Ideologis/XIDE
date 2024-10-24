
import { HiOutlineShoppingCart, HiBars4, HiXMark } from "react-icons/hi2";
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
      <div className="banner bg-black flex justify-center  items-center gap-20 p-3  max-sm:flex-col max-sm:gap-4">
        <div className="flex max-sm:flex-col max-sm:items-center">
          <h2 className="mx-4 text-white max-sm:mb-3 max-sm:text-center max-sm:text-sm ">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          </h2>
          <a href="" className="font-bold underline  text-white max-sm:text-sm">
            ShopNow
          </a>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="language-select" className="text-white max-sm:text-sm">Choose a language </label>
          <select id="language-select" onChange={handleLanguage} value={language}>
            <option value="English">English</option>
            <option value="Deutsch">Deutsch</option>
            <option value="French">French</option>
          </select>
        </div>
      </div>

      <nav
        className={`fixed w-full bg-white z-50 transition-all duration-300 ${
          scrollY > 0 ? "top-0" : "top-[60px]"
        }`}
      >
        <div className="mx-auto px-4 max-sm:px-6 lg:px-8">
          <div className="flex justify-around max-sm:justify-between items-center h-16">
            <h2 className="font-bold text-xl">XIDE</h2>

            {/* Desktop Menu */}
            <div className="max-sm:hidden lg:flex items-center space-x-8">
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

              {/* Mobile Menu Button */}
              <div className="hidden max-sm:block">
                <button
                  onClick={toggleMenu}
                  className="text-gray-700 hover:text-gray-900"
                >
                  <HiBars4 size={24} />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Slide-in Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
                className="fixed top-0 right-0 bottom-0 w-full bg-slate-500 shadow-lg z-50 lg:hidden "
              >
                <div className="p-0 w-full">
                  <button
                    onClick={toggleMenu}
                    className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
                  >
                    <HiXMark size={24} />
                  </button>
                  <ul className="mt-14 p-4 bg-white flex  justify-between items-center">
                    {menuItems.map((item) => (
                      <li key={item}>
                        <a
                          href={`#${item.toLowerCase()}`}
                          className="text-gray-700 hover:text-gray-900 block bg-white py-2"
                          onClick={toggleMenu}
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <div className="space-y-4 bg-white">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search..."
                        className="w-full py-2 px-4 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent placeholder:text-sm"
                      />
                      <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <BiSearch size={19} />
                      </button>
                    </div>
                    <div className="flex justify-around">
                      <FiHeart
                        size={20}
                        className="text-gray-700 hover:text-gray-900 cursor-pointer m-2"
                      />
                      <NavLink to="/Cart">
                        <HiOutlineShoppingCart
                          size={20}
                          className="text-gray-700 hover:text-gray-900 cursor-pointer"
                        />
                      </NavLink>
                    </div>
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
