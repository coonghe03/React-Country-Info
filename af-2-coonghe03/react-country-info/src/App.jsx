import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CountryDetails from "./pages/CountryDetails";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/country/:cca3" element={<CountryDetails />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
