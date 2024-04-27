import "./App.css";
import Header from "./components/Header";
import Carousel from "./components/Carousel";
import Popular from "./components/Popular";
import Search from "./components/Search";
import { ProductProvider } from "./context/ProductContext";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Buy_Add from "./components/Buy_Add";
import PLaceOrder from "./components/PLaceOrder";
import { useState } from "react";
import AddToCart from "./components/Addtocart";
import CurrentOrders from "./components/CurrentOrders";

function App() {
  const [productQuantity,setproductQuantity]=useState();
  const [productId,setproductId]=useState();
  const [CartLength,setCartlength]=useState();
  const [carouseCheck,setcarouseCheck]=useState(true);
  const [hide, sethide] = useState(false);


  const [stateObject, setStateObject] = useState({
    name: "",
    description: "",
    price: "",
    rating: "",
    quantity: "",
    check:false,
    checkPlaceOrder:true,
    check2:false

  });

localStorage.removeItem('auth-token')
// //localStorage.removeItem('Cart-items')
  localStorage.setItem('auth-token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxOH0sImlhdCI6MTcxNDE4NjcwNywiZXhwIjoxNzE0NzkxNTA3fQ.JOe5U2fc3mzcdovDRVwSV4gijA8E_NoWd2yaf5sxusw');
  
  return (


    <ProductProvider>
      <BrowserRouter>
        <>
          <Header
          sethide={sethide}
          setCartlength={setCartlength}
          CartLength={CartLength} />
         {!stateObject.check&&
                   <>{carouseCheck&&<Carousel />}
                   <Routes>
            <Route path="/" element={<Popular 
            setproductId={setproductId}
            stateObject={stateObject}
            setStateObject={setStateObject}
            productQuantity={productQuantity}
            setproductQuantity={setproductQuantity}
            />} />
            <Route path="/search" element={<Search />} />
            <Route path="/orders" element={<CurrentOrders
            hide={hide}
            sethide={sethide}
            setcarouseCheck={setcarouseCheck}
            />}/>
            <Route path="/Buyadd" element={<Buy_Add />} />
             <Route path="/addtoCart" element={<AddToCart
             setCartlength={setCartlength}
             setStateObject={setStateObject}
             stateObject={stateObject}
             setcarouseCheck={setcarouseCheck}
             setproductId={setproductId}
             setproductQuantity={setproductQuantity}
              />} />
          </Routes></>}

          {stateObject.check2&&stateObject.checkPlaceOrder&&stateObject.check&&<Buy_Add
    name={stateObject.name}
    description={stateObject.description}
    price={stateObject.price}
    rating={stateObject.rating}
    quantity={stateObject.quantity}
    productQuantity={productQuantity}
    setStateObject={setStateObject}
    stateObject={stateObject}
    productId={productId}

    />}
              {!stateObject.checkPlaceOrder&&stateObject.check&&<PLaceOrder
    name={stateObject.name}
    description={stateObject.description}
    price={stateObject.price}
    rating={stateObject.rating}
    quantity={stateObject.quantity}
    setproductQuantity={setproductQuantity}
    productQuantity={productQuantity}
    setStateObject={setStateObject}
    productId={productId}
    stateObject={stateObject}

    />}
        </>
      </BrowserRouter>
    </ProductProvider>
  );
}



export default App;
