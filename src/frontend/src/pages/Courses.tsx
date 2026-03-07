import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Loader2,
  Play,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { DifficultyLevel } from "../backend.d";
import type { Course } from "../backend.d";
import {
  useGetAllCourses,
  useRecordCourseCompletion,
} from "../hooks/useQueries";

const FALLBACK_COURSES: Course[] = [
  {
    id: "1",
    title: "Java Programming",
    description:
      "Complete Java Programming Course — learn OOP, collections, and more with hands-on projects.",
    category: "Programming",
    youtube_url: "https://youtu.be/vBaA0aYe1jw?si=ZaJ8AiuPrJL60lTT",
    thumbnail_url: "",
    difficulty: DifficultyLevel.beginner,
  },
  {
    id: "2",
    title: "Python Programming",
    description:
      "Complete Python Programming Course — covering syntax, data structures, file handling & more.",
    category: "Programming",
    youtube_url: "https://youtu.be/Onjs26YvfIQ?si=XyRZy2mgMeSRslvb",
    thumbnail_url: "",
    difficulty: DifficultyLevel.beginner,
  },
  {
    id: "3",
    title: "C Programming",
    description:
      "Full C Language Course — pointers, memory management, arrays, and system programming basics.",
    category: "Programming",
    youtube_url:
      "https://www.youtube.com/watch?v=EjavYOFoJJ0&list=PLdo5W4Nhv31a8UcMN9-35ghv8qyFWD9_S",
    thumbnail_url: "",
    difficulty: DifficultyLevel.beginner,
  },
  {
    id: "4",
    title: "Data Structures & Algorithms",
    description:
      "DSA Full Course — arrays, trees, graphs, dynamic programming, and interview-focused problem solving.",
    category: "Computer Science",
    youtube_url:
      "https://www.youtube.com/watch?v=AT14lCXuMKI&list=PLdo5W4Nhv31bbKJzrsKfMpo_grxuLl8LU",
    thumbnail_url: "",
    difficulty: DifficultyLevel.intermediate,
  },
  {
    id: "5",
    title: "Frontend Technologies",
    description:
      "HTML, CSS, JavaScript Full Course — build responsive websites and interactive UIs from scratch.",
    category: "Web Development",
    youtube_url:
      "https://www.youtube.com/watch?v=EceJQ05KTf4&list=PLwoh6bBAszPrNlrMqJXnb9G6MdgSfN686",
    thumbnail_url: "",
    difficulty: DifficultyLevel.beginner,
  },
  {
    id: "6",
    title: "SQL",
    description:
      "SQL Full Course — queries, joins, subqueries, indexes, stored procedures, and database design.",
    category: "Database",
    youtube_url:
      "https://www.youtube.com/watch?v=pmH2vl-LNms&pp=ygUbU1FMIGZ1bGwgY291cnNlIGluIGVuZ2xpc2gg",
    thumbnail_url: "",
    difficulty: DifficultyLevel.beginner,
  },
  {
    id: "7",
    title: "Pattern Programs",
    description:
      "Pattern Programming in Java — master loops and logic through star, number, and alphabet patterns.",
    category: "Programming",
    youtube_url:
      "https://www.youtube.com/watch?v=FAI4vhq6V9E&list=PLSDyGb_vtanyBMaSuM_W_E578Eu9X28ZD",
    thumbnail_url: "",
    difficulty: DifficultyLevel.beginner,
  },
  {
    id: "8",
    title: "Aptitude",
    description:
      "Aptitude for Placements Full Course — quantitative, logical reasoning, and verbal ability for campus placements.",
    category: "Placement Prep",
    youtube_url: "https://www.youtube.com/live/6zejYctLMzM?si=wL7ma8hzstJpKrTV",
    thumbnail_url: "",
    difficulty: DifficultyLevel.intermediate,
  },
  {
    id: "9",
    title: "Advanced Java",
    description:
      "Advanced Java Full Course — JDBC, Servlets, JSP, Spring basics, and enterprise Java development.",
    category: "Programming",
    youtube_url: "https://youtu.be/in5S_45cS7k?si=Hfgwpnk1e8adBbZn",
    thumbnail_url: "",
    difficulty: DifficultyLevel.advanced,
  },
  {
    id: "10",
    title: "Programming",
    description:
      "Programming Full Course — core programming concepts, logic building, and practical coding skills for beginners and beyond.",
    category: "Programming",
    youtube_url:
      "https://www.youtube.com/watch?v=VHbSopMyc4M&list=PLBlnK6fEyqRjKA_NuK9mHmlk0dZzuP1P5",
    thumbnail_url: "",
    difficulty: DifficultyLevel.beginner,
  },
];

