import "./App.css";
import Header from "./components/Header";
import Carousel from "./components/Carousel";
import Popular from "./components/Popular";
import Search from "./components/Search";
import { ProductProvider } from "./context/ProductContext";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
        <>
          <Header />
          <Carousel />
          <Routes>
            <Route path="/" element={<Popular />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </>
      </BrowserRouter>
    </ProductProvider>
  );
}

export default App;
