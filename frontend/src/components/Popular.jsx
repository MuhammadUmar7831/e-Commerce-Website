import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../context/ProductContext";

export default function Popular() {
  const { getProducts } = useContext(ProductContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        console.log("Fetched data:", data.products);
        setProducts(data.products);

      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
        console.log("Products", products);
  }, [products])
  

  return (
    <>
      <div className="mb-4">
        <div className="mx-4">
          <h5 className="text-4xl mt-4">Products</h5>
          <hr class="h-px my-6 mx-auto bg-gray-400 border-0 dark:bg-gray-700"></hr>
        </div>
        <div className="mx-4 flex">
          {/* Map over the products array and render ProductCard components */}
          {products.map((product) => (
            <ProductCard
              key={product.ID}
              title={product.Name}
              price={product.Price}
            />
          ))}
        </div>
      </div>
    </>
  );
}
