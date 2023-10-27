import React, { useMemo, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useGetSalesQuery } from "../../services/api";
import { Box, CircularProgress, useTheme } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import DatePicker from "react-datepicker";
const MonthlyChart = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetSalesQuery();
  const [startDate, setStartDate] = useState(new Date("2021-01-01"));
  const [formattedData] = useMemo(() => {
    if (!data) {
      return [];
    }
    const { monthlyData, year } = data;
    const totalSalesLine = {
      id: "totalSales",
      color: theme.palette.secondary.main,
      data: [],
    };
    const totalUnitsLine = {
      id: "totalUnits",
      color: theme.palette.secondary[600],
      data: [],
    };

    Object.values(monthlyData).forEach(({ month, totalSales, totalUnits }) => {
      totalSalesLine.data = [
        ...totalSalesLine.data,
        { x: month, y: totalSales },
      ];
      totalUnitsLine.data = [
        ...totalUnitsLine.data,
        {
          x: month,
          y: totalUnits,
        },
      ];
    });
    const formattedData = [totalSalesLine, totalUnitsLine];
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
            height: "calc(100%  )",
          }}
        >
          {data !== undefined && (
            <>
              <Box
                display={"flex"}
                justifyContent={"flex-end"}
                // position={"absolute"}
                // right={0}
              >
                <Box>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showYearPicker
                    dateFormat="yyyy"
                    yearItemNumber={9}
                  />
                </Box>
              </Box>
              <ResponsiveLine
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
                // colors={{ datum: "color" }}
                margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
                xScale={{ type: "point" }}
                yScale={{
                  type: "linear",
                  min: "auto",
                  max: "auto",
                  stacked: false,
                  reverse: false,
                }}
                yFormat=" >-.2f"
                curve="catmullRom"
                enableArea={false}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  orient: "bottom",
                  tickSize: 5,
                  tickPadding: 6,
                  tickRotation: 25,
                  legend: "Month",
                  legendOffset: 45,
                  legendPosition: "middle",
                }}
                axisLeft={{
                  orient: "left",
                  tickValues: 5,
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: `Total ${"Revenue"} for Month`,
                  legendOffset: -60,
                  legendPosition: "middle",
                }}
                enableGridX={false}
                enableGridY={false}
                pointSize={10}
                pointColor={{ theme: "background" }}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor" }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                  {
                    anchor: "top-right",
                    direction: "column",
                    justify: false,
                    translateX: 40,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: "left-to-right",
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: "circle",
                    symbolBorderColor: "rgba(0, 0, 0, .5)",
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemBackground: "rgba(0, 0, 0, .03)",
                          itemOpacity: 1,
                        },
                      },
                    ],
                  },
                ]}
              />
            </>
          )}
        </Box>
      )}
    </>
  );
};

export default MonthlyChart;
