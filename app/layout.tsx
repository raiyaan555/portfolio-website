import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import ClientOnly from "@/components/ClientOnly";
import Cursor from "@/components/Cursor";
import { ThemeProvider } from "@/components/ThemeProvider";
import { personal, siteUrl } from "@/lib/data";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const description =
  "Raiyaan Khan — Software Development Engineer building scalable distributed systems in Mumbai, India.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: personal.name,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: personal.name,
    description,
    url: "/",
    siteName: personal.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: personal.name,
    description,
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

const themeScript = `
(function () {
  try {
    if (localStorage.getItem("theme") === "dark") {
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
