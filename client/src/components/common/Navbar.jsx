import React, { useState } from "react";
import {
  ArrowDropDownOutlined,
  DarkMode,
  DarkModeOutlined,
  LightModeOutlined,
  Menu as MenuIcon,
  Search,
  Settings,
  SettingsOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { setMode } from "../../features/global/globalSlice";
import FlexBetween from "./FlexBetween";
import profileImage from "../../assets/images/profile.png";
function Navbar({ user, isSideBarOpen, setIsSideBarOpen }) {
  // dispatch(setMode());
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.global);
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  // const handleClick = (e) => {
  //   setAnchorEl(e.currentTarget);
  // };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", width: "100%" }}>
        <FlexBetween gap={"1rem"} marginRight={"1rem"}>
          <IconButton onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius={"9px"}
            gap={"1rem"}
            p="0.1rem 0.5rem 0.1rem 1rem"
          >
            <InputBase placeholder="Search..." sx={{ width: "100%" }} />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap={"1.5rem"}>
          <IconButton onClick={() => dispatch(setMode())}>
            {mode === "dark" ? <DarkModeOutlined /> : <LightModeOutlined />}
          </IconButton>
          <IconButton>
            <SettingsOutlined />
          </IconButton>
          {isNonMobile ? (
            <FlexBetween>
              <Button
                onClick={(e) => {
                  setAnchorEl(e.currentTarget);
                }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  textTransform: "none",
                  gap: "1rem",
                }}
              >
                <Box
                  component="img"
                  alt="profile"
                  src={profileImage}
                  height="32px"
                  width="32px"
                  borderRadius="50%"
                  sx={{ objectFit: "cover" }}
                />
                <Box textAlign="left">
                  <Typography
                    fontWeight="bold"
                    fontSize="0.85rem"
                    sx={{ color: theme.palette.secondary[100] }}
                  >
                    {user.name}
                  </Typography>
                  <Typography
                    fontSize="0.75rem"
                    sx={{ color: theme.palette.secondary[200] }}
                  >
                    {user.occupation}
                  </Typography>
                </Box>
                <ArrowDropDownOutlined
                  sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
                />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={isOpen}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              >
                <MenuItem onClick={handleClose}>Log Out</MenuItem>
              </Menu>
            </FlexBetween>
          ) : (
            ""
          )}
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
