import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Carousel from "./components/Carousel";
import Popular from "./components/Popular";
import Admin from "./AdminComponents/Admin";

import { ProductProvider } from "./context/ProductContext";

function App() {
  const [cunt, setCount] = useState(0);

  return (
    <>
      <ProductProvider>
        <Header />
        <Carousel />
        <Popular />
        {/* <Admin/> */}
      </ProductProvider>
    </>
  );
}

export default App;
