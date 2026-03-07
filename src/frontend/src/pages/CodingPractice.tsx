import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { COURSES, type Course, type Problem } from "@/data/codingData";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Code2,
  Play,
  Terminal,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export type { Course, Problem };

const DIFF_COLORS = {
  Easy: "bg-green-500/15 text-green-400 border-green-500/30",
  Medium: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  Hard: "bg-red-500/15 text-red-400 border-red-500/30",
};

type Language = "Java" | "Python" | "JavaScript" | "C" | "SQL";

const LANGUAGE_STARTERS: Record<
  Language,
  (title: string, topic: string) => string
> = {
  Java: (title, topic) =>
    `// Java - ${title} (${topic})\npublic class Solution {\n    public static void main(String[] args) {\n        // Write your Java solution here\n    }\n}`,
  Python: (title, topic) =>
    `# Python - ${title} (${topic})\n\ndef solution():\n    # Write your Python solution here\n    pass\n\nsolution()`,
  JavaScript: (title, topic) =>
    `// JavaScript - ${title} (${topic})\n\nfunction solution() {\n    // Write your JavaScript solution here\n}\n\nsolution();`,
  C: (title, topic) =>
    `// C - ${title} (${topic})\n#include <stdio.h>\n\nint main() {\n    // Write your C solution here\n    return 0;\n}`,
  SQL: (title, topic) =>
    `-- SQL - ${title} (${topic})\n-- Write your SQL query here\nSELECT * FROM table_name;`,
};

const LANGUAGE_COLORS: Record<Language, string> = {
  Java: "bg-orange-500/15 text-orange-400 border-orange-500/30 hover:bg-orange-500/25",
  Python:
    "bg-blue-500/15 text-blue-400 border-blue-500/30 hover:bg-blue-500/25",
  JavaScript:
    "bg-yellow-500/15 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/25",
  C: "bg-gray-500/15 text-gray-300 border-gray-500/30 hover:bg-gray-500/25",
  SQL: "bg-green-500/15 text-green-400 border-green-500/30 hover:bg-green-500/25",
};

const LANGUAGE_ACTIVE: Record<Language, string> = {
  Java: "bg-orange-500 text-white border-orange-500",
  Python: "bg-blue-500 text-white border-blue-500",
  JavaScript: "bg-yellow-500 text-black border-yellow-500",
  C: "bg-gray-500 text-white border-gray-500",
  SQL: "bg-green-500 text-white border-green-500",
};

// Language badge styles for problem cards (smaller, non-interactive)
const LANG_BADGE: Record<Language, string> = {
  Java: "bg-orange-500/10 text-orange-400 border-orange-500/25",
  Python: "bg-blue-500/10 text-blue-400 border-blue-500/25",
  JavaScript: "bg-yellow-500/10 text-yellow-500 border-yellow-500/25",
  C: "bg-gray-500/10 text-gray-400 border-gray-500/25",
  SQL: "bg-green-500/10 text-green-400 border-green-500/25",
};

const ALL_LANGUAGES: Language[] = ["Java", "Python", "JavaScript", "C", "SQL"];

