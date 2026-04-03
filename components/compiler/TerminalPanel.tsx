"use client";

import { useEffect, useRef } from "react";
import { ExecutionResult } from "@/types/compiler";

interface TerminalPanelProps {
  stdin: string;
  onStdinChange: (value: string) => void;
  result: ExecutionResult | null;
  isRunning: boolean;
}

function getStatusColor(statusId: number): string {
  if (statusId === 3) return "text-green-500";
  if (statusId === 6) return "text-red-400";
  if (statusId === 5) return "text-yellow-400";
  if (statusId >= 7 && statusId <= 12) return "text-red-400";
  return "text-neutral-400";
}

function getStatusLabel(statusId: number): string {
  switch (statusId) {
    case 3: return "Exited with code 0";
    case 5: return "Time Limit Exceeded";
    case 6: return "Compilation Error";
    case 7: case 8: case 9: case 10: case 11: case 12:
      return "Runtime Error";
    case 13: return "Internal Error";
    case -1: return "Error";
    default: return "";
  }
}

export function TerminalPanel({
  stdin,
  onStdinChange,
  result,
  isRunning,
}: TerminalPanelProps) {
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [result, isRunning]);

  const hasOutput = result && (result.stdout || result.stderr || result.compile_output || result.message);

  return (
    <div className="flex flex-col h-full font-mono text-sm">
      {/* Terminal header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 ml-2">Terminal</span>
        </div>
        {result && !isRunning && (
          <div className="flex items-center gap-3 text-xs">
            <span className={getStatusColor(result.status.id)}>
              {getStatusLabel(result.status.id)}
            </span>
            {result.time && (
              <span className="text-neutral-500">{result.time}s</span>
            )}
            {result.memory && (
              <span className="text-neutral-500">
                {(result.memory / 1024).toFixed(1)}MB
              </span>
            )}
          </div>
        )}
      </div>

      {/* Terminal body */}
      <div ref={outputRef} className="flex-1 bg-neutral-950 overflow-auto">
        {/* Stdin input area */}
        <div className="p-3 border-b border-neutral-800">
          <div className="flex items-center gap-1.5 text-xs text-green-400 mb-1.5 select-none">
            <span>$</span>
            <span className="opacity-60">stdin</span>
            <span className="text-neutral-600 ml-1">(provide input before running)</span>
          </div>
          <textarea
            value={stdin}
            onChange={(e) => onStdinChange(e.target.value)}
            disabled={isRunning}
            placeholder="Type program input here..."
            rows={3}
            className="w-full bg-neutral-900 border border-neutral-800 rounded text-neutral-100 p-2.5 font-mono text-sm resize-y focus:outline-none focus:border-neutral-600 placeholder:text-neutral-700 disabled:opacity-50 min-h-[44px] max-h-[150px]"
            spellCheck={false}
          />
        </div>

        {/* Output area */}
        <div className="p-3">
          {isRunning ? (
            <div className="flex items-center gap-2 text-neutral-400">
              <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span className="text-xs">Executing...</span>
            </div>
          ) : hasOutput ? (
            <div className="space-y-2">
              {result.compile_output && (
                <div>
                  <div className="text-xs text-red-500 mb-1 select-none">compile error:</div>
                  <pre className="text-red-400 whitespace-pre-wrap break-words text-[13px]">{result.compile_output}</pre>
                </div>
              )}
              {result.stderr && (
                <div>
                  <div className="text-xs text-yellow-500 mb-1 select-none">stderr:</div>
                  <pre className="text-yellow-400 whitespace-pre-wrap break-words text-[13px]">{result.stderr}</pre>
                </div>
              )}
              {result.stdout && (
                <pre className="text-neutral-100 whitespace-pre-wrap break-words text-[13px] leading-relaxed">{result.stdout}</pre>
              )}
              {!result.stdout && !result.stderr && !result.compile_output && !result.message && (
                <div className="text-neutral-600 text-xs italic">No output</div>
              )}
              {result.message && (
                <div className="text-red-400 text-xs mt-1">{result.message}</div>
              )}
            </div>
          ) : (
            <div className="text-neutral-600 text-xs select-none">
              Click &quot;Run Code&quot; or press Ctrl+Enter to execute
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
