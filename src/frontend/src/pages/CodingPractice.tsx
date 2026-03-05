import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, CheckCircle2, Code2, Play, Terminal } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface Problem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  hint: string;
  starterCode: string;
  topic: string;
}

const PROBLEMS: Problem[] = [
  {
    id: "p1",
    title: "Two Sum",
    difficulty: "Easy",
    topic: "Arrays",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nExample:\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: nums[0] + nums[1] = 2 + 7 = 9",
    hint: "Use a hash map to store each number and its index.",
    starterCode: "function twoSum(nums, target) {\n  // Your solution here\n}",
  },
  {
    id: "p2",
    title: "Reverse a String",
    difficulty: "Easy",
    topic: "Strings",
    description:
      "Write a function that reverses a string. The input string is given as an array of characters.\n\nExample:\nInput: s = ['h','e','l','l','o']\nOutput: ['o','l','l','e','h']",
    hint: "Use two pointers starting from both ends.",
    starterCode: "function reverseString(s) {\n  // Your solution here\n  \n}",
  },
  {
    id: "p3",
    title: "FizzBuzz",
    difficulty: "Easy",
    topic: "Loops",
    description:
      "Given an integer n, return a string array where:\n- answer[i] == 'FizzBuzz' if i is divisible by 3 and 5\n- answer[i] == 'Fizz' if i is divisible by 3\n- answer[i] == 'Buzz' if i is divisible by 5\n- Otherwise, answer[i] == i\n\nExample: n = 5 → ['1','2','Fizz','4','Buzz']",
    hint: "Check divisibility by 15 first, then 3, then 5.",
    starterCode:
      "function fizzBuzz(n) {\n  const result = [];\n  // Your solution here\n  return result;\n}",
  },
  {
    id: "p4",
    title: "Fibonacci Sequence",
    difficulty: "Easy",
    topic: "Dynamic Programming",
    description:
      "Given a number n, return the nth Fibonacci number.\nThe Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21...\n\nExample:\nInput: n = 6\nOutput: 8",
    hint: "Use memoization or an iterative approach to avoid exponential time.",
    starterCode: "function fibonacci(n) {\n  // Your solution here\n  \n}",
  },
  {
    id: "p5",
    title: "Palindrome Check",
    difficulty: "Easy",
    topic: "Strings",
    description:
      "Given a string s, return true if it's a palindrome (reads the same forwards and backwards, ignoring non-alphanumeric characters and case).\n\nExample:\nInput: 'A man a plan a canal Panama'\nOutput: true",
    hint: "Filter non-alphanumeric chars, lowercase, then use two pointers.",
    starterCode: "function isPalindrome(s) {\n  // Your solution here\n  \n}",
  },
  {
    id: "p6",
    title: "Binary Search",
    difficulty: "Medium",
    topic: "Search",
    description:
      "Given a sorted integer array nums and a target, return the index of the target or -1 if not found. Must run in O(log n) time.\n\nExample:\nInput: nums = [-1,0,3,5,9,12], target = 9\nOutput: 4",
    hint: "Use left and right pointers, compute mid, compare with target.",
    starterCode:
      "function binarySearch(nums, target) {\n  let left = 0, right = nums.length - 1;\n  // Your solution here\n  \n}",
  },
  {
    id: "p7",
    title: "Linked List Reverse",
    difficulty: "Medium",
    topic: "Linked Lists",
    description:
      "Given the head of a singly linked list, reverse the list and return the reversed list.\n\nExample:\nInput: 1 → 2 → 3 → 4 → 5\nOutput: 5 → 4 → 3 → 2 → 1",
    hint: "Use three pointers: prev, current, and next.",
    starterCode:
      "function reverseList(head) {\n  let prev = null;\n  let curr = head;\n  // Your solution here\n  \n}",
  },
  {
    id: "p8",
    title: "Valid Parentheses",
    difficulty: "Medium",
    topic: "Stacks",
    description:
      "Given a string s containing only '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets are closed by the same type\n2. Brackets are closed in correct order\n\nExample: '()[]{}' → true, '([)]' → false",
    hint: "Use a stack. Push opening brackets, pop and check for closing ones.",
    starterCode:
      "function isValid(s) {\n  const stack = [];\n  // Your solution here\n  \n}",
  },
  {
    id: "p9",
    title: "Merge Sort",
    difficulty: "Hard",
    topic: "Sorting",
    description:
      "Implement merge sort algorithm to sort an array in ascending order.\n\nTime Complexity: O(n log n)\nSpace Complexity: O(n)\n\nExample:\nInput: [38, 27, 43, 3, 9, 82, 10]\nOutput: [3, 9, 10, 27, 38, 43, 82]",
    hint: "Recursively divide the array in half, sort each half, then merge.",
    starterCode:
      "function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  // Your solution here\n  \n}",
  },
  {
    id: "p10",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Hard",
    topic: "Sliding Window",
    description:
      "Given a string s, find the length of the longest substring without repeating characters.\n\nExample:\nInput: s = 'abcabcbb'\nOutput: 3\nExplanation: 'abc' has length 3",
    hint: "Use sliding window with a Set to track characters in the current window.",
    starterCode:
      "function lengthOfLongestSubstring(s) {\n  // Your solution here\n  \n}",
  },
];

