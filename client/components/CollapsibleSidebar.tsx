"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function CollapsibleSidebar() {
  // Change this line from true to false for mobile default state
  const [isOpen, setIsOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the device is mobile on component mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768; // 768px is the md breakpoint in Tailwind
      setIsMobile(mobile);

      // Set isOpen to true for desktop, false for mobile
      if (!mobile && !isOpen) {
        setIsOpen(true);
      } else if (mobile && isOpen) {
        setIsOpen(false);
      }
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Clean up event listener
    return () => window.removeEventListener("resize", checkIfMobile);
  }, [isOpen]);

  // Toggle sidebar open/closed
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Only add scroll behavior on desktop
    if (!isMobile) {
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
    }
  }, [lastScrollY, isMobile]);

  // Mobile navbar component
  if (isMobile) {
    return (
      <>
        {/* Fixed hamburger icon at the bottom of the screen */}
        <button
          onClick={toggleSidebar}
          className="fixed bottom-5 right-5 z-50 bg-secondary rounded-full p-3 shadow-lg"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </div>
        </button>

        {/* Fullscreen overlay menu that appears when open */}
        <div
          className={`fixed inset-0 bg-secondary z-40 transition-all duration-300 ${
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Close button */}
          <button
            onClick={toggleSidebar}
            className="absolute top-5 right-5 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Logo */}
          <div className="flex justify-center p-4 mt-10">
            <Image
              src="/naruto.png"
              alt="Logo"
              width={80}
              height={80}
              layout="fixed"
            />
          </div>

          {/* Social links */}
          <div className="mt-16 flex flex-col items-center space-y-8 text-white">
            <a
              href="mailto:zzcnhy@gmail.com"
              target="_blank"
              className="flex items-center justify-center w-full px-4 py-2"
            >
              <Image
                src="/mail.svg"
                alt="mail"
                width={30}
                height={30}
                layout="fixed"
                className="hover:filter hover:brightness-125"
              />
              <span className="ml-4 text-white text-xl">zzcnhy@gmail.com</span>
            </a>
            <a
              href="https://www.linkedin.com/in/cold1998zichen/"
              target="_blank"
              className="flex items-center justify-center w-full px-4 py-2"
            >
              <Image
                src="/Linkedln.svg"
                alt="LinkedIn"
                width={30}
                height={30}
                layout="fixed"
                className="hover:filter hover:brightness-125"
              />
              <span className="ml-4 text-white text-xl">LinkedIn</span>
            </a>
            <a
              href="https://github.com/survivzhang"
              target="_blank"
              className="flex items-center justify-center w-full px-4 py-2"
            >
              <Image
                src="/github.svg"
                alt="GitHub"
                width={30}
                height={30}
                layout="fixed"
                className="hover:filter hover:brightness-125"
              />
              <span className="ml-4 text-white text-xl">Github</span>
            </a>
            <a
              href="https://www.instagram.com/zhang_zichen98/"
              target="_blank"
              className="flex items-center justify-center w-full px-4 py-2"
            >
              <Image
                src="/ins.svg"
                alt="Instagram"
                width={35}
                height={35}
                layout="fixed"
                className="hover:filter hover:brightness-125"
              />
              <span className="ml-4 text-white text-xl">Instagram</span>
            </a>
          </div>
        </div>
      </>
    );
  }

  // Desktop sidebar component (unchanged)
  return (
    <div className="fixed right-0 top-0 bottom-0 z-50 flex items-center">
      {/* Sidebar */}
      <div
        className={`h-full bg-secondary transition-all duration-500 ease-in-out flex flex-col ${
          isOpen ? "w-[220px]" : "w-[60px]"
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
