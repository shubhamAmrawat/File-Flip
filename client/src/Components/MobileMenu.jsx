import React from 'react'
import { X } from "lucide-react";
const MobileMenu = ({ isOpen, onClose }) => {
 

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 md:hidden ${
          isOpen ? "opacity-30" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[75%] max-w-xs bg-rose-200 shadow-lg z-50 transition-transform duration-300 ease-in-out transform flex flex-col justify-start px-6 py-4  ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <button
          className="self-end mb-6 text-gray-600 hover:text-rose-500"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X />
        </button>

        <ul className="flex flex-col gap-5">
          <li className="text-sm font-medium text-gray-700 hover:text-rose-600 cursor-pointer">
            File Converter
          </li>
          <li className="text-sm font-medium text-gray-700 hover:text-rose-600 cursor-pointer">
            Audio Tools
          </li>
          <li className="text-sm font-medium text-gray-700 hover:text-rose-600 cursor-pointer">
            About
          </li>
          <li className="text-sm font-medium text-white bg-rose-500 hover:bg-rose-600 text-center py-2 rounded-full cursor-pointer mt-4">
            Get Started
          </li>
        </ul>
      </div>
    </>
  );
};

export default MobileMenu