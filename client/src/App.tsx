import React from "react";
import { ThemeProvider } from "@mui/material";
import { appTheme } from "./themes/theme";
import "./App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Home from "./components/Home/Home";
import store from "./store/store";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={appTheme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
