import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

const Products = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        const clothingProducts = data.filter(
          (product) =>
            product.category === "men's clothing" ||
            product.category === "women's clothing"
        );
        setProducts(clothingProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filterProductsByCategory = (products, category) => {
      if (!category) return products;
      if (category === "men") return products.filter((p) => p.category === "men's clothing");
      if (category === "women") return products.filter((p) => p.category === "women's clothing");
      return products;
    };

    setFilteredProducts(filterProductsByCategory(products, category));
  }, [category, products]);

  const pageTitle = category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products` : "All Products";

  if (isLoading) {
    return <div className="text-center text-orange-900">Loading products...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-orange-900">{pageTitle}</h1>
      {filteredProducts.length === 0 ? (
        <div className="text-center text-orange-900">No products found for this category.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.title}
              price={product.price}
              imgSrc={product.image}
              description={product.description}
              onAddToCart={() => addToCart({
                id: product.id,
                name: product.title,
                price: product.price,
                imgSrc: product.image,
                description: product.description,
              })}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
