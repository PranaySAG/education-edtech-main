import React, { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import {
  Code2,
  Play,
  Sparkles,
  TerminalSquare,
  Zap,
  Loader2,
} from "lucide-react";
import { executeCode, LANGUAGE_IDS } from "./api";

import "./code.css";

function CodeEditor() {
  const editorRef = useRef(null);

  const [language, setLanguage] = useState("javascript");

  const [value, setValue] = useState(`
function greet(name) {
  console.log("Hello, " + name + "!");
}

greet("Alex");
`);

  const [outputx, setOutputx] = useState(
    "Run code to see output here."
  );

  const [isRunning, setIsRunning] = useState(false);

  const LANGUAGE_VERSIONS = {
    javascript: "Node.js",
    typescript: "TypeScript",
    python: "Python",
    java: "Java",
    csharp: "C#",
    php: "PHP",
  };

  const CODE_SNIPPETS = {
    javascript: `function greet(name) {
  console.log("Hello, " + name + "!");
}

greet("Alex");
`,

    typescript: `type Params = {
  name: string;
};

function greet(data: Params) {
  console.log("Hello, " + data.name + "!");
}

greet({ name: "Alex" });
`,

    python: `def greet(name):
    print("Hello, " + name + "!")

greet("Alex")
`,

    java: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello World");
  }
}
`,

    csharp: `using System;

class Program
{
  static void Main()
  {
    Console.WriteLine("Hello World in C#");
  }
}
`,

    php: `<?php

$name = "Alex";

echo "Hello, " . $name . "!";
?>
`,
  };

  const onMountFn = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleClick = (lang) => {
    setLanguage(lang);
    setValue(CODE_SNIPPETS[lang]);
    setOutputx("Run code to see output here.");
  };

  const output = async () => {
    const sourceCode =
      editorRef.current?.getValue() ?? value;

    if (!sourceCode.trim()) {
      setOutputx("Add some code before running it.");
      return;
    }

    setIsRunning(true);
    setOutputx("Running code...");

    try {
      console.log("Language:", language);
      console.log("Source code:", sourceCode);

      const result = await executeCode(
        language,
        sourceCode
      );

      console.log("Execution result:", result);

      if (result.compile_output) {
        setOutputx(result.compile_output);
        return;
      }

      if (result.stderr) {
        setOutputx(result.stderr);
        return;
      }

      if (result.stdout) {
        setOutputx(result.stdout);
        return;
      }

      if (result.message) {
        setOutputx(result.message);
        return;
      }

      if (result.status?.description) {
        setOutputx(
          `Status: ${result.status.description}`
        );
        return;
      }

      setOutputx("No output returned.");
    } catch (error) {
      console.error("Execution error:", error);

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Failed to execute code.";

      setOutputx(`Error: ${message}`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-6 text-white sm:px-6 lg:px-8">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.22),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.22),_transparent_28%),linear-gradient(180deg,_#06111c_0%,_#071725_45%,_#030712_100%)]" />

      <div className="absolute inset-0 noise-overlay opacity-35" />

      <div className="relative mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <section className="glass-panel overflow-hidden rounded-[2rem] border border-white/15 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)] sm:p-8 animate-rise-in">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

            <div className="max-w-3xl space-y-4">

              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur-xl">

                <Sparkles className="h-4 w-4 text-emerald-300" />

                Glass-themed coding workspace

              </div>

              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                Write, run, and preview code inside a calm premium editor.
              </h1>

              <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Choose a language, load a starter snippet, and run code with a smooth split view that keeps output visible and the workspace responsive.
              </p>

            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[28rem] lg:grid-cols-1 xl:grid-cols-3">

              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <p className="text-sm text-slate-400">
                  Languages
                </p>

                <p className="mt-1 text-xl font-semibold text-white">
                  {Object.keys(LANGUAGE_IDS).length}
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <p className="text-sm text-slate-400">
                  Runtime
                </p>

                <p className="mt-1 text-xl font-semibold text-white">
                  Monaco
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <p className="text-sm text-slate-400">
                  Theme
                </p>

                <p className="mt-1 text-xl font-semibold text-white">
                  Glass
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* Language selector */}
        <section className="glass-panel rounded-[2rem] border border-white/15 p-5 sm:p-6 animate-rise-in">

          <div className="flex flex-col gap-4">

            <div className="flex flex-wrap items-center gap-3">

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-xl">

                <Code2 className="h-4 w-4 text-cyan-300" />

                Select language

              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-xl">

                <TerminalSquare className="h-4 w-4 text-emerald-300" />

                {language}

              </div>

            </div>

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">

              {Object.keys(LANGUAGE_VERSIONS).map((lang) => (

                <button
                  key={lang}
                  onClick={() => handleClick(lang)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition duration-300 ease-in-out ${
                    language === lang
                      ? "border-emerald-400/30 bg-[linear-gradient(135deg,rgba(16,185,129,0.22),rgba(59,130,246,0.14))] text-white shadow-[0_16px_40px_rgba(16,185,129,0.12)]"
                      : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {lang}
                </button>

              ))}

            </div>

          </div>

        </section>

        {/* Editor + Output */}
        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">

          {/* Editor */}
          <section className="glass-panel overflow-hidden rounded-[2rem] border border-white/15 p-4 sm:p-5 animate-rise-in">

            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="text-sm text-slate-400">
                  {LANGUAGE_VERSIONS[language]}
                </p>

                <h2 className="text-2xl font-semibold text-white">
                  Start coding here
                </h2>
              </div>

              <button
                onClick={output}
                disabled={isRunning}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {isRunning ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Run code
                  </>
                )}

              </button>

            </div>

            <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950/50">

              <Editor
                height="70vh"
                width="100%"
                language={language}
                theme="vs-dark"
                value={value}
                onChange={(nextValue) =>
                  setValue(nextValue || "")
                }
                onMount={onMountFn}
                options={{
                  minimap: {
                    enabled: false,
                  },

                  fontSize: 14,

                  roundedSelection: true,

                  scrollBeyondLastLine: false,

                  automaticLayout: true,

                  padding: {
                    top: 16,
                    bottom: 16,
                  },

                  fontFamily:
                    '"Poppins", sans-serif',

                  lineNumbers: "on",

                  wordWrap: "on",
                }}
              />

            </div>

          </section>

          {/* Right side */}
          <aside className="space-y-6">

            {/* Output */}
            <div className="glass-panel rounded-[2rem] border border-white/15 p-5 sm:p-6 animate-rise-in">

              <div className="flex items-center justify-between gap-3">

                <div>

                  <p className="text-sm text-slate-400">
                    Output
                  </p>

                  <h3 className="text-xl font-semibold text-white">
                    Run results
                  </h3>

                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-emerald-300 backdrop-blur-xl">

                  <Zap className="h-5 w-5" />

                </div>

              </div>

              <div className="mt-4 min-h-[26rem] rounded-[1.5rem] border border-white/10 bg-slate-950/55 p-4 text-sm leading-7 text-slate-200 shadow-inner">

                <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-400">

                  <span className="h-2 w-2 rounded-full bg-emerald-300" />

                  console

                </div>

                <pre className="whitespace-pre-wrap break-words font-mono text-sm">
                  {outputx}
                </pre>

              </div>

            </div>

            {/* Tips */}
            <div className="glass-panel rounded-[2rem] border border-white/15 p-5 sm:p-6 animate-rise-in">

              <p className="text-sm text-slate-400">
                Tips
              </p>

              <h3 className="mt-1 text-xl font-semibold text-white">
                Use the workspace well
              </h3>

              <div className="mt-4 space-y-3 text-sm text-slate-300">

                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  Pick a language first so the starter code matches the runtime.
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  Use the Run button to execute your code.
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  Compilation and runtime errors will appear in the output panel.
                </div>

              </div>

            </div>

          </aside>

        </div>

      </div>

    </div>
  );
}

export default CodeEditor;
