import * as React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
// material ui components
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
const white = "#C5AA6A";
import {Link} from 'react-router-dom'

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    // transition: theme.transitions.create("width"),
  },
}));

export default function Header(props) {
    

  const { getProductsBySearch, searchQuery, setSearchQuery, setSearchResult } =
    useContext(ProductContext);
  const navigate = useNavigate();
  
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const search = async () => {
    try {

      const response = await getProductsBySearch();
      setSearchResult(response.product); // Accessing the product array
      navigate("/search");
    } catch (error) {
      console.error(error); // Handle error if any
    }
  };
let i =localStorage.getItem('Cart-items');
let integerValue = parseInt(i, 10);
props.setCartlength(integerValue);

const hider=()=>{
  props.sethide(false);
}

  return (
    
    <div className="workSans">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ background: white }}>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
         <button type="button" onClick={hider}><i className=" mr-3 fa-solid fa-bars"></i></button>
              BakeNest
            </Typography>
            <a href="/" className="mr-16 fle justify-center font-bold text-lg border-none  hover:underline hover:underline-offset-4 transition duration-500 ease-in-out inset-0 decoration-4">Home
  
</a>
            <Box sx={{ flexGrow: 5 }}>
            
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="I'm shopping for..."
                  inputProps={{ "aria-label": "search" }}
                  value={searchQuery}
                  onChange={handleInputChange}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      search();
                    }
                  }}
                />
              </Search>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "flex", md: "flex" } }}>
           <Link to = '/orders' className="decoration-4 h-16 flex items-center px-3 font-bold text-lg border-none  hover:underline hover:underline-offset-4 transition duration-500 ease-in-out" >Current Orders</Link>
            <a  href='/addtoCart'>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                // aria-controls={menuId}
                aria-haspopup="true"
                // onClick={handleProfileMenuOpen}
                color="inherit"
              >
              
                
                <Badge badgeContent={props.CartLength} color="error">
                  <ShoppingCartIcon fontSize="large" />
                </Badge>
              </IconButton>
              </a>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                // aria-controls={menuId}
                aria-haspopup="true"
                 //onClick={handleProfileMenuOpen}
                color="inherit"
              >
<i class="fas fa-list-dropdown"></i>
                <Badge badgeContent={"1"} color="error">
                  <AccountCircle fontSize="large" />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
