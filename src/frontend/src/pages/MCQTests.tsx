import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ClipboardList,
  Loader2,
  RefreshCw,
  Trophy,
  XCircle,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { MCQQuestion } from "../backend.d";
import { advjavaMCQ } from "../data/advjavaMCQ";
import { cMCQ } from "../data/cMCQ";
import { dsaMCQ } from "../data/dsaMCQ";
import { frontendMCQ } from "../data/frontendMCQ";
import { javaMCQ1 } from "../data/javaMCQ1";
import { javaMCQ2 } from "../data/javaMCQ2";
import { javaMCQ3 } from "../data/javaMCQ3";
import { pythonMCQ } from "../data/pythonMCQ";
import { sqlMCQ } from "../data/sqlMCQ";
import { useGetAllTestTopics, useRecordQuizAttempt } from "../hooks/useQueries";

// ─── Static question bank ─────────────────────────────────────────────────────

const STATIC_TOPICS = [
  {
    id: "java",
    title: "Java",
    emoji: "☕",
    desc: "Core Java: OOP, JVM, Collections, Exception Handling",
  },
  {
    id: "python",
    title: "Python",
    emoji: "🐍",
    desc: "Python: Syntax, Data Types, Functions, Modules",
  },
  {
    id: "c",
    title: "C Programming",
    emoji: "⚙️",
    desc: "Pointers, Memory, Strings, Arrays in C",
  },
  {
    id: "dsa",
    title: "DSA",
    emoji: "🌲",
    desc: "Data Structures & Algorithms",
  },
  {
    id: "frontend",
    title: "Frontend Technologies",
    emoji: "🌐",
    desc: "HTML, CSS, JavaScript, React",
  },
  {
    id: "sql",
    title: "SQL",
    emoji: "🗄️",
    desc: "SQL queries, joins, aggregations, transactions",
  },
  {
    id: "advjava",
    title: "Advanced Java",
    emoji: "🚀",
    desc: "Streams, Lambdas, Concurrency, Design Patterns",
  },
];

interface StaticQuestion {
  id: string;
  topic_id: string;
  difficulty: "Easy" | "Medium" | "Hard";
  question_text: string;
  options: string[];
  correct_option_index: bigint;
}

const Q: Record<string, StaticQuestion[]> = {
  java: [...javaMCQ1, ...javaMCQ2, ...javaMCQ3],
  python: [...pythonMCQ],
  c: [...cMCQ],
  dsa: [...dsaMCQ],
  frontend: [...frontendMCQ],
  sql: [...sqlMCQ],
  advjava: [...advjavaMCQ],
};

type DifficultyFilter = "All" | "Easy" | "Medium" | "Hard";
type QuizState = "topics" | "quiz" | "results";
// feedback state per question: null = not submitted, "correct", "wrong-retry" (retry mode), "wrong-done" (moved on)
type FeedbackState = null | "correct" | "wrong";

