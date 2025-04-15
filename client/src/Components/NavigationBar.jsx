import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";

import {  Menu, User,} from "lucide-react";
import MobileMenu from "./MobileMenu";
import { Link, useNavigate } from "react-router-dom";
import AboutPage from "../Pages/AboutPage";
// import { useNavigation } from "react-router-dom";

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const navigate = useNavigate(); 

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [isMenuOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <header className="flex items-center justify-between w-full p-4 sm:p-6 sm:px-18 absolute top-0 ">
      <img src={logo} alt=" " className="w-28 sm:w-27 cursor-pointer" onClick={()=>navigate('/')} />

      <div className="flex gap-2 items-center">
        <button
          className="md:hidden flex items-center"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu />
        </button>
        <nav aria-label="Main navigation" className=" mr-4 hidden md:flex">
          <ul className="flex items-center gap-5 ">
            <li className="text-sm font-medium text-gray-700 transition-colors hover:text-rose-600 cursor-pointer">
              File Converter
            </li>
            <li className="text-sm font-medium text-gray-700 transition-colors hover:text-rose-600 cursor-pointer">
              Audio Tools
            </li>
            <Link className="text-sm font-medium text-gray-700 transition-colors hover:text-rose-600 cursor-pointer" to={'/about'}>
              About
            </Link>
          </ul>
        </nav>

        <button className=" items-center gap-2 border bg-[#f43f5e] border-gray-500 rounded-full px-6 py-2 text-white hover:bg-rose-600 transition-all cursor-pointer hidden md:flex">
          <span className="font-medium">Get Started</span>
        </button>

        <button className="flex items-center justify-center gap-2 bg-rose-100 rounded-full  md:border md:border-gray-500  md:rounded-full px-[10px] md:px-6 py-2 text-gray-800 hover:bg-rose-500 transition-all cursor-pointer hover:text-white">
          <span className="font-medium hidden md:flex">Login</span>
          <User width={20} />
        </button>

        <MobileMenu isOpen={isMenuOpen} onClose={()=>setIsMenuOpen(false)}/>
      </div>
    </header>
  );
};

export default NavigationBar;
