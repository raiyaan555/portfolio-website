"use client";

import PageShell from "@/components/PageShell";
import PageScrollNav from "@/components/PageScrollNav";
import { personal, resumePdf } from "@/lib/data";
import { publicAsset } from "@/lib/paths";

const resumeSrc = publicAsset(resumePdf);

const resumeNavCtas = [
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

export default function ResumePage() {
  return (
    <PageShell>
      <PageScrollNav sectionCount={2} ctas={resumeNavCtas} />

      <div className="mx-auto max-w-4xl md:pl-14 lg:pl-20">
        <div className="mb-8" data-scroll-section>
          <h1 className="text-sm font-bold tracking-tight text-muted">
            Resume
          </h1>
          <p className="mt-2 text-base font-bold text-muted">
            {personal.name} &middot; {personal.role}
          </p>
        </div>

        <div
          className="card-shadow overflow-hidden bg-surface theme-transition"
          data-scroll-section
        >
          <object
            data={resumeSrc}
            type="application/pdf"
            className="h-[85vh] w-full"
          >
            <iframe
              src={resumeSrc}
              title={`${personal.name} resume`}
              className="h-[85vh] w-full border-0"
            />
          </object>
        </div>
      </div>
    </PageShell>
  );
}
