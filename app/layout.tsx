import type { Metadata } from "next";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
import ThemeToggle from "./components/ThemeToggle";
import { assetPath } from "@/lib/asset-path";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Andrew | Digital Operations Portfolio",
  description: "Product operations, customer portal, and workflow transformation case studies.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: assetPath("/favicon.svg"),
    shortcut: assetPath("/favicon.svg"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('portfolio-theme')||'system';var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);document.documentElement.dataset.theme=t}catch(e){}})();` }} />
      </head>
      <body
        className={`${jakarta.variable} ${manrope.variable} antialiased`}
      >
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
