import { Box, Skeleton, Typography, useTheme } from "@mui/material";
import React from "react";
import FlexBetween from "../common/FlexBetween";

const StatsCard = ({ title, value, increase, icon, description }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        gridColumn: "span 2",
        gridRow: "span 1",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: "1.25rem 1rem",
        flex: "1 1 100%",
        backgroundColor: `${theme.palette.background.alt}`,
        borderRadius: "0.55rem",
      }}
    >
      <FlexBetween>
        <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
          {title}
        </Typography>
        {icon}
      </FlexBetween>
      {!value ? (
        <Skeleton
          height={"3rem"}
          width={`${Math.floor(50 + Math.random() * (100 - 50 + 1))}%`}
        />
      ) : (
        <Typography
          variant="h3"
          fontWeight={"600"}
          sx={{ color: theme.palette.secondary[200] }}
        >
          {value}
        </Typography>
      )}
      <FlexBetween gap={"1rem"}>
        <Typography
          variant="h5"
          fontStyle={"italic"}
          sx={{ color: theme.palette.secondary.light }}
        >
          {increase}
        </Typography>
        <Typography>{description}</Typography>
      </FlexBetween>
    </Box>
  );
};

export default StatsCard;
