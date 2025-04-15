import { ArrowRight } from 'lucide-react';
import React from 'react'
import wordToPdf from '../assets/word-pdf.png'
import pdfToWord from '../assets/pdf-word.png'
import pdfToppt from "../assets/pdf-ppt.png";
import pptTopdf from "../assets/ppt-pdf.png";



const LandingSection = () => {
  return (
    <div className="w-full mt-30 p-4 sm:p-6 sm:px-18">
      <div className="flex flex-col items-center justify-center gap-4  py-32">
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

      {/* popular conversions */}
      <div className='flex flex-col items-center justify-center   px-4 py-16"'>
        <h1 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">
          Popular Conversions
        </h1>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <a
            href="/convert"
            class="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all hover:shadow-md"
          >
            <div class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-50">
              <img src={wordToPdf} alt="" />
            </div>
            <h3 class="mb-2 text-xl font-semibold text-gray-900">
              <span className="text-sky-500">Word</span> to{" "}
              <span className="text-rose-500">PDF</span>
            </h3>
            <p class="text-gray-600">
              Convert DOC/DOCX files to PDF with perfect formatting
            </p>
          </a>

          <a
            href="/convert"
            class="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all hover:shadow-md"
          >
            <div class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-50">
              <img src={pdfToWord} alt="" />
            </div>
            <h3 class="mb-2 text-xl font-semibold text-gray-900">
              <span className="text-rose-500">PDF</span> to{" "}
              <span className="text-sky-500">Word</span>
            </h3>
            <p class="text-gray-600">
              Turn PDF documents into editable Word files
            </p>
          </a>

          <a
            href="/convert"
            class="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all hover:shadow-md"
          >
            <div class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-50">
              <img src={pptTopdf} alt="" />
            </div>
            <h3 class="mb-2 text-xl font-semibold text-gray-900">
              <span className="text-orange-500">PPT</span> to{" "}
              <span className="text-rose-500">PDF</span>
            </h3>
            <p class="text-gray-600">
              Convert presentations to PDF for easy sharing
            </p>
          </a>

          <a
            href="/convert"
            class="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all hover:shadow-md"
          >
            <div class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-50">
              <img src={pdfToppt} alt="" />
            </div>
            <h3 class="mb-2 text-xl font-semibold text-gray-900">
              <span className="text-rose-500">PDF</span>
              {" to "}
              <span className="text-orange-500">PPT</span>
            </h3>
            <p class="text-gray-600">
              Transform PDF content into editable PowerPoint slides
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}

export default LandingSection