import React, { createContext } from "react";

const ProductContext = createContext();

const ProductProvider = (props) => {
  const host = "http://localhost:3000";

  const getProducts = async () => {
    try {
      const url = `${host}/getProducts`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw "Something went wrong";
      } else {
        const json = await response.json();
        return json;
      }
    } catch (error) {
      console.log("error occurred:", error);
      return "error";
    }
  };

  return (
    <ProductContext.Provider value={{ getProducts }}>
      {props.children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
