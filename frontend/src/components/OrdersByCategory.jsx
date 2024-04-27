import React, { useEffect, useState } from 'react'
import axios from 'axios';
export default function OrdersByCategory(props) {



  useEffect(() => {
    if (props.Open) {
      const timeout = setTimeout(() => {
        props.setOpen(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [props.Open]);
  
const onclick=async(customerId,productId,status)=>{
    
  try {
      // Make a POST request to the cancelOrder endpoint
      const response = await axios.post('http://localhost:3000/cancelOrder', {
        customerId: customerId,
        productId: productId,
        status:status
      });
  
      // Log the success message or handle the response
      console.log(response.data.message);
      // You can also update your UI or trigger other actions based on the response
      setTimeout(() => {
        props.setOpen(true);
      }, 2000);
      
      props.setOpen(true);
      props.setcount(props.count+1);
  
    } catch (error) {
      // Log and handle errors
      console.error('Error cancelling order:', error);
      // You can display an error message to the user or handle the error in other ways
    }}
    


      return (
        <>

          {props.selectedOption == props.Status && (
            <div className='h-full bg-zinc-100'>
              <div className='flex w-full h-72 justify-around my-auto items-center'>
                <div className='w-1/5 h-56 mt-8'>
                  <img className='rounded-md' src="https://images.pexels.com/photos/61180/pexels-photo-61180.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" alt="...Loading!" />
                </div>
                <div className='w-1/2 h-56 rounded-md bg-zinc-300'>
                  <h1 className='text-center font-extrabold text-3xl pt-3 mb-8'>{props.Product}</h1>
                  <p className='text-2xl ml-3'><span className=' font-semibold underline mr-3 '>Description</span>{props.Description}</p>
                  <p className='text-2xl ml-3'><span className='font-semibold underline mr-3'>Price:</span> {props.TotalBill}</p>
                  <p className='text-2xl ml-3'><span className='font-semibold underline mr-3'>Rating:</span><i className=" text-orange-600 mr-2 fa-solid fa-star"></i>{props.Rating}</p>
                  {(props.Status === 'approved' || props.Status === 'pending') && (
                    <div className='w-2/5 rounded-xl bg-red-700 hover:bg-red-950 mx-auto text-white text-center py-1'>
                      <button className='font-extrabold text-lg' onClick={() => onclick(props.CustomerId, props.ProductId,props.Status)} type="button">Cancel</button>
                    </div>
                  )}
                </div>
                <div className='w-1/5 h-56 rounded-md  bg-zinc-300'>
                  <h1 className='font-extrabold text-3xl pt-3 text-center mb-3'>Order Summary</h1>
                  <p className='text-2xl ml-3'><span className='font-semibold underline mr-3'>Status:</span> {props.Status}</p>
                  <p className='text-2xl ml-3'><span className='font-semibold underline mr-3'>Quantity:</span> {props.Quantity}</p>
                  <p className='text-2xl ml-3'><span className='font-semibold underline mr-3'>Total Bill:</span> {props.TotalBill}</p>
                </div>
              </div>
              {props.Open && (
            <h1 className='text-center text-lg font-semibold text-red-950'>Order cancelled!</h1>
          )}        
              </div>
          )}
        </>
      );
    };      