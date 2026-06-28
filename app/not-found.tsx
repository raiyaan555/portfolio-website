import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6">
      <h1 className="text-4xl font-bold tracking-tighter">404</h1>
      <p className="text-muted">This page doesn&apos;t exist.</p>
      <Link
        href="/"
        className="text-sm font-medium underline underline-offset-4 transition-opacity hover:opacity-50"
      >
        Back home
      </Link>
    </main>
  );
}
