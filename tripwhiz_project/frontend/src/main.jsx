// ✅ Import Leaflet CSS first (important for map tiles to render correctly)
import "leaflet/dist/leaflet.css";

// ✅ React imports
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ✅ App & styles
import App from "./App";
import "./styles.css";

// ✅ Create React root and render
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* The wildcard (*) means all routes go through App */}
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
