import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_ITEMS = [
  {
    question: "What is an online compiler?",
    answer:
      "An online compiler is a web-based tool that lets you write, compile, and run code directly in your browser. No downloads or installations needed. NextLeet Playground supports over 20 programming languages, so you can jump straight into coding.",
  },
  {
    question: "Can I run Python code online for free?",
    answer:
      "Yes. Select Python 3 from the language dropdown, write your code in the editor, and click Run Code. You can also provide custom input via the stdin panel. It's completely free with no account required.",
  },
  {
    question: "Can I compile and run C++ online?",
    answer:
      "Absolutely. NextLeet Playground supports C++ compiled with GCC 9.2.0. Write your code, hit Run, and see both compilation output and program results. Errors are displayed clearly so you can debug quickly.",
  },
  {
    question: "Which programming languages are supported?",
    answer:
      "We support Python 3, C, C++, Java, JavaScript (Node.js), TypeScript, Go, Rust, C#, Ruby, PHP, Swift, Kotlin, Scala, R, Perl, Bash, Haskell, Lua, Pascal, and SQL (SQLite). The language selector shows all available options.",
  },
  {
    question: "Is this online IDE free to use?",
    answer:
      "Yes. NextLeet Playground is completely free with no sign-up or login required. Just open the page, pick a language, and start coding.",
  },
  {
    question: "Can I provide custom input (stdin) to my program?",
    answer:
      "Yes. Use the Input panel to enter stdin data before running your code. This is useful for testing programs that read user input, like competitive programming solutions.",
  },
  {
    question: "Is my code saved between sessions?",
    answer:
      "Your code, selected language, and input are saved automatically to your browser's local storage. When you return, your previous session is restored. Your code stays on your device until you click Run.",
  },
  {
    question: "What keyboard shortcuts are available?",
    answer:
      "Press Ctrl+Enter (or Cmd+Enter on Mac) to run your code instantly. The Monaco editor also supports standard shortcuts like Ctrl+Z for undo, Ctrl+Shift+K to delete a line, and Ctrl+D to select the next occurrence.",
  },
];

export function FaqSection() {
  return (
    <section className="w-full">
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
        Frequently Asked Questions
      </h2>
      <Accordion multiple className="w-full space-y-2">
        {FAQ_ITEMS.map((item, index) => (
          <AccordionItem
            key={index}
            value={`faq-${index}`}
            className="border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 bg-neutral-50 dark:bg-neutral-900/50"
          >
            <AccordionTrigger className="text-left text-neutral-800 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white hover:no-underline py-4 text-base">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed pb-4">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
