import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrdersByCategory from './OrdersByCategory';

export default function CurrentOrders(props) {
  const [currentOrders, setCurrentOrders] = useState([]);
  const [selectedOption, setSelectedOption] = useState('pending'); // Set 'pending' as default
  const [Open, setOpen] = useState(false);
  const [count, setcount] = useState(false);
  useEffect(() => {
    props.setcarouseCheck(false);
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('auth-token');
        if (!token) {
          // Handle unauthorized user
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

        // Fetch current orders
        const ordersResponse = await axios.post('http://localhost:3000/CurrentOrders', requestBody, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        setCurrentOrders(ordersResponse.data.currentOrders);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    fetchData();
  }, [count]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };


const handle=()=>{
  props.sethide(true);
}

  return (
    <div className=' bg-zinc-100 min-h-screen'>
    {!props.hide&&
      <aside className="fixed top-0 left-0 z-40 w-fit h-screen bg-gray-800 text-white">
        <div className="px-4 py-6">
          <div className='flex justify-end mb-4'>
            <button className='hover:bg-slate-300 w-6 h-6 rounded-full hover:text-gray-900' onClick={handle}>
              <i class="fas fa-times"></i>
            </button>
          </div>
          <h2 className="text-2xl font-bold mb-4">Orders Detail</h2>
          <div>
            <label className="block mb-2">
              <input
                type="radio"
                value="pending"
                checked={selectedOption === 'pending'}
                onChange={handleOptionChange}
                className="mr-2"
              />
              Pending Orders
            </label>
            <label className="block mb-2">
              <input
                type="radio"
                value="approved"
                checked={selectedOption === 'approved'}
                onChange={handleOptionChange}
                className="mr-2"
              />
              Approved Orders
            </label>
            <label className="block mb-2">
              <input
                type="radio"
                value="completed"
                checked={selectedOption === 'completed'}
                onChange={handleOptionChange}
                className="mr-2"
              />
              Completed Orders
            </label>
            <label className="block mb-2">
              <input
                type="radio"
                value="cancelled"
                checked={selectedOption === 'cancelled'}
                onChange={handleOptionChange}
                className="mr-2"
              />
              Cancelled Orders
            </label>
            <label className="block mb-2">
              <input
                type="radio"
                value="rejected"
                checked={selectedOption === 'rejected'}
                onChange={handleOptionChange}
                className="mr-2"
              />
              Rejected Orders
            </label>
          </div>
        </div>
      </aside>}

      {currentOrders.map((order, index) => (
        <OrdersByCategory
          key={index}
          ID={order.ID}
          Product={order.Name}
          Status={order.Status}
          Quantity={order.OrderQuantity}
          TotalBill={order.TotalBill}
          Description={order.Description}
          ProductId={order.ProductId}
          CustomerId={order.CustomerId}
          Rating={order.Rating}
          selectedOption={selectedOption}
          setOpen={setOpen}
          Open={Open}
          setcount={setcount}
          count={count}
        />
      ))}
    </div>
  );
}
