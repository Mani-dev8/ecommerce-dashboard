import React from "react";
import { useGetUserPerformanceQuery } from "../../services/api";
import Header from "../../components/common/Header";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { formattedAmount } from "../../utils/constants";

const UserPerformance = () => {
  const theme = useTheme();
  const { userId } = useSelector((state) => state.global);
  const { data, isLoading } = useGetUserPerformanceQuery(userId);
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },

    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.length;
      },
    },

    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 0.5,
      renderCell: (params) => formattedAmount(JSON.parse(params.value)),
    },
  ];
  return (
    <>
      <Box m={"1.5rem 2.5rem"}>
        <Header title={"UserPerformance"} subtitle={"List of customers"} />
        <Box
          height={"calc(100vh - 200px)"}
          mt={"1.5rem"}
          sx={{
            "& .MuiDataGrid-root": { border: "none" },
            "& .MuiDataGrid-cell": {
              borderBottom: "none !important",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.primary.light,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={data?.sales || []}
            columns={columns}
          />
        </Box>
      </Box>
    </>
  );
};

export default UserPerformance;
