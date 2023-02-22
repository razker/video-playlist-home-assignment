import React from "react";
import { ThemeProvider } from "@mui/material";
import { appTheme } from "./themes/theme";
import "./App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";

const App = () => {
  return (
    <ThemeProvider theme={appTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
