import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  ClipboardList,
  Code2,
  FileText,
  GraduationCap,
  Star,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "../hooks/useAuth";
import { useGetAllCourses, useGetUserXP } from "../hooks/useQueries";

const modules = [
  {
    title: "Courses",
    description: "10 curated video courses on Java, Python, DSA, SQL & more",
    icon: BookOpen,
    path: "/courses",
    accentColor: "#3B82F6",
    glowColor: "rgba(59,130,246,0.25)",
    borderColor: "rgba(59,130,246,0.3)",
    count: "10 Courses",
  },
  {
    title: "MCQ Tests",
    description: "Test knowledge with topic-wise multiple choice quizzes",
    icon: ClipboardList,
    path: "/mcq",
    accentColor: "#22C55E",
    glowColor: "rgba(34,197,94,0.25)",
    borderColor: "rgba(34,197,94,0.3)",
    count: "540+ Questions",
  },
  {
    title: "Coding Practice",
    description: "Java, Python & Patterns with 1080+ coding problems",
    icon: Code2,
    path: "/coding",
    accentColor: "#A855F7",
    glowColor: "rgba(168,85,247,0.25)",
    borderColor: "rgba(168,85,247,0.3)",
    count: "1080+ Problems",
  },
  {
    title: "Job Listings",
    description:
      "Explore internships & full-time roles at top Indian tech companies",
    icon: Briefcase,
    path: "/jobs",
    accentColor: "#F97316",
    glowColor: "rgba(249,115,22,0.25)",
    borderColor: "rgba(249,115,22,0.3)",
    count: "30 Listings",
  },
  {
    title: "Resume Builder",
    description: "Build a professional ATS-optimized resume with PDF export",
    icon: FileText,
    path: "/resume",
    accentColor: "#EC4899",
    glowColor: "rgba(236,72,153,0.25)",
    borderColor: "rgba(236,72,153,0.3)",
    count: "100% ATS Score",
  },
];

const stats = [
  {
    label: "Courses",
    value: "10",
    icon: BookOpen,
    accentColor: "#3B82F6",
    glowColor: "rgba(59,130,246,0.2)",
  },
  {
    label: "Coding Problems",
    value: "1080+",
    icon: Code2,
    accentColor: "#A855F7",
    glowColor: "rgba(168,85,247,0.2)",
  },
  {
    label: "Job Listings",
    value: "30",
    icon: Briefcase,
    accentColor: "#F97316",
    glowColor: "rgba(249,115,22,0.2)",
  },
  {
    label: "MCQ Questions",
    value: "540+",
    icon: ClipboardList,
    accentColor: "#22C55E",
    glowColor: "rgba(34,197,94,0.2)",
  },
];

