import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { COURSES, type Course, type Problem } from "@/data/codingData";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Code2,
  Play,
  Send,
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

const LANG_TAB_STYLES: Record<
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
  C: {
    active: "bg-gray-500 text-white border-gray-500",
    inactive: "text-gray-400 border-gray-500/30 hover:border-gray-500/60",
    badge: "bg-gray-500/10 text-gray-400 border-gray-500/25",
  },
  SQL: {
    active: "bg-green-500 text-white border-green-500",
    inactive: "text-green-400 border-green-500/30 hover:border-green-500/60",
    badge: "bg-green-500/10 text-green-400 border-green-500/25",
  },
};

const ALL_LANGUAGES: Language[] = ["Java", "Python", "JavaScript", "C", "SQL"];

const STARTER_CODE: Record<Language, string> = {
  Java: `public class Solution {
    public static void main(String[] args) {
        // Write your solution here
        
    }
}`,
  Python: `def solution():
    # Write your solution here
    pass

if __name__ == "__main__":
    solution()`,
  JavaScript: `function solution() {
    // Write your solution here
    
}

console.log(solution());`,
  C: `#include <stdio.h>

int main() {
    // Write your solution here
    
    return 0;
}`,
  SQL: `-- Write your SQL query here
SELECT * FROM table_name
WHERE condition;`,
};

export default function CodingPractice() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [solved, setSolved] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<"All" | "Easy" | "Medium" | "Hard">(
    "All",
  );
  const [activeLanguage, setActiveLanguage] = useState<Language>("Java");
  const [codeByLanguage, setCodeByLanguage] = useState<
    Record<Language, string>
  >({ ...STARTER_CODE });
  const [output, setOutput] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function openProblem(p: Problem) {
    setSelectedProblem(p);
    setOutput(null);
    setSubmitted(false);
    // Pre-fill starter code from problem if available
    setCodeByLanguage((prev) => ({
      ...prev,
      Java: p.starterCode || STARTER_CODE.Java,
    }));
  }

  function markSolved(p: Problem) {
    setSolved((prev) => new Set([...prev, p.id]));
  }

  function handleRun() {
    setOutput(
      `Running ${activeLanguage} code...\n\n// Output will appear here\n// (This is a practice environment - review your logic against the example output)`,
    );
  }

  function handleSubmit() {
    setSubmitted(true);
    setOutput(
      `✅ Code submitted in ${activeLanguage}!\n\nReview the expected output above and compare with your solution.`,
    );
    if (selectedProblem) markSolved(selectedProblem);
  }

  function handleCodeChange(val: string) {
    setCodeByLanguage((prev) => ({ ...prev, [activeLanguage]: val }));
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
                setOutput(null);
                setSubmitted(false);
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
                  : `${COURSES.length} courses · Practice problems`}
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
                      {/* Language indicators */}
                      <div className="flex flex-wrap gap-1">
                        {ALL_LANGUAGES.map((lang) => (
                          <span
                            key={lang}
                            className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border ${LANG_TAB_STYLES[lang].badge}`}
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
                                className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border ${LANG_TAB_STYLES[lang].badge}`}
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
                        {solved.has(prob.id) ? "Review" : "Solve Problem"}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Problem Solver with Code Editor */}
        {selectedProblem && (
          <motion.div
            key="problem-detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Left: Problem description */}
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
                  {solved.has(selectedProblem.id) && (
                    <div className="flex items-center gap-2 text-green-400 text-sm font-medium justify-center py-2 bg-green-500/10 rounded-lg border border-green-500/20">
                      <CheckCircle2 className="w-4 h-4" />
                      Problem Solved!
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Right: Code Editor */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-display">
                      Code Editor
                    </CardTitle>
                  </div>
                  {/* Language Tabs */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {ALL_LANGUAGES.map((lang) => (
                      <button
                        type="button"
                        key={lang}
                        onClick={() => setActiveLanguage(lang)}
                        className={`px-3 py-1 rounded text-xs font-semibold border transition-colors ${
                          activeLanguage === lang
                            ? LANG_TAB_STYLES[lang].active
                            : `bg-transparent ${LANG_TAB_STYLES[lang].inactive}`
                        }`}
                        data-ocid={`coding.lang-tab.${lang.toLowerCase()}`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  <textarea
                    className="w-full h-64 bg-muted/50 border border-border rounded-lg p-3 text-sm font-mono text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/40"
                    value={codeByLanguage[activeLanguage]}
                    onChange={(e) => handleCodeChange(e.target.value)}
                    spellCheck={false}
                    placeholder={`Write your ${activeLanguage} solution here...`}
                    data-ocid="coding.editor.textarea"
                  />

                  {/* Output */}
                  {output && (
                    <div className="bg-muted/40 border border-border rounded-lg p-3">
                      <p className="text-xs font-semibold text-muted-foreground mb-1">
                        Output
                      </p>
                      <pre className="text-xs text-foreground font-mono whitespace-pre-wrap">
                        {output}
                      </pre>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={handleRun}
                      data-ocid="coding.run.button"
                    >
                      <Play className="w-3.5 h-3.5 mr-1.5" />
                      Run
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={handleSubmit}
                      disabled={submitted}
                      data-ocid="coding.submit.button"
                    >
                      <Send className="w-3.5 h-3.5 mr-1.5" />
                      {submitted ? "Submitted ✓" : "Submit"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
