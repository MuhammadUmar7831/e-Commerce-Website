import React from "react";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import OrderSummaryPopup from "./OrderSummaryPopup";

// import PLaceOrder from "./PLaceOrder";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";

function CartCard(props) {
  const [qty, setQty] = useState(props.cartQuantity);
  const [isVisible, setIsVisible] = useState(false);
  const { host } = useContext(ProductContext);
  const [orderSummaryModalOpen, setOrderSummaryModalOpen] = useState(false);

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleExpandClick1 = () => {
    setIsVisible(true);
    setOrderSummaryModalOpen(true);
  };

  const deleteCartItem = async () => {
    try {
      // Assuming customerId and productId are available in props
      const customerId = props.product.CustomerId;
      const productId = props.product.ID;

      // Make a POST request to deleteCartItem endpoint
      const response = await axios.post(
        `${host}/deleteCartItem`,
        {
          customerId,
          productId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check if the deletion was successful
      if (response.data.success) {
        // Optionally, you can update the UI to reflect the deletion
        console.log("Cart item deleted successfully");
        props.setDeleteAlert(true);
      } else {
        console.error("Failed to delete cart item:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting cart item:", error);
      // Handle error
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row w-4/6 my-8 mx-auto h-4/6 shadow-2xl overflow-hidden rounded-lg">
        <div className="w-2/5 h-2/5 p-5 lg:border-r border-gray-400 relative">
          <img
            className="w-[400px] h-[400px] object-cover"
            src={props.product.Image}
            alt="Paella dish"
          />
          <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
        </div>
        <div className="lg:w-1/2 flex flex-col justify-between">
          <div className="m-5">
            <div className="py-3">
              <strong className="text-3xl">{props.product.Name}</strong>
            </div>
            <div className="py-3">
              <p className="text-xl font-viga">{props.product.Description}</p>
            </div>
            <div className="py-3 font-viga">
              <p className="text-lg">
                Quantity: <span>{[props.product.cartQuantity]}</span>
              </p>
            </div>
            <div className="text-3xl my-5">
              Rs.{" "}
              <span className="text-amber-500 font-bold">
                {props.product.Price}
              </span>
            </div>
            <hr />
          </div>
          <div className="self-end m-4">
            <button
              className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white text-lg font-bold py-2 px-4 transform -skew-x-12"
              onClick={handleExpandClick1}
            >
              Buy Now
            </button>
            <button
              type="button"
              onClick={deleteCartItem}
              className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white text-lg font-bold py-2 px-4 transform -skew-x-12"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <OrderSummaryPopup
        open={orderSummaryModalOpen}
        handleClose={() => {
          setOrderSummaryModalOpen(false);
        }}
        productId={props.product.ID}
        name={props.product.Name}
        price={props.product.Price}
        qty={props.product.Quantity}
        host={host}
        setPlaceOrderAlert={props.setPlaceOrderAlert}
        fromCart={true}
      />
    </>
  );
}

export default CartCard;
