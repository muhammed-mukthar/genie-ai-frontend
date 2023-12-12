import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  Alert,
  Collapse,
  Card,
} from "@mui/material";
import { saveAs } from "file-saver";

const ImageSection = ({
  apiEndpoint,
  title,
  placeholder,
  altText,
  loading,
  setLoading,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));
  let jwtToken = localStorage.getItem("accessToken");

  const downloadImage = () => {
    try {
      // Use saveAs directly with the image link
      saveAs(image, "image.jpg");
    } catch (error) {
      console.error("Error downloading image:", error);
      // Handle the error, e.g., show a toast or display an error message.
    }
  };
  const handleLofiubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/openai/lofi-image",
        { text },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setLoading(false);
      setImage(data);
    } catch (err) {
      if (err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      }
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  const handleAnimeSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/openai/anime-image",
        { text },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setLoading(false);
      setImage(data);
    } catch (err) {
      if (err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      }
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  const handleScifiSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/openai/scifi-image",
        { text },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setLoading(false);
      setImage(data);
    } catch (err) {
      if (err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      }
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

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
            Please <Link to={"/login"}>Log In</Link> to Continue
          </Typography>
        </Box>
      ) : (
        <Box
          width={isNotMobile ? "40%" : "80%"}
          p={"2rem"}
          m={"2rem auto"}
          borderRadius={5}
          sx={{ boxShadow: 5 }}
          backgroundColor={theme.palette.background.alt}
        >
          <Collapse in={error !== ""}>
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          </Collapse>
          <form>
            <Typography variant="h3">{title}</Typography>
            <TextField
              placeholder={placeholder}
              type="text"
              multiline={true}
              required
              margin="normal"
              fullWidth
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ color: "white", mt: 2 }}
              disabled={loading}
              onClick={handleScifiSubmit}
            >
              generate scifi image{" "}
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ color: "white", mt: 2 }}
              disabled={loading}
              onClick={handleLofiubmit}
            >
              generate lofi image
            </Button>{" "}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ color: "white", mt: 2 }}
              disabled={loading}
              onClick={handleAnimeSubmit}
            >
              generate anime image
            </Button>
            <Typography mt={2}>
              Not this tool? <Link to="/">GO BACK</Link>
            </Typography>
          </form>

          {image ? (
            <>
              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{ color: "white", mt: 2 }}
                disabled={loading}
                onClick={downloadImage}
              >
                download image
              </Button>
              <Card
                sx={{
                  mt: 4,
                  border: 1,
                  boxShadow: 0,
                  height: "500px",
                  borderRadius: 5,
                  borderColor: "natural.medium",
                  bgcolor: "background.default",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
                  <img src={image} alt={altText} />
                </Box>
              </Card>
            </>
          ) : (
            <Card
              sx={{
                mt: 4,
                border: 1,
                boxShadow: 0,
                height: "500px",
                borderRadius: 5,
                borderColor: "natural.medium",
                bgcolor: "background.default",
              }}
            >
              <Typography
                variant="h5"
                color="natural.main"
                sx={{
                  textAlign: "center",
                  verticalAlign: "middle",
                  lineHeight: "450px",
                }}
              >
                {`${title} Will Appear Here (Please wait for a few seconds after submitting...)`}
              </Typography>
            </Card>
          )}
        </Box>
      )}
    </>
  );
};

export default ImageSection;