export default function Dashboard() {
  const { data: xp = BigInt(0) } = useGetUserXP();
  const { data: courses = [] } = useGetAllCourses();
  const { user } = useAuth();

  const xpVal = Number(xp);
  const level = Math.floor(xpVal / 100) + 1;
  const progressToNext = xpVal % 100;

  return (
    <div
      className="relative min-h-screen p-4 lg:p-8 space-y-8 max-w-7xl mx-auto"
      style={{ background: "#050A14", color: "#F2F6FF" }}
    >
      {/* Background glow orbs */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "-5%",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(79,70,229,0.18) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "-8%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(47,125,255,0.08) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        data-ocid="dashboard.hero.section"
        className="relative rounded-2xl overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0B0F1A 0%, #0F1525 50%, #0B0F1A 100%)",
          border: "1px solid rgba(79,70,229,0.25)",
          boxShadow:
            "0 0 60px rgba(79,70,229,0.12), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Indigo stage light spotlight behind XP card */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-5%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(99,102,241,0.22) 0%, rgba(79,70,229,0.1) 35%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-8 p-6 lg:p-10">
          {/* Left: Headline */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{
                  background: "rgba(47,125,255,0.15)",
                  border: "1px solid rgba(47,125,255,0.35)",
                  boxShadow: "0 0 20px rgba(47,125,255,0.2)",
                }}
              >
                <GraduationCap
                  className="w-7 h-7"
                  style={{ color: "#60A5FA" }}
                />
              </div>
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: "#6366F1", letterSpacing: "0.15em" }}
              >
                Welcome to
              </span>
            </div>

            <h1
              className="font-display font-bold leading-tight mb-4"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                lineHeight: 1.08,
                color: "#F2F6FF",
                textShadow: "0 0 40px rgba(99,102,241,0.35)",
              }}
            >
              Student{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #818CF8, #60A5FA, #C084FC)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Portal
              </span>
            </h1>

            {user ? (
              <p
                className="text-lg font-medium mb-2"
                style={{ color: "#A7B1C2" }}
              >
                Hello,{" "}
                <span style={{ color: "#F2F6FF", fontWeight: 700 }}>
                  {user.name}
                </span>
                ! 👋
              </p>
            ) : null}
            <p
              className="text-sm lg:text-base max-w-md leading-relaxed"
              style={{ color: "#6B7A99" }}
            >
              Track your progress, practice coding, and launch your career.
            </p>

            {/* Module pill badges */}
            <div className="flex flex-wrap gap-2 mt-6">
              {["Courses", "MCQ Tests", "Coding", "Jobs", "Resume"].map(
                (mod) => (
                  <span
                    key={mod}
                    style={{
                      padding: "4px 14px",
                      borderRadius: 999,
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#A7B1C2",
                      fontSize: 12,
                      fontWeight: 500,
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    {mod}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* Right: XP Card */}
          <div className="flex-shrink-0">
            <div
              className="rounded-2xl p-6 min-w-[220px]"
              style={{
                background: "rgba(11,15,26,0.8)",
                border: "1px solid rgba(234,179,8,0.25)",
                boxShadow:
                  "0 0 30px rgba(234,179,8,0.1), inset 0 1px 0 rgba(255,255,255,0.04)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5" style={{ color: "#FCD34D" }} />
                <span
                  className="text-sm font-medium"
                  style={{ color: "#A7B1C2" }}
                >
                  Your Progress
                </span>
              </div>
              <div className="flex items-baseline gap-1.5 mb-1">
                <span
                  className="font-display font-bold"
                  style={{ fontSize: 42, lineHeight: 1, color: "#F2F6FF" }}
                >
                  {xpVal}
                </span>
                <span className="text-sm" style={{ color: "#6B7A99" }}>
                  XP
                </span>
              </div>
              <p className="text-xs mb-4" style={{ color: "#6B7A99" }}>
                Level {level} · {100 - progressToNext} XP to next
              </p>
              <div
                className="w-full rounded-full h-2 mb-4"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <div
                  className="h-2 rounded-full transition-all duration-700"
                  style={{
                    width: `${progressToNext}%`,
                    background: "linear-gradient(90deg, #EAB308, #F59E0B)",
                    boxShadow: "0 0 8px rgba(234,179,8,0.5)",
                  }}
                />
              </div>
              <div className="flex items-center gap-1.5">
                <Star
                  className="w-3.5 h-3.5 fill-current"
                  style={{ color: "#FCD34D" }}
                />
                <span
                  className="text-xs font-medium"
                  style={{ color: "#A7B1C2" }}
                >
                  Level {level} Student
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3"
        data-ocid="dashboard.stats.section"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
            className="rounded-xl p-4"
            style={{
              background: "#0B0F1A",
              border: `1px solid ${stat.accentColor}33`,
              borderLeft: `3px solid ${stat.accentColor}`,
              boxShadow: `0 4px 20px ${stat.glowColor}`,
            }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
              style={{ background: `${stat.accentColor}18` }}
            >
              <stat.icon
                style={{ width: 18, height: 18, color: stat.accentColor }}
              />
            </div>
            <p
              className="font-display font-bold text-xl"
              style={{ color: "#F2F6FF" }}
            >
              {stat.value}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "#6B7A99" }}>
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Students Discussing Banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.18 }}
        className="rounded-2xl overflow-hidden"
        style={{
          border: "1px solid rgba(79,70,229,0.2)",
          boxShadow: "0 0 40px rgba(79,70,229,0.08)",
        }}
      >
        <div className="relative">
          <img
            src="/assets/generated/students-discussing.dim_800x400.jpg"
            alt="Students discussing and collaborating"
            className="w-full h-48 sm:h-64 object-cover"
            style={{ filter: "brightness(0.45) saturate(0.8)" }}
          />
          <div
            className="absolute inset-0 flex items-end p-6 sm:p-8"
            style={{
              background:
                "linear-gradient(to right, rgba(5,10,20,0.85) 0%, rgba(5,10,20,0.4) 60%, transparent 100%)",
            }}
          >
            <div>
              <h3
                className="font-display font-bold leading-tight mb-2"
                style={{
                  fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
                  color: "#F2F6FF",
                  textShadow: "0 0 20px rgba(99,102,241,0.6)",
                }}
              >
                Collaborate. Learn. Grow.
              </h3>
              <p style={{ color: "#A7B1C2", fontSize: 14 }}>
                Join thousands of students building their future together.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Learning Modules */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2
              className="font-display font-bold text-xl"
              style={{ color: "#F2F6FF" }}
            >
              Learning Modules
            </h2>
            <p className="text-sm mt-0.5" style={{ color: "#6B7A99" }}>
              {modules.length} modules ·{" "}
              {courses.length > 0
                ? `${courses.length} courses loaded`
                : "Ready to learn"}
            </p>
          </div>
          <Badge
            variant="outline"
            className="text-xs"
            style={{
              background: "rgba(47,125,255,0.1)",
              borderColor: "rgba(47,125,255,0.3)",
              color: "#60A5FA",
            }}
          >
            <TrendingUp className="w-3 h-3 mr-1" /> Active
          </Badge>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          data-ocid="dashboard.modules.list"
        >
          {modules.map((mod, i) => (
            <motion.div
              key={mod.path}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.25 + 0.08 * i }}
              whileHover={{ y: -3 }}
              data-ocid={`dashboard.modules.item.${i + 1}`}
              className="group rounded-2xl p-5 flex flex-col h-full"
              style={{
                background: "#0B0F1A",
                border: `1px solid ${mod.borderColor}`,
                boxShadow: `0 4px 24px ${mod.glowColor}`,
                transition: "box-shadow 0.3s ease, border-color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  `0 8px 40px ${mod.glowColor.replace("0.25", "0.45")}, 0 0 0 1px ${mod.accentColor}50`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  `0 4px 24px ${mod.glowColor}`;
              }}
            >
              {/* Icon + badge row */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${mod.accentColor}18`,
                    border: `1px solid ${mod.accentColor}35`,
                  }}
                >
                  <mod.icon
                    style={{ width: 20, height: 20, color: mod.accentColor }}
                  />
                </div>
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{
                    background: `${mod.accentColor}15`,
                    border: `1px solid ${mod.accentColor}30`,
                    color: mod.accentColor,
                  }}
                >
                  {mod.count}
                </span>
              </div>

              <h3
                className="font-display font-bold text-base mb-2"
                style={{ color: "#F2F6FF" }}
              >
                {mod.title}
              </h3>
              <p
                className="text-sm leading-relaxed flex-1 mb-5"
                style={{ color: "#6B7A99" }}
              >
                {mod.description}
              </p>

              <Button
                asChild
                size="sm"
                className="w-full group/btn font-semibold"
                style={{
                  background: `linear-gradient(135deg, ${mod.accentColor}CC, ${mod.accentColor}99)`,
                  border: `1px solid ${mod.accentColor}50`,
                  boxShadow: `0 4px 16px ${mod.glowColor}`,
                  color: "#fff",
                }}
                data-ocid={`dashboard.${mod.title.toLowerCase().replace(/\s+/g, "-")}.button`}
              >
                <Link to={mod.path}>
                  Go to {mod.title}
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* XP Info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.65 }}
        className="rounded-2xl p-6"
        style={{
          background: "#0B0F1A",
          border: "1px solid rgba(234,179,8,0.2)",
          boxShadow: "0 4px 24px rgba(234,179,8,0.08)",
        }}
      >
        <div className="flex items-center gap-2 mb-5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: "rgba(234,179,8,0.15)",
              border: "1px solid rgba(234,179,8,0.3)",
            }}
          >
            <Zap className="w-4 h-4" style={{ color: "#FCD34D" }} />
          </div>
          <h3
            className="font-display font-bold text-base"
            style={{ color: "#F2F6FF" }}
          >
            How to Earn XP
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { action: "Complete a Course", xp: "+50 XP", color: "#3B82F6" },
            { action: "Pass a Quiz", xp: "+30 XP", color: "#22C55E" },
            { action: "Solve a Problem", xp: "+20 XP", color: "#A855F7" },
          ].map((item) => (
            <div
              key={item.action}
              className="flex items-center justify-between rounded-xl px-4 py-3"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <span className="text-sm" style={{ color: "#A7B1C2" }}>
                {item.action}
              </span>
              <span
                className="font-bold text-sm"
                style={{
                  color: item.color,
                  textShadow: `0 0 10px ${item.color}80`,
                }}
              >
                {item.xp}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <footer
        className="text-center text-xs py-4"
        style={{
          color: "#4A5568",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        © {new Date().getFullYear()}. Built with ❤️ using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#6366F1" }}
          className="hover:underline"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