export default function CodingPractice() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [language, setLanguage] = useState<Language>("Java");
  const [codeByLang, setCodeByLang] = useState<
    Partial<Record<Language, string>>
  >({});
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [solved, setSolved] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<"All" | "Easy" | "Medium" | "Hard">(
    "All",
  );

  const currentCode = selectedProblem
    ? (codeByLang[language] ??
      LANGUAGE_STARTERS[language](selectedProblem.title, selectedProblem.topic))
    : "";

  function setCode(val: string) {
    if (!selectedProblem) return;
    setCodeByLang((prev) => ({ ...prev, [language]: val }));
  }

  function switchLanguage(lang: Language) {
    setLanguage(lang);
    setOutput("");
  }

  function openProblem(p: Problem) {
    setSelectedProblem(p);
    setCodeByLang({});
    setOutput("");
  }

  function runCode() {
    if (!selectedProblem) return;
    setIsRunning(true);
    setTimeout(() => {
      setOutput(
        `Running ${selectedProblem.title} in ${language}...\n✓ Your solution has been submitted\n✓ Test cases evaluated\n\nLanguage: ${language}\nNote: This is a simulated environment.\nImplement your solution and test your logic! 🚀`,
      );
      setSolved((prev) => new Set([...prev, selectedProblem.id]));
      setIsRunning(false);
    }, 1200);
  }

  const filteredProblems = selectedCourse
    ? filter === "All"
      ? selectedCourse.problems
      : selectedCourse.problems.filter((p) => p.difficulty === filter)
    : [];

  const getStats = (course: Course) => {
    const easy = course.problems.filter((p) => p.difficulty === "Easy").length;
    const medium = course.problems.filter(
      (p) => p.difficulty === "Medium",
    ).length;
    const hard = course.problems.filter((p) => p.difficulty === "Hard").length;
    const solvedCount = course.problems.filter((p) => solved.has(p.id)).length;
    return { easy, medium, hard, solvedCount, total: course.problems.length };
  };

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
              } else {
                setSelectedCourse(null);
                setFilter("All");
              }
            }}
            data-ocid="coding.back.button"
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
                  ? `${filteredProblems.length} problems · Easy / Medium / Hard`
                  : `${COURSES.length} courses · 30 problems each`}
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
            data-ocid="coding.courses.list"
          >
            {COURSES.map((course, i) => {
              const stats = getStats(course);
              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  data-ocid={`coding.course.item.${i + 1}`}
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
                      {/* Language indicators on course card */}
                      <div className="flex flex-wrap gap-1">
                        {ALL_LANGUAGES.map((lang) => (
                          <span
                            key={lang}
                            className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border ${LANG_BADGE[lang]}`}
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCourse(course);
                          setFilter("All");
                        }}
                        data-ocid={`coding.open-course.button.${i + 1}`}
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

        {/* Problem List inside a course */}
        {selectedCourse && !selectedProblem && (
          <motion.div
            key="problems"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="space-y-4"
          >
            {/* Filter */}
            <div className="flex gap-2" data-ocid="coding.filter.tab">
              {(["All", "Easy", "Medium", "Hard"] as const).map((f) => (
                <Button
                  key={f}
                  size="sm"
                  variant={filter === f ? "default" : "outline"}
                  onClick={() => setFilter(f)}
                  data-ocid={`coding.filter-${f.toLowerCase()}.button`}
                >
                  {f}
                </Button>
              ))}
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
              data-ocid="coding.problems.list"
            >
              {filteredProblems.map((prob, i) => (
                <motion.div
                  key={prob.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.03 * i }}
                  data-ocid={`coding.problems.item.${i + 1}`}
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
                          {/* Language indicators */}
                          <div className="flex flex-wrap gap-1 mt-2">
                            {ALL_LANGUAGES.map((lang) => (
                              <span
                                key={lang}
                                className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border ${LANG_BADGE[lang]}`}
                                title={`Solve in ${lang}`}
                              >
                                {lang}
                              </span>
                            ))}
                          </div>
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
                        onClick={() => openProblem(prob)}
                        data-ocid={`coding.solve.button.${i + 1}`}
                      >
                        {solved.has(prob.id) ? "Review" : "Solve"}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Code Editor */}
        {selectedProblem && (
          <motion.div
            key="editor"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-4"
          >
            {/* Problem Description */}
            <Card className="h-fit">
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

            {/* Editor */}
            <div className="space-y-3">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <CardTitle className="text-base font-display">
                      Code Editor
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs font-code">
                      {selectedCourse?.title ?? "Code"}
                    </Badge>
                  </div>
                  {/* Language Tabs */}
                  <div
                    className="flex flex-wrap gap-1.5 pt-2"
                    data-ocid="coding.language.tab"
                  >
                    {(
                      ["Java", "Python", "JavaScript", "C", "SQL"] as Language[]
                    ).map((lang) => (
                      <button
                        type="button"
                        key={lang}
                        onClick={() => switchLanguage(lang)}
                        className={`px-3 py-1 rounded-md text-xs font-semibold border transition-all ${
                          language === lang
                            ? LANGUAGE_ACTIVE[lang]
                            : LANGUAGE_COLORS[lang]
                        }`}
                        data-ocid={`coding.lang-${lang.toLowerCase()}.button`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={currentCode}
                    onChange={(e) => setCode(e.target.value)}
                    className="code-editor min-h-64 resize-y bg-muted/50 border-border font-mono text-sm"
                    spellCheck={false}
                    data-ocid="coding.editor"
                  />
                </CardContent>
              </Card>

              <Button
                className="w-full gap-2"
                onClick={runCode}
                disabled={isRunning}
                data-ocid="coding.run.button"
              >
                {isRunning ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Run Code
                  </>
                )}
              </Button>

              {/* Output */}
              {output && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  data-ocid="coding.output.panel"
                >
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-green-400" />
                        <CardTitle className="text-sm font-display">
                          Output
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <pre className="code-editor text-sm text-green-400 whitespace-pre-wrap bg-muted/50 rounded-lg p-3">
                        {output}
                      </pre>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
