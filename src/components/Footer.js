import React, { useState } from "react";
import demoVideo from "../assets/Demo.mp4"; // <-- import the video

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
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
            <button
              onClick={() => setShowVideo(true)}
              className="text-white hover:bg-white hover:text-black px-2 py-1 rounded transition text-sm"
            >
              Need help?
            </button>
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

      {showVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="bg-white p-4 rounded shadow-lg w-full max-w-2xl relative">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-2 right-2 text-black font-bold text-xl"
            >
              &times;
            </button>
            <video controls className="w-full rounded">
              <source src={demoVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </>
  );
}
