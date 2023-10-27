import { AdminPanelSettingsOutlined, CalendarMonthOutlined, Groups2Outlined, HomeOutlined, PointOfSaleOutlined, PublicOutlined, ReceiptLongOutlined, ShoppingCartOutlined, TodayOutlined, TrendingUpOutlined } from "@mui/icons-material";
import moment from "moment";

// export const navLinks = [
//     {
//         name: "Dashboard",
//         icon: <HomeOutlined />
//     },
//     {
//         name: "Client Facing",
//         icon: null
//     },
//     {
//         name: "Products",
//         icon: <ShoppingCartOutlined />
//     },
//     {
//         name: "Customers",
//         icon: <Groups2Outlined />
//     },
//     {
//         name: "Transactions",
//         icon: <ReceiptLongOutlined />
//     },
//     {
//         name: "Geography",
//         icon: <PublicOutlined />
//     },
//     {
//         name: "Sales",
//         icon: null
//     },
//     {
//         name: "Overview",
//         icon: <PointOfSaleOutlined />
//     },
//     {
//         name: "Daily",
//         icon: <TodayOutlined />
//     },
//     {
//         name: "Monthly",
//         icon: <CalendarMonthOutlined />
//     },
//     {
//         name: "management",
//         icon: null
//     },
//     {
//         name: "Admin",
//         icon: <AdminPanelSettingsOutlined />
//     },
//     {
//         name: "Performance",
//         icon: <TrendingUpOutlined />
//     },
// ]

export const formattedDate = (date) => {
    return moment(date).format('LL')
}

export const debounceSearch = (searchValue, setSearchValue) => {
    setTimeout(() => {
        setSearchValue(searchValue)
    }, 300);
}

export const formattedAmount = (amount) => {
    return amount.toLocaleString("en-IN", {
        maximumFractionDigits: 2,
        style: "currency",
        currency: "INR",
    })
}

