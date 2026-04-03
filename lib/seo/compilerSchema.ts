export function getFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is an online compiler?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An online compiler is a web-based tool that lets you write, compile, and run code directly in your browser without installing any software. NextLeet Playground supports 20+ programming languages including Python, C++, Java, JavaScript, Go, Rust, and more.",
        },
      },
      {
        "@type": "Question",
        name: "Can I run Python code online for free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. NextLeet Playground lets you write and run Python 3 code online for free. Just select Python from the language dropdown, write your code, and click Run Code. You can also provide custom input via the stdin panel.",
        },
      },
      {
        "@type": "Question",
        name: "Can I compile and run C++ online?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. NextLeet Playground supports C++ with GCC 9.2.0. You can write, compile, and execute C++ programs directly in your browser. The output panel shows both compilation errors and program output.",
        },
      },
      {
        "@type": "Question",
        name: "Which programming languages are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "NextLeet Playground supports over 20 languages: Python 3, C, C++, Java, JavaScript (Node.js), TypeScript, Go, Rust, C#, Ruby, PHP, Swift, Kotlin, Scala, R, Perl, Bash, Haskell, Lua, Pascal, and SQL (SQLite).",
        },
      },
      {
        "@type": "Question",
        name: "Is this online IDE free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, NextLeet Playground is completely free to use. There is no sign-up required. Just open the page, choose a language, write your code, and run it.",
        },
      },
      {
        "@type": "Question",
        name: "Can I provide custom input (stdin) to my program?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The Input panel on the right side lets you enter custom stdin data. Your program will read from this input just as it would from a terminal. This is useful for testing with different inputs without modifying your code.",
        },
      },
      {
        "@type": "Question",
        name: "Is my code saved between sessions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Your code, selected language, and input are automatically saved to your browser's local storage. When you come back, your last session is restored. Note: this data stays on your device and is not sent to any server until you click Run.",
        },
      },
    ],
  };
}

export function getSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "NextLeet Playground",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any (Web Browser)",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free online compiler and code editor. Write, compile, and run code in 20+ programming languages directly in your browser. Powered by NextLeet.",
    url: "https://compiler.nextleet.com",
  };
}
