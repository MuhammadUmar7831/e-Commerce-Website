import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

const Dashboard = (props) => {
  useEffect(() => {
    fetchOrdersByMonth();
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:3000/Orders/allOrders");
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      props.setnotif(data);
      
      // Initialize Chart.js with dynamic data
      initializeChart(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      // Handle error, e.g., display an error message to the user
    }
  };

  const fetchOrdersByMonth = async () => {
    try {
      const response = await fetch("http://localhost:3000/Orders/ordersByMonth");
      if (!response.ok) {
        throw new Error("Failed to fetch order counts by month");
      }
      const data = await response.json();
      
      // Initialize Chart.js with order counts by month
      initializeChart(data);
    } catch (error) {
      console.error("Error fetching order counts by month:", error);
      // Handle error, e.g., display an error message to the user
    }
  };

  const initializeChart = (data) => {
    const months = data.map(entry => {
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return monthNames[entry.month - 1]; // Adjust month index to start from 0
    });
    const orderCounts = data.map(entry => entry.orderCount);
  
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: months,
        datasets: [{
          label: 'Number of Orders',
          data: orderCounts,
          backgroundColor: 'rgba(0, 139, 0, 0.2)', // Dark green color with alpha
          borderColor: 'rgba(0, 139, 0, 1)', // Dark green color without alpha
          
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  };
  
  return (
    
    <div className="container mx-auto  py-8 mt-16 h-[100vh] ">
    <canvas id="myChart" className="w-full h-full"></canvas>
  </div>
  );
}

export default Dashboard;
