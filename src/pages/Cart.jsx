import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleIncrease = (id, currentQuantity) => {
    updateQuantity(id, currentQuantity + 1);
  };

  const handleDecrease = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1);
    } else {
      removeFromCart(id);
    }
  };

  const handleProceedToCheckout = () => {
    const totalAmount = cart.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);
    navigate('/checkout', { state: { amount: totalAmount } });
  };

  const calculateTotal = () => {
    const total = cart.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(total);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-orange-900">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-orange-900">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cart.map((item) => (
            <div key={item.id} className="flex flex-col border rounded-lg p-4 shadow min-h-[400px]">
  <img src={item.imgSrc} alt={item.name} className="w-full h-40 object-contain mb-4" />
  <h3 className="text-lg font-semibold">{item.name}</h3>


  <div className="text-gray-900 mt-1 font-normal h-[80px] overflow-auto">
    <span className="font-semibold">Description:</span> {item.description || "No description available"}
  </div>

  <p className="text-gray-900 mt-1 font-medium">
    <span className="font-semibold">Price:</span> ₹{item.price.toFixed(2)}
  </p>

  <div className="mt-auto flex items-center justify-between">
    <button onClick={() => handleDecrease(item.id, item.quantity)} className="bg-orange-800 text-white py-1 px-3 rounded hover:bg-orange-700">-1</button>
    <span className="text-gray-800 font-semibold">{item.quantity}</span>
    <button onClick={() => handleIncrease(item.id, item.quantity)} className="bg-orange-800 text-white py-1 px-3 rounded hover:bg-orange-700">+1</button>
  </div>

  <button onClick={() => removeFromCart(item.id)} className="mt-4 bg-orange-900 text-white py-2 px-4 rounded hover:bg-orange-800">
    Remove
  </button>
</div>

          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="mt-8 text-right">
          <h2 className="text-xl font-semibold">Total: {calculateTotal()}</h2>
        </div>
      )}

      {cart.length > 0 && (
        <div className="flex justify-center mt-4">
          <button 
            onClick={handleProceedToCheckout} 
            className="bg-orange-900 text-white py-2 px-6 rounded hover:bg-orange-800"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
