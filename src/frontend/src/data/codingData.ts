export interface Problem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  hint: string;
  starterCode: string;
  topic: string;
}

export interface Course {
  id: string;
  title: string;
  icon: string;
  problems: Problem[];
}

export const COURSES: Course[] = [
  { id: "java", title: "Java", icon: "☕", problems: [] },
  { id: "python", title: "Python", icon: "🐍", problems: [] },
  { id: "c", title: "C", icon: "⚙️", problems: [] },
  { id: "dsa", title: "DSA", icon: "🌲", problems: [] },
  { id: "frontend", title: "Frontend", icon: "🌐", problems: [] },
  { id: "sql", title: "SQL", icon: "🗄️", problems: [] },
  { id: "patterns", title: "Patterns", icon: "⭐", problems: [] },
  { id: "aptitude", title: "Aptitude", icon: "🧮", problems: [] },
  { id: "advjava", title: "Advanced Java", icon: "🚀", problems: [] },
  { id: "programming", title: "Programming", icon: "💻", problems: [] },
];
