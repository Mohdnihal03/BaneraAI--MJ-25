import React from "react";
import { Typography, Button, Box, Container } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container>
      <Box 
        textAlign="center" 
        display="flex" 
        flexDirection="column" 
        alignItems="center"
        justifyContent="center" 
        minHeight="100vh"
      >
        <Typography 
          variant="h2" 
          gutterBottom
          sx={{
            fontFamily: "'Arial', sans-serif",
            fontWeight: "bold",
            fontSize: "3rem",
          }}
        >
          <span style={{ color: "#004d40" }}>Banera</span>{" "}
          <span style={{ color: "#607d8b" }}>AI</span>
        </Typography>

        <Typography 
          variant="h4" 
          gutterBottom
          sx={{
            fontFamily: "'Arial', sans-serif",
            fontWeight: "lighter",
            fontSize: "1.5rem",
            color: "#607d8b",
          }}
        >
          Where Creativity Meets Intelligent Marketing
        </Typography>

        <Typography 
          variant="body1" 
          paragraph 
          sx={{
            fontFamily: "'Arial', sans-serif",
            fontSize: "1rem",
            maxWidth: "800px",
            lineHeight: 1.6,
            textAlign: "center",
            marginBottom: "30px",
            color: "#424242",
          }}
        >
          <strong>Banera AI</strong> revolutionizes the creation of promotional banners by seamlessly blending creativity with intelligent automation.
          Whether it's for branding, product launches, or campaigns, Banera AI empowers you to generate captivating visuals in seconds.
          <br />
          <br />
          Moreover, Banera AI doesn't just create stunning designs; it also helps shape promotional ideas that enhance your business,
          driving engagement and growth with smarter, more targeted marketing strategies.
        </Typography>

        {/* Link component used to navigate to the input form */}
        <Link to="/inputForm" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#004d40",
              color: "#ffffff",
              padding: "10px 20px",
              fontSize: "1.1rem",
              textTransform: "uppercase",
              "&:hover": {
                backgroundColor: "#00332c",
              },
            }}
          >
            Start Now
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default Home;
