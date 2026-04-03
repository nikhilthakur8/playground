"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { LanguageSelector } from "./LanguageSelector";
import { TerminalPanel } from "./TerminalPanel";
import { LANGUAGES, DEFAULT_LANGUAGE } from "@/lib/compiler/languages";
import { ExecutionResult, Language } from "@/types/compiler";
import type { OnMount } from "@monaco-editor/react";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-neutral-50 dark:bg-neutral-950 text-neutral-400">
      <svg className="animate-spin h-6 w-6 mr-2" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      Loading editor...
    </div>
  ),
});

const STATE_KEY = "nextleet-compiler-state";
const LAYOUT_KEY = "nextleet-compiler-layout";

interface SavedState {
  languageId: string;
  code: string;
  stdin: string;
  isFullscreen: boolean;
}

function loadState(): SavedState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STATE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function persistState(state: SavedState) {
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
  } catch {}
}

function loadLayout(): Record<string, number> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LAYOUT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function persistLayout(layout: Record<string, number>) {
  try {
    localStorage.setItem(LAYOUT_KEY, JSON.stringify(layout));
  } catch {}
}

export function CompilerClient() {
  const { resolvedTheme } = useTheme();
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);
  const [code, setCode] = useState<string>(DEFAULT_LANGUAGE.boilerplate);
  const [stdin, setStdin] = useState<string>("");
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(true);
  const [defaultLayout, setDefaultLayout] = useState<
    Record<string, number> | undefined
  >(undefined);
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);
  const runRef = useRef<() => void>(() => {});
  const initialized = useRef(false);

  // Load persisted state on mount
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const saved = loadState();
    if (saved) {
      const lang = LANGUAGES.find((l) => l.id === saved.languageId);
      if (lang) {
        setLanguage(lang);
        setCode(saved.code);
        setStdin(saved.stdin);
      }
      if (saved.isFullscreen) setIsFullscreen(true);
    }

    const layout = loadLayout();
    if (layout) setDefaultLayout(layout);
  }, []);

  // Persist code / language / stdin / fullscreen
  useEffect(() => {
    persistState({ languageId: language.id, code, stdin, isFullscreen });
  }, [language, code, stdin, isFullscreen]);

  // Escape exits fullscreen
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) setIsFullscreen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isFullscreen]);

  // Lock body scroll in fullscreen
  useEffect(() => {
    document.body.style.overflow = isFullscreen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  const handleLanguageChange = useCallback(
    (lang: Language) => {
      setLanguage(lang);
      setCode(lang.boilerplate);
      setResult(null);
    },
    []
  );

  const handleRun = useCallback(async () => {
    if (isRunning) return;
    setIsRunning(true);
    setResult(null);
    try {
      const res = await fetch("/api/compiler/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceCode: code,
          language: language.id,
          stdin,
        }),
      });
      const data = await res.json();
      setResult(
        res.ok
          ? data
          : {
              stdout: null,
              stderr: null,
              compile_output: null,
              message: data.error || "Failed to execute code.",
              status: { id: -1, description: "Error" },
              time: null,
              memory: null,
            }
      );
    } catch {
      setResult({
        stdout: null,
        stderr: null,
        compile_output: null,
        message: "Network error. Please check your connection and try again.",
        status: { id: -1, description: "Network Error" },
        time: null,
        memory: null,
      });
    } finally {
      setIsRunning(false);
    }
  }, [code, language, stdin, isRunning]);

  useEffect(() => {
    runRef.current = handleRun;
  }, [handleRun]);

  const handleReset = useCallback(() => {
    setCode(language.boilerplate);
    setStdin("");
    setResult(null);
  }, [language]);

  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.addCommand(2048 | 3, () => runRef.current());
  };

  const monacoTheme = resolvedTheme === "dark" ? "vs-dark" : "light";

  return (
    <div
      className={
        isFullscreen
          ? "fixed inset-0 z-50 flex flex-col bg-white dark:bg-neutral-950"
          : "w-full"
      }
    >
      {/* Toolbar */}
      <div
        className={`flex items-center justify-between px-4 py-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 ${
          isFullscreen ? "" : "rounded-t-xl"
        }`}
      >
        <div className="flex items-center gap-3">
          <LanguageSelector
            value={language.id}
            onChange={handleLanguageChange}
            disabled={isRunning}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsFullscreen((f) => !f)}
            className="h-8 w-8 border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white"
            title={isFullscreen ? "Exit fullscreen (Esc)" : "Enter fullscreen"}
          >
            {isFullscreen ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
              </svg>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            disabled={isRunning}
            className="border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white"
          >
            <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset
          </Button>
          <Button
            size="sm"
            onClick={handleRun}
            disabled={isRunning}
            className="bg-neutral-900 dark:bg-white text-white dark:text-black hover:bg-neutral-700 dark:hover:bg-neutral-200 font-semibold min-w-[110px]"
          >
            {isRunning ? (
              <>
                <svg className="animate-spin h-4 w-4 mr-1.5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Running...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Run Code
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Resizable Editor + Terminal */}
      <div
        className={`border-x border-b border-neutral-200 dark:border-neutral-800 overflow-hidden ${
          isFullscreen ? "flex-1 min-h-0" : "rounded-b-xl"
        }`}
        style={isFullscreen ? undefined : { height: 520 }}
      >
        <ResizablePanelGroup
          orientation="horizontal"
          onLayoutChanged={(layout) => persistLayout(layout)}
          defaultLayout={defaultLayout}
          className="h-full"
        >
          <ResizablePanel id="editor" defaultSize={60} minSize={25} className="min-w-0">
            <MonacoEditor
              height="100%"
              language={language.monacoLanguage}
              value={code}
              onChange={(val) => setCode(val || "")}
              onMount={handleEditorMount}
              theme={monacoTheme}
              options={{
                fontSize: 14,
                fontFamily:
                  "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Geist Mono', Menlo, monospace",
                fontLigatures: true,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                padding: { top: 16, bottom: 16 },
                lineNumbers: "on",
                renderLineHighlight: "line",
                cursorBlinking: "smooth",
                smoothScrolling: true,
                wordWrap: "on",
                tabSize: 4,
                automaticLayout: true,
                bracketPairColorization: { enabled: true },
              }}
            />
          </ResizablePanel>

          <ResizableHandle
            withHandle
            className="bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors data-[resize-handle-state=drag]:bg-neutral-400 dark:data-[resize-handle-state=drag]:bg-neutral-600"
          />

          <ResizablePanel id="terminal" defaultSize={40} minSize={20} className="min-w-0">
            <TerminalPanel
              stdin={stdin}
              onStdinChange={setStdin}
              result={result}
              isRunning={isRunning}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Shortcut hint */}
      <div
        className={`text-center mt-3 text-xs text-neutral-400 dark:text-neutral-600 ${
          isFullscreen ? "pb-3" : ""
        }`}
      >
        <kbd className="px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-500 dark:text-neutral-400 text-[11px]">
          Ctrl
        </kbd>
        {" + "}
        <kbd className="px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-500 dark:text-neutral-400 text-[11px]">
          Enter
        </kbd>
        {" to run"}
        {isFullscreen && (
          <>
            {" | "}
            <kbd className="px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-500 dark:text-neutral-400 text-[11px]">
              Esc
            </kbd>
            {" to exit fullscreen"}
          </>
        )}
      </div>
    </div>
  );
}
