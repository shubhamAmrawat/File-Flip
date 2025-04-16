import React from 'react'
import logo from "../assets/logo.png";
import { useNavigate } from 'react-router-dom';

const AuthNavbar = () => {
  const navigate = useNavigate(); 
  return (
    <header
      className={`flex items-center justify-between w-full py-2 sm:py-4  px-5 sm:px-15 sticky top-0 z-50 transition-all duration-300 }`}
    >
       <img
              src={logo}
              alt=" "
              className="w-28 sm:w-27 cursor-pointer"
              onClick={() => navigate("/")}
        />
    </header>
  );
}

export default AuthNavbar