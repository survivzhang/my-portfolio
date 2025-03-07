"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

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
      if (currentScrollY > lastScrollY && currentScrollY > 400) {
        // Scrolling down
        setIsOpen(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        if (currentScrollY < 300) {
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
            ? "w-[220px]" /* Width from the first image */
            : "w-[60px]" /* Width from the second image */
        }`}
      >
        {/* Logo at top */}
        <div className="flex justify-center p-4 mt-5">
          <Image
            src="/naruto.png"
            alt="Logo"
            width={isOpen ? 60 : 40}
            height={isOpen ? 60 : 40}
            layout="fixed"
          />
        </div>

        {/* Hamburger menu button */}
        <div
          className={`${
            isOpen ? "mt-48" : "mt-32"
          } bg-sec_background p-4 flex justify-center`}
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
        <div className="mt-auto mb-32 flex flex-col items-center space-y-6 text-sec_background">
          <a
            href="mailto:zzcnhy@gmail.com"
            target="_blank"
            className="transition-colors flex items-center justify-start w-full px-4"
          >
            <Image
              src="/mail.svg"
              alt="mail"
              width={24}
              height={24}
              layout="fixed"
              className="hover:filter hover:brightness-125"
            />
            {isOpen && (
              <span className="ml-2 text-white">zzcnhy@gmail.com</span>
            )}
          </a>
          <a
            href="https://www.linkedin.com/in/cold1998zichen/"
            target="_blank"
            className="transition-colors flex items-center justify-start w-full px-4"
          >
            <Image
              src="/Linkedln.svg"
              alt="LinkedIn"
              width={24}
              height={24}
              layout="fixed"
              className="hover:filter hover:brightness-125"
            />
            {isOpen && <span className="ml-2 text-white">LinkedIn</span>}
          </a>
          <a
            href="https://github.com/survivzhang"
            target="_blank"
            className="transition-colors flex items-center justify-start w-full px-4"
          >
            <Image
              src="/github.svg"
              alt="GitHub"
              width={24}
              height={24}
              layout="fixed"
              className="hover:filter hover:brightness-125"
            />
            {isOpen && <span className="ml-2 text-white">Github</span>}
          </a>
          <a
            href="https://www.instagram.com/zhang_zichen98/"
            target="_blank"
            className="transition-colors flex items-center justify-start w-full px-4"
          >
            <Image
              src="/ins.svg"
              alt="Instagram"
              width={28}
              height={28}
              layout="fixed"
              className="hover:filter hover:brightness-125"
            />
            {isOpen && <span className="ml-2 text-white">Instagram</span>}
          </a>
        </div>
      </div>
    </div>
  );
}
