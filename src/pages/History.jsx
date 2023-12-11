import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Typography, useTheme, useMediaQuery, Paper } from "@mui/material";

const History = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let jwtToken = localStorage.getItem("accessToken");

        const { data } = await axios.get(
          "http://localhost:8080/api/v1/openai/history",
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        setLoading(false);
        setHistory(data);
      } catch (err) {
        console.error(err);
        // Handle errors
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {!loggedIn ? (
        <Box
          p={10}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "flex-start",
          }}
        >
          <Typography variant="h3">
            Please
            <Link to={"/login"}>Log In</Link>
            to Continue
          </Typography>
        </Box>
      ) : (
        <Box
          width={isNotMobile ? "40%" : "80%"}
          p={"2rem"}
          m={"2rem auto"}
          borderRadius={5}
          boxShadow={5}
          bgcolor={theme.palette.background.alt}
        >
          {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
          {history.map((item) => {
            const formattedTime = new Date(item.customDate).toLocaleString(
              "en-US",
              {
                day: "numeric",
                month: "short",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              }
            );
            const type = item?.type.split("/").pop();

            return (
              <Paper
                elevation={3}
                style={{
                  marginBottom: "1rem",
                  padding: "1rem",
                  border: `1px solid ${theme.palette.primary.main}`,
                  borderRadius: 5,
                  backgroundColor: theme.palette.background.paper,
                }}
                key={item.id}
              >
                <Typography>Prompt: {item?.historyText}</Typography>
                <Typography>Time: {formattedTime}</Typography>
                <Typography>Tool: {type}</Typography>
              </Paper>
            );
          })}
        </Box>
      )}
    </>
  );
};

export default History;
