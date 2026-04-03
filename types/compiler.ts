export interface Language {
  id: string;
  name: string;
  judge0Id: number;
  monacoLanguage: string;
  extension: string;
  boilerplate: string;
}

export interface ExecutionRequest {
  sourceCode: string;
  language: string;
  stdin: string;
}

export interface ExecutionResult {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  message: string | null;
  status: {
    id: number;
    description: string;
  };
  time: string | null;
  memory: number | null;
}

export interface Judge0Submission {
  source_code: string;
  language_id: number;
  stdin: string;
  cpu_time_limit?: number;
  memory_limit?: number;
}

export interface Judge0Token {
  token: string;
}

export interface Judge0Result {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  message: string | null;
  status: {
    id: number;
    description: string;
  };
  time: string | null;
  memory: number | null;
}
