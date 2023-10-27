import React, { useMemo, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useGetSalesQuery } from "../../services/api";
import { Box, CircularProgress, useTheme } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import moment from "moment";
const DailyCart = ({ isDashboard = false, view }) => {
  const theme = useTheme();
  const { data, isLoading } = useGetSalesQuery();
  const [selectedDate, setSelectedDate] = useState({
    startDate: new Date("2021-02-01"),
    endDate: new Date("2021-03-01"),
  });
  const [formattedData] = useMemo(() => {
    if (!data) {
      return [];
    }
    const { dailyData } = data;
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

    Object.values(dailyData).forEach(({ date, totalSales, totalUnits }) => {
      const formattedDate = new Date(date);
      if (
        formattedDate >= selectedDate.startDate &&
        formattedDate <= selectedDate.endDate
      ) {
        totalSalesLine.data = [
          ...totalSalesLine.data,
          { x: moment(date).format("l"), y: totalSales },
        ];
        totalUnitsLine.data = [
          ...totalUnitsLine.data,
          {
            x: moment(date).format("l"),
            y: totalUnits,
          },
        ];
      }
    });
    const formattedData = [totalSalesLine, totalUnitsLine];
    return [formattedData];
  }, [data, selectedDate.startDate, selectedDate.endDate]);

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
          <Box
            display={"flex"}
            justifyContent={"flex-end"}
            // position={"absolute"}
            // right={0}
          >
            <Box>
              <DatePicker
                selected={selectedDate.startDate}
                onChange={(date) => {
                  setSelectedDate({ ...selectedDate, startDate: date });
                }}
                startDate={selectedDate.startDate}
                endDate={selectedDate.endDate}
                selectsStart
              />
            </Box>
            <Box>
              <DatePicker
                selected={selectedDate.endDate}
                onChange={(date) => {
                  setSelectedDate({ ...selectedDate, endDate: date });
                }}
                startDate={selectedDate.startDate}
                endDate={selectedDate.endDate}
                minDate={selectedDate.startDate}
                selectsEnd
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
            colors={{ datum: "color" }}
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
            enableArea={isDashboard}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              format: (v) => {
                if (isDashboard) return v.slice(0, 3);
                return v;
              },
              orient: "bottom",
              tickSize: 5,
              tickPadding: 6,
              tickRotation: 25,
              legend: "Date",
              legendOffset: 45,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickValues: 5,
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: `Total ${
                view === "sales" ? "Revenue" : "Units"
              } for Year`,
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
        </Box>
      )}
    </>
  );
};

export default DailyCart;
