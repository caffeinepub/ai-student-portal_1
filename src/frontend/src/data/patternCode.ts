import type { Problem } from "./codingData";

export const patternCode: Problem[] = [
  // ===== Easy Star Patterns =====
  {
    id: "pat-e1",
    title: "Right Triangle Stars",
    difficulty: "Easy",
    topic: "Patterns",
    description:
      "Print a right triangle star pattern.\n\nInput: n=4\nOutput:\n*\n**\n***\n****",
    hint: "Loop i from 1 to n, print i stars",
    starterCode: "",
  },
  {
    id: "pat-e2",
    title: "Square Star Pattern",
    difficulty: "Easy",
    topic: "Patterns",
    description:
      "Print an n×n square of stars.\n\nInput: n=3\nOutput:\n***\n***\n***",
    hint: "Nested loops, print * n times per row",
    starterCode: "",
  },
  {
    id: "pat-e3",
    title: "Inverted Right Triangle",
    difficulty: "Easy",
    topic: "Patterns",
    description:
      "Print inverted right triangle.\n\nInput: n=4\nOutput:\n****\n***\n**\n*",
    hint: "Loop i from n down to 1",
    starterCode: "",
  },
  {
    id: "pat-e4",
    title: "Number Triangle",
    difficulty: "Easy",
    topic: "Patterns",
    description:
      "Print numbers in right triangle.\n\nInput: n=4\nOutput:\n1\n12\n123\n1234",
    hint: "Inner loop j from 1 to i",
    starterCode: "",
  },
  {
    id: "pat-e5",
    title: "Same Number Triangle",
    difficulty: "Easy",
    topic: "Patterns",
    description:
      "Each row has same number repeated.\n\nInput: n=4\nOutput:\n1\n22\n333\n4444",
    hint: "Print i, i times in row i",
    starterCode: "",
  },
  {
    id: "pat-e6",
    title: "Alphabet Triangle",
    difficulty: "Easy",
    topic: "Patterns",
    description:
      "Print alphabets in triangle.\n\nInput: n=4\nOutput:\nA\nAB\nABC\nABCD",
    hint: "chr(65 + j) for j in range(i)",
    starterCode: "",
  },
  {
    id: "pat-e7",
    title: "Multiplication Table",
    difficulty: "Easy",
    topic: "Patterns",
    description:
      "Print multiplication table for n.\n\nInput: n=5\nOutput: 5x1=5 5x2=10 ... 5x10=50",
    hint: "for i in range(1,11): print(n*i)",
    starterCode: "",
  },
  {
    id: "pat-e8",
    title: "Right Angle Triangle (Right Aligned)",
    difficulty: "Easy",
    topic: "Patterns",
    description:
      "Right-aligned star triangle.\n\nInput: n=4\nOutput:\n   *\n  **\n ***\n****",
    hint: "Print (n-i) spaces then i stars",
    starterCode: "",
  },
  {
    id: "pat-e9",
    title: "Hollow Rectangle",
    difficulty: "Easy",
    topic: "Patterns",
    description:
      "Print hollow rectangle of stars.\n\nInput: rows=3 cols=5\nOutput:\n*****\n*   *\n*****",
    hint: "First/last row: all stars; middle: star, spaces, star",
    starterCode: "",
  },
  {
    id: "pat-e10",
    title: "Floyd Triangle",
    difficulty: "Easy",
    topic: "Patterns",
    description:
      "Print Floyd's triangle.\n\nInput: n=4\nOutput:\n1\n2 3\n4 5 6\n7 8 9 10",
    hint: "Increment counter from 1 continuously",
    starterCode: "",
  },
  // ===== Easy Number Patterns =====
  {
    id: "pat-e11",
    title: "Pascal's Triangle",
    difficulty: "Easy",
    topic: "Patterns",
    description:
      "Print Pascal's triangle.\n\nInput: n=5\nOutput:\n    1\n   1 1\n  1 2 1\n 1 3 3 1\n1 4 6 4 1",
    hint: "Each element = sum of two above",
    starterCode: "",
  },
  {
    id: "pat-e12",
    title: "Number Diamond",
    difficulty: "Easy",
    topic: "Patterns",
    description:
      "Print diamond of numbers.\n\nInput: n=3\nOutput: 1 12 123 12 1",
    hint: "Upper half expands, lower half contracts",
    starterCode: "",
  },
  // ===== Medium Patterns =====
  {
    id: "pat-m1",
    title: "Pyramid Pattern",
    difficulty: "Medium",
    topic: "Patterns",
    description:
      "Print a pyramid of stars.\n\nInput: n=4\nOutput:\n   *\n  ***\n *****\n*******",
    hint: "Spaces = n-i, stars = 2*i-1",
    starterCode: "",
  },
  {
    id: "pat-m2",
    title: "Diamond Pattern",
    difficulty: "Medium",
    topic: "Patterns",
    description:
      "Print full diamond of stars.\n\nInput: n=4\nOutput: Upper pyramid + inverted pyramid",
    hint: "Pyramid up to n then back down",
    starterCode: "",
  },
  {
    id: "pat-m3",
    title: "Butterfly Pattern",
    difficulty: "Medium",
    topic: "Patterns",
    description:
      "Print butterfly pattern.\n\nInput: n=4\nOutput:\n*      *\n**    **\n***  ***\n********\n***  ***\n**    **\n*      *",
    hint: "Upper: stars, spaces, stars; mirror lower half",
    starterCode: "",
  },
  {
    id: "pat-m4",
    title: "Sliding Window Max",
    difficulty: "Medium",
    topic: "Patterns",
    description:
      "Maximum in each sliding window of size k.\n\nInput: [1,3,-1,-3,5,3,6,7] k=3\nOutput: [3,3,5,5,6,7]",
    hint: "Use deque for O(n) solution",
    starterCode: "",
  },
  {
    id: "pat-m5",
    title: "Two Pointers Sum",
    difficulty: "Medium",
    topic: "Patterns",
    description:
      "Find pair with given sum in sorted array.\n\nInput: [1,2,3,4,5,6] target=9\nOutput: (3,6)",
    hint: "Left pointer from start, right from end",
    starterCode: "",
  },
  {
    id: "pat-m6",
    title: "Binary Search Pattern",
    difficulty: "Medium",
    topic: "Patterns",
    description:
      "Find first occurrence in sorted array.\n\nInput: [1,2,2,2,3,4] target=2\nOutput: Index 1",
    hint: "Standard binary search, track first found",
    starterCode: "",
  },
  {
    id: "pat-m7",
    title: "Number Pyramid",
    difficulty: "Medium",
    topic: "Patterns",
    description:
      "Print pyramid with numbers incrementing.\n\nInput: n=3\nOutput:\n  1\n 2 3\n4 5 6",
    hint: "Counter from 1, distribute per row",
    starterCode: "",
  },
  {
    id: "pat-m8",
    title: "Hourglass Pattern",
    difficulty: "Medium",
    topic: "Patterns",
    description:
      "Print hourglass star pattern.\n\nInput: n=4\nOutput: Full diamond then inverted",
    hint: "Print top half then bottom half",
    starterCode: "",
  },
  {
    id: "pat-m9",
    title: "Chess Board",
    difficulty: "Medium",
    topic: "Patterns",
    description:
      "Print n×n chessboard pattern.\n\nInput: n=4\nOutput:\n# # # #\n # # # \n# # # #\n # # # ",
    hint: "(i+j)%2==0 ? '#' : ' '",
    starterCode: "",
  },
  {
    id: "pat-m10",
    title: "Spiral Matrix Print",
    difficulty: "Medium",
    topic: "Patterns",
    description:
      "Print 1..n^2 in spiral order in n×n matrix.\n\nInput: n=3\nOutput:\n1 2 3\n8 9 4\n7 6 5",
    hint: "Track top/bottom/left/right bounds",
    starterCode: "",
  },
  {
    id: "pat-m11",
    title: "Fast Slow Pointer Cycle",
    difficulty: "Medium",
    topic: "Patterns",
    description:
      "Detect cycle in linked list.\n\nInput: 1->2->3->4->2 (cycle)\nOutput: Cycle detected",
    hint: "Floyd's cycle detection, fast=2x slow=1x",
    starterCode: "",
  },
  {
    id: "pat-m12",
    title: "Prefix Sum Pattern",
    difficulty: "Medium",
    topic: "Patterns",
    description:
      "Answer range sum queries.\n\nInput: [1,2,3,4,5] query(1,3)\nOutput: 9",
    hint: "Build prefix sum array",
    starterCode: "",
  },
  // ===== Hard Patterns =====
  {
    id: "pat-h1",
    title: "N-Queens Problem",
    difficulty: "Hard",
    topic: "Patterns",
    description:
      "Place N queens on N×N board.\n\nInput: n=4\nOutput: [.Q.., ...Q, Q..., ..Q.]",
    hint: "Backtracking: try each column per row",
    starterCode: "",
  },
  {
    id: "pat-h2",
    title: "Longest Palindromic Subsequence",
    difficulty: "Hard",
    topic: "Patterns",
    description:
      "Find longest palindromic subsequence.\n\nInput: BBABCBCAB\nOutput: 7 (BABCBAB)",
    hint: "2D DP: lps[i][j] = lps[i+1][j-1]+2 if match",
    starterCode: "",
  },
  {
    id: "pat-h3",
    title: "Minimum Coin Change DP",
    difficulty: "Hard",
    topic: "Patterns",
    description:
      "Minimum coins to make amount.\n\nInput: coins=[1,5,6,9] amount=11\nOutput: 2",
    hint: "dp[i] = min coins for amount i",
    starterCode: "",
  },
  {
    id: "pat-h4",
    title: "BFS Level Order Traversal",
    difficulty: "Hard",
    topic: "Patterns",
    description:
      "BFS on binary tree, return level by level.\n\nInput: [3,9,20,null,null,15,7]\nOutput: [[3],[9,20],[15,7]]",
    hint: "Queue; process level by level with size",
    starterCode: "",
  },
  {
    id: "pat-h5",
    title: "DFS Path Sum",
    difficulty: "Hard",
    topic: "Patterns",
    description:
      "Check if tree has root-to-leaf path with given sum.\n\nInput: tree, target=22\nOutput: True",
    hint: "DFS: subtract value, check leaf with 0",
    starterCode: "",
  },
  {
    id: "pat-h6",
    title: "Knapsack 0-1 DP",
    difficulty: "Hard",
    topic: "Patterns",
    description:
      "0/1 knapsack problem.\n\nInput: weights=[2,3,4,5] values=[3,4,5,6] W=5\nOutput: 7",
    hint: "dp[i][w] = max value with i items and w capacity",
    starterCode: "",
  },
  {
    id: "pat-h7",
    title: "Longest Increasing Subsequence",
    difficulty: "Hard",
    topic: "Patterns",
    description: "Find LIS length.\n\nInput: [10,9,2,5,3,7,101,18]\nOutput: 4",
    hint: "dp[i] = max LIS ending at i; binary search version O(nlogn)",
    starterCode: "",
  },
  {
    id: "pat-h8",
    title: "Word Ladder BFS",
    difficulty: "Hard",
    topic: "Patterns",
    description:
      "Shortest transformation sequence.\n\nInput: begin=hit end=cog dict=[hot,dot,dog,lot,log,cog]\nOutput: 5",
    hint: "BFS, change one char at a time",
    starterCode: "",
  },
  {
    id: "pat-h9",
    title: "Merge K Sorted Lists",
    difficulty: "Hard",
    topic: "Patterns",
    description:
      "Merge k sorted arrays into one.\n\nInput: [[1,4,5],[1,3,4],[2,6]]\nOutput: [1,1,2,3,4,4,5,6]",
    hint: "Min-heap of (value, list_index, element_index)",
    starterCode: "",
  },
  {
    id: "pat-h10",
    title: "Trie Prefix Search",
    difficulty: "Hard",
    topic: "Patterns",
    description:
      "Implement Trie with insert and search.\n\nInput: insert 'apple'; search 'app'\nOutput: True (prefix found)",
    hint: "Node with children dict; insert char by char",
    starterCode: "",
  },
  {
    id: "pat-h11",
    title: "Graph Topological Sort",
    difficulty: "Hard",
    topic: "Patterns",
    description:
      "Topological sort of DAG.\n\nInput: 5 tasks with dependencies\nOutput: Valid order",
    hint: "Kahn's algorithm with in-degree",
    starterCode: "",
  },
  {
    id: "pat-h12",
    title: "Monotonic Stack Next Greater",
    difficulty: "Hard",
    topic: "Patterns",
    description:
      "Find next greater element for each.\n\nInput: [4,5,2,25]\nOutput: [5,25,25,-1]",
    hint: "Stack: pop when current > stack top",
    starterCode: "",
  },
  {
    id: "pat-h13",
    title: "Backtracking Subsets",
    difficulty: "Hard",
    topic: "Patterns",
    description:
      "Generate all subsets.\n\nInput: [1,2,3]\nOutput: [] [1] [2] [3] [1,2] [1,3] [2,3] [1,2,3]",
    hint: "For each element: include or exclude",
    starterCode: "",
  },
  {
    id: "pat-h14",
    title: "Dijkstra Shortest Path",
    difficulty: "Hard",
    topic: "Patterns",
    description:
      "Shortest path in weighted graph.\n\nInput: 5 nodes, edges with weights, src=0\nOutput: Distances from 0",
    hint: "Min-heap priority queue",
    starterCode: "",
  },
  {
    id: "pat-h15",
    title: "Sliding Window Longest Unique",
    difficulty: "Hard",
    topic: "Patterns",
    description:
      "Longest substring without repeating chars.\n\nInput: abcabcbb\nOutput: 3 (abc)",
    hint: "Two pointers + set; shrink when duplicate",
    starterCode: "",
  },
  {
    id: "pat-h16",
    title: "Number Pattern Zigzag",
    difficulty: "Hard",
    topic: "Patterns",
    description:
      "Print zigzag number pattern.\n\nInput: n=4\nOutput: Increasing then decreasing per row",
    hint: "Alternate direction per row",
    starterCode: "",
  },
  {
    id: "pat-h17",
    title: "Star Hexagon",
    difficulty: "Hard",
    topic: "Patterns",
    description:
      "Print hexagon pattern of stars.\n\nInput: n=3\nOutput: Middle row 2n-1 wide, sides taper",
    hint: "Calculate width and offset for each row",
    starterCode: "",
  },
  {
    id: "pat-h18",
    title: "Matrix Rotation Pattern",
    difficulty: "Hard",
    topic: "Patterns",
    description:
      "Rotate matrix 90 degrees clockwise.\n\nInput: [[1,2,3],[4,5,6],[7,8,9]]\nOutput: [[7,4,1],[8,5,2],[9,6,3]]",
    hint: "Transpose then reverse each row",
    starterCode: "",
  },
];
