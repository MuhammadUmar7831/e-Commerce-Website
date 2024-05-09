import React, { useEffect, useState } from "react";
import axios from "axios";

export default function OrderCard(props) {
  useEffect(() => {
    if (props.Open) {
      const timeout = setTimeout(() => {
        props.setOpen(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [props.Open]);

  const onclick = async (orderId, customerId, productId, status) => {
    try {
      // Make a POST request to the cancelOrder endpoint
      const response = await axios.post("http://localhost:3000/cancelOrder", {
        orderId: orderId,
        customerId: customerId,
        productId: productId,
        status: status,
      });

      // Log the success message or handle the response
      console.log(response.data.message);
      // You can also update your UI or trigger other actions based on the response
      setTimeout(() => {
        props.setOpen(true);
      }, 2000);

      props.setOpen(true);
      props.setcount(props.count + 1);
    } catch (error) {
      // Log and handle errors
      console.error("Error cancelling order:", error);
      // You can display an error message to the user or handle the error in other ways
    }
  };

  return (
    <>
      {props.selectedOption == props.Status && (
        <div className="flex items-center justify-center my-4">
          <div className="flex flex-col lg:flex-row w-5/6 m-2 rounded-md shadow-2xl shadow-gray-600">
            <div className="w-2/5 h-2/5 p-5 my-auto lg:border-r border-gray-400 relative">
              <img
                className="w-[400px] h-[400px] object-cover"
                src={props.image}
                alt="Image"
              />
            </div>
            <hr />
            <div className="lg:w-3/5 p-8">
              <h1 className="text-2xl mb-4">
                Order Id <span className="font-bold">{props.ID}</span>
              </h1>
              <p className="text-lg mb-4">
                <span className="font-semibold  mr-2">Product Name:</span>
                {props.Product}
              </p>
              <p className="text-lg mb-4">
                <span className="font-semibold  mr-2">Description:</span>
                {props.Description}
              </p>
              <p className="text-lg mb-4">
                <span className="font-semibold mr-2">Status:</span>
                <span
                  className={`px-2 py-1 rounded-lg ${
                    props.Status === "pending"
                      ? "bg-yellow-500 text-black"
                      : props.Status === "approved"
                      ? "bg-green-500 text-white"
                      : props.Status === "completed"
                      ? "bg-green-800 text-white"
                      : props.Status === "cancelled"
                      ? "bg-red-500 text-white"
                      : props.Status === "rejected"
                      ? "bg-red-800 text-white"
                      : "" // Default case
                  }`}
                >
                  {props.Status}
                </span>
              </p>
              <p className="text-lg mb-4">
                <span className="font-semibold  mr-2">Date:</span>
                {new Date(props.Date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-lg mb-4">
                <span className="font-semibold  mr-2">Quantity:</span>{" "}
                {props.Quantity}
              </p>
              <p className="text-lg mb-4">
                <span className="font-semibold  mr-2">Unit Price:</span>
                {" Rs. "}
                {props.TotalBill / props.Quantity}
              </p>
              <p className="text-lg mb-4">
                <span className="font-semibold  mr-2">Total Bill:</span>
                {" Rs. "}
                {props.TotalBill}
              </p>

              {(props.Status === "approved" || props.Status === "pending") && (
                <div className="flex justify-end">
                  <button
                    className="font-bold text-lg rounded-xl bg-red-700 hover:bg-red-950 text-white text-center px-4 py-2"
                    onClick={() =>
                      onclick(
                        props.ID,
                        props.CustomerId,
                        props.ProductId,
                        props.Status
                      )
                    }
                    type="button"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
