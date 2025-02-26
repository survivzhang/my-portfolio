import { DESTRUCTION } from "dns";
import Image from "next/image";
import Link from "next/link";
import { title } from "process";

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
  return (
    <div className="py-12 md:py-24 px-6 md:px-4 lg: px max-w-7xl, mx-auto"></div>
  );
}
