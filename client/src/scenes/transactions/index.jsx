import React, { useState } from "react";
import { useGetTransactionsQuery } from "../../services/api";
import { Search } from "@mui/icons-material";
import Header from "../../components/common/Header";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  useTheme,
} from "@mui/material";
import FlexBetween from "../../components/common/FlexBetween";
import {
  DataGrid,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { debounceSearch, formattedDate } from "../../utils/constants";

function CustomToolbar({ setSearch, search }) {
  const [searchVal, setSearchVal] = useState("");

  // Define a function to handle the search input change
  const handleSearchInputChange = (value) => {
    setSearchVal(value);

    // Call the handleSetSearch function after 300ms, and then clear the search input value
    setTimeout(() => {
      handleSetSearch(value);
      setSearchVal(""); // Clear the search input value
    }, 300);
  };
  return (
    <GridToolbarContainer sx={{ mb: "0.5rem" }}>
      <FlexBetween width={"100%"}>
        <Box>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </Box>
        <GridToolbarQuickFilter
          quickFilterParser={(searchInput) => {
            setSearch(searchInput);
            return searchInput.split(",").map((value) => value.trim());
          }}
          quickFilterFormatter={(quickFilterValues) =>
            quickFilterValues.join(", ")
          }
          debounceMs={200}
        />
      </FlexBetween>
    </GridToolbarContainer>
  );
}

const Transactions = () => {
  const theme = useTheme();
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetTransactionsQuery({
    page: paginationModel.page,
    pageSize: paginationModel.pageSize,
    sort: JSON.stringify(sort),
    search,
  });
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "user",
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
    <>
      <Box m={"1.5rem 2.5rem"}>
        <Header title={"Transactions"} subtitle={"List of Transactions"} />
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
            rows={data?.transactions || []}
            columns={columns}
            rowCount={data?.totalResult || 0}
            pagination
            sortingMode="server"
            onSortModelChange={(newSortModel) => {
              newSortModel.length ? setSort(...newSortModel) : null;
            }}
            paginationMode="server"
            slots={{
              toolbar: CustomToolbar,
            }}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10, 25]}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                setSearch: setSearch,
                search: search,
              },
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Transactions;
