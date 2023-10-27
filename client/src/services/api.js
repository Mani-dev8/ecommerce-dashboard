import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_REACT_APP_BASE_URL }),
    reducerPath: 'adminApi',
    tagTypes: ["User", "Products", "Customers", "Transactions", 'Geography', 'Sales', 'Admin', 'UserPerformance', 'Dashboard'],
    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => `general/user/${id}`,
            providesTags: ["User"]
        }),
        getProducts: build.query({
            query: () => `client/product/all`,
            providesTags: ["Products"],
        }),
        getCustomers: build.query({
            query: () => `client/customer/all`,
            providesTags: ["Customers"]
        }),
        getTransactions: build.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: `client/transaction/all`, method: 'GET', params: {
                    page, pageSize, sort, search
                }
            }),
            providesTags: ["Transactions"]
        }),
        getLocations: build.query({
            query: () => `client/geography`,
            providesTags: ['Geography']
        }),
        getSales: build.query({
            query: () => `sales/sales`,
            providesTags: ['Sales']
        }),
        getAdmins: build.query({
            query: () => `/management/admin/all`,
            providesTags: ['Admin']
        }),
        getUserPerformance: build.query({
            query: (id) => `/management/performance/${id}`,
            providesTags: ['UserPerformance']
        }),
        getDashBoard: build.query({
            query: () => `/general/dashboard`,
            providesTags: ['Dashboard']
        })
    })
})

export const { useGetUserQuery, useGetProductsQuery, useGetCustomersQuery, useGetTransactionsQuery, useGetLocationsQuery, useGetSalesQuery, useGetAdminsQuery, useGetUserPerformanceQuery, useGetDashBoardQuery } = api;

