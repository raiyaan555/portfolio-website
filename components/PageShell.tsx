import MinimalHeader from "@/components/MinimalHeader";
import Credits from "@/components/Credits";

export default function PageShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MinimalHeader />
      <main className="min-h-screen bg-background theme-transition px-4 pb-24 pt-24 md:px-10 md:pb-20 md:pt-28">
        {children}
      </main>
      <Credits />
    </>
  );
}
