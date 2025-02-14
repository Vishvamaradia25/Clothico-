import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const MenProducts = () => {
  const [menProducts, setMenProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/category/men")  
      .then((response) => response.json())
      .then((data) => {
        setMenProducts(data.filter((product) => product.category === "men"));
      })
      .catch((error) => console.error("Error fetching Men products:", error));
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-orange-900">Men's Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {menProducts.map((product) => (
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

export default MenProducts;
