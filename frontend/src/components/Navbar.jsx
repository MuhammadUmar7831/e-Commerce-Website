import React from 'react'
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {

  let location = useLocation();

  return (
    <>
      <nav className='w-full border-b'>
        <ul className='flex justify-between'>
        <div className='mx-3 my-4 text-lg text-slate-800 hover:text-slate-600'>
            Sample
        </div>
        <div className='flex'>
          <li className={`mx-3 my-4 text-lg text-slate-800 hover:text-slate-600`}><Link to="/" rel="noopener noreferrer">Home</Link></li>
          <li className={`mx-3 my-4 text-lg text-slate-800 hover:text-slate-600`}><Link to="/orders" rel="noopener noreferrer">Orders</Link></li>
          <li className={`mx-3 my-4 text-lg text-slate-800 hover:text-slate-600`}><Link to="/cart" rel="noopener noreferrer">Cart</Link></li>
        </div>
        <div className='mx-3 my-4 text-lg text-slate-800 hover:text-slate-600'>
            Phone <span className='font-bold'>+92-302-417507</span>
        </div>
        </ul>
      </nav>
    </>
  )
}