import { Code, History, Logout, Person } from "@mui/icons-material";
import { Button, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutAPI } from "../Redux/Auth/auth.action";
import LiveClock from "./live-clock/LiveClock";
import { rootStateType } from "../Redux/Store";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state: rootStateType) => state.auth.isAuth);
  const user = useSelector((state: rootStateType) => state.auth.user);

  const handleGoToHomePage = () => {
    navigate("/");
  };
  const location = useLocation();

  const showAuthButtons = !["/auth/signin", "/auth/signup"].includes(location.pathname);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickLogout = () => {
    handleClose();
    logoutAPI(dispatch);
  };

  const handleClickMySnippets = () => {
    navigate("/my-snippets");
  };

  return (
    <div className="bg-dark-2 h-[60px] flex flex-row justify-left items-center p-2">
      <div className="flex flex-row justify-between items-center gap-2 w-full">
        <div
          className="flex flex-row justify-left items-center cursor-pointer gap-2 w-1/3"
          onClick={handleGoToHomePage}
        >
          <Code />
          <p className="text-xl">Code Chamber</p>
        </div>
        <div className="w-1/3 flex flex-row justify-center items-center">
          <LiveClock />
        </div>
        {isAuth && (
          <div className="flex flex-row justify-end items-center gap-2 mr-2 w-1/3">
            <Button startIcon={<History sx={{ color: "white" }} />} onClick={handleClickMySnippets}>
              My Snippets
            </Button>
            <div>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <div className="flex flex-row justify-left items-center">
                  <Person sx={{ color: "#fff" }} />
                  <p className="ml-2">{user?.firstName}</p>
                  <p className="ml-1">{user?.lastName}</p>
                </div>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClickLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>
              </Menu>
            </div>
          </div>
        )}
        {!isAuth && showAuthButtons && (
          <div className="flex flex-row justify-end items-center gap-3 w-1/3">
            <Link to={"/auth/signin"}>
              <Button>
                <p className="">Sign In</p>
              </Button>
            </Link>
            <Link to={"/auth/signup"}>
              <Button>
                <p className="">Sign Up</p>
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
