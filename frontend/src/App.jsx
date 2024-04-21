import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Header'; // Assuming Home component is defined in components folder
import Carousel from "./components/Carousel";
import Popular from "./components/Popular";


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
      <>
        <Header />
        <Carousel />
        <Routes>
          <Route path="/" element={<Popular />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}



export default App;
