import { ArrowRight, Divide } from "lucide-react";
import React from "react";
import wordToPdf from "../assets/word-pdf.png";
import pdfToWord from "../assets/pdf-word.png";
import pdfToppt from "../assets/pdf-ppt.png";
import pptTopdf from "../assets/ppt-pdf.png";
import videoToaudio from "../assets/video-mp3.png";
import ytToMp3 from "../assets/yt-mp3.png";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const LandingSection = () => {
  const navigate = useNavigate(); 
  return (
    <div>
      <main className="w-full mt-30 p-4 sm:p-6 sm:px-18">
        <div className="flex flex-col items-center justify-center gap-4  py-32">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-800 md:text-6xl text-center">
            Convert <span className="text-[#f43f5e]">Anything,</span> Anytime
          </h1>
          <p className="mt-6 max-w-prose text-gray-600 md:text-lg text-center">
            The easiest way to convert documents, images, videos, and audio
            files online. No installations required.
          </p>
          <button className=" items-center gap-2 border bg-[#f43f5e] border-gray-500 rounded-full px-6 py-2 text-white hover:bg-rose-600 transition-all cursor-pointer flex" onClick={()=>navigate('/convert')}>
            Get Started
            <ArrowRight />
          </button>
        </div>

        {/* popular conversions */}
        <section className="flex flex-col items-center justify-center   px-4 py-16">
          <h1 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">
            Popular Conversions
          </h1>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <a
              href="/convert"
              className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-50">
                <img src={wordToPdf} alt="" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                <span className="text-sky-500">Word</span> to{" "}
                <span className="text-rose-500">PDF</span>
              </h3>
              <p className="text-gray-600">
                Convert DOC/DOCX files to PDF with perfect formatting
              </p>
            </a>

            <a
              href="/convert"
              className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-50">
                <img src={pdfToWord} alt="" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                <span className="text-rose-500">PDF</span> to{" "}
                <span className="text-sky-500">Word</span>
              </h3>
              <p className="text-gray-600">
                Turn PDF documents into editable Word files
              </p>
            </a>

            <a
              href="/convert"
              className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-50">
                <img src={pptTopdf} alt="" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                <span className="text-orange-500">PPT</span> to{" "}
                <span className="text-rose-500">PDF</span>
              </h3>
              <p className="text-gray-600">
                Convert presentations to PDF for easy sharing
              </p>
            </a>

            <a
              href="/convert"
              className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-50">
                <img src={pdfToppt} alt="" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                <span className="text-rose-500">PDF</span>
                {" to "}
                <span className="text-orange-500">PPT</span>
              </h3>
              <p className="text-gray-600">
                Transform PDF content into editable PowerPoint slides
              </p>
            </a>
          </div>
        </section>

        {/* multimedia tools section  */}

        <section className=" px-4 py-16">
          <div className="mx-auto">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">
              Multimedia Tools
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:drop-shadow-lg">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-50">
                  <img src={videoToaudio} alt="" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  Extract Audio from Video
                </h3>
                <p className="mb-6 text-gray-600">
                  Pull audio tracks from video files with just a few clicks
                </p>
                <a href="">
                  <button className="cursor-pointer rounded-md text-sm font-medium  h-10 px-4 py-2 bg-rose-500 text-white hover:bg-rose-600">
                    Extract Audio
                  </button>
                </a>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:drop-shadow-lg">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-50">
                  <img src={ytToMp3} alt="" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  YouTube to MP3
                </h3>
                <p className="mb-6 text-gray-600">
                  Get audio from YouTube videos as MP3 files to listen offline
                </p>
                <a href="/audio-tools">
                  <button className="cursor-pointer rounded-md text-sm font-medium  h-10 px-4 py-2 bg-rose-500 text-white hover:bg-rose-600">
                    Convert YouTube
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* why choose section  */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">
            Why Choose File-Flip?
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Free &amp; Unlimited
              </h3>
              <p className="text-gray-600">
                No hidden costs or subscription fees. Convert as many files as
                you need.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Secure &amp; Private
              </h3>
              <p className="text-gray-600">
                Your files are automatically deleted after conversion. We never
                see your content.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                High Quality Results
              </h3>
              <p className="text-gray-600">
                Get pixel-perfect conversions that preserve the original
                formatting and quality.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* footer */}

     <Footer/>
    </div>
  );
};

export default LandingSection;
