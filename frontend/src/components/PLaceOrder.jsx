import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function PLaceOrder(props) {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      if (!token) {
        console.log("User is not authenticated");
        return;
      } // Fetch user data
      const response1 = await axios.post(
        "http://localhost:3000/getUser",
        null,
        { headers: { "auth-token": token } }
      );
      let userData = response1.data; // Assuming userId is available in userData
      let requestBody = {
        customerId: userData.ID,
        productId: props.productId,
      }; // Make a POST request to deleteCartItem endpoint
      let response2 = await axios.post(
        "http://localhost:3000/deleteCartItem",
        requestBody,
        { headers: { "Content-Type": "application/json" } }
      ); // Check if the deletion was successful
      if (response2.data.success) {
        // Optionally, you can update the UI to reflect the deletion
        console.log("Cart item deleted successfully");
      } else {
        console.error("Failed to delete cart item:", response2.data.message);
      }

      requestBody = {
        productId: props.productId, // Assuming productData contains the productId
        customerId: userData.ID,
        quantity: props.quantity, // Assuming a quantity of 1 for simplicity
        totalBill: props.price * props.quantity, // Assuming productData contains the price of the product
      };

      // Add item to cart
      const placeOrderResponse = await axios.post(
        "http://localhost:3000/PlaceOrder",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(placeOrderResponse); 

    } catch (error) {
      console.error("Error placing and deleting cart item:", error); // Handle error
    }
  };

  const orderPlace = async () => {
    if (!props.stateObject.check2) {
      fetchData();
    } else {

      try {
        const token = localStorage.getItem("auth-token");
        if (!token) {
          console.log("User is not authenticated");
          return;
        }

        // Fetch user data
        const response = await axios.post(
          "http://localhost:3000/getUser",
          null,
          {
            headers: {
              "auth-token": token,
            },
          }
        );

        const userData = response.data;
        // Assuming userId is available in userData
        const requestBody = {
          productId: props.productId, // Assuming productData contains the productId
          customerId: userData.ID,
          quantity: props.quantity, // Assuming a quantity of 1 for simplicity
          totalBill: props.price * props.quantity, // Assuming productData contains the price of the product
        };

        // Add item to cart
        const placeOrderResponse = await axios.post(
          "http://localhost:3000/PlaceOrder",
          requestBody,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(placeOrderResponse); // Log success message or handle response
      } catch (error) {
        console.error(error);
        // Handle error
      }
    }

  };

  const onClick = () => {
    props.setStateObject({
      ...props.stateObject,
      quantity: props.quantity,
      name: props.name,
      description: props.description,
      check: true,
      checkPlaceOrder: true,
      price: props.price,
    });
    props.setproductQuantity(props.productQuantity);
  };
  return (
    <>
      {props.stateObject.check2 && (
        <button
          type="button"
          className="bg-zinc-500 hover:bg-zinc-300 mt-4 ml-3 text-white font-bold py-2 px-4 rounded"
          onClick={onClick}
        >
          Back
        </button>
      )}
      <div className=" max-w-xl max-h-fit mx-auto mt-8   bg-zinc-200 shadow-green-900 shadow-2xl rounded-lg dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img
            className="rounded-t-lg w-full max-h-48"
            src="https://images.pexels.com/photos/61180/pexels-photo-61180.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500"
            alt="...Loading"
          />
        </a>
        <div>
          <a href="#">
            <img
              className="rounded-t-lg"
              src="/docs/images/blog/image-1.jpg"
              alt=""
            />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {props.name}
              </h5>
            </a>
            <hr />
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-900 text-center">
              Order Summary
            </p>
            <div className="my-3">
              <p className="mb-3">
                Quantity{" "}
                <span className="relative left-80 pl-8 ">
                  <span className=" font-extrabold">Items</span>{" "}
                  {props.quantity}
                </span>
              </p>
              <p className=" flex  ">
                Total Payment{" "}
                <img
                  src="/pkr.svg"
                  alt="PKR Icon"
                  className="relative left-80 text-base w-5 inline"
                />
                <span className=" relative px-3 left-80 flex items-center">
                  {props.price}
                </span>
              </p>
            </div>
            <div className="flex justify-center items-center">
            <Link
                to="/"
                className="w-1/2 mr-3 bg-red-800 hover:bg-red-950  text-white font-bold py-2 px-3 rounded text-center"
              >
                Cancel
              </Link>
              <Link to="/"
                onClick={orderPlace}
                className=" w-1/2 inline-flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md text-white bg-amber-500 hover:bg-amber-600"
              >
                Place Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PLaceOrder;
