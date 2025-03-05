"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Project data
const projects = [
  {
    id: 1,
    title: "Blue Crew",
    description: "A website made for a environmental protection organization",
    image: "/images/blue-crew.png",
    tags: ["Vue", "Django", "Tailwind CSS"],
    link: "https://bluecrew.vercel.app/",
  },
  {
    id: 2,
    title: "Road to a professional programmer",
    description:
      "A website for the beginners who want to become a professional programmer, to choose which side they want to go",
    image: "/images/road-to-professional-programmer.png",
    tags: ["React", "Flask", "Tailwind CSS", "AWS"],
    link: "https://road-to-professional-programmer.vercel.app/",
  },
  {
    id: 3,
    title: "Zichen's Portfolio",
    description: "My personal portfolio website",
    image: "/images/zichen-portfolio.png",
    tags: ["Next.js", "Tailwind CSS"],
    link: "https://zichen-zhang.vercel.app/",
  },
];

// About me sections
const aboutSections = [
  {
    id: 1,
    title: "Who I Am",
    content:
      "I'm Zichen, a passionate developer who loves building meaningful projects that make a difference.",
  },
  {
    id: 2,
    title: "What I Do",
    content:
      "I specialize in full-stack development, working with technologies like React, Next.js, and Tailwind CSS to create responsive and user-friendly applications.",
  },
  {
    id: 3,
    title: "My Journey",
    content:
      "Started coding as a hobby, now I'm on a mission to become a professional programmer, exploring new tools and frameworks every day.",
  },
];

