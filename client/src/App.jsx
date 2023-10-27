import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider, CssBaseline, Box, Typography } from "@mui/material";
import { Player } from "@lottiefiles/react-lottie-player";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Dashboard from "./scenes/dashboard";
import Layout from "./scenes/layout";
import Products from "./scenes/products";
import Customers from "./scenes/customers";
import Transactions from "./scenes/transactions";
import Geography from "./scenes/geography";
import Overview from "./scenes/overview";
import Daily from "./scenes/daily";
import Monthly from "./scenes/monthly";
import BreakDown from "./scenes/breakdown";
import Admins from "./scenes/admins";
import UserPerformance from "./scenes/user-performance";
import noInternetLottie from "./assets/images/Animation - 1698376870703.json";
function App() {
  const { mode } = useSelector((state) => state.global);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []);

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <>
            {isOnline ? (
              <Routes>
                <Route element={<Layout />}>
                  <Route
                    path="/"
                    element={<Navigate to="/dashboard" replace />}
                  />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/customers" element={<Customers />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/geography" element={<Geography />} />
                  <Route path="/overview" element={<Overview />} />
                  <Route path="/daily" element={<Daily />} />
                  <Route path="/monthly" element={<Monthly />} />
                  <Route path="/breakdown" element={<BreakDown />} />
                  <Route path="/admin" element={<Admins />} />
                  <Route path="/performance" element={<UserPerformance />} />
                </Route>
              </Routes>
            ) : (
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Player
                  src={noInternetLottie}
                  style={{ height: "340px", width: "340px" }}
                  loop={true}
                  autoplay={true}
                  speed={0.5}
                />
                <Typography
                  variant="h2"
                  color={
                    mode
                      ? theme.palette.primary[100]
                      : theme.palette.primary[700]
                  }
                >
                  You are offline !
                </Typography>
                <Typography
                  variant="h5"
                  mt={"1.5rem"}
                  color={
                    mode
                      ? theme.palette.primary[200]
                      : theme.palette.primary[800]
                  }
                >
                  Please check your internet connection to use this application.
                </Typography>
              </Box>
            )}
          </>
        </ThemeProvider>
      </Router>
    </div>
  );
}
export default App;
