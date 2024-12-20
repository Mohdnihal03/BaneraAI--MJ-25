import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import InputForm from "./components/inputform";
import CanvaImageEditor from "./components/CanvaImageEditor";

function App() {
  const [formData, setFormData] = useState(null); // To store form response if needed

  const handleSubmit = async (data) => {
    console.log("Data to be submitted:", data); // Debugging the data

    try {
      const response = await fetch("http://localhost:5000/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Response received:", result); // Debugging response
      setFormData(result.data); // Store the response if needed
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error occurred:", error.message || error); // Log error details
      alert(error);
    }
  };

  return (
    <Router>
      <Routes>
        {/* Route to Home component */}
        <Route path="/" exact element={<Home />} />

        {/* Route to InputForm, passing handleSubmit */}
        <Route path="/inputForm" element={<InputForm onSubmit={handleSubmit} />} />

        <Route path="/canvaEditor" element={<CanvaImageEditor />} />
      </Routes>
    </Router>
  );
}

export default App;
