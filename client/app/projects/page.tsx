"use client";
import React from "react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

//projects data
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

export default function Projects() {
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeProject, setActiveProject] = useState(0);
  const [previousProject, setPreviousProject] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    projectRefs.current = projectRefs.current.slice(0, projects.length);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = projectRefs.current.findIndex(
              (ref) => ref === entry.target
            );
            if (index !== -1 && index !== activeProject) {
              // Track previous project for animation direction
              setPreviousProject(activeProject);
              setIsChanging(true);

              // Set new active project
              setActiveProject(index);

              // Reset changing state after animation completes
              setTimeout(() => {
                setIsChanging(false);
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
      if (ref) {
        observer.observe(ref);
      }
    });
    return () => {
      projectRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [activeProject]);

  const scrollToProject = (index: number) => {
    projectRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  // Determine animation direction based on project index change
  const getAnimationDirection = (isImage = false) => {
    if (!isChanging) return "opacity-100 transform-none";

    const isMovingUp = previousProject > activeProject;

    if (isImage) {
      return isMovingUp
        ? "opacity-0 translate-y-full"
        : "opacity-0 -translate-y-full";
    } else {
      return isMovingUp
        ? "opacity-0 translate-x-full"
        : "opacity-0 -translate-x-full";
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="h-screen flex items-center justify-center px-6">
        <div className="max-w-7xl w-full">
          <h1 className="text-5xl font-serif font-bold text-primary mb-12 text-center">
            My Projects
          </h1>
          <div className="relative w-full h-[70vh] overflow-hidden rounded-lg shadow-xl bg-white flex flex-col md:flex-row">
            <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
              <div
                className={`absolute inset-0 bg-gray-200 transition-all duration-500 ease-in-out ${getAnimationDirection(
                  true
                )}`}
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
                className={`transition-all duration-500 ease-in-out ${getAnimationDirection()}`}
              >
                <h2 className="text-3xl font-serif font-bold text-primary mb-4">
                  {projects[0].title}
                </h2>
                <p className="text-foreground mb-6 text-lg">
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
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4 z-50">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToProject(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeProject === index
                ? "bg-primary w-4 h-4"
                : "bg-secondary/40 hover:bg-secondary/70"
            }`}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
      <div className="py-16 space-y-[100vh] px-6">
        {projects.slice(1).map((project, index) => {
          const actualIndex = index + 1;
          const isActive = activeProject === actualIndex;
          const wasActive = previousProject === actualIndex;

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
                      className={`absolute inset-0 bg-gray-200 transition-all duration-500 ease-in-out ${
                        isActive
                          ? "opacity-100 transform-none"
                          : wasActive && isChanging
                          ? getAnimationDirection(true)
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
                        isActive
                          ? "opacity-100 transform-none"
                          : wasActive && isChanging
                          ? getAnimationDirection()
                          : "opacity-0"
                      }`}
                    >
                      <h2 className="text-3xl font-serif font-bold text-primary mb-4">
                        {project.title}
                      </h2>
                      <p className="text-foreground mb-6 text-lg">
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
    </div>
  );
}
