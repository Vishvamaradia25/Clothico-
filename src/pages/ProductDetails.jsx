import React from "react";

const ProductDetails = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
        <img
          src={product.imgSrc}
          alt={product.name}
          className="w-full h-48 object-cover mb-4 rounded"
        />
        <p className="text-gray-700 mb-2">
          {product.description || "No description available."}
        </p>
        <p className="font-bold text-lg">Price: {product.price}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
