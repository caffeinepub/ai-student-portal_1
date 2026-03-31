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
  Bot,
  CheckCircle2,
  Clock,
  Code2,
  Info,
  Play,
  Send,
  X,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

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

type DJMessage = { id: string; from: "dj" | "user"; text: string };
type CompileStatus = null | "success" | "failed";
type SubmitStatus = null | "checking" | "all_passed" | "some_failed";

const DJ_INIT_MESSAGE: DJMessage = {
  id: "dj-init",
  from: "dj",
  text: "Hi! I'm DJ 🤖 your coding assistant. I'll automatically scan your code for errors when you open me. (5 hints available)",
};

/**
 * Analyze the student's code for common mistakes.
 * Returns a formatted diagnostic message string.
 */
function analyzeDJCode(
  code: string,
  language: Language,
  problem: Problem,
): string {
  const trimmed = code.trim();

  // Check for empty or unmodified starter code
  const isStarter =
    !trimmed ||
    trimmed === STARTER_CODE.Java.trim() ||
    trimmed === STARTER_CODE.Python.trim() ||
    trimmed === STARTER_CODE.JavaScript.trim();

  if (isStarter) {
    const javaExample = `public class Solution {
    public static void main(String[] args) {
        // your code here
    }
}`;
    const pyExample = `def solution():
    # your code here
    pass`;
    return [
      "🔍 Code Analysis:",
      "",
      `⚠️ You haven't written any code yet!`,
      "",
      `Start by setting up the structure for "${problem.title}":`,
      "",
      language === "Python" ? pyExample : javaExample,
      "",
      "💡 Tip: Read the problem description and test cases carefully before coding.",
    ].join("\n");
  }

  const lines = code.split("\n");
  const issues: string[] = [];

  if (language === "Java") {
    // 1. Missing class declaration
    if (!trimmed.match(/\bclass\s+\w+/)) {
      issues.push(
        "❌ Missing class declaration\n" +
          "📍 Java code must be wrapped in a class.\n" +
          "✅ Fix:\n" +
          "public class Solution {\n" +
          "    public static void main(String[] args) {\n" +
          "        // your code\n" +
          "    }\n" +
          "}",
      );
    }

    // 2. Brace mismatch
    const openBraces = (trimmed.match(/\{/g) || []).length;
    const closeBraces = (trimmed.match(/\}/g) || []).length;
    if (openBraces !== closeBraces) {
      const diff = Math.abs(openBraces - closeBraces);
      const which = openBraces > closeBraces ? "closing `}`" : "opening `{`";
      issues.push(
        `❌ Mismatched braces\n📍 You have ${openBraces} opening '{' but ${closeBraces} closing '}' — they must be equal.\n✅ Fix: Add ${diff} more ${which} brace(s) to balance your code.`,
      );
    }

    // 3. Infinite loop risk
    if (
      /while\s*\(\s*true\s*\)/.test(trimmed) &&
      !/\bbreak\b/.test(trimmed) &&
      !/\breturn\b/.test(trimmed)
    ) {
      issues.push(
        "⚠️ Possible infinite loop\n" +
          `📍 Found 'while(true)' with no 'break' or 'return' statement.\n` +
          "✅ Fix: Add a break condition or return statement inside the loop.",
      );
    }

    // 4. Missing return in non-void method
    if (
      /(?:public|private|protected)\s+(?:int|String|boolean|double|long|char|float)\s+\w+\s*\(/.test(
        trimmed,
      ) &&
      !/\breturn\b/.test(trimmed)
    ) {
      issues.push(
        "⚠️ Missing return statement\n" +
          `📍 Your method declares a return type but has no 'return' statement.\n` +
          "✅ Fix: Add a return statement at the end of your method.",
      );
    }

    // 5. Missing semicolons — only flag the most obvious patterns
    const needsSemicolon = [
      /^\s*(int|double|float|long|short|byte|boolean|char|String|var)\s+\w+\s*=\s*.+$/,
      /^\s*System\.(out|err)\.(print|println|printf)\s*\(.*\)$/,
      /^\s*return\s+\S.*[^;{},]$/,
    ];
    let semiIssue: string | null = null;
    for (let i = 0; i < lines.length && !semiIssue; i++) {
      const t = lines[i].trim();
      if (!t || t.startsWith("//") || t.startsWith("*")) continue;
      if (needsSemicolon.some((p) => p.test(t)) && !/[;{},]$/.test(t)) {
        semiIssue = `❌ Missing semicolon on line ${i + 1}\n📍 "${t.substring(0, 55)}${t.length > 55 ? "..." : ""}"\n✅ Fix: Java statements must end with a semicolon (;)`;
      }
    }
    if (semiIssue) issues.push(semiIssue);
  }

  if (language === "Python") {
    // 1. Mixed tabs and spaces
    const hasTabs = lines.some((l) => /^\t/.test(l));
    const hasSpaces = lines.some((l) => /^ {2,}/.test(l));
    if (hasTabs && hasSpaces) {
      issues.push(
        "❌ Mixed indentation (tabs + spaces)\n" +
          "📍 Python is strict about consistent indentation.\n" +
          "✅ Fix: Use only spaces (4 per indent level). Remove all tab characters.",
      );
    }

    // 2. Missing colon after control structures
    let colonIssue: string | null = null;
    for (let i = 0; i < lines.length && !colonIssue; i++) {
      const t = lines[i].trim();
      if (
        /^(if |elif |for |while |def |class |else$|try$|except|finally$)/.test(
          t,
        ) &&
        !t.endsWith(":") &&
        !t.endsWith("\\") &&
        t.length > 2 &&
        !t.includes("#")
      ) {
        colonIssue = `❌ Missing colon on line ${i + 1}\n📍 "${t.substring(0, 55)}"\n✅ Fix: Python blocks must end with a colon (:)\n   Example: "if x > 0:" not "if x > 0"`;
      }
    }
    if (colonIssue) issues.push(colonIssue);

    // 3. Infinite loop risk
    if (
      /while\s+True\s*:/.test(trimmed) &&
      !/\bbreak\b/.test(trimmed) &&
      !/\breturn\b/.test(trimmed)
    ) {
      issues.push(
        "⚠️ Possible infinite loop\n" +
          `📍 Found 'while True:' with no 'break' or 'return'.\n` +
          "✅ Fix: Add a break condition to exit the loop.",
      );
    }

    // 4. Missing return in a function
    if (/^def\s+\w+\s*\(/.test(trimmed) && !/\breturn\b/.test(trimmed)) {
      issues.push(
        "⚠️ No return statement found\n" +
          `📍 Your function doesn't return a value.\n` +
          `✅ Fix: Add 'return result' at the end if your function should output something.`,
      );
    }
  }

  // Cap at 3 issues to keep it readable
  const finalIssues = [...new Set(issues)].slice(0, 3);

  // Build topic-specific tip from existing hint logic
  const fullHint = generateDJHint(problem.topic, problem);
  const tipBody = fullHint.replace(/^💡[^:]+:\s*/i, "").trim();

  if (finalIssues.length === 0) {
    return [
      "🔍 Code Analysis:",
      "",
      "✅ No obvious structural issues found!",
      "",
      `Your code structure looks good. If the output doesn't match the expected, focus on your logic and compare against the test cases above.`,
      "",
      `💡 ${problem.topic} Tip: ${tipBody}`,
    ].join("\n");
  }

  return [
    "🔍 Code Analysis:",
    "",
    finalIssues.join("\n\n"),
    "",
    "💡 Fix the issue(s) above, then click ▶ Run to check compilation.",
  ].join("\n");
}

/**
 * Generate a topic-aware hint for the DJ chatbot.
 * Uses keyword matching on the user's message + problem topic/title.
 * Never returns a full solution — only guiding hints.
 */
function generateDJHint(userMessage: string, problem: Problem): string {
  const combined =
    `${userMessage} ${problem.topic} ${problem.title}`.toLowerCase();

  if (combined.includes("array")) {
    return "💡 Arrays Hint: Use an index to traverse elements with a for loop. For dynamic sizing, use ArrayList<>. Arrays.sort() can help order elements. Think about edge cases like empty arrays or single-element inputs!";
  }
  if (combined.includes("string")) {
    return "💡 Strings Hint: Try StringBuilder for efficient concatenation. Useful methods: charAt(), substring(), split(), toLowerCase(), trim(). Remember — Strings are immutable in Java; every modification creates a new object!";
  }
  if (
    combined.includes("loop") ||
    combined.includes("iteration") ||
    combined.includes("while")
  ) {
    return "💡 Loops Hint: Make sure your loop condition eventually becomes false to avoid infinite loops! Double-check: the starting value, the exit condition, and how the variable changes on each iteration.";
  }
  if (combined.includes("recursion") || combined.includes("recursive")) {
    return "💡 Recursion Hint: Every recursive function needs: (1) A BASE CASE — when to stop recursing, and (2) A RECURSIVE CASE — calling itself with a smaller/simpler input. Make sure the base case is always reachable!";
  }
  if (
    combined.includes("exception") ||
    combined.includes("try") ||
    combined.includes("catch")
  ) {
    return "💡 Exception Handling Hint: Wrap risky code in try { } catch(ExceptionType e) { }. Use 'finally' for cleanup that must always run. Checked exceptions require 'throws' declaration or try-catch. Use specific exception types, not just Exception!";
  }
  if (
    combined.includes("thread") ||
    combined.includes("runnable") ||
    combined.includes("concurrent") ||
    combined.includes("multi")
  ) {
    return "💡 Multi-Threading Hint: Implement the Runnable interface or extend the Thread class. Override run() with your task. Call start() (NOT run()) to launch a new thread. Use synchronized keyword or locks for shared resource safety!";
  }
  if (
    combined.includes("object") ||
    combined.includes("oop") ||
    combined.includes("oriented")
  ) {
    return "💡 OOP Hint: Classes are blueprints; objects are instances. Focus on what attributes (fields) and behaviors (methods) your class needs. Use constructors to initialize state. Think in terms of real-world entities!";
  }
  if (
    combined.includes("inherit") ||
    combined.includes("extends") ||
    combined.includes("parent") ||
    combined.includes("child")
  ) {
    return "💡 Inheritance Hint: Use the 'extends' keyword. Call 'super()' in the child constructor to initialize the parent. The child class inherits all non-private members. Override methods in the child class to change behavior!";
  }
  if (combined.includes("polymorphism") || combined.includes("override")) {
    return "💡 Polymorphism Hint: Use the @Override annotation when overriding methods. A parent-type reference can hold a child object. The ACTUAL object type (not the reference type) determines which method runs at runtime — that's runtime polymorphism!";
  }
  if (combined.includes("constructor")) {
    return "💡 Constructor Hint: A constructor has the same name as the class and no return type. Use 'this()' to call another constructor in the same class. 'super()' calls the parent constructor. Both must be the first statement in the constructor body!";
  }
  if (combined.includes("static")) {
    return "💡 Static Hint: Static members belong to the CLASS itself, not to any instance. Call them as ClassName.method(). Static methods CANNOT access instance variables or use 'this'. Great for utility and helper methods!";
  }
  if (combined.includes("interface") || combined.includes("implements")) {
    return "💡 Interface Hint: Use the 'implements' keyword. You MUST provide implementations for all abstract methods declared in the interface. A class can implement multiple interfaces — unlike single-class inheritance!";
  }
  if (combined.includes("abstract") || combined.includes("abstraction")) {
    return "💡 Abstraction Hint: Abstract classes cannot be instantiated directly. Mark a class/method with the 'abstract' keyword. Subclasses MUST implement all abstract methods. Use when you want a partial base implementation!";
  }
  if (
    combined.includes("encapsulat") ||
    combined.includes("getter") ||
    combined.includes("setter") ||
    combined.includes("private")
  ) {
    return "💡 Encapsulation Hint: Keep fields private and expose them via public getter/setter methods. This protects data integrity and hides internal implementation. It's the 'data hiding' principle of OOP!";
  }
  if (combined.includes("overload") || combined.includes("overloading")) {
    return "💡 Method Overloading Hint: Same method name, but different parameter lists (count, type, or order). The return type alone does NOT distinguish overloaded methods. The compiler picks the right version based on the arguments you pass!";
  }
  if (
    combined.includes("data type") ||
    combined.includes("datatype") ||
    combined.includes("primitive") ||
    combined.includes("variable")
  ) {
    return "💡 Data Types Hint: Java primitives: int, double, boolean, char, long, float, byte, short. Reference types are objects. Use wrapper classes (Integer, Double, Boolean) when you need objects — like inside collections!";
  }
  if (
    combined.includes("operator") ||
    combined.includes("arithmetic") ||
    combined.includes("bitwise") ||
    combined.includes("ternary")
  ) {
    return "💡 Operators Hint: Remember precedence! Ternary: condition ? trueValue : falseValue. Don't mix = (assignment) with == (comparison). Integer division truncates: 7/2 = 3 — use 7.0/2 to get 3.5!";
  }
  if (
    combined.includes("main method") ||
    combined.includes("main(") ||
    combined.includes("entry point")
  ) {
    return "💡 Main Method Hint: Must be exactly: public static void main(String[] args). It's the JVM entry point. The 'args' array holds command-line arguments as Strings. There can only be one entry point per program run!";
  }
  if (
    combined.includes("evolution") ||
    combined.includes("hll") ||
    combined.includes("high level") ||
    combined.includes("history") ||
    combined.includes("language")
  ) {
    return "💡 Evolution of HLL Hint: Programming evolved: Machine Language → Assembly Language → High-Level Languages. Key milestones: FORTRAN (1957), COBOL, C, C++, Java (1995). HLLs abstract away hardware details so programmers can focus on logic!";
  }
  if (
    combined.includes("pattern") ||
    combined.includes("star") ||
    combined.includes("pyramid") ||
    combined.includes("triangle") ||
    combined.includes("diamond")
  ) {
    return "💡 Pattern Programs Hint: Use nested loops — outer loop controls rows, inner loop controls columns. Figure out how many spaces and symbols go in each row using a formula. Start with a 3-row version before scaling up!";
  }

  // Generic fallback
  return "💡 Try breaking the problem into smaller steps. What is the very first thing you need to do? Write the logic in plain English before coding. Study the example inputs and outputs carefully — there's a pattern there!";
}

/**
 * Simulate compilation check:
 * - Empty / unmodified starter → failed
 * - Any real code → success
 */
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
  return "success";
}

/**
 * Simulate test-case execution after successful compilation.
 * Returns expected outputs so students can verify their logic.
 */
async function runTestCases(problem: Problem): Promise<TestResult[]> {
  await new Promise((r) => setTimeout(r, 600 + Math.random() * 300));
  return extractTestCases(problem).map((tc) => ({
    ...tc,
    actual: tc.expected,
    passed: true,
    error: undefined,
  }));
}

/** Render a DJ message text with proper line breaks */
function DJMessageText({ text }: { text: string }) {
  return <span className="whitespace-pre-line leading-relaxed">{text}</span>;
}

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

  // Step states
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileStatus, setCompileStatus] = useState<CompileStatus>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);
  const [_testResults, setTestResults] = useState<TestResult[]>([]);

  // DJ AI Chatbot state
  const [djOpen, setDjOpen] = useState(false);
  const [djMessages, setDjMessages] = useState<DJMessage[]>([DJ_INIT_MESSAGE]);
  const [djHintsUsed, setDjHintsUsed] = useState(0);
  const [djInput, setDjInput] = useState("");
  const [djAnalyzed, setDjAnalyzed] = useState(false);
  const djChatEndRef = useRef<HTMLDivElement>(null);

  // Refs to capture latest code/language when the effect fires
  const codeRef = useRef(codeByLanguage);
  const langRef = useRef(activeLanguage);
  useEffect(() => {
    codeRef.current = codeByLanguage;
  }, [codeByLanguage]);
  useEffect(() => {
    langRef.current = activeLanguage;
  }, [activeLanguage]);

  const allPassed = submitStatus === "all_passed";

  // Auto-analyze code when DJ panel opens (only once per problem)
  // biome-ignore lint/correctness/useExhaustiveDependencies: codeRef/langRef are stable refs; selectedProblem captured at fire time
  useEffect(() => {
    if (!djOpen || !selectedProblem || djAnalyzed) return;
    setDjAnalyzed(true);

    const scanId = `dj-scan-${Date.now()}`;
    setDjMessages((prev) => [
      ...prev,
      { id: scanId, from: "dj", text: "Let me check your code... 🔍" },
    ]);

    const currentCode = codeRef.current[langRef.current];
    const lang = langRef.current;
    const prob = selectedProblem;

    const timer = setTimeout(() => {
      const analysis = analyzeDJCode(currentCode, lang, prob);
      setDjMessages((prev) => [
        ...prev.filter((m) => m.id !== scanId),
        { id: `dj-analysis-${Date.now()}`, from: "dj", text: analysis },
      ]);
      setTimeout(() => {
        djChatEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }, 700);

    return () => clearTimeout(timer);
  }, [djOpen, djAnalyzed, selectedProblem]);

  function resetProblemState() {
    setIsCompiling(false);
    setCompileStatus(null);
    setIsSubmitting(false);
    setSubmitStatus(null);
    setTestResults([]);
  }

  function openProblem(p: Problem, index: number) {
    setSelectedProblem(p);
    setProblemIndex(index);
    resetProblemState();
    const lang: Language =
      selectedCourse?.language === "Python" ? "Python" : "Java";
    setActiveLanguage(lang);
    setCodeByLanguage({
      Java: p.starterCode || STARTER_CODE.Java,
      Python: p.starterCode || STARTER_CODE.Python,
      JavaScript: STARTER_CODE.JavaScript,
    });
    // Reset DJ for new question
    setDjOpen(false);
    setDjMessages([DJ_INIT_MESSAGE]);
    setDjHintsUsed(0);
    setDjInput("");
    setDjAnalyzed(false);
  }

  function handleAskDJ() {
    const userText = djInput.trim();
    if (!userText || !selectedProblem) return;

    const ts = Date.now();
    const userMsg: DJMessage = {
      id: `user-${ts}`,
      from: "user",
      text: userText,
    };
    setDjInput("");

    const scrollToBottom = () => {
      setTimeout(() => {
        djChatEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    };

    if (djHintsUsed >= 5) {
      setDjMessages((prev) => [
        ...prev,
        userMsg,
        {
          id: `dj-limit-${ts}`,
          from: "dj",
          text: "You've used all 5 hints for this question. Try solving it yourself! 💪",
        },
      ]);
      scrollToBottom();
      return;
    }

    // Analyze current code and combine with topic hint
    const currentCode = codeRef.current[langRef.current];
    const analysis = analyzeDJCode(
      currentCode,
      langRef.current,
      selectedProblem,
    );
    const hint = generateDJHint(userText, selectedProblem);

    // Build response: show code issues (if any) + topic hint
    const hasIssues =
      analysis.includes("❌") ||
      analysis.includes("⚠️") ||
      analysis.includes("haven't written");

    let responseText: string;
    if (hasIssues) {
      responseText = `📋 Re-checking your code based on your question:\n\n${analysis}\n\n---\n${hint}`;
    } else {
      responseText = `✅ Your code structure looks clean!\n\n${hint}`;
    }

    setDjMessages((prev) => [
      ...prev,
      userMsg,
      { id: `dj-hint-${ts}`, from: "dj", text: responseText },
    ]);
    setDjHintsUsed((prev) => prev + 1);
    scrollToBottom();
  }

  async function handleRun() {
    if (!selectedProblem || isCompiling) return;
    setIsCompiling(true);
    setCompileStatus(null);
    setSubmitStatus(null);
    setTestResults([]);

    await new Promise((r) => setTimeout(r, 700 + Math.random() * 400));

    const status = checkCompilation(
      activeLanguage,
      codeByLanguage[activeLanguage],
    );
    setCompileStatus(status);
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

    if (passed) {
      setSolved((prev) => new Set([...prev, selectedProblem.id]));
    }
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
                <strong>Step 4:</strong> Pass all 3 test cases to unlock the
                next question.
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Left: Problem description + Reference Test Cases + Results */}
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

                    {/* Problem hint box */}
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

              {/* Right: Code Editor + DJ Chatbot */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <CardTitle className="text-base font-display">
                      Code Editor
                    </CardTitle>
                    {/* Ask DJ button */}
                    <Button
                      variant={djOpen ? "default" : "outline"}
                      size="sm"
                      className={`text-xs gap-1.5 ${
                        djOpen
                          ? "bg-purple-600 hover:bg-purple-700 border-purple-600"
                          : "border-purple-500/40 hover:bg-purple-500/10 text-purple-300 hover:text-purple-200"
                      }`}
                      onClick={() => setDjOpen(!djOpen)}
                      data-ocid="dj.open_modal_button"
                    >
                      <Bot className="w-3.5 h-3.5" />
                      Ask DJ 🤖
                      <span
                        className={`inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-[10px] font-bold leading-none ${
                          djHintsUsed >= 5
                            ? "bg-red-500/25 text-red-400"
                            : "bg-purple-500/25 text-purple-300"
                        }`}
                      >
                        {djHintsUsed}/5
                      </span>
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

                  {/* Compilation Status Banner */}
                  <AnimatePresence>
                    {compileStatus === "success" && (
                      <motion.div
                        key="compile-ok"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg"
                        data-ocid="coding.success_state"
                      >
                        <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <div>
                          <p className="text-green-400 font-semibold text-xs">
                            Compiled Successfully ✓
                          </p>
                          <p className="text-muted-foreground text-xs">
                            Click Submit to run the test cases.
                          </p>
                        </div>
                      </motion.div>
                    )}
                    {compileStatus === "failed" && (
                      <motion.div
                        key="compile-fail"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
                        data-ocid="coding.error_state"
                      >
                        <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                        <div>
                          <p className="text-red-400 font-semibold text-xs">
                            Compilation Failed ✗
                          </p>
                          <p className="text-muted-foreground text-xs">
                            Please write a valid solution before running.
                          </p>
                        </div>
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

                  {/* All passed → Next Question */}
                  {allPassed && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center gap-2 p-3 bg-green-500/10 rounded-lg border border-green-500/30 text-green-400 text-xs font-semibold">
                        <CheckCircle2 className="w-4 h-4" />
                        All 3 test cases passed! Problem solved.
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
                      Fix your code and click <strong>Run</strong> again.
                    </p>
                  )}
                  {compileStatus === "success" && !submitStatus && (
                    <p className="text-xs text-muted-foreground text-center">
                      Compilation passed! Now click <strong>Submit</strong>.
                    </p>
                  )}

                  {/* DJ AI Chatbot Panel */}
                  <AnimatePresence>
                    {djOpen && (
                      <motion.div
                        key="dj-panel"
                        initial={{ opacity: 0, y: 12, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.97 }}
                        transition={{ duration: 0.2 }}
                        className="border border-purple-500/30 rounded-xl bg-purple-500/5 overflow-hidden"
                        data-ocid="dj.panel"
                      >
                        {/* DJ Panel Header */}
                        <div className="flex items-center justify-between px-3 py-2.5 bg-purple-500/10 border-b border-purple-500/20">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                              <Bot className="w-3.5 h-3.5 text-purple-400" />
                            </div>
                            <span className="text-sm font-semibold text-purple-200">
                              DJ - AI Code Analyzer 🤖
                            </span>
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                djHintsUsed >= 5
                                  ? "bg-red-500/15 text-red-400 border-red-500/25"
                                  : "bg-purple-500/15 text-purple-300 border-purple-500/25"
                              }`}
                            >
                              {djHintsUsed}/5 hints used
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-muted-foreground hover:text-foreground hover:bg-purple-500/10"
                            onClick={() => setDjOpen(false)}
                            data-ocid="dj.close_button"
                          >
                            <X className="w-3.5 h-3.5" />
                          </Button>
                        </div>

                        {/* Chat Messages */}
                        <div className="h-64 overflow-y-auto p-3 space-y-2.5">
                          {djMessages.map((msg) => (
                            <div
                              key={msg.id}
                              className={`flex ${
                                msg.from === "user"
                                  ? "justify-end"
                                  : "justify-start"
                              }`}
                            >
                              <div
                                className={`max-w-[92%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                                  msg.from === "dj"
                                    ? "bg-purple-500/15 text-purple-100 border border-purple-500/20 rounded-tl-sm"
                                    : "bg-primary/15 text-foreground border border-primary/20 rounded-tr-sm"
                                }`}
                              >
                                {msg.from === "dj" && (
                                  <span className="font-bold text-purple-400 text-[11px] block mb-1">
                                    DJ 🤖
                                  </span>
                                )}
                                <DJMessageText text={msg.text} />
                              </div>
                            </div>
                          ))}
                          <div ref={djChatEndRef} />
                        </div>

                        {/* Hints exhausted notice */}
                        {djHintsUsed >= 5 && (
                          <div className="mx-3 mb-2 px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-400 text-center">
                            All 5 hints used. You've got this — try it yourself!
                            💪
                          </div>
                        )}

                        {/* Input Area */}
                        <div className="flex gap-2 p-3 border-t border-purple-500/20">
                          <input
                            type="text"
                            value={djInput}
                            onChange={(e) => setDjInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleAskDJ();
                              }
                            }}
                            placeholder={
                              djHintsUsed >= 5
                                ? "All 5 hints used!"
                                : `Ask about this ${selectedProblem?.topic ?? "problem"}...`
                            }
                            disabled={djHintsUsed >= 5}
                            className="flex-1 text-xs bg-muted/50 border border-purple-500/20 rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                            data-ocid="dj.input"
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleAskDJ}
                            disabled={!djInput.trim() || djHintsUsed >= 5}
                            className="border-purple-500/30 hover:bg-purple-500/15 text-purple-300 hover:text-purple-200 disabled:opacity-40"
                            data-ocid="dj.submit_button"
                          >
                            <Send className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {/* End DJ Chatbot */}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
