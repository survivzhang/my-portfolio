"use client";
import React from "react";

import CollapsibleSidebar from "@/components/CollapsibleSidebar";
import Image from "next/image";
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
  const scrollToSection = (
    sectionRef: React.RefObject<HTMLDivElement | null>
  ) => {
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
    <div className="bg-background min-h-screen flex">
      {/* Main content */}
      <div className="flex-grow">
        {/* Home Section */}
        <section
          ref={homeRef}
          className="min-h-screen flex items-center justify-center pt-16"
        >
          <div className="flex-grow flex flex-row items-center px-6 py-16 relative">
            {/* 左侧头像 - 只露出一半 */}
            <div
              className="absolute left-0 overflow-hidden"
              style={{ width: "15%" }}
            >
              <div className="relative" style={{ left: "-120%" }}>
                <Image
                  src="/profilo.svg"
                  alt="Profile"
                  width={600}
                  height={800}
                  className="max-w-none h-auto transform scale-100"
                />
              </div>
            </div>

            {/* 中间内容 - 居中在剩余空间 */}
            <div className="w-full flex flex-col items-center text-center transform -translate-x-[40px]">
              <h1 className="text-5xl font-serif font-bold text-primary mb-6">
                Welcome to My Portfolio
              </h1>
              <p className="text-lg text-foreground max-w-2xl mb-8 font-serif">
                Explore my work, design philosophy, and creative journey. I
                build web experiences with a touch of vintage elegance.
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

      {/* Right side - Collapsible Sidebar */}
      <CollapsibleSidebar />
    </div>
  );
}
