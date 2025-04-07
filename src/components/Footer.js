import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-3 px-4 shadow-md font-poppins">
      <div className="container mx-auto flex flex-col items-center justify-between md:flex-row">
        <div className="text-center md:text-left mb-2 md:mb-0">
          <p className="text-sm">© {currentYear} Calendar App. All rights reserved.</p>
        </div>

        <div className="mb-2 md:mb-0 text-center">
          <p className="text-sm">
            Developed by{" "}
            <a
              href="https://shankaranarayanansk.web.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline hover:bg-white hover:text-black px-1 rounded transition"
            >
              Shankaranarayanan SK
            </a>
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <a
            href="#"
            className="text-white hover:bg-white hover:text-black px-2 py-1 rounded transition text-sm"
          >
            Need help?
          </a>
          <a
            href="#"
            className="text-white hover:bg-white hover:text-black px-2 py-1 rounded transition text-sm"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-white hover:bg-white hover:text-black px-2 py-1 rounded transition text-sm"
          >
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}
