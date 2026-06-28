"use client";

import Image from "next/image";
import Nav from "@/components/Nav";
import { projects } from "@/lib/data";

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-background theme-transition px-6 pb-20 pt-28 md:px-10">
        <h1 className="page-title mb-20 text-5xl font-bold tracking-tighter md:text-6xl">
          Projects
        </h1>

        <div className="flex flex-col gap-16">
          {projects.map((project, i) => (
            <article
              key={project.id}
              data-cursor-hover
              className="group flex flex-col gap-6 md:flex-row md:items-center md:gap-12"
            >
              {project.image && (
                <div className="preserve-media relative h-48 w-full flex-shrink-0 overflow-hidden bg-surface theme-transition md:h-56 md:w-72">
                  <Image
                    src={project.image}
                    alt={project.imageAlt ?? project.title ?? ""}
                    fill
                    className="object-contain p-6 transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              )}

              <div>
                <p className="mb-2 text-xs font-medium text-muted/60">
                  {String(i + 1).padStart(2, "0")}
                </p>
                {project.tag && (
                  <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted">
                    {project.tag}
                  </p>
                )}
                <h2 className="mb-3 text-4xl font-bold tracking-tighter md:text-5xl">
                  {project.title}
                </h2>
                <p className="max-w-xl text-lg text-muted">{project.body}</p>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
