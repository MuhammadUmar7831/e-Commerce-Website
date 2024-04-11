import { useState } from "react";
import "./App.css";
import Admin from './AdminComponents/Admin'
function App() {
  const [cunt, setCount] = useState(0);

  return (
    <>
        <Admin/>
    </>
  );
}

export default App;
