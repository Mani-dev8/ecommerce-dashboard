import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import Header from "../../components/common/Header";
import { DataGrid } from "@mui/x-data-grid";
import OverViewChart from "../../components/sales/OverViewChart";

const Overview = () => {
  const [view, setView] = useState("units");
  return (
    <Box m={"1.5rem 2.5rem"}>
      <Header
        title={"Overview"}
        subtitle={"Overview of general revenue and profit"}
      />
      <Box height={"calc(100vh - 200px)"} mt={"1.5rem"} position={"relative"}>
        <FormControl>
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            label="View"
            onChange={(e) => setView(e.target.value)}
          >
            <MenuItem value="sales">Sales</MenuItem>
            <MenuItem value="units">Units</MenuItem>
          </Select>
        </FormControl>
        <OverViewChart view={view} />
      </Box>
    </Box>
  );
};

export default Overview;