export default function MCQTests() {
  const { isLoading } = useGetAllTestTopics();
  const [selectedStaticTopic, setSelectedStaticTopic] = useState<
    (typeof STATIC_TOPICS)[0] | null
  >(null);
  const [diffFilter, setDiffFilter] = useState<DifficultyFilter>("All");
  const [quizState, setQuizState] = useState<QuizState>("topics");
  const [currentQ, setCurrentQ] = useState(0);
  // store final recorded answer per question index
  const [recordedAnswers, setRecordedAnswers] = useState<(number | null)[]>([]);
  const [currentSelection, setCurrentSelection] = useState<string>("");
  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const { mutate: recordAttempt } = useRecordQuizAttempt();

  const activeStaticQuestions: StaticQuestion[] = selectedStaticTopic
    ? (Q[selectedStaticTopic.id] ?? []).filter(
        (q) => diffFilter === "All" || q.difficulty === diffFilter,
      )
    : [];

  const questions: MCQQuestion[] = activeStaticQuestions.map((q) => ({
    id: q.id,
    topic_id: q.topic_id,
    question_text: q.question_text,
    options: q.options,
    correct_option_index: q.correct_option_index,
  }));

  const question = questions[currentQ];
  const totalQuestions = questions.length;

  const computeScore = (answers: (number | null)[]) =>
    answers.reduce<number>((acc, ans, i) => {
      return acc + (ans === Number(questions[i]?.correct_option_index) ? 1 : 0);
    }, 0);

  function startQuiz(topic: (typeof STATIC_TOPICS)[0]) {
    setSelectedStaticTopic(topic);
    setQuizState("quiz");
    setCurrentQ(0);
    setRecordedAnswers([]);
    setCurrentSelection("");
    setFeedback(null);
  }

  function handleSubmit() {
    if (!currentSelection) {
      toast.error("Please select an answer first");
      return;
    }
    const selected = Number.parseInt(currentSelection);
    const isCorrect = selected === Number(question?.correct_option_index);
    setFeedback(isCorrect ? "correct" : "wrong");
    // record the answer (overwrite if navigated back)
    const updated = [...recordedAnswers];
    updated[currentQ] = selected;
    setRecordedAnswers(updated);
  }

  function handleRetry() {
    // Clear selection and feedback so student can try again
    setCurrentSelection("");
    setFeedback(null);
    // remove the recorded wrong answer for this question
    const updated = [...recordedAnswers];
    updated[currentQ] = null;
    setRecordedAnswers(updated);
  }

  function handleNext() {
    // Must have a correct answer before advancing
    if (feedback !== "correct") {
      toast.error("Answer correctly before moving to the next question");
      return;
    }
    if (currentQ + 1 >= totalQuestions) {
      // finish quiz
      const finalScore = computeScore(recordedAnswers);
      setQuizState("results");
      recordAttempt(
        {
          topicId: selectedStaticTopic?.id ?? "java",
          score: BigInt(finalScore),
        },
        {
          onSuccess: () =>
            toast.success(`Quiz done! +${finalScore * 10} XP 🏆`),
        },
      );
    } else {
      const nextQ = currentQ + 1;
      setCurrentQ(nextQ);
      // restore previous selection if navigated back before
      const prev = recordedAnswers[nextQ];
      setCurrentSelection(
        prev !== undefined && prev !== null ? String(prev) : "",
      );
      setFeedback(
        prev !== undefined && prev !== null
          ? prev === Number(questions[nextQ]?.correct_option_index)
            ? "correct"
            : null
          : null,
      );
    }
  }

  function handlePrevious() {
    if (currentQ === 0) return;
    const prevQ = currentQ - 1;
    setCurrentQ(prevQ);
    const prev = recordedAnswers[prevQ];
    setCurrentSelection(
      prev !== undefined && prev !== null ? String(prev) : "",
    );
    setFeedback(
      prev !== undefined && prev !== null
        ? prev === Number(questions[prevQ]?.correct_option_index)
          ? "correct"
          : null
        : null,
    );
  }

  function resetQuiz() {
    setQuizState("topics");
    setSelectedStaticTopic(null);
    setDiffFilter("All");
    setCurrentQ(0);
    setRecordedAnswers([]);
    setFeedback(null);
  }

  const score = computeScore(recordedAnswers);
  const percentage =
    totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  const getTopicStats = (id: string) => {
    const all = Q[id] ?? [];
    return {
      easy: all.filter((q) => q.difficulty === "Easy").length,
      medium: all.filter((q) => q.difficulty === "Medium").length,
      hard: all.filter((q) => q.difficulty === "Hard").length,
      total: all.length,
    };
  };

  const isLastQuestion = currentQ + 1 >= totalQuestions;

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        {quizState !== "topics" && (
          <Button
            variant="ghost"
            size="icon"
            onClick={resetQuiz}
            data-ocid="mcq.back.button"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        )}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-green-500/15 flex items-center justify-center">
            <ClipboardList className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
              {quizState === "topics"
                ? "MCQ Tests"
                : selectedStaticTopic
                  ? `${selectedStaticTopic.emoji} ${selectedStaticTopic.title}`
                  : "Quiz"}
            </h1>
            <p className="text-muted-foreground text-sm">
              {quizState === "topics"
                ? "Choose a course and difficulty to start"
                : `Question ${Math.min(currentQ + 1, totalQuestions)} of ${totalQuestions}`}
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Topic Selection */}
        {quizState === "topics" && (
          <motion.div
            key="topics"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="space-y-4"
            data-ocid="mcq.topics.list"
          >
            <div
              className="flex gap-2 flex-wrap"
              data-ocid="mcq.difficulty.tab"
            >
              {(["All", "Easy", "Medium", "Hard"] as const).map((d) => (
                <Button
                  key={d}
                  size="sm"
                  variant={diffFilter === d ? "default" : "outline"}
                  onClick={() => setDiffFilter(d)}
                  data-ocid={`mcq.diff-${d.toLowerCase()}.button`}
                >
                  {d}
                  {d !== "All" && selectedStaticTopic && (
                    <span className="ml-1 text-xs opacity-70">
                      (
                      {
                        (Q[selectedStaticTopic.id] ?? []).filter(
                          (q) => q.difficulty === d,
                        ).length
                      }
                      )
                    </span>
                  )}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {STATIC_TOPICS.map((topic, i) => {
                const stats = getTopicStats(topic.id);
                const filtered =
                  diffFilter === "All"
                    ? stats.total
                    : (Q[topic.id] ?? []).filter(
                        (q) => q.difficulty === diffFilter,
                      ).length;
                return (
                  <motion.div
                    key={topic.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                    data-ocid={`mcq.topics.item.${i + 1}`}
                  >
                    <Card
                      className="card-glow cursor-pointer hover:border-primary/50 transition-colors"
                      onClick={() => startQuiz(topic)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{topic.emoji}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <CardTitle className="text-sm font-display truncate">
                                {topic.title}
                              </CardTitle>
                              <Badge
                                variant="secondary"
                                className="text-xs flex-shrink-0"
                              >
                                {filtered} Q
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                              {topic.desc}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0 space-y-2">
                        <div className="flex gap-1.5 text-xs">
                          <span className="px-1.5 py-0.5 rounded bg-green-500/15 text-green-400 border border-green-500/20">
                            E {stats.easy}
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-yellow-500/15 text-yellow-400 border border-yellow-500/20">
                            M {stats.medium}
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-red-500/15 text-red-400 border border-red-500/20">
                            H {stats.hard}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          className="w-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            startQuiz(topic);
                          }}
                          data-ocid={`mcq.start.button.${i + 1}`}
                        >
                          Start Quiz
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {isLoading && (
              <div
                className="flex items-center gap-2 text-muted-foreground"
                data-ocid="mcq.loading_state"
              >
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Syncing topics...</span>
              </div>
            )}
          </motion.div>
        )}

        {/* Quiz */}
        {quizState === "quiz" && question && (
          <motion.div
            key={`quiz-${currentQ}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
            data-ocid="mcq.quiz.panel"
          >
            {/* Progress */}
            <div className="flex items-center justify-between gap-3">
              <Progress
                value={(currentQ / totalQuestions) * 100}
                className="h-2 flex-1"
              />
              {activeStaticQuestions[currentQ]?.difficulty && (
                <span
                  className={`text-xs px-2 py-0.5 rounded font-semibold border flex-shrink-0 ${
                    activeStaticQuestions[currentQ].difficulty === "Easy"
                      ? "bg-green-500/15 text-green-400 border-green-500/30"
                      : activeStaticQuestions[currentQ].difficulty === "Medium"
                        ? "bg-yellow-500/15 text-yellow-400 border-yellow-500/30"
                        : "bg-red-500/15 text-red-400 border-red-500/30"
                  }`}
                >
                  {activeStaticQuestions[currentQ].difficulty}
                </span>
              )}
            </div>

            <Card>
              <CardHeader>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">
                  Question {currentQ + 1} of {totalQuestions}
                </p>
                <CardTitle className="text-lg font-display leading-snug">
                  {question.question_text}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Options */}
                <RadioGroup
                  value={currentSelection}
                  onValueChange={() => {}}
                  data-ocid="mcq.options.radio"
                >
                  {question.options.map((opt, i) => {
                    const isCorrectOption =
                      i === Number(question.correct_option_index);
                    const isSelectedOption = currentSelection === String(i);
                    let optClass =
                      "border-border hover:border-primary/50 hover:bg-muted/50 cursor-pointer";
                    if (feedback === "correct" && isSelectedOption) {
                      optClass =
                        "border-green-500 bg-green-500/15 cursor-default";
                    } else if (feedback === "wrong") {
                      if (isCorrectOption) {
                        optClass =
                          "border-green-500 bg-green-500/10 cursor-default";
                      } else if (isSelectedOption) {
                        optClass =
                          "border-red-500 bg-red-500/15 cursor-default";
                      } else {
                        optClass = "border-border opacity-50 cursor-default";
                      }
                    } else if (isSelectedOption) {
                      optClass = "border-primary bg-primary/10 cursor-pointer";
                    }
                    return (
                      <button
                        key={`${question.id}-${i}`}
                        type="button"
                        className={`flex items-center gap-3 p-3 rounded-lg border transition-colors w-full text-left ${optClass}`}
                        onClick={() => {
                          if (feedback !== null) return;
                          setCurrentSelection(String(i));
                        }}
                        disabled={feedback !== null}
                      >
                        <RadioGroupItem value={String(i)} id={`opt-${i}`} />
                        <Label
                          htmlFor={`opt-${i}`}
                          className="cursor-pointer flex-1 text-sm"
                        >
                          {opt}
                        </Label>
                        {feedback === "correct" && isSelectedOption && (
                          <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                        )}
                        {feedback === "wrong" && isCorrectOption && (
                          <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                        )}
                        {feedback === "wrong" &&
                          isSelectedOption &&
                          !isCorrectOption && (
                            <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                          )}
                      </button>
                    );
                  })}
                </RadioGroup>

                {/* Feedback Banner */}
                {feedback === "correct" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 rounded-lg bg-green-500/15 border border-green-500/30 text-green-400 font-semibold text-sm"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Correct! Well done! ✓</span>
                  </motion.div>
                )}
                {feedback === "wrong" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400 font-semibold text-sm"
                  >
                    <XCircle className="w-5 h-5" />
                    <span>
                      Incorrect! The correct answer is highlighted in green.
                    </span>
                  </motion.div>
                )}

                {/* Action Buttons */}
                <div
                  className="flex items-center gap-2 pt-1"
                  data-ocid="mcq.action.buttons"
                >
                  {/* Previous */}
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentQ === 0}
                    className="flex items-center gap-1.5"
                    data-ocid="mcq.previous.button"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>

                  <div className="flex-1" />

                  {/* Retry (only on wrong) */}
                  {feedback === "wrong" && (
                    <Button
                      variant="outline"
                      onClick={handleRetry}
                      className="flex items-center gap-1.5 border-red-500/40 text-red-400 hover:bg-red-500/10"
                      data-ocid="mcq.retry.button"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Retry
                    </Button>
                  )}

                  {/* Submit (before feedback) */}
                  {feedback === null && (
                    <Button
                      onClick={handleSubmit}
                      disabled={!currentSelection}
                      className="flex items-center gap-1.5 px-5"
                      data-ocid="mcq.submit.button"
                    >
                      Submit
                    </Button>
                  )}

                  {/* OK / Next (on correct) */}
                  {feedback === "correct" && (
                    <Button
                      onClick={handleNext}
                      className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white px-5"
                      data-ocid="mcq.next.button"
                    >
                      {isLastQuestion ? (
                        <>
                          <Trophy className="w-4 h-4" />
                          Finish Quiz
                        </>
                      ) : (
                        <>
                          OK &amp; Next
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Results */}
        {quizState === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            data-ocid="mcq.results.panel"
          >
            <Card className="text-center">
              <CardHeader className="pb-4">
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{
                    background:
                      percentage >= 60
                        ? "oklch(0.65 0.2 145 / 0.15)"
                        : "oklch(0.65 0.22 25 / 0.15)",
                  }}
                >
                  {percentage >= 60 ? (
                    <Trophy className="w-8 h-8 text-green-400" />
                  ) : (
                    <XCircle className="w-8 h-8 text-red-400" />
                  )}
                </div>
                <CardTitle className="font-display text-2xl">
                  {percentage >= 80
                    ? "Excellent! 🎉"
                    : percentage >= 60
                      ? "Good Job! 👍"
                      : "Keep Practicing 💪"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="inline-flex items-baseline gap-2">
                  <span className="font-display text-5xl font-bold text-primary">
                    {score}
                  </span>
                  <span className="text-xl text-muted-foreground">
                    / {totalQuestions}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">
                  You scored {percentage}% on {selectedStaticTopic?.title} (
                  {diffFilter} level)
                </p>
                <div className="flex items-center justify-center gap-2 text-sm font-semibold text-yellow-400">
                  <Zap className="w-4 h-4" />
                  <span>+{score * 10} XP Earned!</span>
                </div>

                <div className="grid grid-cols-1 gap-2 text-left max-h-64 overflow-y-auto">
                  {questions.map((q, i) => {
                    const userAns = recordedAnswers[i];
                    const correct = Number(q.correct_option_index);
                    const isCorrect = userAns === correct;
                    return (
                      <div
                        key={q.id}
                        className={`flex items-start gap-2 p-2.5 rounded-lg text-xs ${
                          isCorrect
                            ? "bg-green-500/10 border border-green-500/20"
                            : "bg-red-500/10 border border-red-500/20"
                        }`}
                      >
                        {isCorrect ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" />
                        )}
                        <div>
                          <p className="font-medium text-foreground">
                            {q.question_text}
                          </p>
                          {!isCorrect && (
                            <p className="text-muted-foreground mt-0.5">
                              Correct:{" "}
                              <span className="text-green-400">
                                {q.options[correct]}
                              </span>
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() =>
                      selectedStaticTopic && startQuiz(selectedStaticTopic)
                    }
                    data-ocid="mcq.retry-quiz.button"
                  >
                    Retry Quiz
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={resetQuiz}
                    data-ocid="mcq.back-topics.button"
                  >
                    Back to Topics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
