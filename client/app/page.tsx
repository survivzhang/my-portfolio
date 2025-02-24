// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* 导航栏 */}
      <nav className="bg-secondary p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-white font-serif text-2xl">Zichen</h1>
          <div className="space-x-6">
            <Link
              href="/projects"
              className="text-white hover:text-background transition"
            >
              Projects
            </Link>
            <Link
              href="/about"
              className="text-white hover:text-background transition"
            >
              About
            </Link>
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="flex-grow flex flex-col justify-center items-center text-center px-6 py-16">
        <h1 className="text-5xl font-serif font-bold text-primary mb-6">
          Welcome to My Portfolio
        </h1>
        <p className="text-lg text-foreground max-w-2xl mb-8 font-serif">
          Explore my work, design philosophy, and creative journey. I build web
          experiences with a touch of vintage elegance.
        </p>

        <div className="mt-6 flex gap-4">
          <Link
            href="/projects"
            className="bg-secondary text-white px-8 py-3 rounded-lg hover:bg-primary transition duration-300"
          >
            View Projects
          </Link>
          <Link
            href="/about"
            className="bg-secondary text-white px-8 py-3 rounded-lg hover:bg-primary transition duration-300"
          >
            About Me
          </Link>
        </div>
      </main>

      {/* 页脚 */}
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
