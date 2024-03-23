import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Carousel from "./components/Carousel";
import Popular from "./components/Popular";

function App() {
  const [cunt, setCount] = useState(0);

  return (
    <>
        <Header/>
        <Carousel />
        <Popular />
    </>
  );
}

export default App;
