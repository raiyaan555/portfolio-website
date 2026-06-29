"use client";

import AppImage from "@/components/AppImage";
import PageShell from "@/components/PageShell";
import PageScrollNav from "@/components/PageScrollNav";
import { experience, personal, resumePdf } from "@/lib/data";

const workNavCtas = [
  {
    label: "LinkedIn",
    href: personal.links.linkedin,
    external: true,
  },
  {
    label: "Download Resume",
    href: resumePdf,
    download: "Raiyaan-Khan-Resume.pdf",
  },
];

export default function WorkPage() {
  return (
    <PageShell>
      <PageScrollNav sectionCount={experience.length} ctas={workNavCtas} />

      <div className="mx-auto max-w-5xl md:pl-14 lg:pl-20">
        <h1 className="mb-12 text-sm font-bold tracking-tight text-muted">
          Work
        </h1>

        <div className="flex flex-col gap-20">
          {experience.map((job) => (
            <article
              key={`${job.company}-${job.role}`}
              data-scroll-section
              data-cursor-hover
            >
              <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  {job.logo && (
                    <div className="card-shadow preserve-media mb-4 inline-flex items-center justify-center border border-foreground/10 bg-black px-8 py-5">
                      <AppImage
                        src={job.logo}
                        alt={`${job.company} logo`}
                        width={180}
                        height={56}
                        className="h-10 w-auto object-contain md:h-12"
                      />
                    </div>
                  )}
                  <p className="text-sm font-bold uppercase tracking-widest text-muted">
                    {job.company}
                  </p>
                  <p className="mt-1 text-lg font-bold text-foreground">
                    {job.role}
                  </p>
                </div>
                <p className="text-sm font-bold uppercase tracking-widest text-muted">
                  {job.period}
                </p>
              </div>

              <ul className="flex flex-col gap-3">
                {job.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="text-base text-muted md:text-lg"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
