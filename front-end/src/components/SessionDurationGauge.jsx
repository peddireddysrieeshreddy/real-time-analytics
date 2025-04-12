import React, { useMemo } from "react";
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Grid,
} from "@mui/material";

function SessionDurationGauge({ duration }) {
  const memoizedDuration = useMemo(() => duration, [duration]);
  const progress = useMemo(
    () => (memoizedDuration / 10) * 100,
    [memoizedDuration]
  );

  return (
    <Card>
      <CardContent sx={{ height: "100%" }}>
        <Typography variant="h5" component="div">
          Average Session Duration (minutes)
        </Typography>
        <Typography variant="h3" component="div">
          {memoizedDuration.toFixed(2)}
        </Typography>
        <LinearProgress variant="determinate" value={progress} />
      </CardContent>
    </Card>
  );
}

export default SessionDurationGauge;
