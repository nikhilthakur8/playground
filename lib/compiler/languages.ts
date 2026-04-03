import { Language } from "@/types/compiler";

export const LANGUAGES: Language[] = [
  {
    id: "python",
    name: "Python 3",
    judge0Id: 71,
    monacoLanguage: "python",
    extension: "py",
    boilerplate: `print("Bhai coding seekh le, nahi toh package deliver karega 📦")
`,
  },
  {
    id: "cpp",
    name: "C++",
    judge0Id: 54,
    monacoLanguage: "cpp",
    extension: "cpp",
    boilerplate: `#include <iostream>
using namespace std;

int main() {
    cout << "Pointer samajh aa gaya? Jhooth mat bol 😂" << endl;
    return 0;
}
`,
  },
  {
    id: "c",
    name: "C",
    judge0Id: 50,
    monacoLanguage: "c",
    extension: "c",
    boilerplate: `#include <stdio.h>

int main() {
    printf("Malloc kiya? Free karna bhool gaya? Classic move 😅\\n");
    return 0;
}
`,
  },
  {
    id: "java",
    name: "Java",
    judge0Id: 62,
    monacoLanguage: "java",
    extension: "java",
    boilerplate: `public class Main {
    public static void main(String[] args) {
        System.out.println("10 files banao, kaam 2 line ka hai 😤");
    }
}
`,
  },
  {
    id: "javascript",
    name: "JavaScript",
    judge0Id: 63,
    monacoLanguage: "javascript",
    extension: "js",
    boilerplate: `console.log("typeof NaN === 'number' ... haan bhai, JS hai 🤡");
`,
  },
  {
    id: "typescript",
    name: "TypeScript",
    judge0Id: 74,
    monacoLanguage: "typescript",
    extension: "ts",
    boilerplate: `const msg: string = "any type use kiya? Toh TypeScript kyun likh raha hai 🤦";
console.log(msg);
`,
  },
  {
    id: "go",
    name: "Go",
    judge0Id: 60,
    monacoLanguage: "go",
    extension: "go",
    boilerplate: `package main

import "fmt"

func main() {
\tfmt.Println("if err != nil - Go developer ka mantra hai 📿")
}
`,
  },
  {
    id: "rust",
    name: "Rust",
    judge0Id: 73,
    monacoLanguage: "rust",
    extension: "rs",
    boilerplate: `fn main() {
    println!("Borrow checker ne reject kiya? Welcome to Rust life 🦀");
}
`,
  },
  {
    id: "csharp",
    name: "C#",
    judge0Id: 51,
    monacoLanguage: "csharp",
    extension: "cs",
    boilerplate: `using System;

class Program {
    static void Main(string[] args) {
        Console.WriteLine("C# seekh liya? Ab Unity mein game bana 🎮");
    }
}
`,
  },
  {
    id: "ruby",
    name: "Ruby",
    judge0Id: 72,
    monacoLanguage: "ruby",
    extension: "rb",
    boilerplate: `puts "Rails seekh le, startup bana le, funding le le 💸"
`,
  },
  {
    id: "php",
    name: "PHP",
    judge0Id: 68,
    monacoLanguage: "php",
    extension: "php",
    boilerplate: `<?php
echo "PHP: Internet ki duct tape hai 🩹\\n";
?>
`,
  },
  {
    id: "swift",
    name: "Swift",
    judge0Id: 83,
    monacoLanguage: "swift",
    extension: "swift",
    boilerplate: `print("Swift seekha? Ab iPhone app bana aur paisa kama 📱💰")
`,
  },
  {
    id: "kotlin",
    name: "Kotlin",
    judge0Id: 78,
    monacoLanguage: "kotlin",
    extension: "kt",
    boilerplate: `fun main() {
    println("Kotlin: Java ka cool chhota bhai 😎")
}
`,
  },
  {
    id: "scala",
    name: "Scala",
    judge0Id: 81,
    monacoLanguage: "scala",
    extension: "scala",
    boilerplate: `object Main extends App {
  println("Spark chalana hai? Scala seekhna padega bhai 📊")
}
`,
  },
  {
    id: "r",
    name: "R",
    judge0Id: 80,
    monacoLanguage: "r",
    extension: "r",
    boilerplate: `cat("R language: Data scientist ka hathiyaar 📈\\n")
`,
  },
  {
    id: "perl",
    name: "Perl",
    judge0Id: 85,
    monacoLanguage: "perl",
    extension: "pl",
    boilerplate: `print "Perl likhne wale ko respect do 🫡\\n";
`,
  },
  {
    id: "bash",
    name: "Bash",
    judge0Id: 46,
    monacoLanguage: "shell",
    extension: "sh",
    boilerplate: `#!/bin/bash
echo "rm -rf / mat maar dena galti se 😱"
`,
  },
  {
    id: "haskell",
    name: "Haskell",
    judge0Id: 61,
    monacoLanguage: "haskell",
    extension: "hs",
    boilerplate: `main :: IO ()
main = putStrLn "Monad kya hai? Main bhi nahi jaanta properly 😂"
`,
  },
  {
    id: "lua",
    name: "Lua",
    judge0Id: 64,
    monacoLanguage: "lua",
    extension: "lua",
    boilerplate: `print("Roblox mein scripting? Lua hi hai boss 🧱")
`,
  },
  {
    id: "pascal",
    name: "Pascal",
    judge0Id: 67,
    monacoLanguage: "pascal",
    extension: "pas",
    boilerplate: `program Hello;
begin
  writeln('begin end begin end... bass yehi zindagi hai 😅');
end.
`,
  },
  {
    id: "sql",
    name: "SQL",
    judge0Id: 82,
    monacoLanguage: "sql",
    extension: "sql",
    boilerplate: `SELECT 'DROP TABLE students; ... galti se mat chala dena 😱' AS warning;
`,
  },
];

export const DEFAULT_LANGUAGE = LANGUAGES[0];

export function getLanguageById(id: string): Language | undefined {
  return LANGUAGES.find((lang) => lang.id === id);
}

export function getLanguageByJudge0Id(judge0Id: number): Language | undefined {
  return LANGUAGES.find((lang) => lang.judge0Id === judge0Id);
}
