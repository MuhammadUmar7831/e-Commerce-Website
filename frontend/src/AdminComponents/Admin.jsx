import React, { useState ,useContext,useEffect} from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BarChartIcon from "@mui/icons-material/BarChart";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Tooltip from "@mui/material/Tooltip";
import { UserContext } from "../context/UserContext";
import axios from 'axios';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import ManageProducts from "./ManageProducts";
import ManageOrders from "./ManageOrders";
import Statistics from "./Statistics";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Admin() {
  const handleLogout = () => {
    localStorage.removeItem('auth-token'); // Remove the authentication token from local storage
  };
  const { host } = useContext(UserContext);
  const navigate = useNavigate();
  const [check,setchecker]=useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (!token) {
      navigate("/login");
      return;
    }


    const fetchData = async () => {
      try {
        const responseAuth = await axios.post(
          `${host}/auth`,
          { token },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Fetch user data
        const responseGeUser = await axios.post(
          `${host}/getUser`,
          {
            email: responseAuth.data.email,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

    if(!responseGeUser.data.Admin)
      {
        navigate("/");
return;
      }
      setchecker(true);

    } catch (error) {
      console.error(error);
      // Handle error
    }}
    fetchData();
  }, []);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    check&&<Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Grace Marketing
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Statistics", "Manage Products", "Manage Orders","LogOut"].map(
            (text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <IconButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={index === 3 ? handleLogout : null}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {index == 0 && (
                      <Link to="/admin">
                        {" "}
                        <Tooltip title="Statistics"><BarChartIcon />{" "}</Tooltip>
                        
                      </Link>
                    )}
                    {index == 1 && (
                      <Link to="/admin/manageProducts">
                        <Tooltip title="Manage Products"><LocalMallIcon />{" "}</Tooltip>
                      </Link>
                    )}
                    {index == 2 && (
                      <Link to="/admin/manageOrders">
                        <Tooltip title="Manage Orders"><LocalShippingIcon />{" "}</Tooltip>
                      </Link>
                    )}
                    {index == 3 && (
                      <Link to="/login">
                        <Tooltip title="LogOut"><ExitToAppIcon />{" "}</Tooltip>
                      </Link>
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </IconButton>
              </ListItem>
            )
          )}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "64px" }}>
          <Routes>
            <Route path="/" element={<Statistics />} />
            <Route path="/manageProducts" element={<ManageProducts />} />
            <Route path="/manageOrders" element={<ManageOrders />} />         
          </Routes>
      </Box>
    </Box>
  );
}
