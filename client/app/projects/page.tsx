"use client";
import Image from "next/image";
import Link from "next/link";
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

  useEffect(() => {
    projectRefs.current = projectRefs.current.slice(0, projects.length);

    const observer = new IntersectionObserver(
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
      if (ref) {
        observer.observe(ref);
      }
    });
    return () => {
      projectRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [projects]);

  const scrollToProject = (index: number) => {
    projectRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="h-screen flex items-center justify-center px-6">
        <div className="max-w-7xl w-full">
          <h1 className="text-5xl font-serif font-bold text-primary mb-12 text-center">
            My Projects
          </h1>
          <div className="relative w-full h-[70vh] overflow-hidden rounded-lg shadow-xl bg-white flex flex-col md:flex-row">
            <div className="md:w-1/2 relative h-64 md:h-auto">
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <div className="text-gray-400">{projects[0].title}.Image</div>
                <Image
                  src={projects[0].image}
                  alt={projects[0].title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2 p-8 flex flex-col">
              <div>
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
                      className="px-3 py-1 bg-secondary/10  text-secondary text-sm rounded-full"
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
                  className="inline-block bg-secondary text-white px-6 py-3 rounded=md hover:bg-promary transition duration-300"
                >
                  View Project
                </a>
                <button
                  onClick={() => scrollToProject(1)}
                  className="text-secondary flex flex-col items-center group"
                >
                  <span className="mb-2">See more projects</span>
                  <svg
                    className="w-6 h-6 animate-bounce group-hover::text-primary"
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
    </div>
  );
}
