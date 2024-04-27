import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CartList from './CartList';

export default function AddToCart(props) {

  const [products, setProducts] = useState([]);
  const [customerId, setcustomerId] = useState();

useEffect(() => {
  props.setcarouseCheck(false);
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      if (!token) {
        console.log("User is not authenticated");
        return;
      }

      // Fetch user data
      const response = await axios.post('http://localhost:3000/getUser', null, {
        headers: {
          'auth-token': token
        }
      });
      const userData = response.data;
      // Assuming userId is available in userData
      const requestBody = {
        customerId: userData.ID,
      };
      setcustomerId(userData.ID);
      // Add item to cart
      const addToCartResponse = await axios.post('http://localhost:3000/getCartItem', requestBody, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setProducts(addToCartResponse.data.cartItemsWithDetails);
      if(products.length>0){
      localStorage.setItem('Cart-items',products.length)
    }
    props.setCartlength(products.length);
    
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  fetchData();
}, [products.length]);



  



const onClick=()=>{
  props.setStateObject({
    ...props.stateObject,
    checkPlaceOrder: false ,
});
}

  // Render the CartList component only when products array has data
  return (
    <>
    {products.length>0&&
  <a href="/"  className='bg-zinc-500 hover:bg-zinc-300 mt-4 ml-3 text-white font-bold py-2 px-4 rounded'>Back</a> 
}
{ products.length==0&& <a href="/"> <div className="flex mt-11 flex-col items-center justify-center h-full">
      <svg
        className="w-16 h-16 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
      <p className="text-lg font-medium text-gray-500 mt-4">
        Your cart is empty
      </p>
      <p className="text-gray-400 mt-2">
        Looks like you haven't added anything to your cart yet.
      </p>
    </div></a>}
    <div className='grid grid-cols-2 gap-4'>

      {products.map((item) => (
        <CartList 
        key={item.ID} 
        customerId={customerId}
        productId={item.ID}
        name={item.Name}
        description={item.Description}
        price={item.Price}
        rating={item.Rating}
        quantity={item.Quantity}
        cartQuantity={item.cartQuantity}
        setStateObject={props.setStateObject}
        setproductId={props.setproductId}
        setproductQuantity={props.setproductQuantity}
        />
      ))}
    </div></>
  );
}