const DIFFICULTY_COLORS = {
  beginner: {
    badge: "bg-green-500/15 text-green-400 border-green-500/30",
    label: "Beginner",
  },
  intermediate: {
    badge: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    label: "Intermediate",
  },
  advanced: {
    badge: "bg-red-500/15 text-red-400 border-red-500/30",
    label: "Advanced",
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  Programming: "text-blue-400",
  "Computer Science": "text-purple-400",
  "Web Development": "text-cyan-400",
  Database: "text-orange-400",
  "Placement Prep": "text-pink-400",
};

export default function Courses() {
  const { data: backendCourses = [], isLoading } = useGetAllCourses();
  const { mutate: markComplete, isPending } = useRecordCourseCompletion();
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  const courses = backendCourses.length > 0 ? backendCourses : FALLBACK_COURSES;

  function handleMarkComplete(course: Course) {
    if (completedIds.has(course.id)) return;
    markComplete(course.id, {
      onSuccess: () => {
        setCompletedIds((prev) => new Set([...prev, course.id]));
        toast.success(`"${course.title}" marked as complete! +50 XP earned 🎉`);
      },
      onError: () => {
        setCompletedIds((prev) => new Set([...prev, course.id]));
        toast.info(`"${course.title}" marked as complete locally!`);
      },
    });
  }

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-lg bg-blue-500/15 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-blue-400" />
          </div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
            Courses
          </h1>
        </div>
        <p className="text-muted-foreground ml-12">
          {courses.length} curated video courses to build your skills. Watch on
          YouTube and track your progress.
        </p>
      </motion.div>

      {/* Loading */}
      {isLoading && (
        <div
          className="flex items-center gap-2 text-muted-foreground"
          data-ocid="courses.loading_state"
        >
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Loading courses...</span>
        </div>
      )}

      {/* Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
        data-ocid="courses.list"
      >
        {courses.map((course, i) => {
          const diff =
            DIFFICULTY_COLORS[course.difficulty] ?? DIFFICULTY_COLORS.beginner;
          const catColor = CATEGORY_COLORS[course.category] ?? "text-primary";
          const isDone = completedIds.has(course.id);

          return (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 * i }}
              data-ocid={`courses.item.${i + 1}`}
            >
              <Card
                className={`card-glow h-full flex flex-col ${isDone ? "border-green-500/40" : ""}`}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p
                        className={`text-xs font-semibold uppercase tracking-wide ${catColor} mb-1`}
                      >
                        {course.category}
                      </p>
                      <CardTitle className="text-base font-display font-bold leading-snug">
                        {course.title}
                      </CardTitle>
                    </div>
                    {isDone && (
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <CardDescription className="text-sm leading-relaxed">
                    {course.description}
                  </CardDescription>
                  <div className="mt-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold border ${diff.badge}`}
                    >
                      {diff.label}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 gap-1.5"
                    asChild
                    data-ocid={`courses.watch.button.${i + 1}`}
                  >
                    <a
                      href={course.youtube_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Play className="w-3.5 h-3.5" />
                      Watch on YouTube
                      <ExternalLink className="w-3 h-3 ml-auto opacity-60" />
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    variant={isDone ? "secondary" : "outline"}
                    onClick={() => handleMarkComplete(course)}
                    disabled={isDone || isPending}
                    className="flex-shrink-0"
                    data-ocid={`courses.complete.button.${i + 1}`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    ) : isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "✓ Done"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
