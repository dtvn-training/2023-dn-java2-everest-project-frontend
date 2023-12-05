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
    // Lấy thời hạn của token từ localStorage
    const expiresIn = localStorage.getItem("access_token_expires");
    console.log(expiresIn);
    // Kiểm tra xem token có hết hạn hay không
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

  // Sử dụng useEffect để kiểm tra token mỗi khi component được render
  useEffect(() => {
    if (isTokenExpired()) {
      // Nếu token đã hết hạn, chuyển hướng về trang đăng nhập
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
