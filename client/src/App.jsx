import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import EmailVerify from "./Pages/EmailVerify";
import ResetPassword from "./Pages/ResetPassword";
import AboutPage from "./Pages/AboutPage";
import { ToastContainer } from "react-toastify";
const App = () => {
  return (
    <>
      <ToastContainer />

      <div className="bg-gradient-to-b from-slate-50 to-red-50 bg-cover bg-center min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/email-verify" element={<EmailVerify />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
