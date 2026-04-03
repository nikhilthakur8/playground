import { NextRequest, NextResponse } from "next/server";
import { getLanguageById } from "@/lib/compiler/languages";
import { executeAndPoll } from "@/lib/judge0";

const MAX_SOURCE_LENGTH = 100_000; // 100KB
const MAX_STDIN_LENGTH = 10_000; // 10KB

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sourceCode, language, stdin } = body;

    // Validate required fields
    if (!sourceCode || typeof sourceCode !== "string") {
      return NextResponse.json(
        { error: "sourceCode is required and must be a string." },
        { status: 400 }
      );
    }

    if (!language || typeof language !== "string") {
      return NextResponse.json(
        { error: "language is required and must be a string." },
        { status: 400 }
      );
    }

    // Validate lengths
    if (sourceCode.length > MAX_SOURCE_LENGTH) {
      return NextResponse.json(
        {
          error: `Source code exceeds maximum length of ${MAX_SOURCE_LENGTH} characters.`,
        },
        { status: 400 }
      );
    }

    if (stdin && typeof stdin === "string" && stdin.length > MAX_STDIN_LENGTH) {
      return NextResponse.json(
        {
          error: `stdin exceeds maximum length of ${MAX_STDIN_LENGTH} characters.`,
        },
        { status: 400 }
      );
    }

    // Resolve language
    const lang = getLanguageById(language);
    if (!lang) {
      return NextResponse.json(
        { error: `Unsupported language: ${language}` },
        { status: 400 }
      );
    }

    // Execute
    const result = await executeAndPoll({
      source_code: sourceCode,
      language_id: lang.judge0Id,
      stdin: stdin || "",
      cpu_time_limit: 10,
      memory_limit: 256000,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Compiler execution error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Internal server error.",
        stdout: null,
        stderr: null,
        compile_output: null,
        message: "An unexpected error occurred.",
        status: { id: -1, description: "Server Error" },
        time: null,
        memory: null,
      },
      { status: 500 }
    );
  }
}
