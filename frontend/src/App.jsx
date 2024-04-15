import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Carousel from "./components/Carousel";
import Popular from "./components/Popular";
import Admin from './AdminComponents/Admin'
function App() {
  const [cunt, setCount] = useState(0);

  return (
    <>
        <Header/>
        <Carousel />
        <Popular />
        <Admin/>
    </>
  );
}

export default App;
