import React from "react";
import { useGetDashBoardQuery } from "../../services/api";
import { Box, Button, Typography, useTheme } from "@mui/material";
import Header from "../../components/common/Header";
import { DataGrid } from "@mui/x-data-grid";
import { formattedDate } from "../../utils/constants";
import FlexBetween from "../../components/common/FlexBetween";
import {
  DownloadOutlined,
  Email,
  PersonAdd,
  PointOfSale,
  Traffic,
} from "@mui/icons-material";
import OverViewChart from "../../components/sales/OverViewChart";
import StatsCard from "../../components/dashboard/StatsCard";
import BreakDownChart from "../../components/breakdown/BreakDownChart";
function Dashboard() {
  const theme = useTheme();
  const { data, isLoading } = useGetDashBoardQuery();
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 0.5,
      renderCell: (params) => {
        return JSON.parse(params.value).toLocaleString("en-IN", {
          maximumFractionDigits: 2,
          style: "currency",
          currency: "INR",
        });
      },
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
      renderCell: (params) => formattedDate(params.createdAt),
    },
  ];
  return (
    <Box m={"1.5rem 2.5rem"}>
      <Box height={"calc(100vh - 160px)"} mt={"1.5rem"}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            [theme.breakpoints.up("sm")]: {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            },
          }}
        >
          <Header title={"DashBoard"} subtitle={"Welcome to your dashboard"} />
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              px: "10px",
              width: "fit-content",
            }}
          >
            <DownloadOutlined sx={{ mr: "0.5rem" }} />
            Download Reports
          </Button>
        </Box>
        <Box sx={{ overflowY: "auto" }} height={"100%"}>
          <Box
            mt={"1rem"}
            display={"grid"}
            gridTemplateColumns={"repeat(12,1fr)"}
            gridAutoRows={"160px"}
            gap="20px"
            sx={{
              "& > div": {
                [theme.breakpoints.down("lg")]: { gridColumn: "span 12" },
              },
            }}
          >
            <StatsCard
              title={"Total Customers"}
              value={data?.totalCustomers}
              increase={"14%"}
              description={"Since last month"}
              icon={
                <Email
                  sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                />
              }
            />
            <StatsCard
              title={"Sales Today"}
              value={data?.todayStats.totalSales}
              increase={"+30%"}
              description={"Since last month"}
              icon={
                <PointOfSale
                  sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                />
              }
            />
            <Box
              gridColumn={"span 8"}
              gridRow={"span 2"}
              backgroundColor={theme.palette.background.alt}
              borderRadius="0.55rem"
              p="1rem"
            >
              <OverViewChart view="sales" isDashboard={true} />
            </Box>
            <StatsCard
              title={"Monthly Sales"}
              value={data?.thisMonthStats.totalSales}
              increase={"+5%"}
              description={"Since last month"}
              icon={
                <PersonAdd
                  sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                />
              }
            />
            <StatsCard
              title={"Yearly Sales"}
              value={data?.yearlySalesTotal}
              increase={"+43%"}
              description={"Since last year"}
              icon={
                <Traffic
                  sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                />
              }
            />
            {/* ROW 2 */}
            <Box
              gridColumn={"span 8"}
              gridRow={"span 3"}
              sx={{
                "& .MuiDataGrid-root": { border: "none", borderRadius: "5rem" },
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
                rows={data?.transactions || []}
                columns={columns}
                pagination
                pageSizeOptions={[5, 10, 25]}
              />
            </Box>
            <Box
              gridColumn={"span 4"}
              gridRow={"span 3"}
              backgroundColor={theme.palette.background.alt}
              p={"1.5rem"}
              borderRadius={"0.55rem"}
            >
              <Typography
                variant="h6"
                sx={{ color: theme.palette.secondary[100] }}
              >
                Sales By Category
              </Typography>
              <BreakDownChart isDashboard={true} />
              <Typography
                p="0 0.6rem"
                fontSize="0.8rem"
                sx={{ color: theme.palette.secondary[200] }}
              >
                Breakdown of real states and information via category for
                revenue made for this year and total sales.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
