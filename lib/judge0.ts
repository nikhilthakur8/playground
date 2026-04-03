import { Judge0Result, Judge0Submission, Judge0Token } from "@/types/compiler";

const JUDGE0_BASE_URL =
  process.env.JUDGE0_BASE_URL || "https://judge0.nextleet.com";
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY || "";

const MAX_POLL_ATTEMPTS = 20;
const POLL_INTERVAL_MS = 1000;

function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (JUDGE0_API_KEY) {
    headers["X-Auth-Token"] = JUDGE0_API_KEY;
  }
  return headers;
}

export async function submitCode(
  submission: Judge0Submission
): Promise<string> {
  const response = await fetch(
    `${JUDGE0_BASE_URL}/submissions?base64_encoded=true&wait=false`,
    {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        ...submission,
        source_code: Buffer.from(submission.source_code).toString("base64"),
        stdin: submission.stdin
          ? Buffer.from(submission.stdin).toString("base64")
          : undefined,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Judge0 submission failed (${response.status}): ${errorText}`
    );
  }

  const data: Judge0Token = await response.json();
  return data.token;
}

export async function getResult(token: string): Promise<Judge0Result> {
  const response = await fetch(
    `${JUDGE0_BASE_URL}/submissions/${token}?base64_encoded=true&fields=stdout,stderr,compile_output,message,status,time,memory`,
    {
      method: "GET",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Judge0 result fetch failed (${response.status}): ${errorText}`
    );
  }

  const data = await response.json();

  return {
    stdout: data.stdout ? Buffer.from(data.stdout, "base64").toString() : null,
    stderr: data.stderr ? Buffer.from(data.stderr, "base64").toString() : null,
    compile_output: data.compile_output
      ? Buffer.from(data.compile_output, "base64").toString()
      : null,
    message: data.message || null,
    status: data.status,
    time: data.time,
    memory: data.memory,
  };
}

export async function executeAndPoll(
  submission: Judge0Submission
): Promise<Judge0Result> {
  const token = await submitCode(submission);

  for (let attempt = 0; attempt < MAX_POLL_ATTEMPTS; attempt++) {
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));

    const result = await getResult(token);

    // Status IDs: 1 = In Queue, 2 = Processing
    if (result.status.id !== 1 && result.status.id !== 2) {
      return result;
    }
  }

  return {
    stdout: null,
    stderr: null,
    compile_output: null,
    message: "Execution timed out while waiting for results.",
    status: { id: -1, description: "Polling Timeout" },
    time: null,
    memory: null,
  };
}
