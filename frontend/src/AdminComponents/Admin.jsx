import React from 'react'
import AdminMenu from './AdminMenu'
import DashBoard from './Dashboard'
import ManageProducts from './ManageProducts'
import ManageOrders from './ManageOrders'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const Admin = () => {
  return (   
    <div className='h-[100vh] flex'>
      <div className="fixed z-50 ">
      <AdminMenu/>

      </div>
      <div className="lg:pl-[10%] sm:pl-[40%]">
        
      <Router>
        <Routes>
          <Route exact path="/" element={<DashBoard/>} />
          <Route  exact path="/ManageProducts" element={<ManageProducts/>} />
          <Route exact path="/ManageOrders" element={<ManageOrders/>} />
        </Routes>
      </Router>
      </div>
    </div>
  )
}

export default Admin
