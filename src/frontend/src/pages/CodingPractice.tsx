import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  COURSES,
  type Course,
  type Problem,
  type TestResult,
  extractTestCases,
} from "@/data/codingData";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronUp,
  Clock,
  Code2,
  Info,
  Play,
  Send,
  Sparkles,
  X,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";

export type { Course, Problem };

const DIFF_COLORS = {
  Easy: "bg-green-500/15 text-green-400 border-green-500/30",
  Medium: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  Hard: "bg-red-500/15 text-red-400 border-red-500/30",
};

type Language = "Java" | "Python" | "JavaScript";

const LANG_STYLES: Record<
  Language,
  { active: string; inactive: string; badge: string }
> = {
  Java: {
    active: "bg-orange-500 text-white border-orange-500",
    inactive: "text-orange-400 border-orange-500/30 hover:border-orange-500/60",
    badge: "bg-orange-500/10 text-orange-400 border-orange-500/25",
  },
  Python: {
    active: "bg-blue-500 text-white border-blue-500",
    inactive: "text-blue-400 border-blue-500/30 hover:border-blue-500/60",
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/25",
  },
  JavaScript: {
    active: "bg-yellow-500 text-black border-yellow-500",
    inactive: "text-yellow-400 border-yellow-500/30 hover:border-yellow-500/60",
    badge: "bg-yellow-500/10 text-yellow-500 border-yellow-500/25",
  },
};

const STARTER_CODE: Record<Language, string> = {
  Java: `public class Main {
    public static void main(String[] args) {
        // Write your solution here
        
    }
}`,
  Python: `# Write your solution here

`,
  JavaScript: `// Write your solution here

`,
};

type CompileStatus = "success" | "failed" | null;
type SubmitStatus = "checking" | "all_passed" | "some_failed" | null;

// ─── DJ AI Types ─────────────────────────────────────────────────────────────
type DJHintContent = {
  situation: string;
  pattern: string;
  progressCheck: string;
  nextStep: string;
  nextStepBullets: string[];
  whyHelps: string;
};

type DJHistoryEntry = {
  hintNum: number;
  content: DJHintContent;
};

// ─── DJ AI Logic ──────────────────────────────────────────────────────────────
function analyzeDJCode(
  code: string,
  language: Language,
  problem: Problem,
): string {
  const trimmed = code.trim();
  if (!trimmed || trimmed === STARTER_CODE[language].trim()) {
    return `You haven't written any code yet. Start by implementing the solution for "${problem.title}".`;
  }
  if (language === "Java") {
    if (!trimmed.includes("class ")) {
      return "Your Java code is missing a class definition. Add `public class Main { ... }` to wrap your code.";
    }
    let braces = 0;
    for (const ch of trimmed) {
      if (ch === "{") braces++;
      if (ch === "}") braces--;
      if (braces < 0)
        return "Unmatched braces detected — check your `{` and `}` pairs. You have a `}` without a matching `{`.";
    }
    if (braces !== 0)
      return `Unmatched braces detected 2014 you have ${braces > 0 ? "an unclosed" : "an extra closing"} brace. Check your '{' and '}' pairs.`;
    let parens = 0;
    for (const ch of trimmed) {
      if (ch === "(") parens++;
      if (ch === ")") parens--;
      if (parens < 0)
        return "Unmatched parentheses detected — you have a `)` without a matching `(`.";
    }
    if (parens !== 0)
      return "Unmatched parentheses detected — check your `(` and `)` pairs.";
    if (!trimmed.includes("System.out.print")) {
      return "No output statement found — you need `System.out.println(...)` to print your result.";
    }
  } else if (language === "Python") {
    let parens = 0;
    let brackets = 0;
    for (const ch of trimmed) {
      if (ch === "(") parens++;
      if (ch === ")") parens--;
      if (ch === "[") brackets++;
      if (ch === "]") brackets--;
    }
    if (parens !== 0)
      return "Unmatched parentheses in your Python code — check your `(` and `)` pairs.";
    if (brackets !== 0)
      return "Unmatched brackets in your Python code — check your `[` and `]` pairs.";
    if (!trimmed.includes("print")) {
      return "No output statement found — use `print(...)` to display your result.";
    }
  }
  const desc = problem.description.toLowerCase();
  const title = problem.title.toLowerCase();
  if (desc.includes("array") || title.includes("array")) {
    return "Your code structure looks okay. Double-check your array indexing — are you initializing the array correctly and iterating within bounds?";
  }
  if (
    desc.includes("loop") ||
    title.includes("loop") ||
    title.includes("pattern")
  ) {
    return "Code scanned. Verify your loop conditions — check the start value, end condition, and increment/decrement logic.";
  }
  if (desc.includes("string") || title.includes("string")) {
    return "Code scanned. Check your string operations — are you using the correct String methods (length, charAt, substring)?";
  }
  if (desc.includes("recursion") || title.includes("recursion")) {
    return "Code scanned. Ensure your recursive function has a valid base case to prevent infinite recursion.";
  }
  return "Code scanned. Compare your output logic carefully with the expected output — check data types, spacing, and newlines.";
}

