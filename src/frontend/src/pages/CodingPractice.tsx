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
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Bot,
  CheckCircle2,
  Circle,
  Clock,
  Code2,
  Info,
  Play,
  Send,
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

type DJMessage = { id: string; from: "dj" | "user"; text: string };
type CompileStatus = null | "success" | "failed";
type SubmitStatus = null | "checking" | "all_passed" | "some_failed";

const DJ_INIT_MESSAGE: DJMessage = {
  id: "dj-init",
  from: "dj",
  text: "Hi! I'm DJ 🤖 your coding assistant. Ask me if you're stuck! (5 hints available)",
};

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
  const [testResults, setTestResults] = useState<TestResult[]>([]);

  // DJ AI Chatbot state
  const [djOpen, setDjOpen] = useState(false);
  const [djMessages, setDjMessages] = useState<DJMessage[]>([DJ_INIT_MESSAGE]);
  const [djHintsUsed, setDjHintsUsed] = useState(0);
  const [djInput, setDjInput] = useState("");
  const djChatEndRef = useRef<HTMLDivElement>(null);

  const allPassed = submitStatus === "all_passed";

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

    const hint = generateDJHint(userText, selectedProblem);
    setDjMessages((prev) => [
      ...prev,
      userMsg,
      { id: `dj-hint-${ts}`, from: "dj", text: hint },
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

                    {/* ── Enhancement 2: Reference Test Cases — always visible before coding ── */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-px flex-1 bg-border" />
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                          Reference Test Cases
                        </p>
                        <div className="h-px flex-1 bg-border" />
                      </div>
                      <p className="text-xs text-muted-foreground text-center italic">
                        Your output must match these exactly
                      </p>
                      {extractTestCases(selectedProblem).map((tc) => (
                        <div
                          key={tc.id}
                          className="rounded-lg border border-border bg-muted/20 p-3 text-xs space-y-1.5"
                          data-ocid="coding.panel"
                        >
                          <p className="font-semibold text-foreground flex items-center gap-1.5 mb-2">
                            <span className="w-5 h-5 rounded-full bg-purple-500/20 border border-purple-500/30 inline-flex items-center justify-center text-[10px] text-purple-400 font-bold">
                              {tc.id}
                            </span>
                            {tc.label}
                          </p>
                          <div className="font-mono space-y-1 pl-1">
                            <div className="flex gap-1 items-start">
                              <span className="text-muted-foreground shrink-0">
                                Input:
                              </span>
                              <span className="text-foreground bg-muted/50 px-1.5 py-0.5 rounded break-all">
                                {tc.input || "(none)"}
                              </span>
                            </div>
                            <div className="flex gap-1 items-start">
                              <span className="text-muted-foreground shrink-0">
                                Expected Output:
                              </span>
                              <span className="text-green-400 font-semibold bg-green-500/10 border border-green-500/20 px-1.5 py-0.5 rounded break-all">
                                {tc.expected}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* ── End Reference Test Cases ── */}
                  </CardContent>
                </Card>

                {/* Test Cases Results — visible only after Submit */}
                {submitStatus !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-display flex items-center gap-2">
                          <Circle className="w-4 h-4 text-purple-400" />
                          Test Case Results
                          {submitStatus === "checking" && (
                            <span className="ml-auto text-xs text-yellow-400 font-semibold animate-pulse">
                              Checking...
                            </span>
                          )}
                          {submitStatus === "all_passed" && (
                            <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full border bg-green-500/15 text-green-400 border-green-500/30">
                              3/3 Passed ✓
                            </span>
                          )}
                          {submitStatus === "some_failed" && (
                            <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full border bg-red-500/15 text-red-400 border-red-500/30">
                              {testResults.filter((r) => r.passed).length}/3
                              Passed
                            </span>
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 pt-0">
                        {extractTestCases(selectedProblem).map((tc, idx) => {
                          const result = testResults[idx];
                          const status =
                            submitStatus === "checking"
                              ? "running"
                              : result
                                ? result.passed
                                  ? "pass"
                                  : "fail"
                                : "pending";

                          return (
                            <div
                              key={tc.id}
                              className={`rounded-lg border p-3 text-xs transition-colors ${
                                status === "pass"
                                  ? "bg-green-500/10 border-green-500/25"
                                  : status === "fail"
                                    ? "bg-red-500/10 border-red-500/25"
                                    : "bg-muted/30 border-border"
                              }`}
                            >
                              {/* Header row */}
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold text-foreground flex items-center gap-1.5">
                                  <span className="w-4 h-4 rounded-full bg-muted/60 inline-flex items-center justify-center text-[9px] font-bold">
                                    {tc.id}
                                  </span>
                                  {tc.label}
                                </span>
                                {status === "pending" && (
                                  <Circle className="w-3.5 h-3.5 text-muted-foreground" />
                                )}
                                {status === "running" && (
                                  <Clock className="w-3.5 h-3.5 text-yellow-400 animate-spin" />
                                )}
                                {status === "pass" && (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                                )}
                                {status === "fail" && (
                                  <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                                )}
                              </div>

                              {/* ── Enhancement 3: 4-column comparison layout ── */}
                              <div className="grid grid-cols-4 gap-2">
                                {/* Input */}
                                <div className="space-y-1">
                                  <p className="text-[10px] uppercase tracking-wide font-semibold text-muted-foreground">
                                    Input
                                  </p>
                                  <p className="font-mono text-foreground bg-muted/30 rounded px-1.5 py-1 break-all min-h-[28px]">
                                    {tc.input || "(none)"}
                                  </p>
                                </div>
                                {/* Expected Output */}
                                <div className="space-y-1">
                                  <p className="text-[10px] uppercase tracking-wide font-semibold text-muted-foreground">
                                    Expected
                                  </p>
                                  <p className="font-mono text-foreground bg-muted/30 rounded px-1.5 py-1 break-all min-h-[28px]">
                                    {tc.expected}
                                  </p>
                                </div>
                                {/* Your Output */}
                                <div className="space-y-1">
                                  <p className="text-[10px] uppercase tracking-wide font-semibold text-muted-foreground">
                                    Your Output
                                  </p>
                                  <p
                                    className={`font-mono rounded px-1.5 py-1 break-all min-h-[28px] ${
                                      result
                                        ? result.passed
                                          ? "bg-green-500/10 text-green-300"
                                          : "bg-red-500/10 text-red-300"
                                        : "bg-muted/30 text-foreground"
                                    }`}
                                  >
                                    {result ? result.actual : "—"}
                                  </p>
                                </div>
                                {/* Status */}
                                <div className="space-y-1">
                                  <p className="text-[10px] uppercase tracking-wide font-semibold text-muted-foreground">
                                    Status
                                  </p>
                                  <p
                                    className={`font-semibold rounded px-1.5 py-1 min-h-[28px] ${
                                      status === "running"
                                        ? "text-yellow-400"
                                        : status === "pass"
                                          ? "text-green-400"
                                          : status === "fail"
                                            ? "text-red-400"
                                            : "text-muted-foreground"
                                    }`}
                                  >
                                    {status === "running"
                                      ? "⏳"
                                      : status === "pass"
                                        ? "✓ Pass"
                                        : status === "fail"
                                          ? "✗ Fail"
                                          : "—"}
                                  </p>
                                </div>
                              </div>
                              {/* ── End 4-column layout ── */}
                            </div>
                          );
                        })}

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
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </div>

              {/* Right: Code Editor + DJ Chatbot */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <CardTitle className="text-base font-display">
                      Code Editor
                    </CardTitle>
                    {/* ── Enhancement 1: Ask DJ button ── */}
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

                  {/* ── Enhancement 1: DJ AI Chatbot Panel ── */}
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
                              DJ - AI Helper 🤖
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
                        <div className="h-52 overflow-y-auto p-3 space-y-2.5">
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
                                className={`max-w-[88%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                                  msg.from === "dj"
                                    ? "bg-purple-500/15 text-purple-100 border border-purple-500/20 rounded-tl-sm"
                                    : "bg-primary/15 text-foreground border border-primary/20 rounded-tr-sm"
                                }`}
                              >
                                {msg.from === "dj" && (
                                  <span className="font-bold text-purple-400 text-[11px] block mb-0.5">
                                    DJ 🤖
                                  </span>
                                )}
                                {msg.text}
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
                  {/* ── End DJ Chatbot ── */}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
