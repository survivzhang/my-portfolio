"use client";
import React from "react";
import CollapsibleSidebar from "@/components/CollapsibleSidebar";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
// import { stat } from "fs";

// Project data
const projects = [
  {
    id: 1,
    title: "Blue Crew",
    description:
      "A website for an environmental protection organization. As the frontend developer, I created the interactive modal system, designed the enrollment page, and built the Blingo functionality that connects users with environmental activities. Implemented with Vue.js and integrated with Django backend.",
    image: "/blue-crew.png",
    tags: [
      "Vue",
      "Django",
      "Tailwind CSS",
      "Docker",
      "Git",
      "Figma",
      "CSS",
      "HTML",
    ],
    link: "https://blingo.com.au/",
    status: "completed",
  },
  {
    id: 2,
    title: "Zichen's Portfolio",
    description:
      "A responsive, modern portfolio website built to showcase my web development projects and skills. Designed with a clean aesthetic using Next.js and Tailwind CSS, featuring smooth scrolling animations, interactive project cards, and dynamic content sections.",
    image: "/zichen.jpg",
    tags: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Git",
      "Figma",
      "CSS",
      "HTML",
      "Vercel",
      "Javascript",
    ],
    link: "https://coldalex1998.vercel.app/",
    status: "completed",
  },
  {
    id: 3,
    title: "Road to a professional programmer",
    description:
      "An interactive guidance platform for aspiring programmers. As the frontend developer, I designed and implemented the career path visualization system, interactive learning roadmaps, job search tools, and programmer journey tracker. Built with React and connected to a Flask backend, featuring personalized learning recommendations and developer resources",
    image: "/frontend.png",
    tags: [
      "React",
      "Flask",
      "Tailwind CSS",
      "AWS",
      "Git",
      "Figma",
      "CSS",
      "HTML",
    ],
    link: "https://road-to-professional-programmer.vercel.app/",
    status: "still in progress",
  },
];

// About me sections
const aboutSections = [
  {
    id: 1,
    title: "I'M ZICHEN ZHANG",
    characteristic: "WEB DEVELOPER, POSTGRADUATE STUDENT, CREATIVE THINKER.",
    content:
      "I am a postgraduate student in UWA, majoring in Information Technology. I have a passion for web development and design, and I love to create user-friendly and responsive applications.",
  },
  {
    id: 2,
    title: "CREATING MEANINGFUL EXPERIENCES",
    characteristic: "DEDICATED TO CLEAN CODE AND USER-CENTERED SOLUTIONS",
    content:
      "Throughout my studies and projects, I've focused on building responsive, accessible web applications that solve real problems. I believe in writing maintainable code that balances technical excellence with practical user needs.",
  },
  {
    id: 3,
    title: "MY CORE VALUES",
    characteristic: "PASSIONATE, COLLABORATIVE, COMMUNICATIVE",
    content:
      "I approach every project with genuine enthusiasm, focusing on creating meaningful user experiences. As a team member, I believe the best results come from diverse ideas. My volunteer experience as a metro station assistant and youth competition referee has strengthened my communication skills and ability to work with people from all backgrounds.",
  },
  {
    id: 4,
    title: "COMMUNITY INVOLVEMENT",
    characteristic: "GIVING BACK THROUGH VOLUNTEERING",
    content:
      "I believe in contributing to the community that has supported me. Through volunteering at metro stations and refereeing children's competitions, I've developed patience, quick decision-making abilities, and learned how to remain fair and objective under pressure - skills that translate directly to my work as a developer.",
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
  const desktopAboutSectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileAboutSectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [showArrow, setShowArrow] = useState(true);

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
      desktopAboutSectionRefs.current = desktopAboutSectionRefs.current.slice(
        0,
        aboutSections.length
      );

      const desktopAboutObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = desktopAboutSectionRefs.current.findIndex(
                (ref) => ref === entry.target
              );
              if (
                index !== -1 &&
                (index !== activeAboutSection || entry.intersectionRatio > 0.8)
              ) {
                setActiveAboutSection(index);
              }
            }
          });
        },
        {
          threshold: [0.5, 0.8],
          rootMargin: "-10px 0px",
        }
      );

  desktopAboutSectionRefs.current.forEach((ref) => {
    if (ref) desktopAboutObserver.observe(ref);
  });
          mobileAboutSectionRefs.current = mobileAboutSectionRefs.current.slice(
            0,
            aboutSections.length
          );
const mobileAboutObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = mobileAboutSectionRefs.current.findIndex(
          (ref) => ref === entry.target
        );
        if (
          index !== -1 &&
          (index !== activeAboutSection || entry.intersectionRatio > 0.8)
        ) {
          setActiveAboutSection(index);
        }
      }
    });
  },
  {
    threshold: [0.5, 0.8],
    rootMargin: "-10px 0px",
  }
);
      mobileAboutSectionRefs.current.forEach((ref) => {
        if (ref) mobileAboutObserver.observe(ref);
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
            if (index !== -1) {
              setActiveProject(index);
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
      desktopAboutObserver.disconnect();
      mobileAboutObserver.disconnect();
      projectObserver.disconnect();
    };
  }, [activeProject, activeAboutSection]);

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
    desktopAboutSectionRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowArrow(false);
      } else {
        setShowArrow(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-background min-h-screen flex">
      <div className="hidden md:flex flex-grow">
        <div className="flex-grow">
          {/* Home Section - Desktop */}
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
                <p className="text-xl text-secondary mb-4 font-serif">
                  Hey there! My name is
                </p>
                <h1 className="text-5xl font-serif font-bold text-primary mb-2">
                  ZICHEN ZHANG
                </h1>
                <p className="text-xl text-secondary mb-4 font-serif">
                  or you can call me
                </p>
                <h2 className="text-4xl font-serif font-bold text-primary mb-6">
                  ALEX
                </h2>
                <p className="text-xl text-foreground mb-2 font-serif">
                  I am a postgraduate student in UWA,
                </p>
                <p className="text-xl text-foreground mb-2 font-serif">
                  Web Developer, basketball player
                </p>
                <p className="text-xl text-foreground mb-8 font-serif">
                  ... and just a human
                </p>
              </div>
            </div>
            {showArrow && (
              <div
                className="absolute bottom-10 right-80 transition-opacity duration-100"
                style={{ opacity: showArrow ? 1 : 0 }}
              >
                <svg
                  className="w-10 h-10 text-primary animate-bounce cursor-pointer"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  onClick={() => scrollToSection(aboutRef)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
            )}
          </section>

          {/* About Section - Desktop */}
          <section ref={aboutRef} className="min-h-screen pt-16">
            <div className="py-16">
              <h2 className="text-4xl font-serif font-bold text-primary mb-12 text-center">
                About Me
              </h2>

              <div className="flex flex-row max-w-7xl mx-auto px-6">
                {/* Left side - About sections */}
                <div className="w-1/2 flex flex-col space-y-[80vh] pr-20">
                  {aboutSections.map((section, index) => (
                    <div
                      key={section.id}
                      ref={(el) => {
                        desktopAboutSectionRefs.current[index] = el;
                      }}
                      className="min-h-screen flex items-center"
                    >
                      <div className="w-full flex flex-col h-[70vh]">
                        <p className="text-lg text-secondary pt-16 mb-auto">
                          {section.title}
                        </p>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary my-8 relative">
                          {section.characteristic}
                          <span
                            className="absolute w-2 h-2 bg-secondary rounded-full"
                            style={{ top: "-8px", left: "0" }}
                          ></span>
                        </h2>
                        <div className="ml-auto w-2/3 mt-auto pb-16">
                          <p className="text-foreground text-lg leading-relaxed font-serif">
                            {section.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right side - Photo */}
                <div className="w-1/2 flex items-center justify-center sticky top-24 h-screen">
                  <div className="relative w-96 h-96 rounded-full overflow-hidden shadow-xl border-4 border-secondary">
                    <Image
                      src="/myPhoto.png"
                      alt="Zichen"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Projects Section - Desktop */}
          <section ref={projectsRef} className="min-h-screen pt-16">
            <div className="py-16">
              <h2 className="text-4xl font-serif font-bold text-primary mb-12 text-center">
                My Projects
              </h2>

              <div className="space-y-[20vh] px-6">
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    ref={(el) => {
                      projectRefs.current[index] = el;
                    }}
                    className="min-h-screen flex items-center justify-center"
                  >
                    <div className="max-w-7xl w-full">
                      <div
                        className={`flex flex-row ${
                          index === 0 ? "h-[70vh]" : "gap-8"
                        } rounded-lg overflow-hidden`}
                      >
                        <div
                          className={`w-1/2 relative ${
                            index === 0 ? "h-auto" : "h-[500px]"
                          } overflow-hidden`}
                        >
                          <div className="absolute inset-0 transition-all duration-100 ease-in-out">
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div className="w-1/2 p-8 flex flex-col">
                          <div className="transition-all duration-100 ease-in-out space-y-12">
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
                            <div>
                              {project.status === "completed" ? (
                                <button
                                  className="px-6 py-2 bg-primary text-white rounded-full"
                                  onClick={() => window.open(project.link)}
                                >
                                  View Project
                                </button>
                              ) : (
                                <button
                                  className="px-6 py-2 bg-secondary text-white rounded-full"
                                  disabled
                                >
                                  In Progress
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Footer - Desktop */}
          <footer className="bg-secondary text-white p-4">
            <div className="max-w-7xl mx-auto text-center">
              <p className="font-serif">
                © 2025 Zichen Zhang. All rights reserved.
              </p>
            </div>
          </footer>
        </div>

        {/* Right side - Collapsible Sidebar (Desktop only) */}
        <CollapsibleSidebar />
      </div>

      {/* 移动端布局 - 只在中等屏幕以下显示 */}
      <div className="md:hidden flex-grow">
        {/* Home Section - Mobile */}
        <section
          ref={homeRef}
          className="min-h-screen flex items-center justify-center pt-16"
        >
          <div className="flex-grow flex flex-col items-center px-6 py-8 relative h-full">
            {/* Background graphic element */}
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-10 z-0">
              <Image
                src="/profilo.svg"
                alt="Background profile"
                fill
                className="object-cover object-right-top"
              />
            </div>

            {/* Content with gradient background */}
            <div className="w-full flex flex-col items-center text-center z-10 mt-12">
              <div className="mb-6 relative">
                <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-secondary mx-auto">
                  <Image
                    src="/myPhoto.png"
                    alt="Zichen"
                    width={144}
                    height={144}
                    className="object-cover"
                  />
                </div>
              </div>

              <p className="text-lg text-secondary mb-3 font-serif">
                Hey there! My name is
              </p>
              <h1 className="text-4xl font-serif font-bold text-primary mb-2">
                ZICHEN ZHANG
              </h1>
              <p className="text-lg text-secondary mb-3 font-serif">
                or you can call me
              </p>
              <h2 className="text-3xl font-serif font-bold text-primary mb-5">
                ALEX
              </h2>
              <div className="space-y-1 mb-6 px-4 py-4 bg-secondary/5 rounded-lg">
                <p className="text-lg text-foreground font-serif">
                  I am a postgraduate student in UWA,
                </p>
                <p className="text-lg text-foreground font-serif">
                  Web Developer, basketball player
                </p>
                <p className="text-lg text-foreground font-serif">
                  ... and just a human
                </p>
              </div>
            </div>
          </div>
          {showArrow && (
            <div
              className="absolute bottom-10 right-1/2 translate-x-1/2 transition-opacity duration-100"
              style={{ opacity: showArrow ? 1 : 0 }}
            >
              <svg
                className="w-10 h-10 text-primary animate-bounce cursor-pointer"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                onClick={() => scrollToSection(aboutRef)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          )}
        </section>

        {/* About Section - Mobile */}
        <section ref={aboutRef} className="min-h-screen pt-16">
          <div className="py-16">
            <h2 className="text-4xl font-serif font-bold text-primary mb-12 text-center">
              About Me
            </h2>

            <div className="max-w-7xl mx-auto px-4">
              {/* Photo at top for mobile */}
              <div className="flex justify-center mb-12">
                <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-xl border-4 border-secondary">
                  <Image
                    src="/myPhoto.png"
                    alt="Zichen"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="space-y-16">
                {aboutSections.map((section, index) => (
                  <div
                    key={section.id}
                    ref={(el) => {
                      mobileAboutSectionRefs.current[index] = el;
                    }}
                    className={`p-5 rounded-xl transition-all duration-300 ${
                      activeAboutSection === index
                        ? "bg-secondary/10 border border-secondary/20"
                        : "bg-background"
                    }`}
                  >
                    <div className="space-y-4">
                      {/* Title */}
                      <p className="text-base text-secondary font-medium">
                        {section.title}
                      </p>

                      {/* Characteristic with dot */}
                      <h2 className="text-2xl font-serif font-bold text-primary relative pl-3">
                        <span
                          className="absolute w-2 h-2 bg-secondary rounded-full"
                          style={{
                            top: "50%",
                            left: "0",
                            transform: "translateY(-50%)",
                          }}
                        ></span>
                        {section.characteristic}
                      </h2>

                      {/* Content */}
                      <p className="text-foreground text-base leading-relaxed font-serif">
                        {section.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Page indicator for mobile */}
              <div className="flex justify-center space-x-2 mt-6">
                {aboutSections.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      mobileAboutSectionRefs.current[index]?.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                      });
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-100 ${
                      activeAboutSection === index
                        ? "bg-primary w-4 h-4"
                        : "bg-secondary/40 hover:bg-secondary/70"
                    }`}
                    aria-label={`Go to about section ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section - Mobile */}
        <section ref={projectsRef} className="min-h-screen pt-16">
          <div className="py-16">
            <h2 className="text-4xl font-serif font-bold text-primary mb-12 text-center">
              My Projects
            </h2>

            <div className="space-y-[20vh] px-6">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  ref={(el) => {
                    projectRefs.current[index] = el;
                  }}
                  className="min-h-screen flex items-center justify-center"
                >
                  {/* Mobile Layout - Image as background with text overlay */}
                  <div className="relative rounded-lg overflow-hidden h-[85vh] w-full">
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                      {/* Dark Overlay for Better Text Readability */}
                      <div className="absolute inset-0 bg-black/60"></div>
                    </div>
                    {/* Content Container */}
                    <div className="relative z-10 h-full flex flex-col justify-between p-6 text-white">
                      <div className="space-y-4 pt-4">
                        <h3 className="text-2xl font-serif font-bold text-white mb-2">
                          {project.title}
                        </h3>
                        <p className="text-white/90 text-base font-serif">
                          {project.description}
                        </p>
                      </div>

                      <div className="space-y-6 pb-8">
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-3 py-1 bg-white/20 text-white text-sm rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div>
                          {project.status === "completed" ? (
                            <button
                              className="px-6 py-2 bg-primary text-white rounded-full w-full"
                              onClick={() => window.open(project.link)}
                            >
                              View Project
                            </button>
                          ) : (
                            <button
                              className="px-6 py-2 bg-secondary text-white rounded-full w-full"
                              disabled
                            >
                              In Progress
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer - Mobile */}
        <footer className="bg-secondary text-white p-4">
          <div className="max-w-7xl mx-auto text-center">
            <p className="font-serif">
              © 2025 Zichen Zhang. All rights reserved.
            </p>
          </div>
        </footer>
      </div>

      {/* About navigation dots - Visible on all screen sizes */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4 z-40">
        {aboutSections.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToAboutSection(index)}
            className={`w-3 h-3 rounded-full transition-all duration-100 ${
              activeAboutSection === index && activeSection === "about"
                ? "bg-primary w-4 h-4"
                : "bg-secondary/40 hover:bg-secondary/70"
            }`}
            aria-label={`Go to about section ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
