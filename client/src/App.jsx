import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import EmailVerify from './Pages/EmailVerify';
import ResetPassword from './Pages/ResetPassword';

const App = () => {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App