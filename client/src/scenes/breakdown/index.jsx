import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import Header from "../../components/common/Header";
import BreakDownChart from "../../components/breakdown/BreakDownChart";

const BreakDown = () => {
  return (
    <Box m={"1.5rem 2.5rem"}>
      <Header
        title={"Break Down"}
        subtitle={"BreakDown of general revenue and profit"}
      />
      <Box height={"calc(100vh - 200px)"} mt={"1.5rem"} position={"relative"}>
        <BreakDownChart />
      </Box>
    </Box>
  );
};

export default BreakDown;
