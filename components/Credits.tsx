"use client";

export default function Credits() {
  return (
    <footer className="pointer-events-none fixed bottom-3 left-1/2 z-40 -translate-x-1/2 max-md:bottom-4">
      <p className="pointer-events-auto text-center text-[9px] font-normal text-muted/60">
        Design inspired by{" "}
        <a
          href="https://rauno.me"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted/70 underline underline-offset-2 transition-opacity hover:opacity-50"
          data-cursor-hover
        >
          Rauno Freiberg
        </a>
      </p>
    </footer>
  );
}