const DIFF_COLORS = {
  Easy: "bg-green-500/15 text-green-400 border-green-500/30",
  Medium: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  Hard: "bg-red-500/15 text-red-400 border-red-500/30",
};

const MOCK_OUTPUTS: Record<string, string> = {
  p1: "Running Two Sum...\n\u2713 Test 1: twoSum([2,7,11,15], 9) \u2192 [0,1]\n\u2713 Test 2: twoSum([3,2,4], 6) \u2192 [1,2]\n\u2713 Test 3: twoSum([3,3], 6) \u2192 [0,1]\n\nAll tests passed! \u2705",
  p2: "Running Reverse String...\n\u2713 Test 1: ['h','e','l','l','o'] \u2192 ['o','l','l','e','h']\n\u2713 Test 2: ['H','a','n','n','a','h'] \u2192 ['h','a','n','n','a','H']\n\nAll tests passed! \u2705",
  p3: "Running FizzBuzz...\n\u2713 n=15 \u2192 ['1','2','Fizz','4','Buzz','Fizz','7','8','Fizz','Buzz','11','Fizz','13','14','FizzBuzz']\n\nAll tests passed! \u2705",
};

const DEFAULT_OUTPUT =
  "Running code...\n\u2713 Custom test cases would appear here\n\nNote: This is a simulated environment.\nImplement your solution and hit Run! \uD83D\uDE80";

export default function CodingPractice() {
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [solved, setSolved] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<"All" | "Easy" | "Medium" | "Hard">(
    "All",
  );

  function openProblem(p: Problem) {
    setSelectedProblem(p);
    setCode(p.starterCode);
    setOutput("");
  }

  function runCode() {
    if (!selectedProblem) return;
    setIsRunning(true);
    setTimeout(() => {
      const out = MOCK_OUTPUTS[selectedProblem.id] ?? DEFAULT_OUTPUT;
      setOutput(out);
      setSolved((prev) => new Set([...prev, selectedProblem.id]));
      setIsRunning(false);
    }, 1200);
  }

  const filtered =
    filter === "All"
      ? PROBLEMS
      : PROBLEMS.filter((p) => p.difficulty === filter);

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        {selectedProblem && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedProblem(null)}
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
              {selectedProblem ? selectedProblem.title : "Coding Practice"}
            </h1>
            <p className="text-muted-foreground text-sm">
              {selectedProblem
                ? `${selectedProblem.topic} · ${selectedProblem.difficulty}`
                : `${PROBLEMS.length} problems across Easy, Medium, and Hard`}
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
        {/* Problem List */}
        {!selectedProblem && (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="space-y-4"
          >
            {/* Filter */}
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
              {filtered.map((prob, i) => (
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
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">
                            {prob.topic}
                          </p>
                          <CardTitle className="text-sm font-display flex items-center gap-2">
                            {solved.has(prob.id) && (
                              <CheckCircle2 className="w-4 h-4 text-green-400" />
                            )}
                            {prob.title}
                          </CardTitle>
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
                        {solved.has(prob.id) ? "Review Solution" : "Solve"}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Code Editor */}
        {selectedProblem && (
          <motion.div
            key="editor"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-4"
          >
            {/* Problem Description */}
            <Card className="h-fit">
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
                    💡 Hint
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {selectedProblem.hint}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Editor */}
            <div className="space-y-3">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-display">
                      Code Editor
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs font-code">
                      JavaScript
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="code-editor min-h-64 resize-y bg-muted/50 border-border"
                    spellCheck={false}
                    data-ocid="coding.editor"
                  />
                </CardContent>
              </Card>

              <Button
                className="w-full gap-2"
                onClick={runCode}
                disabled={isRunning}
                data-ocid="coding.run.button"
              >
                {isRunning ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Run Code
                  </>
                )}
              </Button>

              {/* Output */}
              {output && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  data-ocid="coding.output.panel"
                >
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-green-400" />
                        <CardTitle className="text-sm font-display">
                          Output
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <pre className="code-editor text-sm text-green-400 whitespace-pre-wrap bg-muted/50 rounded-lg p-3">
                        {output}
                      </pre>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
