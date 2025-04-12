import React, { useMemo } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

function ActiveUsers({ activeUsers }) {
  const memoizedUsers = useMemo(() => activeUsers, [activeUsers]);

  return (
    <Card>
      <CardContent sx={{ height: "100%" }}>
        <Typography variant="h5" component="div" style={{ margin: 2 }}>
          Active Users
        </Typography>
        <Typography variant="h3" component="div">
          {memoizedUsers}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ActiveUsers;