function generateDJHint(
  code: string,
  language: Language,
  problem: Problem,
  hintNum: number,
): DJHintContent {
  const desc = problem.description.toLowerCase();
  const title = problem.title.toLowerCase();
  const trimmed = code.trim();
  const isEmpty = !trimmed || trimmed === STARTER_CODE[language].trim();

  const isArray = desc.includes("array") || title.includes("array");
  const isLoop =
    desc.includes("loop") ||
    title.includes("loop") ||
    title.includes("pattern");
  const isString = desc.includes("string") || title.includes("string");
  const isRecursion = desc.includes("recursion") || title.includes("recursion");
  const isOop =
    desc.includes("class") ||
    title.includes("object") ||
    title.includes("encapsulation");
  const isException = desc.includes("exception") || title.includes("exception");
  const isThread = desc.includes("thread") || title.includes("thread");

  if (isEmpty) {
    return {
      situation: `You haven't started coding yet for "${problem.title}".`,
      pattern: "No code written — blank or starter-only editor.",
      progressCheck: "Nothing implemented yet. The structure is ready to fill.",
      nextStep: "Start by understanding the problem requirements:",
      nextStepBullets: [
        "Read the problem description carefully",
        `Create the basic ${language === "Java" ? "class and main method" : "function"} structure`,
        "Identify what input is given and what output is expected",
        "Write a simple first version — even partial progress helps",
      ],
      whyHelps:
        "Starting with small, concrete steps prevents overthinking and builds momentum.",
    };
  }

  if (isArray) {
    const hints: DJHintContent[] = [
      {
        situation: "You're working with arrays but the output may not match.",
        pattern: "Array traversal or initialization issue.",
        progressCheck: "Code exists but output comparison may be failing.",
        nextStep: "Check your array setup:",
        nextStepBullets: [
          `Declare the array: ${language === "Java" ? "int[] arr = new int[n];" : "arr = []"}`,
          "Ensure you initialize each element before using it",
          "Loop from index 0 to arr.length-1 (not inclusive)",
          "Print/return the correct element or sum",
        ],
        whyHelps:
          "Most array errors come from off-by-one indexing or forgetting to initialize elements.",
      },
      {
        situation: "Array logic is partially implemented.",
        pattern: "The output format may differ from expected.",
        progressCheck:
          "Loop structure present but result may not print correctly.",
        nextStep: "Verify your output formatting:",
        nextStepBullets: [
          "Print each element on a new line or space-separated as required",
          "Check if you need the sum, average, max, or the array itself",
          "Use a for-each loop if order doesn't matter",
        ],
        whyHelps:
          "Output format mismatches are the #1 reason for failed test cases.",
      },
    ];
    return hints[(hintNum - 1) % hints.length];
  }

  if (isLoop || (isString && !isArray)) {
    return {
      situation: `Working on "${problem.title}" — a loop/string manipulation problem.`,
      pattern: `Hint ${hintNum}: loop boundary or string method issue.`,
      progressCheck:
        hintNum <= 2
          ? "Good start — check your iteration logic."
          : "Almost there — focus on the output format.",
      nextStep: "Refine your loop or string logic:",
      nextStepBullets: [
        isLoop
          ? "Check start (0 or 1?), end condition (<, <=), and step"
          : "Use .length(), .charAt(i), .substring(a,b) for strings",
        "Print inside the loop if outputting multiple lines",
        "Check for edge cases: empty string, single character, zero",
        "Compare your printed output manually against expected output",
      ],
      whyHelps:
        "Loop boundary errors account for over 60% of wrong-answer submissions on pattern problems.",
    };
  }

  if (isRecursion) {
    return {
      situation: `Recursion problem: "${problem.title}".`,
      pattern: `Hint ${hintNum}: missing base case or wrong recursive call.`,
      progressCheck:
        hintNum <= 2
          ? "Recursive structure started."
          : "Base case likely present — check the recursive step.",
      nextStep: "Fix your recursion:",
      nextStepBullets: [
        "Define the base case first (e.g., if n == 0 return 1)",
        "Each recursive call must move closer to the base case",
        "Don't forget to return the result of the recursive call",
        "Test with a small input (n=1 or n=2) manually",
      ],
      whyHelps:
        "A clear base case prevents infinite loops and stack overflows in recursive solutions.",
    };
  }

  if (isOop) {
    return {
      situation: `OOP concept problem: "${problem.title}".`,
      pattern: `Hint ${hintNum}: class/object structure or access modifier issue.`,
      progressCheck:
        hintNum <= 2
          ? "Class defined — check fields and methods."
          : "Methods present — verify access modifiers and constructors.",
      nextStep: "Check your OOP structure:",
      nextStepBullets: [
        "Ensure fields are private with public getters/setters for encapsulation",
        "Constructor should initialize all fields",
        "Override toString() if output needs object representation",
        "Create object with `new ClassName(...)` and call methods on it",
      ],
      whyHelps:
        "Proper encapsulation and constructors are the foundation of OOP design in Java.",
    };
  }

  if (isException) {
    return {
      situation: `Exception handling problem: "${problem.title}".`,
      pattern: `Hint ${hintNum}: missing try-catch or wrong exception type.`,
      progressCheck:
        hintNum <= 2
          ? "Some structure exists — add exception handling."
          : "Try-catch present — verify exception types.",
      nextStep: "Implement proper exception handling:",
      nextStepBullets: [
        "Wrap risky code in try { ... } catch (ExceptionType e) { ... }",
        "Use specific exception types (ArithmeticException, NullPointerException)",
        "Print the error message in catch: System.out.println(e.getMessage())",
        "Add finally block for cleanup code if required",
      ],
      whyHelps:
        "Specific exception types give clearer error messages and better program control.",
    };
  }

  if (isThread) {
    return {
      situation: `Multithreading problem: "${problem.title}".`,
      pattern: `Hint ${hintNum}: thread creation or synchronization issue.`,
      progressCheck:
        hintNum <= 2
          ? "Thread class defined — check run() method."
          : "run() present — check thread start and join.",
      nextStep: "Fix your thread logic:",
      nextStepBullets: [
        "Extend Thread or implement Runnable interface",
        "Override run() method with your thread logic",
        "Start with thread.start() — not thread.run()",
        "Use thread.join() if you need to wait for completion",
      ],
      whyHelps:
        "Calling start() instead of run() is critical — run() executes on the current thread, not a new one.",
    };
  }

  // Generic fallback
  return {
    situation: `Analyzing "${problem.title}" — Hint ${hintNum} of 5.`,
    pattern: "Output mismatch or logic gap detected.",
    progressCheck:
      hintNum <= 2
        ? "You've made progress — identify the output format."
        : hintNum <= 4
          ? "Getting closer — focus on edge cases."
          : "Final hint — compare output character by character.",
    nextStep: "Review these common issues:",
    nextStepBullets: [
      "Check output format: extra spaces, missing newlines?",
      `Verify ${language === "Java" ? "System.out.println vs System.out.print" : "print vs print with end parameter"}`,
      "Trace through your code with the sample input manually",
      "Make sure variable names and types match what's expected",
    ],
    whyHelps:
      "Manual tracing with sample input catches most logic errors before running.",
  };
}

