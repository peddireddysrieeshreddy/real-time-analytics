import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import ActiveUsers from "./components/ActiveUsers";
import PageViewsChart from "./components/PageViewsChart";
import SessionDurationGauge from "./components/SessionDurationGauge";
import { Grid, Box } from "@mui/material";

const socket = io("http://localhost:4000", {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
});

function App() {
  const [data, setData] = useState({
    active_users: 0,
    page_views: 0,
    avg_session_duration: 0,
    timestamps: [],
    pageViewCounts: [],
  });

  useEffect(() => {
    console.log("Connecting to Socket.IO...");

    socket.on("connect", () => {
      console.log("Socket.IO connected with ID:", socket.id);
    });

    socket.on("updateData", (newData) => {
      console.log("Data received:", newData);
      setData((prevData) => ({
        ...prevData,
        active_users: newData.active_users,
        page_views: newData.page_views,
        avg_session_duration: newData.avg_session_duration,
        timestamps: [...prevData.timestamps, newData.timestamp].slice(-10),
        pageViewCounts: [...prevData.pageViewCounts, newData.page_views].slice(
          -10
        ),
      }));
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket.IO disconnected. Reason:", reason);
    });

    socket.on("connect_error", (error) => {
      console.error("Socket.IO connection error:", error);
    });

    socket.on("reconnect_attempt", () => {
      console.log("Reconnect attempt...");
    });

    socket.on("reconnect_error", (error) => {
      console.error("Reconnect error:", error);
    });

    socket.on("reconnect_failed", () => {
      console.error("Reconnection failed.");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Grid
      container
      spacing={0}
      style={{ margin: "2rem" }}
      justifyContent="center"
    >
      <Grid item xs={12} md={6} style={{ width: "50%" }}>
        <ActiveUsers activeUsers={data.active_users} />
      </Grid>
      <Grid item xs={12} md={6} style={{ width: "50%" }}>
        <SessionDurationGauge duration={data.avg_session_duration} />
      </Grid>

      <Grid item xs={12} md={12} style={{ width: "100%" }}>
        <PageViewsChart
          timestamps={data.timestamps}
          pageViewCounts={data.pageViewCounts}
        />
      </Grid>
    </Grid>
  );
}

export default App;
