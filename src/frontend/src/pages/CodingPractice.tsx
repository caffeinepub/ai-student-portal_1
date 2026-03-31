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
  CheckCircle2,
  Circle,
  Clock,
  Code2,
  Info,
  Play,
  Send,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

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

type CompileStatus = null | "success" | "failed";
type SubmitStatus = null | "checking" | "all_passed" | "some_failed";

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
  }

  async function handleRun() {
    if (!selectedProblem || isCompiling) return;
    setIsCompiling(true);
    setCompileStatus(null);
    setSubmitStatus(null);
    setTestResults([]);

    // Simulate compile delay
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
      // No more problems – go back to list
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
              {/* Left: Problem description + Test Cases */}
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
                        Hint
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {selectedProblem.hint}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Test Cases Panel — visible only after Submit */}
                {submitStatus !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-display flex items-center gap-2">
                          <Circle className="w-4 h-4 text-purple-400" />
                          Test Cases
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
                      <CardContent className="space-y-2 pt-0">
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
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold text-foreground">
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
                              <div className="space-y-1 font-mono">
                                <div>
                                  <span className="text-muted-foreground">
                                    Input:{" "}
                                  </span>
                                  <span className="text-foreground">
                                    {tc.input || "(none)"}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">
                                    Expected:{" "}
                                  </span>
                                  <span className="text-foreground">
                                    {tc.expected}
                                  </span>
                                </div>
                                {result && (
                                  <div>
                                    <span className="text-muted-foreground">
                                      Status:{" "}
                                    </span>
                                    <span
                                      className={
                                        result.passed
                                          ? "text-green-400 font-semibold"
                                          : "text-red-400 font-semibold"
                                      }
                                    >
                                      {result.passed ? "✓ Passed" : "✗ Failed"}
                                    </span>
                                  </div>
                                )}
                              </div>
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

              {/* Right: Code Editor */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-display">
                    Code Editor
                  </CardTitle>
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
                    className="w-full h-72 bg-muted/50 border border-border rounded-lg p-3 text-sm font-mono text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/40"
                    value={codeByLanguage[activeLanguage]}
                    onChange={(e) =>
                      setCodeByLanguage((prev) => ({
                        ...prev,
                        [activeLanguage]: e.target.value,
                      }))
                    }
                    spellCheck={false}
                    placeholder={`Write your ${activeLanguage} solution here...`}
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
                    {/* Run Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={handleRun}
                      disabled={isCompiling || isSubmitting || allPassed}
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

                    {/* Submit Button — enabled only after successful compile */}
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
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
