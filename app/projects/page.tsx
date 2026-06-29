"use client";

import AppImage from "@/components/AppImage";
import PageShell from "@/components/PageShell";
import PageScrollNav from "@/components/PageScrollNav";
import { personal, projects } from "@/lib/data";

export default function ProjectsPage() {
  return (
    <PageShell>
      <PageScrollNav
        sectionSelector="[data-project-article]"
        sectionCount={projects.length}
        ctas={[
          {
            label: "take me to Github",
            href: personal.links.github,
            external: true,
          },
        ]}
      />

      <div className="mx-auto max-w-5xl md:pl-14 lg:pl-20">
        <h1 className="mb-12 text-sm font-bold tracking-tight text-muted">
          Live Projects
        </h1>

        <div className="flex flex-col gap-16 md:gap-24">
          {projects.map((project, i) => (
            <article
              key={project.id}
              data-project-article
              data-scroll-section
              data-index={i}
              data-cursor-hover
              className="group flex flex-col gap-6 md:flex-row md:items-start md:gap-12"
            >
              {project.image && (
                <div className="preserve-media relative h-48 w-full flex-shrink-0 overflow-hidden bg-surface card-shadow theme-transition md:h-56 md:w-72">
                  <AppImage
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-contain p-6 transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              )}

              <div className="min-w-0 flex-1">
                <p className="mb-2 text-xs font-medium text-muted/60">
                  {String(i + 1).padStart(2, "0")}
                </p>
                {project.tag && (
                  <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted">
                    {project.tag}
                  </p>
                )}
                <h2 className="mb-4 text-4xl font-bold tracking-tighter md:text-5xl">
                  {project.title}
                </h2>
                <p className="max-w-2xl text-lg leading-relaxed text-muted">
                  {project.body}
                </p>

                <div className="mt-8">
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-foreground">
                    Highlights
                  </h3>
                  <ul className="flex flex-col gap-2.5">
                    {project.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="max-w-2xl text-base leading-relaxed text-muted md:text-lg"
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
