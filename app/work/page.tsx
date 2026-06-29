"use client";

import Image from "next/image";
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
                  <div className="card-shadow mb-4 inline-flex items-center justify-center border border-foreground/10 bg-black px-8 py-5">
                    <Image
                      src="/images/arcon-logo.png"
                      alt="ARCON Techsolutions"
                      width={180}
                      height={56}
                      className="preserve-media h-10 w-auto object-contain md:h-12"
                    />
                  </div>
                  <p className="text-lg font-bold text-muted">{job.role}</p>
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

        <div className="mt-16 flex flex-col gap-3 md:hidden">
          <a
            href={personal.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold text-accent-red transition-opacity hover:opacity-60"
            data-cursor-hover
          >
            LinkedIn →
          </a>
          <a
            href={resumePdf}
            download="Raiyaan-Khan-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold text-accent-red transition-opacity hover:opacity-60"
            data-cursor-hover
          >
            Download Resume →
          </a>
        </div>
      </div>
    </PageShell>
  );
}
