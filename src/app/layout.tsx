import type { Metadata } from "next";
import { JetBrains_Mono, Oxanium, Space_Grotesk } from "next/font/google";
import "./globals.css";

const oxanium = Oxanium({
  subsets: ["latin"],
  variable: "--font-oxanium",
  weight: ["300", "400", "600"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yashas-mn.vercel.app"),
  title: "Yashas M N — Software Engineer | Security & AI Systems",
  description:
    "Personal portfolio of Yashas M N — building systems that reason under uncertainty and defend under attack. Full-stack engineer specializing in behavioral security, applied ML, and distributed systems.",
  keywords: ["Yashas M N", "software engineer", "cybersecurity", "machine learning", "full stack", "portfolio", "RVCE"],
  authors: [{ name: "Yashas M N" }],
  creator: "Yashas M N",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yashas-mn.vercel.app",
    siteName: "Yashas M N Portfolio",
    title: "Yashas M N — Software Engineer | Security & AI Systems",
    description: "Building systems that reason under uncertainty and defend under attack. Behavioral security, applied ML, distributed systems.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Yashas M N — Software Engineer Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yashas M N — Software Engineer | Security & AI Systems",
    description: "Building systems that reason under uncertainty and defend under attack.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${oxanium.variable} ${jetBrainsMono.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
