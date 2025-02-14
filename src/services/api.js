const fetchProducts = async (category) => {
  try {
    
    const url = category
      ? `https://fakestoreapi.com/products/category/${category}`
      : "https://fakestoreapi.com/products"; 

    
    const response = await fetch(url);

    
    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.statusText}`);
    }

    const data = await response.json();

    const updatedData = data.map((product) => {
      return {
        id: product.id,
        name: product.title, 
        price: product.price,
        imgSrc: product.image,
        description: product.description || "No description available", 
      };
    });

     return updatedData; 
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; 
  }
};
