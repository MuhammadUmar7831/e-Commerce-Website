import "./App.css";
import Popular from "./components/Popular";
import Search from "./components/Search";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { ProductProvider } from "./context/ProductContext";
import { UserProvider } from "./context/UserContext";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <ProductProvider>
      <UserProvider>
        <BrowserRouter>
          <>
            <Routes>
              <Route path="/" element={<Popular />} />
              <Route path="/search" element={<Search />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </>
        </BrowserRouter>
      </UserProvider>
    </ProductProvider>
  );
}

export default App;
