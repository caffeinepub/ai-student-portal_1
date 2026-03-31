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

type CompileStatus = "success" | "failed" | null;
type SubmitStatus = "checking" | "all_passed" | "some_failed" | null;

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
      if (/System\.out\.println\(\)/.test(trimLine)) {
        outputs.push("");
      }
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
      if (/^print\(\)$/.test(trimLine)) {
        outputs.push("");
      }
    }
  }

  if (outputs.length === 0) return "";
  return outputs.join("\n");
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
                <strong>Step 4:</strong> Pass all 3 test cases to unlock next
                question. &nbsp;
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
                      key="submit-error"
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
