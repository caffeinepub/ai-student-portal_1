import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  ClipboardList,
  Code2,
  FileText,
  MessageSquare,
  Star,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useGetAllCourses, useGetUserXP } from "../hooks/useQueries";

const modules = [
  {
    title: "Courses",
    description: "9 curated video courses on Java, Python, DSA, SQL & more",
    icon: BookOpen,
    path: "/courses",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    count: "9 Courses",
  },
  {
    title: "MCQ Tests",
    description: "Test your knowledge with topic-wise multiple choice quizzes",
    icon: ClipboardList,
    path: "/mcq",
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    count: "Quiz Ready",
  },
  {
    title: "Coding Practice",
    description: "Solve 10 coding problems from Easy to Hard difficulty",
    icon: Code2,
    path: "/coding",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    count: "10 Problems",
  },
  {
    title: "Job Listings",
    description: "Explore internships & full-time roles at top companies",
    icon: Briefcase,
    path: "/jobs",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    count: "5+ Jobs",
  },
  {
    title: "Resume Builder",
    description: "Build a professional resume with live preview & PDF export",
    icon: FileText,
    path: "/resume",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    count: "AI-Powered",
  },
  {
    title: "AI Chat",
    description:
      "Get instant answers on programming, career advice & study tips",
    icon: MessageSquare,
    path: "/chat",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    count: "24/7 Available",
  },
];

const stats = [
  { label: "Courses Available", value: "9", icon: BookOpen },
  { label: "Practice Problems", value: "10", icon: Code2 },
  { label: "Job Listings", value: "5+", icon: Briefcase },
  { label: "Quiz Topics", value: "3+", icon: ClipboardList },
];

export default function Dashboard() {
  const { data: xp = BigInt(0) } = useGetUserXP();
  const { data: courses = [] } = useGetAllCourses();
  const { identity } = useInternetIdentity();

  const xpVal = Number(xp);
  const level = Math.floor(xpVal / 100) + 1;
  const progressToNext = xpVal % 100;

  return (
    <div className="p-4 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/20 p-6 lg:p-8"
      >
        <div className="bg-grid-pattern absolute inset-0 opacity-30" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary" className="text-xs font-semibold">
                <Star className="w-3 h-3 mr-1 text-yellow-400" />
                Level {level} Student
              </Badge>
              <Badge variant="outline" className="text-xs">
                <TrendingUp className="w-3 h-3 mr-1" />
                {courses.length > 0
                  ? `${courses.length} courses loaded`
                  : "Ready to learn"}
              </Badge>
            </div>
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Welcome back{identity ? "!" : " to AI Student Portal"}
            </h1>
            <p className="text-muted-foreground text-base max-w-lg">
              Your AI-powered learning hub. Master programming, ace interviews,
              and land your dream job.
            </p>
          </div>
          <div className="flex-shrink-0">
            <div className="bg-card border border-border rounded-xl p-5 min-w-48">
              <div className="flex items-center gap-2 mb-3">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span className="font-semibold text-sm text-foreground">
                  Your Progress
                </span>
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-display text-3xl font-bold text-primary">
                  {xpVal}
                </span>
                <span className="text-muted-foreground text-sm">XP</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                Level {level} · {100 - progressToNext} XP to next
              </p>
              <Progress value={progressToNext} className="h-1.5" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3"
        data-ocid="dashboard.stats.section"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-card border border-border rounded-xl p-4 flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <stat.icon className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="font-display font-bold text-xl text-foreground">
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Modules Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-xl text-foreground">
            Learning Modules
          </h2>
          <span className="text-sm text-muted-foreground">
            6 modules available
          </span>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          data-ocid="dashboard.modules.list"
        >
          {modules.map((mod, i) => (
            <motion.div
              key={mod.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              data-ocid={`dashboard.modules.item.${i + 1}`}
            >
              <Card className={`card-glow h-full border ${mod.border} bg-card`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div
                      className={`w-10 h-10 rounded-lg ${mod.bg} flex items-center justify-center`}
                    >
                      <mod.icon className={`w-5 h-5 ${mod.color}`} />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {mod.count}
                    </Badge>
                  </div>
                  <CardTitle className="text-base font-display font-bold mt-3">
                    {mod.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {mod.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button
                    asChild
                    size="sm"
                    className="w-full group"
                    data-ocid={`dashboard.${mod.title.toLowerCase().replace(/\s+/g, "-")}.button`}
                  >
                    <Link to={mod.path}>
                      Go to {mod.title}
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* XP Info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="bg-card border border-border rounded-xl p-5"
      >
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-yellow-400" />
          <h3 className="font-display font-bold text-base">How to Earn XP</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { action: "Complete a Course", xp: "+50 XP" },
            { action: "Pass a Quiz", xp: "+30 XP" },
            { action: "Solve a Problem", xp: "+20 XP" },
          ].map((item) => (
            <div
              key={item.action}
              className="flex items-center justify-between bg-muted/50 rounded-lg px-3 py-2.5"
            >
              <span className="text-sm text-foreground">{item.action}</span>
              <span className="font-bold text-sm text-yellow-400">
                {item.xp}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="text-center text-xs text-muted-foreground py-4 border-t border-border">
        © {new Date().getFullYear()}. Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
