"use client";
import React from "react";
import CollapsibleSidebar from "@/components/CollapsibleSidebar";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { stat } from "fs";

// Project data
const projects = [
  {
    id: 1,
    title: "Blue Crew",
    description: "A website made for a environmental protection organization",
    image: "/blue-crew.png",
    tags: ["Vue", "Django", "Tailwind CSS"],
    link: "https://blingo.com.au/",
    status: "completed",
  },
  {
    id: 2,
    title: "Zichen's Portfolio",
    description: "My personal portfolio website",
    image: "/zichen.jpg",
    tags: ["Next.js", "Tailwind CSS"],
    link: "https://coldalex1998.vercel.app/",
    status: "completed",
  },
  {
    id: 3,
    title: "Road to a professional programmer",
    description:
      "A website for the beginners who want to become a professional programmer, to choose which side they want to go",
    image: "/frontend.png",
    tags: ["React", "Flask", "Tailwind CSS", "AWS"],
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
  const aboutSectionRefs = useRef<(HTMLDivElement | null)[]>([]);
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
              }, 200);
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
              className="absolute bottom-10 right-80  transition-opacity duration-100"
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

        {/* About Section */}
        <section ref={aboutRef} className="min-h-screen pt-16">
          <div className="py-16">
            <h2 className="text-4xl font-serif font-bold text-primary mb-12 text-center">
              About Me
            </h2>

            <div className="flex flex-col md:flex-row max-w-7xl mx-auto px-6">
              {/* Left side - About sections */}
              <div className="md:w-1/2 flex flex-col space-y-[80vh] md:pr-20">
                {aboutSections.map((section, index) => (
                  <div
                    key={section.id}
                    ref={(el) => {
                      aboutSectionRefs.current[index] = el;
                    }}
                    className={`min-h-screen flex items-center transition-all duration-100 ${
                      activeAboutSection === index
                        ? "opacity-100 scale-100"
                        : "opacity-50 scale-95"
                    }`}
                  >
                    <div className="w-full flex flex-col h-[70vh]">
                      {" "}
                      {/* 设置固定高度容器 */}
                      {/* 小标题 - 距顶部有间距 */}
                      <p className="text-lg text-secondary pt-16 mb-auto">
                        {section.title}
                      </p>{" "}
                      {/* pt-16添加顶部间距，mb-auto推到顶部 */}
                      {/* 特征标题与装饰点 - 自然居中 */}
                      <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary my-8 relative">
                        {section.characteristic}
                        <span
                          className="absolute w-2 h-2 bg-secondary rounded-full"
                          style={{ top: "-8px", left: "0" }}
                        ></span>
                      </h2>
                      {/* 内容 - 右侧偏移，距底部有间距 */}
                      <div className="ml-auto w-2/3 mt-auto pb-16">
                        {" "}
                        {/* mt-auto推到底部，pb-16添加底部间距 */}
                        <p className="text-foreground text-lg leading-relaxed font-serif">
                          {section.content}
                        </p>
                      </div>
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
                  <Image
                    src="/myPhoto.png"
                    alt="Zichen"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* About navigation dots */}
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
                  className="relative w-full h-[70vh] overflow-hidden rounded-lg  flex flex-col md:flex-row"
                >
                  <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
                    <div
                      className={`absolute inset-0 transition-all duration-100 ease-in-out ${
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
                      className={`transition-all duration-100 ease-in-out ${
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
                  </div>
                </div>
              </div>
            </div>

            {/* Other Projects */}
            <div className="space-y-[20vh] px-6">
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
                      <div className="flex flex-col md:flex-row gap-8  rounded-lg  overflow-hidden">
                        <div className="md:w-1/2 relative h-64 md:h-[500px] overflow-hidden">
                          <div
                            className={`absolute inset-0 transition-all duration-100 ease-in-out ${
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
                            className={`transition-all duration-100 ease-in-out ${
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
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
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
