import React, { useEffect } from "react";
import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import Signin from "./pages/Signin/Signin";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound";
import Account from "./pages/Account/Account";
import Campaign from "./pages/Campaign/Campaign";

function App() {
  const navigate = useNavigate();
  const isTokenExpired = () => {
    const expiresIn = localStorage.getItem("access_token_expires");
    console.log(expiresIn);
    if (expiresIn === null) return true;
    if (expiresIn) {
      const currentTime = Date.now();
      const expirationTime = parseInt(expiresIn, 10);
      const isExpired = currentTime > expirationTime;
      console.log(isExpired);
      return isExpired; // Trả về true nếu token đã hết hạn
    }
    console.log("false");
    return false; // Token chưa hết hạn
  };
  useEffect(() => {
    if (isTokenExpired()) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/account" element={isTokenExpired() ? <Navigate to="/" /> : <Account />} />
      <Route path="/dashboard" element={isTokenExpired() ? <Navigate to="/" /> : <Dashboard />} />
      <Route path="/campaign" element={isTokenExpired() ? <Navigate to="/" /> : <Campaign />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
