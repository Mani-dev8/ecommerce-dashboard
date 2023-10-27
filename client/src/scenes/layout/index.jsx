import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import SideBar from "../../components/common/SideBar";
import Navbar from "../../components/common/Navbar";
import { useGetUserQuery } from "../../services/api";
function Layout() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const { userId } = useSelector((state) => state.global);
  const { data } = useGetUserQuery(userId);
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: isNonMobile ? "flex" : "flex",
      }}
    >
      <SideBar
        user={data || {}}
        drawerWidth="250px"
        isNonMobile={isNonMobile}
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />

      <Box
        maxHeight={"100vh"}
        overflow={"hidden"}
        sx={
          isNonMobile
            ? { width: "100%" }
            : { width: "100%", position: "absolute", top: 0 }
        }
      >
        <>
          <Box width={"100%"}>
            <Navbar
              user={data || {}}
              isSideBarOpen={isSideBarOpen}
              setIsSideBarOpen={setIsSideBarOpen}
            />
          </Box>
        </>

        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
