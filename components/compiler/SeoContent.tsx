import { Badge } from "@/components/ui/badge";
import { LANGUAGES } from "@/lib/compiler/languages";

export function SeoContent() {
  return (
    <div className="space-y-16 text-neutral-600 dark:text-neutral-300">
      {/* Intro */}
      <section>
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
          Write, Compile &amp; Run Code Online
        </h2>
        <p className="text-base leading-relaxed max-w-3xl">
          NextLeet Playground is a free online compiler and code editor that
          runs entirely in your browser. Write code in Python, C++, Java,
          JavaScript, Go, Rust, and 15+ other languages, then compile and
          execute it instantly. No downloads, no sign-ups, no setup.
        </p>
      </section>

      {/* How to use */}
      <section>
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
          How to Use This Online Compiler
        </h2>
        <ol className="list-decimal list-inside space-y-3 text-base leading-relaxed max-w-3xl">
          <li>
            <strong className="text-neutral-900 dark:text-white">Choose a language</strong>: Select
            from 20+ supported languages using the dropdown above the editor.
          </li>
          <li>
            <strong className="text-neutral-900 dark:text-white">Write your code</strong>: The
            Monaco editor provides syntax highlighting, auto-completion, and
            bracket matching.
          </li>
          <li>
            <strong className="text-neutral-900 dark:text-white">Add input (optional)</strong>: If
            your program reads from stdin, enter the input in the Input panel.
          </li>
          <li>
            <strong className="text-neutral-900 dark:text-white">Click Run Code</strong>, or press{" "}
            <kbd className="px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-xs text-neutral-500 dark:text-neutral-400">
              Ctrl+Enter
            </kbd>{" "}
            to execute. Results appear in the Output panel with execution time
            and memory usage.
          </li>
        </ol>
      </section>

      {/* Supported Languages */}
      <section>
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
          Supported Programming Languages
        </h2>
        <p className="text-base leading-relaxed mb-6 max-w-3xl">
          NextLeet Playground supports a wide range of languages for learning,
          prototyping, and competitive programming. Each language runs on a
          secure sandboxed server.
        </p>
        <div className="flex flex-wrap gap-2">
          {LANGUAGES.map((lang) => (
            <Badge
              key={lang.id}
              variant="secondary"
              className="bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 border-neutral-200 dark:border-neutral-700 text-sm py-1 px-3"
            >
              {lang.name}
            </Badge>
          ))}
        </div>
      </section>

      {/* Why use NextLeet */}
      <section>
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
          Why Use NextLeet Online Compiler
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
              No Setup Required
            </h3>
            <p className="text-sm leading-relaxed">
              Skip installing compilers, IDEs, and toolchains. Open the page and
              start coding in seconds. Works on any device with a modern browser.
            </p>
          </div>
          <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
              Professional Editor
            </h3>
            <p className="text-sm leading-relaxed">
              Powered by Monaco, the same editor behind VS Code. Get syntax
              highlighting, IntelliSense, bracket matching, and keyboard
              shortcuts you already know.
            </p>
          </div>
          <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
              20+ Languages
            </h3>
            <p className="text-sm leading-relaxed">
              From Python and JavaScript to Rust and Haskell. One tool for
              everything: learning a new language, testing snippets, or solving
              competitive programming problems.
            </p>
          </div>
          <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
              Fast &amp; Secure
            </h3>
            <p className="text-sm leading-relaxed">
              Code executes in isolated sandboxed containers. Results return in
              seconds. Your code is never stored on our servers. It runs and
              the result is returned immediately.
            </p>
          </div>
        </div>
      </section>

      {/* Language-specific SEO sections */}
      <section>
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
          Popular Language Guides
        </h2>
        <div className="space-y-8 max-w-3xl">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
              Python Compiler Online
            </h3>
            <p className="text-sm leading-relaxed">
              Run Python 3 code online with NextLeet. Our Python playground
              supports standard library imports, stdin input, and prints output
              in real time. Great for learning Python, testing algorithms, or
              quick scripting without a local environment.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
              C++ Compiler Online
            </h3>
            <p className="text-sm leading-relaxed">
              Compile and run C++ code using GCC 9.2.0. The editor provides C++
              syntax highlighting and auto-complete. See compilation errors and
              program output side by side. Ideal for competitive programming
              practice and DSA problem solving.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
              Java Compiler Online
            </h3>
            <p className="text-sm leading-relaxed">
              Write and run Java programs with OpenJDK 13. The boilerplate
              includes a ready-to-go Main class so you can start coding
              immediately. Test Java code for interviews, coursework, or side
              projects.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
              JavaScript Playground Online
            </h3>
            <p className="text-sm leading-relaxed">
              Execute JavaScript using Node.js 12. Test functions, algorithms,
              and data structures in a clean environment. Supports require()
              for built-in Node modules and reads stdin for interactive programs.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