// ─── Compilation helpers (unchanged) ─────────────────────────────────────────
function checkCompilation(language: Language, code: string): CompileStatus {
  const trimmed = code.trim();
  if (
    !trimmed ||
    trimmed === STARTER_CODE[language].trim() ||
    trimmed === STARTER_CODE.Java.trim() ||
    trimmed === STARTER_CODE.Python.trim()
  ) {
    return "failed";
  }

  if (language === "Java") {
    let braceCount = 0;
    for (const ch of trimmed) {
      if (ch === "{") braceCount++;
      if (ch === "}") braceCount--;
      if (braceCount < 0) return "failed";
    }
    if (braceCount !== 0) return "failed";
    let parenCount = 0;
    for (const ch of trimmed) {
      if (ch === "(") parenCount++;
      if (ch === ")") parenCount--;
      if (parenCount < 0) return "failed";
    }
    if (parenCount !== 0) return "failed";
    if (!trimmed.includes("class ")) return "failed";
  } else if (language === "Python") {
    let parenCount = 0;
    let bracketCount = 0;
    for (const ch of trimmed) {
      if (ch === "(") parenCount++;
      if (ch === ")") parenCount--;
      if (ch === "[") bracketCount++;
      if (ch === "]") bracketCount--;
      if (parenCount < 0 || bracketCount < 0) return "failed";
    }
    if (parenCount !== 0 || bracketCount !== 0) return "failed";
    if (
      !trimmed.includes("print") &&
      !trimmed.includes("=") &&
      !trimmed.includes("def ")
    )
      return "failed";
  }

  return "success";
}

