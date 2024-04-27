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

function CartList(props) {

  const [qty, setQty] = useState(props.cartQuantity);
  const [isVisible, setIsVisible] = useState(false);


  const incrementQuantity = () => {
    setQty(qty + 1);
  };

  const decrementQuantity = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };


  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleExpandClick1 = () => {
    if (props.quantity < qty) {
      setIsVisible(!isVisible);
    }
    else 
    {
      props.setproductId(props.productId);
      props.setproductQuantity(props.quantity);
      props.setStateObject({
        ...props.stateObject,
        name: props.name,
        description: props.description,
        price: props.price,
        rating: props.rating,
        quantity: qty,
        check: true,
        check2:false
      }); 
    }
  };


  const handleExpandClick2 = async () => {
    try {

      let i =localStorage.getItem('Cart-items');
      let integerValue = parseInt(i, 10);

      if(integerValue>0){
      localStorage.removeItem('Cart-items');
      localStorage.setItem('Cart-items',integerValue-1)}

      // Assuming customerId and productId are available in props
      const { customerId, productId } = props;
  
      // Make a POST request to deleteCartItem endpoint
      const response = await axios.post('http://localhost:3000/deleteCartItem', { customerId, productId });
  
      // Check if the deletion was successful
      if (response.data.success) {
        // Optionally, you can update the UI to reflect the deletion
        console.log('Cart item deleted successfully');
      } else {
        console.error('Failed to delete cart item:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting cart item:', error);
      // Handle error
    }
  };
  


  return (
    <div className='bg-white my-6'>
      <div className='w-3/4 mx-auto h-auto bg-zinc-200 shadow-green-900 shadow-2xl p-6'>
        <div className='py-3 ml-3'><strong className='text-3xl'>{props.name}</strong></div>
        <div className='flex items-center'>
        <img
  className='rounded-md'
  src="https://images.pexels.com/photos/61180/pexels-photo-61180.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500"
  alt="Paella dish"
  style={{ width: '50%', height: 'auto' }}
/>

          <p className='text-center px-4 font-viga'>{props.description}</p>
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
            <div className='flex'>
              <a href='/' className=' w-fit mr-3 inline-flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-900' onClick={handleExpandClick2}>Delete</a>
              <button type="button" className=' w-fit inline-flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700' onClick={handleExpandClick1} >Proceed to Checkout</button>
            </div>
          </div>
        </CardActions>
        {isVisible && (
          <>
            <hr  className=' bg-red-600 mt-3'/>
            <div
              className="my-6 text-center text-red-900 slideIn"
              style={{ animationDuration: '1.5s' }}
            >
              We're sorry, but the quantity of items you're trying to order exceeds our current stock availability. We have only {props.quantity} items in the Stock. Please adjust the quantity or consider selecting alternative products. Thank you for your understanding and continued support.
              </div>
          </>
        )}
      </div>

    </div>
  );
}

export default CartList;
