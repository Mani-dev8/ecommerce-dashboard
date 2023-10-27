import React, { useMemo, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { useGetSalesQuery } from "../../services/api";
import { Box, CircularProgress, useTheme } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import DatePicker from "react-datepicker";
const BreakDownChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const { data, isLoading } = useGetSalesQuery();
  const [startDate, setStartDate] = useState(new Date("2021-01-01"));
  const [formattedData] = useMemo(() => {
    if (!data) {
      return [];
    }
    const { salesByCategory } = data;
    const colorData = [
      {
        color: theme.palette.secondary[700],
      },
      {
        color: theme.palette.secondary[600],
      },
      {
        color: theme.palette.secondary[200],
      },
      {
        color: theme.palette.secondary[400],
      },
    ];
    /*  {
    "id": "rust",
    "label": "rust",
    "value": 406,
    "color": "hsl(287, 70%, 50%)"
  }, */
    const formattedData = Object.entries(salesByCategory).map(
      ([key, value], index) => {
        colorData[index];
        return {
          color: colorData[index].color,
          id: key,
          label: key,
          value: value,
        };
      }
    );
    return [formattedData];
  }, [data]);
  return (
    <>
      {!data && isLoading ? (
        <Box
          sx={{
            width: "100%",
            height: "calc(100% - 55px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress color="secondary" sx={{ m: "auto" }} />
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            height: isDashboard ? "calc(100% - 70px)" : "calc(100%)",
          }}
        >
          {data !== undefined && (
            <ResponsivePie
              data={formattedData}
              theme={{
                axis: {
                  domain: {
                    line: {
                      stroke: theme.palette.secondary[200],
                    },
                  },
                  legend: {
                    text: {
                      fill: theme.palette.secondary[200],
                    },
                  },
                  ticks: {
                    line: {
                      stroke: theme.palette.secondary[200],
                      strokeWidth: 1,
                    },
                    text: {
                      fill: theme.palette.secondary[200],
                    },
                  },
                },
                legends: {
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
                tooltip: {
                  container: {
                    color: theme.palette.primary.main,
                  },
                },
              }}
              colors={{ datum: "data.color" }}
              margin={
                isDashboard
                  ? { top: 40, right: 80, bottom: 100, left: 50 }
                  : { top: 40, right: 80, bottom: 80, left: 80 }
              }
              sortByValue={true}
              innerRadius={0.45}
              activeOuterRadiusOffset={8}
              borderWidth={1}
              borderColor={{
                from: "color",
                modifiers: [["darker", 0.2]],
              }}
              enableArcLinkLabels={!isDashboard}
              arcLinkLabelsTextColor={theme.palette.secondary[200]}
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={{ from: "color" }}
              arcLabelsSkipAngle={10}
              arcLabelsTextColor={{
                from: "color",
                modifiers: [["darker", 2]],
              }}
              legends={[
                {
                  anchor: "bottom",
                  direction: "row",
                  justify: false,
                  translateX: isDashboard ? 20 : 0,
                  translateY: isDashboard ? 50 : 56,
                  itemsSpacing: 0,
                  itemWidth: 85,
                  itemHeight: 18,
                  itemTextColor: "#999",
                  itemDirection: "left-to-right",
                  itemOpacity: 1,
                  symbolSize: 18,
                  symbolShape: "circle",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemTextColor: theme.palette.primary[500],
                      },
                    },
                  ],
                },
              ]}
            />
          ) }
        </Box>
      )}
    </>
  );
};

export default BreakDownChart;
