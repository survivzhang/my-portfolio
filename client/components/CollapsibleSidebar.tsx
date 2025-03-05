"use client";

import { useState, useEffect } from "react";

export default function CollapsibleSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Toggle sidebar open/closed
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide sidebar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsOpen(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        if (currentScrollY === 0) {
          // At the top of the page, fully show
          setIsOpen(true);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="fixed right-0 top-0 bottom-0 z-50 flex items-center">

      {/* Sidebar */}
      <div
        className={`h-full bg-secondary transition-all duration-500 ease-in-out flex flex-col ${
          isOpen
            ? "w-[158px]" /* Width from the first image */
            : "w-[60px]" /* Width from the second image */
        }`}
      >
        {/* Logo at top */}
        <div className="flex justify-center p-4">
          <svg
            className="w-12 h-12 text-[#F9E2D2]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C11 2 10 2.2 9.3 2.5C8.7 3.1 8 4 7.5 5.5C7.2 6.7 7 8.1 7 10C7 12.5 7.5 14.3 8.2 16C9.2 18.2 10.6 19 12 19C13.4 19 14.8 18.2 15.8 16C16.5 14.3 17 12.5 17 10C17 8.1 16.8 6.7 16.5 5.5C16 4 15.3 3.1 14.7 2.5C14 2.2 13 2 12 2ZM14 4C14.1 4.1 14.3 4.3 14.5 4.5C14.8 5 15.3 5.9 15.7 7C15.9 8 16 9 16 10C16 12.2 15.6 13.8 15 15.2C14.2 16.9 13.3 17.5 12 17.5C10.7 17.5 9.8 16.9 9 15.2C8.4 13.8 8 12.2 8 10C8 9 8.1 8 8.3 7C8.7 5.9 9.2 5 9.5 4.5C9.7 4.3 9.9 4.1 10 4C10.9 3.8 11.5 3.7 12 3.7C12.5 3.7 13.1 3.8 14 4Z" />
          </svg>
        </div>

        {/* Hamburger menu button */}
        <div
          className={`${
            isOpen ? "mt-40" : "mt-16"
          } bg-[#E8765D] p-4 flex justify-center`}
        >
          <button
            onClick={toggleSidebar}
            className="w-6 h-6 flex flex-col justify-center items-center space-y-1"
          >
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </button>
        </div>


        {/* Social icons at bottom */}
        <div className="mb-4 flex flex-col items-center space-y-4 text-[#E8765D]">
          <a href="#" className="hover:text-white transition-colors">
            <span className="text-2xl">@</span>
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.029 10.029 0 01-3.127 1.195c-.89-1.068-2.166-1.817-3.593-1.817-2.726 0-4.934 2.207-4.934 4.933 0 .39.044.765.126 1.124A13.98 13.98 0 011.64 3.16a4.923 4.923 0 001.523 6.57 4.854 4.854 0 01-2.23-.616v.06c0 2.39 1.7 4.38 3.954 4.83-.413.114-.85.174-1.3.174-.314 0-.62-.03-.918-.086a4.935 4.935 0 004.604 3.418 9.868 9.868 0 01-6.115 2.107c-.398 0-.79-.023-1.175-.068a13.995 13.995 0 007.548 2.212c9.057 0 14.01-7.502 14.01-14.01 0-.213-.005-.426-.015-.637a10.048 10.048 0 002.457-2.55" />
            </svg>
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm9.949 11.4c-.103.3-.493.6-.893.6h-2.557v7.5c0 .3-.197.5-.497.5h-3.145c-.3 0-.503-.2-.503-.5v-7.5H11.95c-.3 0-.5-.3-.5-.6v-2.5c0-.3.2-.5.5-.5h2.404V6.6c0-2.3 1.4-3.6 3.6-3.6h2.6c.3 0 .5.2.5.5v2.5c0 .3-.2.5-.5.5h-1.6c-.8 0-1 .4-1 1v1.4h2.404c.4 0 .697.3.594.6l-.503 2.4z" />
            </svg>
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21.41 8.64v-.05l-4.01-4.04c-.14-.14-.31-.2-.49-.2s-.36.06-.48.2l-2.33 2.33 1.73 1.73c.4-.13.85-.06 1.17.26.32.32.39.78.26 1.18l1.67 1.67c.4-.13.86-.06 1.18.26.45.45.45 1.17 0 1.62-.45.45-1.17.45-1.62 0-.34-.34-.42-.83-.25-1.24l-1.56-1.56v4.1c.11.05.21.14.3.22.45.45.45 1.17 0 1.62-.45.45-1.17.45-1.62 0-.45-.45-.45-1.17 0-1.62.11-.11.24-.2.39-.24v-4.14c-.14-.05-.27-.13-.38-.24-.34-.34-.42-.84-.24-1.25L12.9 6.17l-7.2 7.2c-.14.13-.2.31-.2.49s.06.35.2.49l4.01 4.01c.14.14.31.2.49.2s.35-.06.49-.2l8.02-8.02c.14-.14.2-.31.2-.49s-.06-.36-.2-.49z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
