import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default:
      "Online Compiler & Code Editor | Run Code Online Free - NextLeet Playground",
    template: "%s | NextLeet Playground",
  },
  description:
    "Free online compiler and code editor. Write, compile, and run code in Python, C++, Java, JavaScript, Go, Rust, and 20+ languages directly in your browser. No setup required.",
  keywords: [
    "online compiler",
    "online code editor",
    "online IDE",
    "run code online",
    "compile code online",
    "coding playground",
    "Python compiler online",
    "C++ compiler online",
    "Java compiler online",
    "JavaScript compiler online",
    "Go compiler online",
    "Rust compiler online",
    "online code runner",
    "free compiler",
    "NextLeet",
  ],
  icons: {
    icon: "/favicon.ico",
  },
  authors: [{ name: "NextLeet", url: "https://nextleet.com" }],
  creator: "NextLeet",
  publisher: "NextLeet",
  metadataBase: new URL("https://compiler.nextleet.com"),
  alternates: {
    canonical: "https://compiler.nextleet.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://compiler.nextleet.com",
    siteName: "NextLeet Playground",
    title: "Online Compiler & Code Editor | Run Code Online Free",
    description:
      "Write, compile, and run code in 20+ programming languages directly in your browser. Free online compiler powered by NextLeet.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NextLeet Playground - Online Compiler & Code Editor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Compiler & Code Editor | Run Code Online Free",
    description:
      "Write, compile, and run code in 20+ languages in your browser. Free, fast, no setup. Powered by NextLeet.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
