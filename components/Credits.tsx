"use client";

export default function Credits() {
  return (
    <footer className="pointer-events-none fixed bottom-5 left-1/2 z-40 -translate-x-1/2">
      <p className="pointer-events-auto text-center text-xs font-bold text-muted">
        Design inspired by{" "}
        <a
          href="https://rauno.me"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/70 underline underline-offset-2 transition-opacity hover:opacity-50"
          data-cursor-hover
        >
          Rauno Freiberg
        </a>
      </p>
    </footer>
  );
}
