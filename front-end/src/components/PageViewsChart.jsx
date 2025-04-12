import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { Card, CardContent, Typography } from "@mui/material";

Chart.register(...registerables);

function PageViewsChart({ timestamps, pageViewCounts }) {
  const chartData = useMemo(
    () => ({
      labels: timestamps,
      datasets: [
        {
          label: "Page Views",
          data: pageViewCounts,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    }),
    [timestamps, pageViewCounts]
  );

  const chartOptions = useMemo(
    () => ({
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    }),
    []
  );

  return (
    <Card>
      <CardContent sx={{ height: "100%" }}>
        <Typography
          variant="h5"
          component="div"
          style={{ textAlign: "center" }}
        >
          Page Views
        </Typography>
        <Line data={chartData} options={chartOptions} />
      </CardContent>
    </Card>
  );
}

export default PageViewsChart;