export default function Home() {
  // Refs for scrolling sections
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  // State for active section
  const [activeSection, setActiveSection] = useState("home");
  const [activeAboutSection, setActiveAboutSection] = useState(0);
  const [activeProject, setActiveProject] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Refs for about sections and projects
  const aboutSectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Set up intersection observers
  useEffect(() => {
    // For main sections
    const mainSections = [
      { ref: homeRef.current, id: "home" },
      { ref: aboutRef.current, id: "about" },
      { ref: projectsRef.current, id: "projects" },
    ];

    const mainObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = mainSections.find((s) => s.ref === entry.target);
            if (section) {
              setActiveSection(section.id);
            }
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    mainSections.forEach((section) => {
      if (section.ref) {
        mainObserver.observe(section.ref);
      }
    });

    // For about sections
    aboutSectionRefs.current = aboutSectionRefs.current.slice(
      0,
      aboutSections.length
    );

    const aboutObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = aboutSectionRefs.current.findIndex(
              (ref) => ref === entry.target
            );
            if (index !== -1) {
              setActiveAboutSection(index);
            }
          }
        });
      },
      {
        threshold: 0.6,
        rootMargin: "-10px 0px",
      }
    );

    aboutSectionRefs.current.forEach((ref) => {
      if (ref) aboutObserver.observe(ref);
    });

    // For projects
    projectRefs.current = projectRefs.current.slice(0, projects.length);

    const projectObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = projectRefs.current.findIndex(
              (ref) => ref === entry.target
            );
            if (index !== -1 && index !== activeProject) {
              setIsAnimating(true);
              setActiveProject(index);

              setTimeout(() => {
                setIsAnimating(false);
              }, 600);
            }
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "-10px 0px",
      }
    );

    projectRefs.current.forEach((ref) => {
      if (ref) projectObserver.observe(ref);
    });

    return () => {
      mainObserver.disconnect();
      aboutObserver.disconnect();
      projectObserver.disconnect();
    };
  }, [activeProject]);

  // Scroll to section function
  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
    sectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Scroll to about section
  const scrollToAboutSection = (index: number) => {
    aboutSectionRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  // Scroll to project
  const scrollToProject = (index: number) => {
    projectRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Side Contact Panel */}
      <div
        className={`fixed right-0 top-0 bottom-0 z-50 w-16 md:w-20 flex flex-col items-center justify-center transition-all duration-500 ${
          activeSection === "home"
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-16 hover:opacity-100 hover:translate-x-0"
        }`}
      >
        <div className="bg-secondary/90 backdrop-blur-sm h-auto py-8 px-3 rounded-l-lg shadow-xl flex flex-col items-center gap-6">
          {/* Social Media Icons */}
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-primary transition-colors duration-300"
            aria-label="GitHub"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>

          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-primary transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>

          <a
            href="mailto:your.email@example.com"
            className="text-white hover:text-primary transition-colors duration-300"
            aria-label="Email"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </a>

          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-primary transition-colors duration-300"
            aria-label="Twitter"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.029 10.029 0 01-3.127 1.195c-.89-1.068-2.166-1.817-3.593-1.817-2.726 0-4.934 2.207-4.934 4.933 0 .39.044.765.126 1.124A13.98 13.98 0 011.64 3.16a4.923 4.923 0 001.523 6.57 4.854 4.854 0 01-2.23-.616v.06c0 2.39 1.7 4.38 3.954 4.83-.413.114-.85.174-1.3.174-.314 0-.62-.03-.918-.086a4.935 4.935 0 004.604 3.418 9.868 9.868 0 01-6.115 2.107c-.398 0-.79-.023-1.175-.068a13.995 13.995 0 007.548 2.212c9.057 0 14.01-7.502 14.01-14.01 0-.213-.005-.426-.015-.637a10.048 10.048 0 002.457-2.55" />
            </svg>
          </a>
        </div>
      </div>

      {/* Navigation Indicators */}
      <div className="fixed left-8 top-1/2 transform -translate-y-1/2 flex flex-col space-y-6 z-40">
        <button
          onClick={() => scrollToSection(homeRef)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            activeSection === "home"
              ? "bg-primary w-4 h-4"
              : "bg-secondary/40 hover:bg-secondary/70"
          }`}
          aria-label="Go to home"
        />
        <button
          onClick={() => scrollToSection(aboutRef)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            activeSection === "about"
              ? "bg-primary w-4 h-4"
              : "bg-secondary/40 hover:bg-secondary/70"
          }`}
          aria-label="Go to about"
        />
        <button
          onClick={() => scrollToSection(projectsRef)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            activeSection === "projects"
              ? "bg-primary w-4 h-4"
              : "bg-secondary/40 hover:bg-secondary/70"
          }`}
          aria-label="Go to projects"
        />
      </div>
      {/* Home Section */}
      <section
        ref={homeRef}
        className="min-h-screen flex items-center justify-center pt-16"
      >
        <div className="flex-grow flex flex-col justify-center items-center text-center px-6 py-16">
          <h1 className="text-5xl font-serif font-bold text-primary mb-6">
            Welcome to My Portfolio
          </h1>
          <p className="text-lg text-foreground max-w-2xl mb-8 font-serif">
            Explore my work, design philosophy, and creative journey. I build
            web experiences with a touch of vintage elegance.
          </p>

          <div className="mt-6 flex gap-4">
            <button
              onClick={() => scrollToSection(projectsRef)}
              className="bg-secondary text-white px-8 py-3 rounded-lg hover:bg-primary transition duration-300"
            >
              View Projects
            </button>
            <button
              onClick={() => scrollToSection(aboutRef)}
              className="bg-secondary text-white px-8 py-3 rounded-lg hover:bg-primary transition duration-300"
            >
              About Me
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="min-h-screen pt-16">
        <div className="py-16">
          <h2 className="text-4xl font-serif font-bold text-primary mb-12 text-center">
            About Me
          </h2>

          <div className="flex flex-col md:flex-row max-w-7xl mx-auto px-6">
            {/* Left side - About sections */}
            <div className="md:w-1/2 flex flex-col space-y-[80vh] md:pr-8">
              {aboutSections.map((section, index) => (
                <div
                  key={section.id}
                  ref={(el) => {
                    aboutSectionRefs.current[index] = el;
                  }}
                  className={`min-h-screen flex items-center transition-all duration-300 ${
                    activeAboutSection === index
                      ? "opacity-100 scale-100"
                      : "opacity-50 scale-95"
                  }`}
                >
                  <div>
                    <h2 className="text-4xl font-serif font-bold text-primary mb-4">
                      {section.title}
                    </h2>
                    <p className="text-foreground text-lg leading-relaxed font-serif">
                      {section.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right side - Photo */}
            <div className="md:w-1/2 flex items-center justify-center md:sticky md:top-24 md:h-screen">
              <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden shadow-xl border-4 border-secondary">
                <div className="absolute inset-0 flex items-center justify-center bg-background text-foreground text-lg">
                  Your Photo Here
                </div>
                {/* Uncomment when you have an actual image */}
                {/* <Image
                  src="/images/my-photo.jpg"
                  alt="Zichen"
                  fill
                  className="object-cover"
                /> */}
              </div>
            </div>
          </div>

          {/* About navigation dots */}
          <div className="fixed right-8 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4 z-40">
            {aboutSections.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToAboutSection(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeAboutSection === index && activeSection === "about"
                    ? "bg-primary w-4 h-4"
                    : "bg-secondary/40 hover:bg-secondary/70"
                }`}
                aria-label={`Go to about section ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} className="min-h-screen pt-16">
        <div className="py-16">
          <h2 className="text-4xl font-serif font-bold text-primary mb-12 text-center">
            My Projects
          </h2>

          {/* First Project (Hero) */}
          <div className="min-h-screen flex items-center justify-center px-6">
            <div className="max-w-7xl w-full">
              <div
                ref={(el) => {
                  projectRefs.current[0] = el;
                }}
                className="relative w-full h-[70vh] overflow-hidden rounded-lg shadow-xl bg-white flex flex-col md:flex-row"
              >
                <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
                  <div
                    className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                      activeProject === 0 && !isAnimating
                        ? "opacity-100 transform-none"
                        : "opacity-0"
                    }`}
                  >
                    <Image
                      src={projects[0].image}
                      alt={projects[0].title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-1/2 p-8 flex flex-col">
                  <div
                    className={`transition-all duration-500 ease-in-out ${
                      activeProject === 0 && !isAnimating
                        ? "opacity-100 transform-none"
                        : "opacity-0"
                    }`}
                  >
                    <h3 className="text-3xl font-serif font-bold text-primary mb-4">
                      {projects[0].title}
                    </h3>
                    <p className="text-foreground mb-6 text-lg font-serif">
                      {projects[0].description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {projects[0].tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-secondary/10 text-secondary text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-auto flex justify-between items-center">
                    <a
                      href={projects[0].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-secondary text-white px-6 py-3 rounded-md hover:bg-primary transition duration-300"
                    >
                      View Project
                    </a>
                    <button
                      onClick={() => scrollToProject(1)}
                      className="text-secondary flex flex-col items-center group"
                    >
                      <span className="mb-2">See more projects</span>
                      <svg
                        className="w-6 h-6 animate-bounce group-hover:text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Other Projects */}
          <div className="space-y-[100vh] px-6">
            {projects.slice(1).map((project, index) => {
              const actualIndex = index + 1;

              return (
                <div
                  key={project.id}
                  ref={(el) => {
                    projectRefs.current[actualIndex] = el;
                  }}
                  className="min-h-screen flex items-center justify-center"
                >
                  <div className="max-w-7xl w-full">
                    <div className="flex flex-col md:flex-row gap-8 bg-white rounded-lg shadow-xl overflow-hidden">
                      <div className="md:w-1/2 relative h-64 md:h-[500px] overflow-hidden">
                        <div
                          className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                            activeProject === actualIndex && !isAnimating
                              ? "opacity-100 transform-none"
                              : "opacity-0"
                          }`}
                        >
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="md:w-1/2 p-8 flex flex-col">
                        <div
                          className={`transition-all duration-500 ease-in-out ${
                            activeProject === actualIndex && !isAnimating
                              ? "opacity-100 transform-none"
                              : "opacity-0"
                          }`}
                        >
                          <h3 className="text-3xl font-serif font-bold text-primary mb-4">
                            {project.title}
                          </h3>
                          <p className="text-foreground mb-6 text-lg font-serif">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-8">
                            {project.tags.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="px-3 py-1 bg-secondary/10 text-secondary text-sm rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="mt-auto">
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-secondary text-white px-6 py-3 rounded-md hover:bg-primary transition duration-300"
                          >
                            View Project
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Project navigation dots */}
          <div className="fixed right-8 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4 z-40">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToProject(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeProject === index && activeSection === "projects"
                    ? "bg-primary w-4 h-4"
                    : "bg-secondary/40 hover:bg-secondary/70"
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-white p-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-serif">
            © 2024 Zichen Zhang. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
