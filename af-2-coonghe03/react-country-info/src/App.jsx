import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CountryDetails from "./pages/CountryDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:cca3" element={<CountryDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
