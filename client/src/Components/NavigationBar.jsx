/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/logo.png";

import {
  LogOutIcon,
  MailWarning,
  Menu,
  MenuSquare,
  User,
  UserCircle,
} from "lucide-react";
import MobileMenu from "./MobileMenu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/appContext";
import { toast } from "react-toastify";
import axios from "axios";

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const [scrolled, setScrolled] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const { isLoggedIn, userData, backendUrl, setUserData, setIsLoggedIn } =
    useContext(AppContext);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 290); // Change 10 to your preferred scroll threshold
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const handleLogout = async () => {
    try {
      const { data } = await axios.post(backendUrl + "/api/auth/logout");

      if (data.success) {
        toast.success(data.message);

        setIsLoggedIn(false);
        setUserData(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <header
      className={`flex items-center justify-between w-full py-2 sm:py-3 px-5 sm:px-18 sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-rose-50/70 shadow  backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <img
        src={logo}
        alt=" "
        className="w-28 sm:w-27 cursor-pointer"
        onClick={() => navigate("/")}
      />

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
            <Link className="text-sm font-medium  text-gray-700 transition-colors hover:text-rose-600 cursor-pointer whitespace-nowrap">
              File Converter
            </Link>
            <Link className="text-sm font-medium  text-gray-700 transition-colors hover:text-rose-600 cursor-pointer whitespace-nowrap">
              Audio Tools
            </Link>
            <Link
              className="text-sm font-medium  text-gray-700 transition-colors hover:text-rose-600 cursor-pointer whitespace-nowrap"
              to={"/about"}
            >
              About
            </Link>
          </ul>
        </nav>

        <button className=" items-center gap-2 border bg-[#f43f5e] border-gray-500 rounded-full px-6 py-2 text-white hover:bg-rose-600 transition-all cursor-pointer hidden md:flex">
          <span className="font-medium  whitespace-nowrap">Get Started</span>
        </button>

        {!isLoginPage && (
          <>
            {isLoggedIn ? (
              // Logout Button
              <div
                className={`bg-rose-200 flex items-center justify-center rounded-full w-10 h-10  text-gray-800 relative  cursor-pointer font-bold border border-gray-500 hover:bg-rose-600 hover:text-white transition-all duration-200 ${
                  avatarOpen && "bg-rose-500 text-white"
                } `}
                onClick={() => setAvatarOpen(!avatarOpen)}
              >
                <span>
                  {userData && userData.name[0].toUpperCase()}                
                </span>
                <div
                  className={`absolute ${
                    avatarOpen ? "block" : "hidden"
                  } top-12 right-0 z-20 w-52 bg-white rounded-lg shadow-lg`}
                >
                  <ul className="list-none m-2 flex flex-col gap-2    rounded-md text-sm">
                    <li className="py-2 px-2 rounded-lg   bg-rose-500 text-gray-50 cursor-pointer text-[17px] flex gap-2 items-center">
                      <UserCircle />
                      <span className="truncate whitespace-nowrap ">
                        {userData && userData.name}
                      </span>
                    </li>

                    <li className="py-2 px-2 rounded-lg hover:bg-gray-200 text-gray-700  cursor-pointer pr-10 flex gap-2 items-center" onClick={()=>navigate('/profile')}>
                      <MenuSquare />
                      Account
                    </li>

                    {!userData.isAccountVerified && (
                      <li className="py-2 px-2 rounded-lg hover:bg-gray-200 text-red-500   cursor-pointer flex gap-2 items-center">
                        <MailWarning className="animate-pulse"/>
                        Verify your Email
                      </li>
                    )}

                    <li
                      className="py-2 px-2 rounded-lg hover:bg-gray-200 text-gray-700  cursor-pointer pr-10 flex gap-2 items-center"
                      onClick={handleLogout}
                    >
                      <LogOutIcon />
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              // Login Button
              <button
                className="flex items-center justify-center gap-2 bg-rose-100 rounded-full md:border md:border-gray-500 md:rounded-full px-[10px] md:px-6 py-2 text-gray-800 hover:bg-rose-500 transition-all cursor-pointer hover:text-white"
                onClick={() => navigate("/login")}
              >
                <span className="font-medium hidden md:flex">Login</span>
                <User width={20} />
              </button>
            )}
          </>
        )}

        {isMenuOpen && (
          <MobileMenu
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
          />
        )}
      </div>
    </header>
  );
};

export default NavigationBar;
