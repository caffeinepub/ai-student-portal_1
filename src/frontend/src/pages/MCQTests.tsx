import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ArrowLeft,
  CheckCircle2,
  ClipboardList,
  Loader2,
  Trophy,
  XCircle,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { MCQQuestion, TestTopic } from "../backend.d";
import {
  useGetAllTestTopics,
  useGetQuestionsByTopic,
  useRecordQuizAttempt,
} from "../hooks/useQueries";

const FALLBACK_TOPICS: TestTopic[] = [
  {
    id: "java",
    title: "Java Basics",
    description: "Core Java concepts: OOP, collections, exception handling",
  },
  {
    id: "python",
    title: "Python Fundamentals",
    description: "Python basics: syntax, data types, functions, modules",
  },
  {
    id: "sql",
    title: "SQL Essentials",
    description: "SQL queries, joins, aggregations, and database design",
  },
];

const FALLBACK_QUESTIONS: Record<string, MCQQuestion[]> = {
  java: [
    {
      id: "j1",
      topic_id: "java",
      question_text: "Which keyword is used to define a class in Java?",
      options: ["class", "define", "struct", "object"],
      correct_option_index: BigInt(0),
    },
    {
      id: "j2",
      topic_id: "java",
      question_text: "What is the default value of an int variable in Java?",
      options: ["null", "undefined", "0", "1"],
      correct_option_index: BigInt(2),
    },
    {
      id: "j3",
      topic_id: "java",
      question_text: "Which of these is NOT a Java primitive type?",
      options: ["int", "String", "boolean", "char"],
      correct_option_index: BigInt(1),
    },
    {
      id: "j4",
      topic_id: "java",
      question_text: "What does JVM stand for?",
      options: [
        "Java Virtual Machine",
        "Java Variable Manager",
        "Java Visual Module",
        "Java Void Method",
      ],
      correct_option_index: BigInt(0),
    },
    {
      id: "j5",
      topic_id: "java",
      question_text: "Which method is the entry point of a Java application?",
      options: ["start()", "run()", "main()", "init()"],
      correct_option_index: BigInt(2),
    },
  ],
  python: [
    {
      id: "p1",
      topic_id: "python",
      question_text: "What symbol is used for comments in Python?",
      options: ["//", "/*", "#", "--"],
      correct_option_index: BigInt(2),
    },
    {
      id: "p2",
      topic_id: "python",
      question_text: "Which data structure uses key-value pairs in Python?",
      options: ["list", "tuple", "set", "dict"],
      correct_option_index: BigInt(3),
    },
    {
      id: "p3",
      topic_id: "python",
      question_text: "What keyword is used to define a function in Python?",
      options: ["function", "def", "func", "define"],
      correct_option_index: BigInt(1),
    },
    {
      id: "p4",
      topic_id: "python",
      question_text: "What is the output of print(type([]))?",
      options: [
        "<class 'array'>",
        "<class 'list'>",
        "<class 'tuple'>",
        "<class 'dict'>",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "p5",
      topic_id: "python",
      question_text: "Which built-in function returns the length of an object?",
      options: ["size()", "count()", "len()", "length()"],
      correct_option_index: BigInt(2),
    },
  ],
  sql: [
    {
      id: "s1",
      topic_id: "sql",
      question_text:
        "Which SQL statement is used to retrieve data from a database?",
      options: ["GET", "FETCH", "SELECT", "PULL"],
      correct_option_index: BigInt(2),
    },
    {
      id: "s2",
      topic_id: "sql",
      question_text: "What does SQL stand for?",
      options: [
        "Structured Query Language",
        "Simple Query Language",
        "Standard Query Logic",
        "System Query List",
      ],
      correct_option_index: BigInt(0),
    },
    {
      id: "s3",
      topic_id: "sql",
      question_text: "Which clause is used to filter rows in a query?",
      options: ["HAVING", "WHERE", "FILTER", "LIMIT"],
      correct_option_index: BigInt(1),
    },
    {
      id: "s4",
      topic_id: "sql",
      question_text: "Which JOIN returns all rows from both tables?",
      options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
      correct_option_index: BigInt(3),
    },
    {
      id: "s5",
      topic_id: "sql",
      question_text: "Which aggregate function counts the number of rows?",
      options: ["SUM()", "AVG()", "COUNT()", "MAX()"],
      correct_option_index: BigInt(2),
    },
  ],
};

type QuizState = "topics" | "quiz" | "results";

export default function MCQTests() {
  const { data: backendTopics = [], isLoading } = useGetAllTestTopics();
  const [selectedTopic, setSelectedTopic] = useState<TestTopic | null>(null);
  const [quizState, setQuizState] = useState<QuizState>("topics");
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [currentSelection, setCurrentSelection] = useState<string>("");
  const { mutate: recordAttempt } = useRecordQuizAttempt();

  const topics = backendTopics.length > 0 ? backendTopics : FALLBACK_TOPICS;

  const { data: backendQuestions = [] } = useGetQuestionsByTopic(
    selectedTopic?.id ?? null,
  );

  const questions: MCQQuestion[] =
    backendQuestions.length > 0
      ? backendQuestions
      : selectedTopic
        ? (FALLBACK_QUESTIONS[selectedTopic.id] ?? FALLBACK_QUESTIONS.java)
        : [];

  const question = questions[currentQ];
  const totalQuestions = questions.length;
  const score = selectedAnswers.reduce((acc, ans, i) => {
    return acc + (ans === Number(questions[i]?.correct_option_index) ? 1 : 0);
  }, 0);

  function startQuiz(topic: TestTopic) {
    setSelectedTopic(topic);
    setQuizState("quiz");
    setCurrentQ(0);
    setSelectedAnswers([]);
    setCurrentSelection("");
  }

  function handleNext() {
    if (!currentSelection) {
      toast.error("Please select an answer first");
      return;
    }
    const updated = [...selectedAnswers, Number.parseInt(currentSelection)];
    setSelectedAnswers(updated);
    setCurrentSelection("");

    if (currentQ + 1 >= totalQuestions) {
      const finalScore = updated.reduce((acc, ans, i) => {
        return (
          acc + (ans === Number(questions[i]?.correct_option_index) ? 1 : 0)
        );
      }, 0);
      setQuizState("results");
      if (selectedTopic) {
        recordAttempt(
          { topicId: selectedTopic.id, score: BigInt(finalScore) },
          {
            onSuccess: () =>
              toast.success(`Quiz completed! +${finalScore * 10} XP earned 🏆`),
          },
        );
      }
    } else {
      setCurrentQ((prev) => prev + 1);
    }
  }

  function resetQuiz() {
    setQuizState("topics");
    setSelectedTopic(null);
    setCurrentQ(0);
    setSelectedAnswers([]);
  }

  const percentage =
    totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

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
                : (selectedTopic?.title ?? "Quiz")}
            </h1>
            <p className="text-muted-foreground text-sm">
              {quizState === "topics"
                ? "Choose a topic to start your quiz"
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
            className="space-y-3"
            data-ocid="mcq.topics.list"
          >
            {isLoading && (
              <div
                className="flex items-center gap-2 text-muted-foreground"
                data-ocid="mcq.loading_state"
              >
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Loading topics...</span>
              </div>
            )}
            {topics.map((topic, i) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
                data-ocid={`mcq.topics.item.${i + 1}`}
              >
                <Card
                  className="card-glow cursor-pointer"
                  onClick={() => startQuiz(topic)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-display">
                        {topic.title}
                      </CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        5 Questions
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {topic.description}
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0">
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
            ))}
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
            <Progress
              value={(currentQ / totalQuestions) * 100}
              className="h-2"
            />

            <Card>
              <CardHeader>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">
                  Question {currentQ + 1}
                </p>
                <CardTitle className="text-lg font-display leading-snug">
                  {question.question_text}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <RadioGroup
                  value={currentSelection}
                  onValueChange={setCurrentSelection}
                  data-ocid="mcq.options.radio"
                >
                  {question.options.map((opt, i) => (
                    <button
                      key={opt}
                      type="button"
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors w-full text-left ${
                        currentSelection === String(i)
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50 hover:bg-muted/50"
                      }`}
                      onClick={() => setCurrentSelection(String(i))}
                    >
                      <RadioGroupItem value={String(i)} id={`opt-${i}`} />
                      <Label
                        htmlFor={`opt-${i}`}
                        className="cursor-pointer flex-1 text-sm"
                      >
                        {opt}
                      </Label>
                    </button>
                  ))}
                </RadioGroup>

                <Button
                  className="w-full mt-2"
                  onClick={handleNext}
                  disabled={!currentSelection}
                  data-ocid="mcq.next.button"
                >
                  {currentQ + 1 >= totalQuestions
                    ? "Submit Quiz"
                    : "Next Question"}
                </Button>
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
                  You scored {percentage}% on {selectedTopic?.title}
                </p>

                <div className="flex items-center justify-center gap-2 text-sm font-semibold text-yellow-400">
                  <Zap className="w-4 h-4" />
                  <span>+{score * 10} XP Earned!</span>
                </div>

                <div className="grid grid-cols-1 gap-2 text-left">
                  {questions.map((q, i) => {
                    const userAns = selectedAnswers[i];
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
                    onClick={() => startQuiz(selectedTopic!)}
                    data-ocid="mcq.retry.button"
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
