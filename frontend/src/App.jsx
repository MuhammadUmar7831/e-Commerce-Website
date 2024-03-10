import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Carousel from "./components/Carousel";

function App() {
  const [cunt, setCount] = useState(0);

  return (
    <>
        <Header/>
        <Carousel />
    </>
  );
}

export default App;
