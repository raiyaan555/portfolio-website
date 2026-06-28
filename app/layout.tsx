import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import ClientOnly from "@/components/ClientOnly";
import Cursor from "@/components/Cursor";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Raiyaan Khan",
  description:
    "Raiyaan Khan — Software Development Engineer building scalable distributed systems in Mumbai, India.",
};

const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (stored === "dark" || (!stored && prefersDark)) {
      document.documentElement.classList.add("dark");
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${poppins.className} bg-background font-sans text-foreground antialiased`}
      >
        <ThemeProvider>
          <ClientOnly>
            <Cursor />
          </ClientOnly>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
