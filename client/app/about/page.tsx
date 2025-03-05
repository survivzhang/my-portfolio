"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// 不同维度的介绍数据
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

export default function AboutMe() {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeSection, setActiveSection] = useState(0);

  // Intersection Observer 监听滚动
  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, aboutSections.length);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex(
              (ref) => ref === entry.target
            );
            if (index !== -1) {
              setActiveSection(index);
            }
          }
        });
      },
      {
        threshold: 0.6, // 当 60% 可见时触发
        rootMargin: "-10px 0px",
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // 滚动到指定部分
  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <div className="bg-background min-h-screen">
      {/* 主内容区域 */}
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto px-6 py-16">
        {/* 左侧 - 介绍部分 */}
        <div className="md:w-1/2 flex flex-col space-y-[80vh] md:pr-8">
          {aboutSections.map((section, index) => (
            <div
              key={section.id}
              ref={(el) => {
                sectionRefs.current[index] = el;
              }}
              className={`min-h-screen flex items-center transition-all duration-500 ${
                activeSection === index
                  ? "opacity-100 scale-100"
                  : "opacity-40 scale-95"
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

        {/* 右侧 - 照片 */}
        <div className="md:w-1/2 flex items-center justify-center md:sticky md:top-16 md:h-screen">
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

      {/* 侧边导航 */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4 z-50">
        {aboutSections.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === index
                ? "bg-primary w-4 h-4"
                : "bg-secondary hover:bg-foreground"
            }`}
            aria-label={`Go to ${aboutSections[index].title}`}
          />
        ))}
      </div>
    </div>
  );
}
