"use client";

import Nav from "@/components/Nav";
import {
  personal,
  experience,
  education,
  achievements,
  skills,
  resumePdf,
} from "@/lib/data";

export default function ResumePage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-background theme-transition px-6 pb-20 pt-28 md:px-10">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="page-title text-5xl font-bold tracking-tighter md:text-6xl">
                Resume
              </h1>
              <p className="mt-2 text-base font-bold text-muted">
                {personal.name} &middot; {personal.role}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={resumePdf}
                download="Raiyaan-Khan-Resume.pdf"
                className="card-shadow inline-flex items-center gap-2 bg-surface px-5 py-2.5 text-base font-bold tracking-tight transition-opacity hover:opacity-60"
                data-cursor-hover
              >
                Download PDF
              </a>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 border border-foreground/15 px-5 py-2.5 text-base font-bold text-muted transition-opacity hover:opacity-60"
                data-cursor-hover
              >
                Print
              </button>
            </div>
          </div>

          <article className="card-shadow resume-content bg-surface theme-transition p-8 md:p-12">
            <header className="mb-10 border-b border-foreground/10 pb-8">
              <h2 className="text-4xl font-bold tracking-tighter">
                {personal.name}
              </h2>
              <p className="mt-1 text-lg text-muted">{personal.role}</p>
              <p className="mt-3 text-sm text-muted">{personal.location}</p>
              <a
                href={`mailto:${personal.email}`}
                className="mt-1 inline-block text-sm font-medium transition-opacity hover:opacity-50"
                data-cursor-hover
              >
                {personal.email}
              </a>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {personal.tagline}
              </p>
            </header>

            <section className="mb-10">
              <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted">
                Experience
              </h3>
              <div className="flex flex-col gap-8">
                {experience.map((job) => (
                  <div key={`${job.company}-${job.role}`}>
                    <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                      <div>
                        <p className="font-semibold tracking-tight">
                          {job.company}
                        </p>
                        <p className="text-sm text-muted">{job.role}</p>
                      </div>
                      <p className="text-xs font-medium uppercase tracking-widest text-muted">
                        {job.period}
                      </p>
                    </div>
                    <ul className="flex flex-col gap-2">
                      {job.highlights.map((item) => (
                        <li
                          key={item}
                          className="text-sm leading-relaxed text-muted"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-10">
              <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted">
                Education
              </h3>
              <p className="font-semibold tracking-tight">{education.degree}</p>
              <p className="mt-1 text-sm text-muted">
                {education.school} &middot; {education.period}
              </p>
              <p className="mt-1 text-sm text-muted">
                CGPA: {education.cgpa}
              </p>
            </section>

            <section className="mb-10">
              <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted">
                Skills
              </h3>
              <ul className="flex flex-col gap-2">
                {skills.map((skill) => (
                  <li key={skill} className="text-sm text-muted">
                    {skill}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted">
                Achievements
              </h3>
              <ul className="flex flex-col gap-2">
                {achievements.map((item) => (
                  <li key={item} className="text-sm text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
