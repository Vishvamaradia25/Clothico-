import React, { useState, useEffect } from "react"; 
import { useCart } from "../context/CartContext";
import { FaStar, FaStarHalfAlt, FaRegStar, FaHeart, FaRegHeart } from "react-icons/fa";

const ProductCard = ({ id, name, price, imgSrc, description }) => {
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);
  const [rating, setRating] = useState(0);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    
    const randomRating = (Math.random() * 2.5 + 2.5).toFixed(1);
    setRating(parseFloat(randomRating));

    
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

  
  const handleWishlistToggle = () => {
    let updatedWishlist;
    if (wishlist.includes(id)) {
      updatedWishlist = wishlist.filter(itemId => itemId !== id);
    } else {
      updatedWishlist = [...wishlist, id];
    }
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  // Handle Add to Cart
  const handleAddToCart = () => {
    const product = { 
      id, 
      name, 
      price: Number(price), 
      imgSrc, 
      description: description || "No description available"
    };
    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };


  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index}>
        {rating >= index + 1 ? (
          <FaStar className="text-yellow-500" />
        ) : rating >= index + 0.5 ? (
          <FaStarHalfAlt className="text-yellow-500" />
        ) : (
          <FaRegStar className="text-gray-400" />
        )}
      </span>
    ));
  };

  return (
    <div className="flex flex-col h-full border rounded-lg shadow hover:shadow-lg transition duration-200 relative">
     
      <button
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition"
        onClick={handleWishlistToggle}
      >
        {wishlist.includes(id) ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
      </button>

      <img src={imgSrc} alt={name} className="w-full h-40 object-contain p-2" />
      <div className="p-4 flex-grow">
        <h3 className="text-sm font-semibold text-center leading-tight">{name}</h3>

       
        <div className="flex justify-center mt-2">{renderStars(rating)}</div>

        <p className="text-gray-500 text-center mt-2">₹{price.toFixed(2)}</p>

        <button 
          onClick={handleAddToCart} 
          className="mt-auto bg-orange-800 text-white py-2 px-4 rounded hover:bg-orange-700 w-full transition duration-200"
        >
          Add to Cart
        </button>

        {addedToCart && <div className="mt-2 text-green-600 text-center animate-pulse">Added to Cart Successfully!</div>}
      </div>
    </div>
  );
};

export default ProductCard;
