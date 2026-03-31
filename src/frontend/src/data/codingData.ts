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
  { id: "patterns", title: "Patterns", icon: "⭐", problems: [] },
];
