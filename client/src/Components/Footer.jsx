import React from 'react'

const Footer = () => {
  return (
    <footer className="border-t bg-gradient-to-t from-slate-50 to-red-50 bg-cover bg-center border-rose-100 py-4 px-4">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-center text-sm text-gray-500">
          © 2025 File-Flip. Developed by{" "}
          <a
            href="https://github.com/shubhamAmrawat"
            target="blank"
            className="text-sky-500"
          >
            Shubham Amrawat.
          </a>
        </p>
        <div className="flex gap-4">
          <a
            href="/terms"
            className="text-sm text-gray-500 transition-colors hover:text-gray-900"
          >
            Terms
          </a>
          <a
            href="/privacy"
            className="text-sm text-gray-500 transition-colors hover:text-gray-900"
          >
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer