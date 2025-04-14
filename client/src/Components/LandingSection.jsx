import { ArrowRight } from 'lucide-react';
import React from 'react'

const LandingSection = () => {
  return (
    <div className="w-full mt-30 p-4 sm:p-6 sm:px-18">
      <div className="flex flex-col items-center justify-center gap-4 mt-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-800 md:text-6xl">
          Convert <span className="text-[#f43f5e]">Anything,</span>Anytime
        </h1>
        <p className="mt-6 max-w-prose text-gray-600 md:text-lg text-center">
          The easiest way to convert documents, images, videos, and audio files
          online. No installations required.
        </p>
        <button className=" items-center gap-2 border bg-[#f43f5e] border-gray-500 rounded-full px-6 py-2 text-white hover:bg-rose-600 transition-all cursor-pointer flex">
          Get Started
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}

export default LandingSection