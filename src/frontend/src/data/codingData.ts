import { javaCodePart1 } from "./javaCodePart1";
import { javaCodePart2 } from "./javaCodePart2";
import { javaCodePart3 } from "./javaCodePart3";
import { patternCode } from "./patternCode";
import { pythonCodePart1 } from "./pythonCodePart1";
import { pythonCodePart2 } from "./pythonCodePart2";

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
  {
    id: "java",
    title: "Java",
    icon: "☕",
    problems: [...javaCodePart1, ...javaCodePart2, ...javaCodePart3],
  },
  {
    id: "python",
    title: "Python",
    icon: "🐍",
    problems: [...pythonCodePart1, ...pythonCodePart2],
  },
  {
    id: "patterns",
    title: "Patterns",
    icon: "⭐",
    problems: patternCode,
  },
];
