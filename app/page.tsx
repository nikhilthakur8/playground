import Image from "next/image";
import { CompilerClient } from "@/components/compiler/CompilerClient";
import { SeoContent } from "@/components/compiler/SeoContent";
import { FaqSection } from "@/components/compiler/FaqSection";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  getFaqSchema,
  getSoftwareApplicationSchema,
} from "@/lib/seo/compilerSchema";
import Link from "next/link";

export default function CompilerPage() {
  const faqSchema = getFaqSchema();
  const appSchema = getSoftwareApplicationSchema();

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />

      {/* Header */}
      <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/nextleet-icon.png"
              alt="NextLeet"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <div>
              <span className="font-bold text-neutral-900 dark:text-white text-lg tracking-tight">
                NextLeet
              </span>
              <span className="text-neutral-400 dark:text-neutral-500 text-sm ml-1.5">
                Playground
              </span>
            </div>
          </Link>
          <nav className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="https://nextleet.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              nextleet.com
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* H1 + Intro */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-3 tracking-tight">
            Online Compiler &amp; Code Editor
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-base sm:text-lg max-w-2xl leading-relaxed">
            Write, compile, and run code in 20+ programming languages. Free,
            fast, and runs entirely in your browser. Powered by{" "}
            <a
              href="https://nextleet.com"
              className="text-neutral-900 dark:text-white hover:underline"
            >
              NextLeet
            </a>
            .
          </p>
        </div>

        {/* Compiler UI */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <CompilerClient />
        </div>

        {/* SEO Content Sections */}
        <div className="border-t border-neutral-200 dark:border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
            <SeoContent />
            <FaqSection />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Image
                src="/nextleet-icon.png"
                alt="NextLeet"
                width={24}
                height={24}
                className="rounded"
              />
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                NextLeet Playground / Free Online Compiler
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-neutral-400 dark:text-neutral-500">
              <a
                href="https://nextleet.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                NextLeet
              </a>
              <span>&copy; 2025 NextLeet. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