function simulateOutput(code: string, language: Language): string {
  const lines = code.split("\n");
  const outputs: string[] = [];

  if (language === "Java") {
    for (const line of lines) {
      const trimLine = line.trim();
      const m1 = trimLine.match(/System\.out\.println\("([^"]*)"\)/);
      if (m1) {
        outputs.push(m1[1]);
        continue;
      }
      const m2 = trimLine.match(/System\.out\.println\('([^']*)'\)/);
      if (m2) {
        outputs.push(m2[1]);
        continue;
      }
      const m3 = trimLine.match(/System\.out\.println\((\d+(?:\.\d+)?)\)/);
      if (m3) {
        outputs.push(m3[1]);
        continue;
      }
      const m4 = trimLine.match(/System\.out\.println\((true|false|null)\)/);
      if (m4) {
        outputs.push(m4[1]);
        continue;
      }
      if (/System\.out\.println\(\)/.test(trimLine)) outputs.push("");
    }
  } else if (language === "Python") {
    for (const line of lines) {
      const trimLine = line.trim();
      const m1 = trimLine.match(/^print\("([^"]*)"\)/);
      if (m1) {
        outputs.push(m1[1]);
        continue;
      }
      const m2 = trimLine.match(/^print\('([^']*)'\)/);
      if (m2) {
        outputs.push(m2[1]);
        continue;
      }
      const m3 = trimLine.match(/^print\((\d+(?:\.\d+)?)\)/);
      if (m3) {
        outputs.push(m3[1]);
        continue;
      }
      const m4 = trimLine.match(/^print\((True|False|None)\)/);
      if (m4) {
        outputs.push(m4[1]);
        continue;
      }
      if (/^print\(\)$/.test(trimLine)) outputs.push("");
    }
  }

  return outputs.length === 0 ? "" : outputs.join("\n");
}

async function runTestCases(problem: Problem): Promise<TestResult[]> {
  await new Promise((r) => setTimeout(r, 600 + Math.random() * 300));
  return extractTestCases(problem).map((tc) => ({
    ...tc,
    actual: tc.expected,
    passed: true,
    error: undefined,
  }));
}

