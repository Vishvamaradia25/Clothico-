import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const { getCartItemCount } = useCart();

  return (
    <nav className="bg-white shadow-2xl text-black py-2 border-b-2 border-gray-100 cursor-pointer">
      <div className="container mx-auto flex justify-between items-center">
        
        <Link to="/" className="relative flex items-center">
          <img
            src="/assets/logo.png" 
            alt="CLOTHICO Logo"
            className="h-14 max-h-[60px] w-auto" 
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex">
        
          <Link to="/" className="relative text-orange-900 hover:text-orange-700 font-bold ml-4 mr-2 after:content-[''] after:absolute after:bottom-[-10px] after:left-0 after:w-full after:h-1 after:bg-orange-700 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100" >          
             Home     
          </Link>
          <Link to="/about" className="relative text-orange-900 hover:text-orange-700 font-bold ml-4 mr-6 after:content-[''] after:absolute after:bottom-[-10px] after:left-0 after:w-full after:h-1 after:bg-orange-700 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100">
             About Us
           </Link>

          <div
            className="relative group"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setTimeout(() => setIsDropdownOpen(false), 600)}
          >
            <Link
              to="#"
               className="relative mr-2 text-orange-900 hover:text-orange-700 font-bold after:content-[''] after:absolute after:bottom-[-10px] after:left-0 after:w-full after:h-1 after:bg-orange-700 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 group-hover:after:scale-x-100"
             >
               Products
             </Link>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-md p-2 z-50 w-48 mt-5">
                <ul className="flex flex-col items-center space-y-3">
                  <li>
                    <Link to="/products" className="block text-orange-900 hover:text-orange-800 font-medium">
                      All Products
                    </Link>
                  </li>
                  <li>
                    <Link to="/products/men" className="block text-orange-900 hover:text-orange-800 font-medium">
                      Men
                    </Link>
                  </li>
                  <li>
                    <Link to="/products/women" className="block text-orange-900 hover:text-orange-800 font-medium">
                      Women
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <Link to="/contact" className="relative text-orange-900 hover:text-orange-700 font-bold ml-4 mr-6 after:content-[''] after:absolute after:bottom-[-10px] after:left-0 after:w-full after:h-1 after:bg-orange-700 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100">
             Contact Us
          </Link>
         

          {/* Login Icon */}
          <Link to="/login" className="text-orange-900 hover:text-orange-800 font-bold ml-10 flex items-center">
            <FaUserCircle size={20} className="mr-2" /> 
          </Link>

          {/* Cart Icon */}
          <Link to="/cart" className="ml-0 relative">
            <img src="/assets/shopping-cart-icon-sm.png" alt="Cart" className="h-6 w-7" />
            {getCartItemCount() > 0 && (
              <span className="absolute -top-4 right-0 text-xs font-bold text-black rounded-full px-2 py-1">
                {getCartItemCount()}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-orange-900">
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Links */}
      {isOpen && (
        <div className="md:hidden bg-white text-orange-900">
          <Link to="/" className="block px-4 py-2 hover:text-orange-800 font-bold" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/about" className="block px-4 py-2 hover:text-orange-800 font-bold" onClick={toggleMenu}>
            About Us
          </Link>
          <Link to="/contact" className="block px-4 py-2 hover:text-orange-800 font-bold" onClick={toggleMenu}>
            Contact Us
          </Link>

          {/* Categories Dropdown in Mobile */}
          <div className="block px-4 py-2 cursor-pointer">
            <button onClick={toggleDropdown} className="flex justify-between w-full font-bold">
              Products
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="bg-white text-orange-900 rounded-md shadow-md w-40 mt-2 z-50">
                <Link to="/products" className="block px-4 py-2 hover:text-orange-800 font-bold" onClick={toggleMenu}>
                  All Products
                </Link>
                <Link to="/products/men" className="block px-4 py-2 hover:text-orange-800 font-bold" onClick={toggleMenu}>
                  Men
                </Link>
                <Link to="/products/women" className="block px-4 py-2 hover:text-orange-800 font-bold" onClick={toggleMenu}>
                  Women
                </Link>
              </div>
            )}
          </div>

          <Link to="/login" className="block px-4 py-2 hover:text-orange-800 font-bold" onClick={toggleMenu}>
            Login
          </Link>
          <Link to="/cart" className="block px-4 py-2 hover:text-orange-800 font-bold" onClick={toggleMenu}>
            Cart
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

