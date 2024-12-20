import React, { useState, useEffect } from "react";
import axios from 'axios';
import { 
  TextField, 
  Button, 
  Grid, 
  Typography, 
  Box, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Alert,
  Snackbar 
} from "@mui/material";

const InputForm = () => {
  // Form state
  const [background, setBackground] = useState("");
  const [purpose, setPurpose] = useState("");
  const [keywords, setKeywords] = useState("");
  const [selectedAspectRatio, setSelectedAspectRatio] = useState("1:1");
  
  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);

  // Aspect ratio options
  const aspectRatios = [
    { label: "Instagram Post (1:1)", description: "Square image, ideal for Instagram posts." },
    { label: "Instagram Story (9:16)", description: "Vertical format for Stories on Instagram and Facebook." },
    { label: "Facebook Cover (16:9)", description: "Wide banner format, suitable for Facebook cover photos." },
    { label: "Twitter Post (2:1)", description: "Rectangular format for Twitter feed posts." },
    { label: "LinkedIn Banner (4:1)", description: "Long banner for LinkedIn profiles or company pages." },
    { label: "Brochure (8.5:11)", description: "Standard brochure aspect ratio for printing materials." }
  ];

  // Update keywords placeholder based on background and purpose
  useEffect(() => {
    let newPlaceholder = "Example: Mobile, Car, Books...";
    if (background && purpose) {
      newPlaceholder = `${background}, ${purpose}`;
    } else if (background) {
      newPlaceholder = background;
    } else if (purpose) {
      newPlaceholder = purpose;
    }
    setKeywords(newPlaceholder);
  }, [background, purpose]);

  // Handle aspect ratio change
  const handleAspectRatioChange = (event) => {
    setSelectedAspectRatio(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Reset states
    setIsSubmitting(true);
    setError("");
    setSuccessMessage("");

    // Validate inputs
    if (!background.trim() || !purpose.trim() || !keywords.trim()) {
      setError("Please fill in all fields");
      setIsSubmitting(false);
      setShowSnackbar(true);
      return;
    }

    // Prepare form data
    const formData = {
      background,
      purpose,
      keywords,
      selectedAspectRatio
    };

    try {
      const response = await axios.post("http://localhost:5000/submit", formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log("Response:", response.data);
      
      if (response.data.prompt) {
        setSuccessMessage("Form submitted successfully!");
        setShowSnackbar(true);
        // You can handle the generated prompt here
        console.log("Generated prompt:", response.data.prompt);
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.response?.data?.error || "Failed to submit form. Please try again.");
      setShowSnackbar(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle snackbar close
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowSnackbar(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #004d40, #607d8b)",
        padding: "2rem",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "500px",
          padding: "2rem",
          borderRadius: "16px",
          background: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#004d40",
            background: "linear-gradient(90deg, #004d40, #607d8b)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "2rem",
          }}
        >
          Tell Us About Your Banner
        </Typography>

        <Grid container spacing={3}>
          {/* Background Input */}
          <Grid item xs={12}>
            <TextField
              label="Background Style"
              placeholder="Example: Cinematic, Vintage, Modern, Gradient Color (color name)"
              fullWidth
              variant="outlined"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              required
            />
          </Grid>

          {/* Purpose Input */}
          <Grid item xs={12}>
            <TextField
              label="Purpose"
              placeholder="Example: Promotions, Branding, Information"
              fullWidth
              variant="outlined"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              required
            />
          </Grid>

          {/* Keywords Input */}
          <Grid item xs={12}>
            <TextField
              label="Keywords"
              placeholder={keywords}
              fullWidth
              variant="outlined"
              value={keywords.startsWith("Example:") ? "" : keywords}
              onChange={(e) => setKeywords(e.target.value)}
              required
            />
          </Grid>

          {/* Aspect Ratio Selection */}
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Aspect Ratio</InputLabel>
              <Select
                value={selectedAspectRatio}
                onChange={handleAspectRatioChange}
                label="Aspect Ratio"
              >
                {aspectRatios.map((ratio, index) => (
                  <MenuItem key={index} value={ratio.label}>
                    {ratio.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography 
              variant="body2" 
              sx={{ 
                color: "#607d8b", 
                marginTop: "1rem",
                fontStyle: "italic"
              }}
            >
              {aspectRatios.find((ratio) => ratio.label === selectedAspectRatio)?.description}
            </Typography>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              disabled={isSubmitting}
              sx={{
                padding: "12px 20px",
                fontSize: "1rem",
                textTransform: "uppercase",
                background: "linear-gradient(90deg, #004d40, #607d8b)",
                color: "white",
                fontWeight: "bold",
                marginTop: "1rem",
                ":hover": {
                  background: "linear-gradient(90deg, #00332e, #506b7c)",
                },
              }}
              onClick={handleSubmit}
            >
              {isSubmitting ? "Submitting..." : "Generate Banner"}
            </Button>
          </Grid>
        </Grid>

        {/* Snackbar for notifications */}
        <Snackbar
          open={showSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={error ? "error" : "success"}
            sx={{ width: '100%' }}
          >
            {error || successMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default InputForm;