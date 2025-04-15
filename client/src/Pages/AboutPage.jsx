import React from "react";
import NavigationBar from "../Components/NavigationBar";
import Footer from "../Components/Footer";

const AboutPage = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-start min-h-screen">
        <NavigationBar />
        <section className=" px-4 py-20 mt-20 text-center md:py-32">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
              About <span className="text-rose-500">File-Flip</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              We're on a mission to make file conversion simple, accessible, and
              free for everyone. Our powerful tools help millions of users
              convert their files without the hassle.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
              Our Story
            </h2>
            <div className="prose prose-lg mx-auto">
              <p>
                File-Flip was born out of frustration with existing file
                conversion tools that were either too complicated, filled with
                ads, or required expensive software installations.
              </p>
              <p>
                Founded in 2023, our team of developers and designers set out to
                create a simple yet powerful platform that anyone could use to
                convert their files quickly and easily, without technical
                knowledge or expensive subscriptions.
              </p>
              <p>
                Today, File-Flip serves millions of users worldwide, helping
                them convert documents, extract audio, and manage their files
                with just a few clicks. We're constantly improving our platform
                and adding new features based on user feedback.
              </p>
            </div>
          </div>
        </section>

        <section className=" px-4 py-16">
          <div className="container mx-auto">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
              How It Works
            </h2>
            <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-cloud-upload h-8 w-8"
                  >
                    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
                    <path d="M12 12v9"></path>
                    <path d="m16 16-4-4-4 4"></path>
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">1. Upload Your File</h3>
                <p className="text-gray-600">
                  Simply drag and drop your file or select it from your device.
                  We support a wide range of formats.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-settings h-8 w-8"
                  >
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">2. Choose Conversion</h3>
                <p className="text-gray-600">
                  Select your desired output format and adjust any settings if
                  needed. Our smart system handles the rest.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-download h-8 w-8"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" x2="12" y1="15" y2="3"></line>
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">3. Download Result</h3>
                <p className="text-gray-600">
                  Once conversion is complete, download your new file instantly.
                  It's that simple!
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            Why Choose File-Flip
          </h2>
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-zap h-5 w-5"
                >
                  <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
                </svg>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold">Lightning Fast</h3>
                <p className="text-gray-600">
                  Our optimized conversion engine processes your files in
                  seconds, not minutes.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-lock h-5 w-5"
                >
                  <rect
                    width="18"
                    height="11"
                    x="3"
                    y="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold">100% Secure</h3>
                <p className="text-gray-600">
                  Your files are encrypted during transfer and automatically
                  deleted after conversion.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-file-text h-5 w-5"
                >
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                  <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                  <path d="M10 9H8"></path>
                  <path d="M16 13H8"></path>
                  <path d="M16 17H8"></path>
                </svg>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold">High Quality</h3>
                <p className="text-gray-600">
                  We maintain the highest possible quality in all conversions,
                  preserving your content perfectly.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-circle-check-big h-5 w-5"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <path d="m9 11 3 3L22 4"></path>
                </svg>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold">Easy to Use</h3>
                <p className="text-gray-600">
                  Our intuitive interface makes file conversion accessible to
                  everyone, no technical skills required.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto px-4 py-16">
          <div className="mx-auto max-w-3xl rounded-xl  bg-gray-50/50 p-8 shadow-md">
            <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
              Get in Touch
            </h2>
            <p className="mb-8 text-center text-gray-600">
              Have questions or feedback? We'd love to hear from you. Our team
              is always ready to help.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href="/contact">
                <button className="flex items-center rounded-lg bg-rose-50  text-rose-500 font-medium cursor-pointer hover:bg-rose-100 h-10 py-2 gap-2 px-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-message-circle h-4 w-4"
                  >
                    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                  </svg>
                  Contact Us
                </button>
              </a>
              <a href="/convert">
                <button className="flex items-center rounded-lg bg-rose-500 text-gray-50 font-medium cursor-pointer hover:bg-rose-600 h-10 py-2 gap-2 px-6">
                  Try File-Flip
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-right h-4 w-4"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </button>
              </a>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