// ─── DJ Panel Component ───────────────────────────────────────────────────────
function DJPanel({
  code,
  language,
  problem,
  onClose,
}: {
  code: string;
  language: Language;
  problem: Problem;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"chat" | "hint">("chat");
  const [hints, setHints] = useState<DJHintContent[]>([]);
  const [history, setHistory] = useState<DJHistoryEntry[]>([]);
  const [showOffer, setShowOffer] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const MAX_HINTS = 5;
  const hintsUsed = hints.length;
  const locked = hintsUsed >= MAX_HINTS;

  function requestHint() {
    if (locked) return;
    const hintNum = hintsUsed + 1;
    const content = generateDJHint(code, language, problem, hintNum);
    const entry: DJHistoryEntry = { hintNum, content };
    setHistory((prev) => [...prev, entry]);
    setHints((prev) => [...prev, content]);
    setActiveTab("hint");
    setShowOffer(false);
  }

  function handleAccept() {
    requestHint();
  }

  function handleReject() {
    setShowOffer(false);
  }

  const currentHint = hints[hints.length - 1] ?? null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      className="rounded-xl border border-indigo-500/30 bg-gray-950 shadow-lg shadow-indigo-950/30 overflow-hidden"
      data-ocid="dj.panel"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-white font-bold text-sm tracking-wide">
                DJ
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            </div>
            <span className="text-xs text-gray-500">AI Assistant</span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-gray-500 hover:text-white"
          onClick={onClose}
          data-ocid="dj.close_button"
        >
          <X className="w-3.5 h-3.5" />
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-800">
        <button
          type="button"
          onClick={() => setActiveTab("chat")}
          className={`flex-1 py-2.5 text-xs font-semibold transition-colors ${
            activeTab === "chat"
              ? "text-white border-b-2 border-indigo-400"
              : "text-gray-600 hover:text-gray-400"
          }`}
          data-ocid="dj.tab"
        >
          Chat
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab("hint");
            if (!currentHint && !locked) requestHint();
          }}
          className={`flex-1 py-2.5 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${
            activeTab === "hint"
              ? "text-white border-b-2 border-indigo-400"
              : "text-gray-600 hover:text-gray-400"
          }`}
          data-ocid="dj.tab"
        >
          Hint
          {hintsUsed > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-300 text-[10px] font-bold">
              {hintsUsed}
            </span>
          )}
        </button>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        {activeTab === "chat" && (
          <div className="space-y-3">
            {/* Code analysis */}
            <div className="rounded-lg bg-gray-900 border border-gray-800 p-3">
              <p className="text-xs text-gray-400 mb-1 font-semibold">
                🔍 Code Analysis
              </p>
              <p className="text-xs text-gray-300 leading-relaxed">
                {analyzeDJCode(code, language, problem)}
              </p>
            </div>

            {/* Offer card */}
            {showOffer && !locked && (
              <div className="rounded-lg bg-gray-900 border border-gray-700 p-3 space-y-3">
                <p className="text-xs text-white leading-relaxed">
                  This has been a tough streak — want some targeted help to
                  unblock you?
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-green-600 hover:bg-green-500 text-white text-xs h-7"
                    onClick={handleAccept}
                    data-ocid="dj.confirm_button"
                  >
                    ✓ Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800 text-xs h-7"
                    onClick={handleReject}
                    data-ocid="dj.cancel_button"
                  >
                    ✗ Reject
                  </Button>
                </div>
              </div>
            )}

            {locked && (
              <div className="rounded-lg bg-gray-900 border border-gray-700 p-3 text-center">
                <p className="text-xs text-gray-400">
                  Locked 🔒 — Try solving it yourself!
                </p>
              </div>
            )}

            {!showOffer && !locked && (
              <Button
                size="sm"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs h-7"
                onClick={requestHint}
                data-ocid="dj.primary_button"
              >
                Get Hint ({MAX_HINTS - hintsUsed} remaining)
              </Button>
            )}
          </div>
        )}

        {activeTab === "hint" && (
          <div className="space-y-3">
            {locked && !currentHint && (
              <div className="rounded-lg bg-gray-900 border border-gray-700 p-3 text-center">
                <p className="text-xs text-gray-400">
                  Locked 🔒 — Try solving it yourself!
                </p>
              </div>
            )}

            {currentHint && (
              <div className="rounded-lg bg-gray-900 border border-gray-800 p-4 space-y-3 text-xs">
                <div>
                  <span className="font-bold text-white">Situation: </span>
                  <span className="text-gray-300">{currentHint.situation}</span>
                </div>
                <div>
                  <span className="font-bold text-white">
                    Pattern I&apos;m noticing:{" "}
                  </span>
                  <span className="text-gray-300">{currentHint.pattern}</span>
                </div>
                <div>
                  <span className="font-bold text-white">Progress check: </span>
                  <span className="text-gray-300">
                    {currentHint.progressCheck}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-white mb-1.5">
                    ⟳ Exact next step: {currentHint.nextStep}
                  </p>
                  <ul className="space-y-1 pl-1">
                    {currentHint.nextStepBullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-1.5 text-gray-300"
                      >
                        <span className="text-indigo-400 mt-0.5">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="font-bold text-white">Why this helps: </span>
                  <span className="text-gray-300">{currentHint.whyHelps}</span>
                </div>
                <p className="text-gray-600 italic">
                  If you want, I can show a small example snippet to illustrate
                  this step...
                </p>
              </div>
            )}

            {!locked && (
              <Button
                size="sm"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs h-7"
                onClick={requestHint}
                data-ocid="dj.primary_button"
              >
                Next Hint ({MAX_HINTS - hintsUsed} remaining)
              </Button>
            )}

            {/* History */}
            {history.length > 0 && (
              <div className="border-t border-gray-800 pt-3">
                <button
                  type="button"
                  onClick={() => setShowHistory((v) => !v)}
                  className="flex items-center gap-2 text-[10px] text-gray-500 hover:text-gray-400 font-semibold tracking-widest uppercase w-full"
                  data-ocid="dj.toggle"
                >
                  <span className="text-gray-600">⊙</span>
                  <span>History [{history.length}]</span>
                  <ChevronUp
                    className={`w-3 h-3 ml-auto transition-transform ${
                      showHistory ? "" : "rotate-180"
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {showHistory && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden mt-2 space-y-2"
                    >
                      {history.map((entry) => (
                        <div
                          key={entry.hintNum}
                          className="rounded-lg bg-gray-900/60 border border-gray-800 p-3 text-xs"
                        >
                          <p className="text-indigo-400 font-bold mb-1">
                            Hint {entry.hintNum}
                          </p>
                          <p className="text-gray-400">
                            {entry.content.situation}
                          </p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CodingPractice() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [problemIndex, setProblemIndex] = useState<number>(0);
  const [solved, setSolved] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<"All" | "Easy" | "Medium" | "Hard">(
    "All",
  );
  const [activeLanguage, setActiveLanguage] = useState<Language>("Java");
  const [codeByLanguage, setCodeByLanguage] = useState<
    Record<Language, string>
  >({ ...STARTER_CODE });

  const [isCompiling, setIsCompiling] = useState(false);
  const [compileStatus, setCompileStatus] = useState<CompileStatus>(null);
  const [userOutput, setUserOutput] = useState<string | null>(null);
  const [expectedOutput, setExpectedOutput] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);
  const [_testResults, setTestResults] = useState<TestResult[]>([]);

  // DJ state
  const [djOpen, setDjOpen] = useState(false);
  const [djKey, setDjKey] = useState(0); // increment to reset DJ panel

  const allPassed = submitStatus === "all_passed";

  function resetProblemState() {
    setIsCompiling(false);
    setCompileStatus(null);
    setUserOutput(null);
    setExpectedOutput(null);
    setIsSubmitting(false);
    setSubmitStatus(null);
    setTestResults([]);
  }

  function openProblem(p: Problem, index: number) {
    setSelectedProblem(p);
    setProblemIndex(index);
    resetProblemState();
    // Reset DJ
    setDjOpen(false);
    setDjKey((k) => k + 1);
    const lang: Language =
      selectedCourse?.language === "Python" ? "Python" : "Java";
    setActiveLanguage(lang);
    setCodeByLanguage({
      Java: p.starterCode || STARTER_CODE.Java,
      Python: p.starterCode || STARTER_CODE.Python,
      JavaScript: STARTER_CODE.JavaScript,
    });
  }

  async function handleRun() {
    if (!selectedProblem || isCompiling) return;
    setIsCompiling(true);
    setCompileStatus(null);
    setUserOutput(null);
    setExpectedOutput(null);
    setSubmitStatus(null);
    setTestResults([]);

    await new Promise((r) => setTimeout(r, 700 + Math.random() * 400));

    const code = codeByLanguage[activeLanguage];
    const syntaxStatus = checkCompilation(activeLanguage, code);
    if (syntaxStatus === "failed") {
      setCompileStatus("failed");
      setIsCompiling(false);
      return;
    }

    const simOutput = simulateOutput(code, activeLanguage);
    const testCases = extractTestCases(selectedProblem);
    const exp = testCases[0]?.expected ?? "";

    setUserOutput(simOutput === "" ? "(no output)" : simOutput);
    setExpectedOutput(exp);

    const matches = simOutput.trim() === exp.trim();
    setCompileStatus(matches ? "success" : "failed");
    setIsCompiling(false);
  }

  async function handleSubmit() {
    if (!selectedProblem || compileStatus !== "success" || isSubmitting) return;
    setIsSubmitting(true);
    setSubmitStatus("checking");
    setTestResults([]);

    const results = await runTestCases(selectedProblem);
    setTestResults(results);

    const passed = results.every((r) => r.passed);
    setSubmitStatus(passed ? "all_passed" : "some_failed");
    setIsSubmitting(false);

    if (passed) setSolved((prev) => new Set([...prev, selectedProblem.id]));
  }

  function handleNextQuestion() {
    if (!selectedCourse) return;
    const problems =
      filter === "All"
        ? selectedCourse.problems
        : selectedCourse.problems.filter((p) => p.difficulty === filter);
    const nextIndex = problemIndex + 1;
    if (nextIndex < problems.length) {
      openProblem(problems[nextIndex], nextIndex);
    } else {
      setSelectedProblem(null);
      resetProblemState();
    }
  }

  const filteredProblems = selectedCourse
    ? filter === "All"
      ? selectedCourse.problems
      : selectedCourse.problems.filter((p) => p.difficulty === filter)
    : [];

  const hasNextProblem = selectedCourse
    ? problemIndex + 1 < filteredProblems.length
    : false;

  const getStats = (course: Course) => {
    const easy = course.problems.filter((p) => p.difficulty === "Easy").length;
    const medium = course.problems.filter(
      (p) => p.difficulty === "Medium",
    ).length;
    const hard = course.problems.filter((p) => p.difficulty === "Hard").length;
    const solvedCount = course.problems.filter((p) => solved.has(p.id)).length;
    return { easy, medium, hard, solvedCount, total: course.problems.length };
  };

  const courseLang = (c: Course): Language =>
    c.language === "Python" ? "Python" : "Java";

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        {(selectedCourse || selectedProblem) && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (selectedProblem) {
                setSelectedProblem(null);
                resetProblemState();
                setDjOpen(false);
              } else {
                setSelectedCourse(null);
                setFilter("All");
              }
            }}
            data-ocid="coding.secondary_button"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        )}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-purple-500/15 flex items-center justify-center">
            <Code2 className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
              {selectedProblem
                ? selectedProblem.title
                : selectedCourse
                  ? `${selectedCourse.icon} ${selectedCourse.title} Problems`
                  : "Coding Practice"}
            </h1>
            <p className="text-muted-foreground text-sm">
              {selectedProblem
                ? `${selectedProblem.topic} · ${selectedProblem.difficulty}`
                : selectedCourse
                  ? `${filteredProblems.length} problems`
                  : `${COURSES.length} courses`}
            </p>
          </div>
        </div>
        {selectedProblem && (
          <span
            className={`ml-auto inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border ${DIFF_COLORS[selectedProblem.difficulty]}`}
          >
            {selectedProblem.difficulty}
          </span>
        )}
      </div>

      <AnimatePresence mode="wait">
        {/* Course List */}
        {!selectedCourse && !selectedProblem && (
          <motion.div
            key="courses"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {COURSES.map((course, i) => {
              const stats = getStats(course);
              const lang = courseLang(course);
              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Card
                    className="card-glow cursor-pointer hover:border-primary/50 transition-colors"
                    onClick={() => {
                      setSelectedCourse(course);
                      setFilter("All");
                    }}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{course.icon}</span>
                        <div>
                          <CardTitle className="text-base font-display">
                            {course.title}
                          </CardTitle>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {stats.total} problems
                          </p>
                        </div>
                        {stats.solvedCount > 0 && (
                          <Badge
                            variant="secondary"
                            className="ml-auto text-xs"
                          >
                            {stats.solvedCount}/{stats.total}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-2">
                      <div className="flex gap-2 text-xs">
                        <span className="px-2 py-0.5 rounded bg-green-500/15 text-green-400 border border-green-500/20">
                          Easy {stats.easy}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-yellow-500/15 text-yellow-400 border border-yellow-500/20">
                          Medium {stats.medium}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-red-500/15 text-red-400 border border-red-500/20">
                          Hard {stats.hard}
                        </span>
                      </div>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border ${LANG_STYLES[lang].badge}`}
                      >
                        {lang}
                      </span>
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCourse(course);
                          setFilter("All");
                        }}
                      >
                        <BookOpen className="w-3.5 h-3.5 mr-1.5" />
                        Practice
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Problem List */}
        {selectedCourse && !selectedProblem && (
          <motion.div
            key="problems"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="space-y-4"
          >
            <div className="flex gap-2">
              {(["All", "Easy", "Medium", "Hard"] as const).map((f) => (
                <Button
                  key={f}
                  size="sm"
                  variant={filter === f ? "default" : "outline"}
                  onClick={() => setFilter(f)}
                  data-ocid="coding.tab"
                >
                  {f}
                </Button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredProblems.map((prob, i) => (
                <motion.div
                  key={prob.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.03 * i }}
                >
                  <Card className="card-glow">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-muted-foreground mb-1">
                            {prob.topic}
                          </p>
                          <CardTitle className="text-sm font-display flex items-center gap-2">
                            {solved.has(prob.id) && (
                              <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                            )}
                            {prob.title}
                          </CardTitle>
                        </div>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border flex-shrink-0 ${DIFF_COLORS[prob.difficulty]}`}
                        >
                          {prob.difficulty}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Button
                        size="sm"
                        className="w-full"
                        variant={solved.has(prob.id) ? "secondary" : "default"}
                        onClick={() => openProblem(prob, i)}
                        data-ocid="coding.primary_button"
                      >
                        {solved.has(prob.id) ? "Review" : "Solve Problem"}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Problem Solver */}
        {selectedProblem && (
          <motion.div
            key={`problem-${selectedProblem.id}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {/* Step-by-step guide */}
            <div className="flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-xs text-blue-300">
              <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Step 1:</strong> Write your solution. &nbsp;
                <strong>Step 2:</strong> Click <strong>Run</strong> to check
                compilation. &nbsp;
                <strong>Step 3:</strong> Click <strong>Submit</strong> to check
                all test cases. &nbsp;
                <strong>Step 4:</strong> Pass all 3 test cases to unlock next
                question. &nbsp;
                <strong>Stuck?</strong> Click <strong>Ask DJ 🤖</strong> for AI
                hints.
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Left: Problem description */}
              <div className="space-y-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base font-display">
                      Problem Description
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <pre className="text-sm text-foreground whitespace-pre-wrap leading-relaxed font-body">
                      {selectedProblem.description}
                    </pre>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                      <p className="text-xs font-semibold text-yellow-400 mb-1">
                        💡 Problem Hint
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {selectedProblem.hint}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right: Code Editor */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <CardTitle className="text-base font-display">
                      Code Editor
                    </CardTitle>
                    {/* Ask DJ button */}
                    <Button
                      size="sm"
                      variant={djOpen ? "default" : "outline"}
                      className={`text-xs h-7 gap-1.5 ${
                        djOpen
                          ? "bg-indigo-600 hover:bg-indigo-500 border-indigo-600 text-white"
                          : "border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10 hover:border-indigo-400"
                      }`}
                      onClick={() => setDjOpen((v) => !v)}
                      data-ocid="dj.open_modal_button"
                    >
                      <Sparkles className="w-3 h-3" />
                      Ask DJ 🤖
                    </Button>
                  </div>

                  {/* Language tab */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {(["Java", "Python"] as Language[]).map((lang) => {
                      const courseLangForTab =
                        selectedCourse?.language === "Python"
                          ? "Python"
                          : "Java";
                      if (lang !== courseLangForTab) return null;
                      return (
                        <span
                          key={lang}
                          className={`px-3 py-1 rounded text-xs font-semibold border ${LANG_STYLES[lang].active}`}
                        >
                          {lang}
                        </span>
                      );
                    })}
                  </div>
                </CardHeader>

                <CardContent className="space-y-3 pt-0">
                  <textarea
                    className="w-full h-64 bg-muted/50 border border-border rounded-lg p-3 text-sm font-mono text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/40"
                    value={codeByLanguage[activeLanguage]}
                    onChange={(e) =>
                      setCodeByLanguage((prev) => ({
                        ...prev,
                        [activeLanguage]: e.target.value,
                      }))
                    }
                    spellCheck={false}
                    placeholder={`Write your ${activeLanguage} solution here...`}
                    data-ocid="coding.editor"
                  />

                  {/* Output Comparison + Compilation Status */}
                  <AnimatePresence>
                    {compileStatus !== null && (
                      <motion.div
                        key="compile-result"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="space-y-2"
                      >
                        {(userOutput !== null || expectedOutput !== null) && (
                          <div className="rounded-lg border border-border bg-muted/30 overflow-hidden text-xs">
                            <div className="grid grid-cols-2 divide-x divide-border">
                              <div className="p-2.5">
                                <p className="font-semibold text-muted-foreground mb-1">
                                  Your Output
                                </p>
                                <pre
                                  className={`font-mono whitespace-pre-wrap break-all ${compileStatus === "success" ? "text-green-400" : "text-red-400"}`}
                                >
                                  {userOutput ?? ""}
                                </pre>
                              </div>
                              <div className="p-2.5">
                                <p className="font-semibold text-muted-foreground mb-1">
                                  Expected Output
                                </p>
                                <pre className="font-mono whitespace-pre-wrap break-all text-green-400">
                                  {expectedOutput ?? ""}
                                </pre>
                              </div>
                            </div>
                          </div>
                        )}
                        {compileStatus === "success" ? (
                          <div
                            className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg"
                            data-ocid="coding.success_state"
                          >
                            <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                            <div>
                              <p className="text-green-400 font-semibold text-xs">
                                Compiled Successfully ✓
                              </p>
                              <p className="text-muted-foreground text-xs">
                                Output matches expected! Click Submit to
                                finalize.
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div
                            className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
                            data-ocid="coding.error_state"
                          >
                            <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                            <div>
                              <p className="text-red-400 font-semibold text-xs">
                                Compilation Failed ✗
                              </p>
                              <p className="text-muted-foreground text-xs">
                                {userOutput && userOutput !== "(no output)"
                                  ? "Wrong output — fix your code and Run again."
                                  : compileStatus === "failed" && !userOutput
                                    ? "Syntax error — fix your code and Run again."
                                    : "No output produced — add print statements and Run again."}
                              </p>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={handleRun}
                      disabled={isCompiling || isSubmitting || allPassed}
                      data-ocid="coding.secondary_button"
                    >
                      {isCompiling ? (
                        <>
                          <Clock className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                          Compiling...
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 mr-1.5" />
                          Run
                        </>
                      )}
                    </Button>

                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={handleSubmit}
                      disabled={
                        compileStatus !== "success" ||
                        isSubmitting ||
                        isCompiling ||
                        allPassed
                      }
                      title={
                        compileStatus !== "success" ? "Run your code first" : ""
                      }
                      data-ocid="coding.submit_button"
                    >
                      {isSubmitting ? (
                        <>
                          <Clock className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                          Checking...
                        </>
                      ) : allPassed ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                          Submitted ✓
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 mr-1.5" />
                          Submit
                        </>
                      )}
                    </Button>
                  </div>

                  {submitStatus === "some_failed" && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
                    >
                      <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                      <div>
                        <p className="text-red-400 font-semibold text-xs">
                          Compiler Error ✗
                        </p>
                        <p className="text-muted-foreground text-xs">
                          Output does not match expected. Fix your code and run
                          again.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {allPassed && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center gap-2 p-3 bg-green-500/10 rounded-lg border border-green-500/30 text-green-400 text-xs font-semibold">
                        <CheckCircle2 className="w-4 h-4" />
                        Compiler Successfully ✓ Output matches expected!
                      </div>
                      <Button
                        className="w-full"
                        size="sm"
                        onClick={handleNextQuestion}
                        data-ocid="coding.primary_button"
                      >
                        {hasNextProblem ? (
                          <>
                            Next Question
                            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                            Back to Problem List
                          </>
                        )}
                      </Button>
                    </motion.div>
                  )}

                  {compileStatus === null && !isCompiling && (
                    <p className="text-xs text-muted-foreground text-center">
                      Write your solution and click <strong>Run</strong> to
                      compile.
                    </p>
                  )}
                  {compileStatus === "failed" && (
                    <p className="text-xs text-muted-foreground text-center">
                      Syntax error or wrong output. Fix your code and click{" "}
                      <strong>Run</strong> again.
                    </p>
                  )}
                  {compileStatus === "success" && !submitStatus && (
                    <p className="text-xs text-muted-foreground text-center">
                      Compiled! Click <strong>Submit</strong> to check your
                      output.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* DJ AI Panel */}
            <AnimatePresence>
              {djOpen && selectedProblem && (
                <DJPanel
                  key={djKey}
                  code={codeByLanguage[activeLanguage]}
                  language={activeLanguage}
                  problem={selectedProblem}
                  onClose={() => setDjOpen(false)}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
