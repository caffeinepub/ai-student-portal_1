import { javaCodePart1 } from "./javaCodePart1";
import { javaCodePart2 } from "./javaCodePart2";
import { javaCodePart3 } from "./javaCodePart3";
import { patternCode } from "./patternCode";
import { pythonCodePart1 } from "./pythonCodePart1";
import { pythonCodePart2 } from "./pythonCodePart2";

export interface TestCase {
  id: number;
  label: string;
  input: string;
  expected: string;
}

export interface TestResult extends TestCase {
  actual: string;
  passed: boolean;
  error?: string;
}

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
  language: "Java" | "Python" | "JavaScript";
  problems: Problem[];
}

/** Extract up to 3 test cases from a problem description.
 *  Looks for lines matching "Input: ..." and "Output: ..." patterns.
 *  If the problem has multiple examples, extracts up to 3.
 *  Otherwise repeats the single example as 3 identical cases.
 */
export function extractTestCases(problem: Problem): TestCase[] {
  const desc = problem.description;

  // Try to find all Input/Output pairs
  const pairs: { input: string; expected: string }[] = [];
  const lines = desc.split("\n");

  let currentInput: string | null = null;
  for (const line of lines) {
    const inputMatch = line.match(/^Input:\s*(.*)$/i);
    const outputMatch = line.match(/^Output:\s*(.*)$/i);
    if (inputMatch) {
      currentInput = inputMatch[1].trim();
    } else if (outputMatch && currentInput !== null) {
      const raw = currentInput;
      pairs.push({
        input: raw === "None" || raw === "none" || raw === "" ? "" : raw,
        expected: outputMatch[1].trim(),
      });
      currentInput = null;
    }
  }

  if (pairs.length === 0) {
    // Fallback: scan for inline "Input:" and "Output:" anywhere
    const inputMatch = desc.match(/Input:\s*([^\n]+)/i);
    const outputMatch = desc.match(/Output:\s*([^\n]+)/i);
    const input = inputMatch ? inputMatch[1].trim() : "";
    const expected = outputMatch ? outputMatch[1].trim() : "";
    const normalizedInput = input === "None" || input === "none" ? "" : input;
    pairs.push({ input: normalizedInput, expected });
  }

  // Build exactly 3 test cases
  const cases: TestCase[] = [];
  for (let i = 0; i < 3; i++) {
    const pair = pairs[i] ?? pairs[pairs.length - 1]; // repeat last if fewer than 3
    cases.push({
      id: i + 1,
      label: `Test Case ${i + 1}`,
      input: pair.input,
      expected: pair.expected,
    });
  }
  return cases;
}

export const COURSES: Course[] = [
  {
    id: "java",
    title: "Java",
    icon: "☕",
    language: "Java",
    problems: [...javaCodePart1, ...javaCodePart2, ...javaCodePart3],
  },
  {
    id: "python",
    title: "Python",
    icon: "🐍",
    language: "Python",
    problems: [...pythonCodePart1, ...pythonCodePart2],
  },
  {
    id: "patterns",
    title: "Patterns",
    icon: "⭐",
    language: "Java",
    problems: patternCode,
  },
];
