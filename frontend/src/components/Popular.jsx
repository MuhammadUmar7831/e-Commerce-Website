import React, { useContext, useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";
import { ProductContext } from "../context/ProductContext";
import Buy_Add from "./Buy_Add";

export default function Popular(props) {
  const { getProducts } = useContext(ProductContext);
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProducts(data.products);

      } catch (error) {products.
        console.log("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);
  
  return (
    <>
      <div className="mb-4">
        <div className="mx-4">
          <h5 className="text-4xl mt-4">Products</h5>
          <hr className="h-px my-6 mx-auto bg-gray-400 border-0 dark:bg-gray-700"></hr>
        </div>
        
        {/* <div className="mx-4 flex"> */}``
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">

          {/* Map over the products array and render ProductCard components */}
          {products.map((product) => (
  <ProductCard
    setproductQuantity={props.setproductQuantity}
    key={product.ID}
    name={product.Name}
    description={product.Description}
    price={product.Price}
    rating={product.Rating}
    quantity={product.Quantity}
    check={props.stateObject.check}
    stateObject={props.stateObject}
    setStateObject={props.setStateObject}
    setproductId={props.setproductId}
    productId={product.ID} 
  />
))}
          </div>

        </div>
    </>
  );
}
