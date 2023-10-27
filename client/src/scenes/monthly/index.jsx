import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import Header from "../../components/common/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useGetSalesQuery } from "../../services/api";
import MonthlyCart from "../../components/monthly/MonthlyChart";

const Monthly = () => {
  const [view, setView] = useState("units");
  const { data, isLoading } = useGetSalesQuery();
  return (
    <Box m={"1.5rem 2.5rem"}>
      <Header
        title={"Monthly"}
        subtitle={"Monthly of general revenue and profit"}
      />
      <Box height={"calc(100vh - 200px)"} mt={"1.5rem"} position={"relative"}>
        <MonthlyCart />
      </Box>
    </Box>
  );
};

export default Monthly;
