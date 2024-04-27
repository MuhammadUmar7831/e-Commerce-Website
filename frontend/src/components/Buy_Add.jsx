import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PLaceOrder from './PLaceOrder';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import{useState} from 'react';
import axios from 'axios';

export default function Buy_Add(props) {
  const [qty, setQty] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  const incrementQuantity = () => {
    setQty(qty + 1);
  };

  const decrementQuantity = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const handleAddToCart = async () => {
    try {
      let i =localStorage.getItem('Cart-items');
      let integerValue = parseInt(i, 10);

      if(integerValue>0){
      localStorage.removeItem('Cart-items');
      localStorage.setItem('Cart-items',integerValue+1)}
      const token = localStorage.getItem('auth-token');
      if (!token) {
        // Handle unauthorized user
        return;
      }

      // Fetch user data
      const response = await axios.post('http://localhost:3000/getUser',null, {
        headers: {
          'auth-token': token
        }
      });

      const userData = response.data;
      // Assuming userId is available in userData
      const requestBody = {
        customerId: userData.ID,
        productId: props.productId,
        quantity: qty
      };


      // Add item to cart
      const addToCartResponse = await axios.post('http://localhost:3000/addToCart', requestBody, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(addToCartResponse.data); // Log success message or handle response
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleExpandClick1 = () => {
  
    if(props.productQuantity<qty)
    {
    setIsVisible(!isVisible);
    return;
  }
    props.setStateObject({
        ...props.stateObject,
        price:props.price*qty,
        quantity:qty,
        checkPlaceOrder: false ,
    });
    
};



const onClick=()=>{

  props.setStateObject({
    ...props.stateObject,
    quantity:qty,
    check: false,
    checkPlaceOrder:true,
    price:props.price*qty,
    check2:true
  });
}
  

  return (
    <div className=' bg-white my-6'>
<button type="button" className='bg-zinc-500 hover:bg-zinc-300 mt-4 ml-3 text-white font-bold py-2 px-4 rounded' onClick={onClick}>Back</button>

    <div className=' w-3/4 mx-auto h-auto  bg-zinc-200 shadow-green-900 shadow-2xl p-6'>
       <div className=' py-3 ml-3'> <strong className=' text-3xl'>{props.name}</strong></div>
       <div className='flex'>
      <img className=' rounded-md'
       
        src="https://images.pexels.com/photos/61180/pexels-photo-61180.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500"
        alt="Paella dish"
      />
      <p className=' text-center px-4 font-viga'>       {props.description}
      </p>
      </div>
      <CardContent>
        <div className="flex flex-row-reverse items-center">
  
      <button
        type="button"
        onClick={incrementQuantity}
        className="bg-gradient-to-b from-gray-800 to-gray-600 text-white w-8 h-8 flex items-center justify-center rounded-md ml-2 hover:from-gray-700 hover:to-gray-500 transition duration-300"
      >
        +
      </button>
      <span className="px-3 py-1">{qty}</span>

      <button
        type="button"
        onClick={decrementQuantity}
        className="bg-gradient-to-b from-gray-800 to-gray-600 text-white w-8 h-8 flex items-center justify-center rounded-md mr-2 hover:from-gray-700 hover:to-gray-500 transition duration-300"
      >
        -
      </button>
      <span className='px-3'>Quantity</span> 
    </div>
    <div>Rs. {props.price}</div>
    <hr />
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <div className='flex ml-auto'>
      
<button  className='bg-gradient-to-r mx-3 from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-4 rounded' onClick={handleExpandClick1} >  Buy Now
</button>

<button type="button" onClick={handleAddToCart} className='bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded'>
  Add to Cart
</button>

</div>


      </CardActions>
      {isVisible && (
  <>
  <hr />
<div
  className="  my-6 text-center text-red-900 slideIn" // Apply the animation class here
  style={{ animationDuration: '1.5s' }} // Adjust animation duration as needed
>
  {/* Content of the box goes here */}
  We're sorry, but the quantity of items you're trying to order exceeds our current stock availability. Please adjust the quantity or consider selecting alternative products. Thank you for your understanding and continued support      </div></>
)}
    </div>


</div>
);
}
