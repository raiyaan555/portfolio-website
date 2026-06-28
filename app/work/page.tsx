"use client";

import Nav from "@/components/Nav";
import { experience } from "@/lib/data";

export default function WorkPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-background theme-transition px-6 pb-20 pt-28 md:px-10">
        <h1 className="page-title mb-20 text-5xl font-bold tracking-tighter md:text-6xl">
          Work
        </h1>

        <div className="flex flex-col gap-20">
          {experience.map((job) => (
            <article key={`${job.company}-${job.role}`}>
              <div className="mb-6 flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                <div>
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                    {job.company}
                  </h2>
                  <p className="mt-1 text-lg font-bold text-muted">{job.role}</p>
                </div>
                <p className="text-sm font-bold uppercase tracking-widest text-muted">
                  {job.period}
                </p>
              </div>

              <ul className="flex flex-col gap-3">
                {job.highlights.map((highlight) => (
                  <li key={highlight} className="text-base text-muted md:text-lg">
                    {highlight}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
