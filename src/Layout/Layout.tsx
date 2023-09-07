import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

//For Mini Drawer for pages
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
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
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import { saveToken } from "../utils/token";
import { Modal } from "@mui/base";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
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

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
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

const Layout = () => {
  const navigate = useNavigate();

  const theme = useTheme();
  const [open, setOpen] = React.useState<boolean>(false);
  const [logoutModal, setLogoutModal] = useState<boolean>(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function openLogoutModal() {
    setLogoutModal(true);
  }

  function closeLogoutModal() {
    setLogoutModal(false);
  }

  function handleCloseLogoutModal() {
    setLogoutModal(false);
  }

  return (
    <Box sx={{ display: "flex" }}>
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
            Dashboard
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
          <ListItem
            onClick={() => navigate("/home")}
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <InboxIcon />
              </ListItemIcon>
              <ListItemText
                primary={<Link to={`/home`}>Home</Link>}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            onClick={() => navigate("/home/products")}
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <MailIcon />
              </ListItemIcon>
              <ListItemText
                primary={<Link to={`/home/products`}>Products</Link>}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          {/* <ListItem
            onClick={() => navigate("/home/products")}
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <MailIcon />
              </ListItemIcon>
              <ListItemText
                primary={<Link to={`/home/products`}>Products</Link>}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem> */}
          {/* <ListItem
            onClick={() => navigate("/home/products")}
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <MailIcon />
              </ListItemIcon>
              <ListItemText
                primary={<Link to={`/home/products`}>Products</Link>}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            onClick={() => navigate("/home/products")}
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <MailIcon />
              </ListItemIcon>
              <ListItemText
                primary={<Link to={`/home/products`}>Products</Link>}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            onClick={() => navigate("/home/products")}
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <MailIcon />
              </ListItemIcon>
              <ListItemText
                primary={<Link to={`/home/products`}>Products</Link>}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            onClick={() => navigate("/home/products")}
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <MailIcon />
              </ListItemIcon>
              <ListItemText
                primary={<Link to={`/home/products`}>Products</Link>}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            onClick={() => navigate("/home/products")}
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <MailIcon />
              </ListItemIcon>
              <ListItemText
                primary={<Link to={`/home/products`}>Products</Link>}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem> */}
        </List>
        <Divider />
        <List>
          <ListItem
            onClick={() => {
              // saveToken("")
              // navigate("/")
              openLogoutModal();
            }}
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={"LOGOUT"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
      <Modal
        open={logoutModal}
        onClose={() => handleCloseLogoutModal()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center absolute left-[40%] top-[40%]"
      >
        <Box className="w-[300px] py-[30px] bg-[#000]  text-[#fff] border-none outline-none rounded-[10px] ">
          <div className="flex justify-end pr-[20px]">
            <button className="text-[#fff] text-[27px]" onClick={()=>closeLogoutModal()}>&times;</button>
          </div>
          <div className="flex items-center justify-center flex-col ">
            <h1 className="mb-[30px] text-center text-[23px] font-[800] ">
              Are you sure to Logout?
            </h1>
            <div className="flex items-center gap-[20px]">
              <button
                className="p-[8px_40px] bg-[green] text-[#fff] outline-none rounded-[30px]"
                onClick={() => {
                  saveToken("");
                  navigate("/");
                  closeLogoutModal();
                }}
              >
                Yes
              </button>
              <button
                className="p-[8px_40px] bg-[red] text-[#fff] outline-none rounded-[30px]"
                onClick={() => {
                  closeLogoutModal();
                }}
              >
                No
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </Box>
  );
};

export default Layout;
