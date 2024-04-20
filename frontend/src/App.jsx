import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Header'; // Assuming Home component is defined in components folder

function App() {
  const [data, setData] = useState(null);
  const [found, setFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      
      try {
        const token = localStorage.getItem('auth-token');
        if (!token) {
          setFound(true);
          return;
        }
        
        const response = await axios.post('http://localhost:3000/getUser', null, {
          headers: {
            'auth-token': token
          }
        });
        
        setData(response.data);
      } catch(error) {
        if (error.response.data.error==="please 2 authenticate using a valid token" && error.response.status === 401) {
          const errorMessage = error.response.data.error;
          localStorage.removeItem('auth-token');
        } else {
          console.error('Error fetching data:', error);
        }
      }
    };
  
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
        {found&&<Login></Login>}
      {/* Include other components like Header, Carousel, and Popular */}
    </BrowserRouter>
  );
}

export default App;
