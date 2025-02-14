import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const WomenProducts = () => {
  const [womenProducts, setWomenProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com//products/category/women")  
      .then((response) => response.json())
      .then((data) => {
        setWomenProducts(data.filter((product) => product.category === "women"));
      })
      .catch((error) => console.error("Error fetching Women products:", error));
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-orange-900">Women's Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {womenProducts.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            imgSrc={product.imgSrc}
          />
        ))}
      </div>
    </div>
  );
};

export default WomenProducts;
