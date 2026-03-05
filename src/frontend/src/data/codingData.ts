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

// ─── JAVA ───────────────────────────────────────────────────────────────────
const javaProblems: Problem[] = [
  // Easy (10)
  {
    id: "java-e1",
    title: "Hello World",
    difficulty: "Easy",
    topic: "Basics",
    description:
      "Write a Java program that prints 'Hello, World!' to the console.\n\nExpected Output:\nHello, World!",
    hint: "Use System.out.println().",
    starterCode:
      "public class Main {\n  public static void main(String[] args) {\n    // Your code here\n  }\n}",
  },
  {
    id: "java-e2",
    title: "Sum of Two Numbers",
    difficulty: "Easy",
    topic: "Basics",
    description:
      "Write a method that takes two integers and returns their sum.\n\nExample:\nInput: a=5, b=3\nOutput: 8",
    hint: "Use the + operator.",
    starterCode: "public static int sum(int a, int b) {\n  return 0;\n}",
  },
  {
    id: "java-e3",
    title: "Reverse a String",
    difficulty: "Easy",
    topic: "Strings",
    description:
      "Write a method to reverse a string in Java.\n\nExample:\nInput: 'hello'\nOutput: 'olleh'",
    hint: "Use StringBuilder.reverse() or a loop.",
    starterCode: 'public static String reverse(String s) {\n  return "";\n}',
  },
  {
    id: "java-e4",
    title: "Check Even or Odd",
    difficulty: "Easy",
    topic: "Conditionals",
    description:
      "Write a method that returns true if a number is even.\n\nExample:\nInput: 4 → true\nInput: 7 → false",
    hint: "Use the modulo operator %.",
    starterCode: "public static boolean isEven(int n) {\n  return false;\n}",
  },
  {
    id: "java-e5",
    title: "Find Maximum",
    difficulty: "Easy",
    topic: "Arrays",
    description:
      "Find the maximum element in an integer array.\n\nExample:\nInput: [3, 7, 1, 9, 4]\nOutput: 9",
    hint: "Iterate through the array and keep track of the max.",
    starterCode: "public static int findMax(int[] arr) {\n  return 0;\n}",
  },
  {
    id: "java-e6",
    title: "Count Characters",
    difficulty: "Easy",
    topic: "Strings",
    description:
      "Count how many times a character appears in a string.\n\nExample:\nInput: s='hello', ch='l'\nOutput: 2",
    hint: "Loop through each character and compare.",
    starterCode:
      "public static int countChar(String s, char ch) {\n  return 0;\n}",
  },
  {
    id: "java-e7",
    title: "Print Multiplication Table",
    difficulty: "Easy",
    topic: "Loops",
    description:
      "Print the multiplication table of a number n up to 10.\n\nExample:\nInput: 3\nOutput: 3x1=3, 3x2=6, ..., 3x10=30",
    hint: "Use a for loop from 1 to 10.",
    starterCode:
      "public static void printTable(int n) {\n  // Your code here\n}",
  },
  {
    id: "java-e8",
    title: "Absolute Value",
    difficulty: "Easy",
    topic: "Math",
    description:
      "Return the absolute value of an integer without using Math.abs().\n\nExample:\nInput: -7\nOutput: 7",
    hint: "If n < 0, return -n.",
    starterCode: "public static int absVal(int n) {\n  return 0;\n}",
  },
  {
    id: "java-e9",
    title: "Array Sum",
    difficulty: "Easy",
    topic: "Arrays",
    description:
      "Compute the sum of all elements in an integer array.\n\nExample:\nInput: [1, 2, 3, 4, 5]\nOutput: 15",
    hint: "Loop and accumulate.",
    starterCode: "public static int arraySum(int[] arr) {\n  return 0;\n}",
  },
  {
    id: "java-e10",
    title: "Power of Two",
    difficulty: "Easy",
    topic: "Math",
    description:
      "Check if a number is a power of 2.\n\nExample:\nInput: 16 → true\nInput: 18 → false",
    hint: "Use the bit trick: n > 0 && (n & (n-1)) == 0.",
    starterCode:
      "public static boolean isPowerOfTwo(int n) {\n  return false;\n}",
  },

  // Medium (10)
  {
    id: "java-m1",
    title: "Factorial",
    difficulty: "Medium",
    topic: "Recursion",
    description:
      "Write a recursive method to compute n! (factorial of n).\n\nExample:\nInput: 5\nOutput: 120",
    hint: "Base case: factorial(0) = 1. Recursive: n * factorial(n-1).",
    starterCode: "public static long factorial(int n) {\n  return 0;\n}",
  },
  {
    id: "java-m2",
    title: "Palindrome Check",
    difficulty: "Medium",
    topic: "Strings",
    description:
      "Check if a given string is a palindrome (ignoring case).\n\nExample:\nInput: 'Racecar' → true\nInput: 'Hello' → false",
    hint: "Compare string with its reverse.",
    starterCode:
      "public static boolean isPalindrome(String s) {\n  return false;\n}",
  },
  {
    id: "java-m3",
    title: "Count Vowels",
    difficulty: "Medium",
    topic: "Strings",
    description:
      "Count the number of vowels (a, e, i, o, u) in a string.\n\nExample:\nInput: 'Hello World'\nOutput: 3",
    hint: "Loop through chars and check if each is a vowel.",
    starterCode: "public static int countVowels(String s) {\n  return 0;\n}",
  },
  {
    id: "java-m4",
    title: "Bubble Sort",
    difficulty: "Medium",
    topic: "Sorting",
    description:
      "Implement bubble sort to sort an array in ascending order.\n\nExample:\nInput: [5, 3, 8, 1, 2]\nOutput: [1, 2, 3, 5, 8]",
    hint: "Repeatedly swap adjacent elements if they are in wrong order.",
    starterCode:
      "public static void bubbleSort(int[] arr) {\n  // Your code here\n}",
  },
  {
    id: "java-m5",
    title: "Stack Implementation",
    difficulty: "Medium",
    topic: "Data Structures",
    description:
      "Implement a stack using an array with push, pop, and peek operations.",
    hint: "Use an int array and track the top index.",
    starterCode:
      "class Stack {\n  int[] data = new int[100];\n  int top = -1;\n\n  void push(int x) { /* Your code */ }\n  int pop() { return -1; }\n  int peek() { return -1; }\n}",
  },
  {
    id: "java-m6",
    title: "Anagram Check",
    difficulty: "Medium",
    topic: "Strings",
    description:
      "Check if two strings are anagrams of each other.\n\nExample:\n'listen' and 'silent' → true\n'hello' and 'world' → false",
    hint: "Sort both strings and compare, or use a char frequency map.",
    starterCode:
      "public static boolean isAnagram(String a, String b) {\n  return false;\n}",
  },
  {
    id: "java-m7",
    title: "Find Duplicates",
    difficulty: "Medium",
    topic: "Arrays",
    description:
      "Find all duplicate elements in an integer array.\n\nExample:\nInput: [1,2,3,2,4,3]\nOutput: [2, 3]",
    hint: "Use a HashSet to track seen elements.",
    starterCode:
      "public static List<Integer> findDuplicates(int[] arr) {\n  return new ArrayList<>();\n}",
  },
  {
    id: "java-m8",
    title: "Matrix Transpose",
    difficulty: "Medium",
    topic: "Arrays",
    description:
      "Transpose a square n×n matrix in place.\n\nExample:\n[[1,2],[3,4]] → [[1,3],[2,4]]",
    hint: "Swap matrix[i][j] with matrix[j][i] where j > i.",
    starterCode:
      "public static void transpose(int[][] matrix) {\n  // Your code here\n}",
  },
  {
    id: "java-m9",
    title: "FizzBuzz",
    difficulty: "Medium",
    topic: "Loops",
    description:
      "Print numbers from 1 to n. For multiples of 3 print 'Fizz', for multiples of 5 print 'Buzz', for multiples of both print 'FizzBuzz'.",
    hint: "Use modulo % to check divisibility.",
    starterCode: "public static void fizzBuzz(int n) {\n  // Your code here\n}",
  },
  {
    id: "java-m10",
    title: "Two Sum",
    difficulty: "Medium",
    topic: "Arrays",
    description:
      "Given an array and a target, return the indices of two numbers that add up to the target.\n\nExample:\nnums=[2,7,11,15], target=9 → [0,1]",
    hint: "Use a HashMap to store value→index.",
    starterCode:
      "public static int[] twoSum(int[] nums, int target) {\n  return new int[]{};\n}",
  },

  // Hard (10)
  {
    id: "java-h1",
    title: "Binary Search Tree",
    difficulty: "Hard",
    topic: "Trees",
    description:
      "Implement insert and search operations for a Binary Search Tree.\n\nFor insert(5, 3, 7, 1):\n- search(3) → true\n- search(6) → false",
    hint: "Go left if value < node, right if value > node.",
    starterCode:
      "class BST {\n  Node root;\n  class Node { int val; Node left, right; Node(int v){val=v;} }\n  void insert(int val) { }\n  boolean search(int val) { return false; }\n}",
  },
  {
    id: "java-h2",
    title: "Merge Sort",
    difficulty: "Hard",
    topic: "Sorting",
    description:
      "Implement merge sort in Java.\n\nExample:\nInput: [38, 27, 43, 3, 9, 82]\nOutput: [3, 9, 27, 38, 43, 82]",
    hint: "Divide the array in half, sort each half, merge back.",
    starterCode:
      "public static void mergeSort(int[] arr, int l, int r) { }\npublic static void merge(int[] arr, int l, int m, int r) { }",
  },
  {
    id: "java-h3",
    title: "LRU Cache",
    difficulty: "Hard",
    topic: "Design",
    description:
      "Design an LRU Cache with get(key) and put(key, value) operations running in O(1) time.",
    hint: "Use a HashMap + Doubly Linked List.",
    starterCode:
      "import java.util.*;\nclass LRUCache {\n  int capacity;\n  LRUCache(int c){this.capacity=c;}\n  int get(int key){return -1;}\n  void put(int key, int value){}\n}",
  },
  {
    id: "java-h4",
    title: "Graph BFS",
    difficulty: "Hard",
    topic: "Graphs",
    description:
      "Implement BFS on an adjacency list graph and return visited nodes in order.\n\nExample:\ngraph={0:[1,2], 1:[0,3]}, start=0 → [0,1,2,3]",
    hint: "Use a Queue and a visited set.",
    starterCode:
      "import java.util.*;\npublic static List<Integer> bfs(Map<Integer,List<Integer>> g, int start){\n  return new ArrayList<>();\n}",
  },
  {
    id: "java-h5",
    title: "Longest Common Substring",
    difficulty: "Hard",
    topic: "Dynamic Programming",
    description:
      "Find the length of the longest common substring of two strings.\n\nExample:\nInput: 'abcde', 'abfce'\nOutput: 2 (ab)",
    hint: "Use a 2D DP table; dp[i][j] = 1 + dp[i-1][j-1] if chars match.",
    starterCode:
      "public static int longestCommonSubstring(String a, String b){\n  return 0;\n}",
  },
  {
    id: "java-h6",
    title: "Dijkstra Shortest Path",
    difficulty: "Hard",
    topic: "Graphs",
    description:
      "Implement Dijkstra's shortest path algorithm.\n\nReturn shortest distances from source to all vertices.",
    hint: "Use a priority queue (min-heap) and relax edges.",
    starterCode:
      "public static int[] dijkstra(int[][] graph, int src){\n  return new int[]{};\n}",
  },
  {
    id: "java-h7",
    title: "Detect Cycle in Graph",
    difficulty: "Hard",
    topic: "Graphs",
    description:
      "Detect whether a directed graph has a cycle.\n\nReturn true if cycle exists.",
    hint: "Use DFS with a recursion stack.",
    starterCode:
      "public static boolean hasCycle(Map<Integer,List<Integer>> graph, int n){\n  return false;\n}",
  },
  {
    id: "java-h8",
    title: "Knapsack Problem",
    difficulty: "Hard",
    topic: "Dynamic Programming",
    description:
      "Solve the 0/1 knapsack problem.\n\nGiven weights, values, and capacity W, find the maximum value.\n\nExample:\nweights=[1,3,4,5], values=[1,4,5,7], W=7 → 9",
    hint: "Use a 2D DP table dp[i][w].",
    starterCode:
      "public static int knapsack(int[] w, int[] v, int W){\n  return 0;\n}",
  },
  {
    id: "java-h9",
    title: "Regular Expression Matching",
    difficulty: "Hard",
    topic: "Strings",
    description:
      "Implement regex matching with '.' (any char) and '*' (zero or more).\n\nExample:\nmatch('aa','a*') → true\nmatch('ab','.*') → true",
    hint: "Use DP or recursion with memoization.",
    starterCode:
      "public static boolean match(String s, String p){\n  return false;\n}",
  },
  {
    id: "java-h10",
    title: "Word Search",
    difficulty: "Hard",
    topic: "Backtracking",
    description:
      "Given a 2D board of characters, find if the word exists in the grid (horizontal/vertical/adjacent cells).\n\nExample:\nboard=[['A','B'],['C','D']], word='AB' → true",
    hint: "Use DFS backtracking marking visited cells.",
    starterCode:
      "public static boolean wordSearch(char[][] board, String word){\n  return false;\n}",
  },
];

// ─── PYTHON ──────────────────────────────────────────────────────────────────
const pythonProblems: Problem[] = [
  // Easy (10)
  {
    id: "py-e1",
    title: "Print Hello World",
    difficulty: "Easy",
    topic: "Basics",
    description: "Write a Python program that prints 'Hello, World!'",
    hint: "Use the print() function.",
    starterCode: "# Your code here",
  },
  {
    id: "py-e2",
    title: "List Sum",
    difficulty: "Easy",
    topic: "Lists",
    description:
      "Write a function that returns the sum of all numbers in a list.\n\nExample:\nInput: [1, 2, 3, 4, 5]\nOutput: 15",
    hint: "Use the built-in sum() or a loop.",
    starterCode: "def list_sum(nums):\n    pass",
  },
  {
    id: "py-e3",
    title: "Count Occurrences",
    difficulty: "Easy",
    topic: "Strings",
    description:
      "Count how many times a character appears in a string.\n\nExample:\nInput: s='hello', char='l'\nOutput: 2",
    hint: "Use str.count() or loop.",
    starterCode: "def count_char(s, char):\n    pass",
  },
  {
    id: "py-e4",
    title: "Swap Variables",
    difficulty: "Easy",
    topic: "Basics",
    description:
      "Swap two variables without using a third variable.\n\nExample:\na=5, b=10 → a=10, b=5",
    hint: "Python supports tuple unpacking: a, b = b, a",
    starterCode: "def swap(a, b):\n    return a, b",
  },
  {
    id: "py-e5",
    title: "Square Numbers",
    difficulty: "Easy",
    topic: "List Comprehension",
    description:
      "Return a list of squares from 1 to n.\n\nExample:\nInput: n=5\nOutput: [1, 4, 9, 16, 25]",
    hint: "Use [x**2 for x in range(1, n+1)]",
    starterCode: "def squares(n):\n    pass",
  },
  {
    id: "py-e6",
    title: "Reverse a List",
    difficulty: "Easy",
    topic: "Lists",
    description:
      "Reverse a list without using built-in reverse.\n\nExample:\nInput: [1,2,3,4]\nOutput: [4,3,2,1]",
    hint: "Slice with [::-1] or use a loop.",
    starterCode: "def reverse_list(lst):\n    pass",
  },
  {
    id: "py-e7",
    title: "Find Minimum",
    difficulty: "Easy",
    topic: "Lists",
    description:
      "Return the minimum value in a list without using min().\n\nExample:\nInput: [3,1,4,1,5]\nOutput: 1",
    hint: "Initialize with the first element, loop and compare.",
    starterCode: "def find_min(lst):\n    pass",
  },
  {
    id: "py-e8",
    title: "Odd or Even",
    difficulty: "Easy",
    topic: "Conditionals",
    description:
      "Return 'even' if number is even, 'odd' otherwise.\n\nExample:\nInput: 6 → 'even'\nInput: 7 → 'odd'",
    hint: "Use n % 2.",
    starterCode: "def odd_or_even(n):\n    pass",
  },
  {
    id: "py-e9",
    title: "String to List",
    difficulty: "Easy",
    topic: "Strings",
    description:
      "Split a sentence into a list of words.\n\nExample:\nInput: 'hello world'\nOutput: ['hello', 'world']",
    hint: "Use str.split().",
    starterCode: "def split_sentence(s):\n    pass",
  },
  {
    id: "py-e10",
    title: "Power Function",
    difficulty: "Easy",
    topic: "Math",
    description:
      "Compute x raised to the power y without using ** or pow().\n\nExample:\nInput: x=2, y=10\nOutput: 1024",
    hint: "Use a loop multiplying x, y times.",
    starterCode: "def power(x, y):\n    pass",
  },

  // Medium (10)
  {
    id: "py-m1",
    title: "Fibonacci",
    difficulty: "Medium",
    topic: "Recursion",
    description:
      "Return the nth Fibonacci number.\n\nExample:\nInput: 7\nOutput: 13",
    hint: "Use recursion with base cases for 0 and 1.",
    starterCode: "def fibonacci(n):\n    pass",
  },
  {
    id: "py-m2",
    title: "Remove Duplicates",
    difficulty: "Medium",
    topic: "Sets",
    description:
      "Remove duplicate values from a list while preserving order.\n\nExample:\nInput: [1,2,2,3,1,4]\nOutput: [1,2,3,4]",
    hint: "Use a set to track seen values.",
    starterCode: "def remove_duplicates(lst):\n    pass",
  },
  {
    id: "py-m3",
    title: "Flatten Nested List",
    difficulty: "Medium",
    topic: "Recursion",
    description:
      "Flatten a nested list.\n\nExample:\nInput: [1,[2,3],[4,[5,6]]]\nOutput: [1,2,3,4,5,6]",
    hint: "Recursively flatten each element that is a list.",
    starterCode: "def flatten(lst):\n    pass",
  },
  {
    id: "py-m4",
    title: "Word Frequency",
    difficulty: "Medium",
    topic: "Dictionaries",
    description:
      "Count the frequency of each word in a sentence.\n\nExample:\nInput: 'hello world hello'\nOutput: {'hello': 2, 'world': 1}",
    hint: "Use a dict and split() to get words.",
    starterCode: "def word_frequency(sentence):\n    pass",
  },
  {
    id: "py-m5",
    title: "Binary Search",
    difficulty: "Medium",
    topic: "Search",
    description:
      "Implement binary search on a sorted list.\n\nExample:\nInput: nums=[1,3,5,7,9], target=5\nOutput: 2 (index)",
    hint: "Use left and right pointers, compute mid.",
    starterCode: "def binary_search(nums, target):\n    return -1",
  },
  {
    id: "py-m6",
    title: "Anagram Check",
    difficulty: "Medium",
    topic: "Strings",
    description:
      "Check if two strings are anagrams.\n\nExample:\n'listen' and 'silent' → True",
    hint: "Sort both and compare, or use Counter.",
    starterCode: "def is_anagram(a, b):\n    pass",
  },
  {
    id: "py-m7",
    title: "Matrix Transpose",
    difficulty: "Medium",
    topic: "Lists",
    description:
      "Transpose a 2D matrix.\n\nExample:\n[[1,2],[3,4]] → [[1,3],[2,4]]",
    hint: "Use zip(*matrix) or nested loops.",
    starterCode: "def transpose(matrix):\n    pass",
  },
  {
    id: "py-m8",
    title: "Caesar Cipher",
    difficulty: "Medium",
    topic: "Strings",
    description:
      "Encode a string using Caesar cipher with shift k.\n\nExample:\nInput: 'abc', k=3\nOutput: 'def'",
    hint: "Use ord() and chr() to shift characters.",
    starterCode: "def caesar_cipher(s, k):\n    pass",
  },
  {
    id: "py-m9",
    title: "Merge Sorted Lists",
    difficulty: "Medium",
    topic: "Lists",
    description:
      "Merge two sorted lists into one sorted list.\n\nExample:\nInput: [1,3,5], [2,4,6]\nOutput: [1,2,3,4,5,6]",
    hint: "Use two pointers.",
    starterCode: "def merge_sorted(a, b):\n    pass",
  },
  {
    id: "py-m10",
    title: "Longest Word",
    difficulty: "Medium",
    topic: "Strings",
    description:
      "Find the longest word in a sentence.\n\nExample:\nInput: 'I love programming'\nOutput: 'programming'",
    hint: "Split the sentence and use max with key=len.",
    starterCode: "def longest_word(sentence):\n    pass",
  },

  // Hard (10)
  {
    id: "py-h1",
    title: "Longest Common Subsequence",
    difficulty: "Hard",
    topic: "Dynamic Programming",
    description:
      "Find the length of the longest common subsequence.\n\nExample:\nInput: 'ABCBDAB', 'BDCABA'\nOutput: 4",
    hint: "Use a 2D DP table.",
    starterCode: "def lcs(s1, s2):\n    return 0",
  },
  {
    id: "py-h2",
    title: "N-Queens Problem",
    difficulty: "Hard",
    topic: "Backtracking",
    description:
      "Return the number of ways to place N queens on an N×N board.\n\nExample:\nInput: n=4\nOutput: 2",
    hint: "Use backtracking checking row/col/diagonal conflicts.",
    starterCode: "def solve_n_queens(n):\n    return 0",
  },
  {
    id: "py-h3",
    title: "Graph BFS",
    difficulty: "Hard",
    topic: "Graphs",
    description:
      "Implement BFS and return visited nodes in order.\n\nExample:\ngraph={0:[1,2],1:[0,3]}, start=0 → [0,1,2,3]",
    hint: "Use a queue and a visited set.",
    starterCode:
      "from collections import deque\ndef bfs(graph, start):\n    return []",
  },
  {
    id: "py-h4",
    title: "Knapsack 0/1",
    difficulty: "Hard",
    topic: "Dynamic Programming",
    description:
      "Solve the 0/1 knapsack problem.\n\nExample:\nweights=[1,3,4,5], values=[1,4,5,7], W=7 → 9",
    hint: "Use a 2D DP table.",
    starterCode: "def knapsack(weights, values, W):\n    return 0",
  },
  {
    id: "py-h5",
    title: "Trie Implementation",
    difficulty: "Hard",
    topic: "Data Structures",
    description: "Implement a Trie with insert(word) and search(word) methods.",
    hint: "Each node is a dict of children + an end flag.",
    starterCode:
      "class Trie:\n    def __init__(self): self.root = {}\n    def insert(self, word): pass\n    def search(self, word): return False",
  },
  {
    id: "py-h6",
    title: "Sudoku Solver",
    difficulty: "Hard",
    topic: "Backtracking",
    description:
      "Solve a 9x9 Sudoku puzzle using backtracking.\n\nReturn the filled board.",
    hint: "Try digits 1-9, backtrack when stuck.",
    starterCode: "def solve_sudoku(board):\n    pass",
  },
  {
    id: "py-h7",
    title: "Word Break",
    difficulty: "Hard",
    topic: "Dynamic Programming",
    description:
      "Given a string and a word dictionary, determine if the string can be segmented into dictionary words.\n\nExample:\nInput: s='leetcode', wordDict=['leet','code'] → True",
    hint: "Use DP dp[i] = any(dp[j] and s[j:i] in dict).",
    starterCode: "def word_break(s, wordDict):\n    return False",
  },
  {
    id: "py-h8",
    title: "Merge K Sorted Lists",
    difficulty: "Hard",
    topic: "Heaps",
    description:
      "Merge k sorted lists into one sorted list.\n\nExample:\nInput: [[1,4,5],[1,3,4],[2,6]]\nOutput: [1,1,2,3,4,4,5,6]",
    hint: "Use a min-heap (heapq).",
    starterCode: "import heapq\ndef merge_k_lists(lists):\n    return []",
  },
  {
    id: "py-h9",
    title: "Regular Expression Match",
    difficulty: "Hard",
    topic: "Strings",
    description:
      "Implement regex matching with '.' and '*'.\n\nExample:\nmatch('aa','a*') → True\nmatch('ab','.*') → True",
    hint: "Use DP or recursion with memoization.",
    starterCode: "def match(s, p):\n    return False",
  },
  {
    id: "py-h10",
    title: "Alien Dictionary",
    difficulty: "Hard",
    topic: "Graphs",
    description:
      "Given a sorted list of words from an alien language, find the order of characters.\n\nExample:\nwords=['wrt','wrf','er','ett','rftt'] → 'wertf'",
    hint: "Build a directed graph from adjacent word comparisons, then topological sort.",
    starterCode: "def alien_order(words):\n    return ''",
  },
];

// ─── C ────────────────────────────────────────────────────────────────────────
const cProblems: Problem[] = [
  // Easy (10)
  {
    id: "c-e1",
    title: "Print Hello World",
    difficulty: "Easy",
    topic: "Basics",
    description: "Write a C program that prints 'Hello, World!'",
    hint: "Use printf() and include <stdio.h>.",
    starterCode:
      "#include <stdio.h>\nint main() {\n  // Your code\n  return 0;\n}",
  },
  {
    id: "c-e2",
    title: "Add Two Numbers",
    difficulty: "Easy",
    topic: "Basics",
    description: "Return the sum of two integers.\n\nadd(3, 4) → 7",
    hint: "Use the + operator.",
    starterCode: "int add(int a, int b) {\n  return 0;\n}",
  },
  {
    id: "c-e3",
    title: "Find Largest",
    difficulty: "Easy",
    topic: "Conditionals",
    description:
      "Find the largest of three numbers.\n\nExample:\nInput: 3, 7, 5\nOutput: 7",
    hint: "Use if-else comparisons.",
    starterCode: "int findLargest(int a, int b, int c) {\n  return 0;\n}",
  },
  {
    id: "c-e4",
    title: "String Length",
    difficulty: "Easy",
    topic: "Strings",
    description:
      "Compute the length of a C string without strlen().\n\nInput: 'hello'\nOutput: 5",
    hint: "Loop until you hit the null terminator '\\0'.",
    starterCode: "int strLen(char* s) {\n  return 0;\n}",
  },
  {
    id: "c-e5",
    title: "Swap Using Pointers",
    difficulty: "Easy",
    topic: "Pointers",
    description: "Swap two integers using pointers.\n\na=5, b=10 → a=10, b=5",
    hint: "Use a temp variable and dereference the pointers.",
    starterCode: "void swap(int* a, int* b) {\n  // Your code\n}",
  },
  {
    id: "c-e6",
    title: "Power Function",
    difficulty: "Easy",
    topic: "Math",
    description:
      "Compute base raised to exponent using a loop.\n\npow(2,8) → 256",
    hint: "Multiply base by itself exp times.",
    starterCode: "int power(int base, int exp) {\n  return 1;\n}",
  },
  {
    id: "c-e7",
    title: "Check Palindrome",
    difficulty: "Easy",
    topic: "Strings",
    description: "Check if a string is a palindrome.\n\n'racecar' → 1 (true)",
    hint: "Compare characters from both ends.",
    starterCode: "int isPalindrome(char* s) {\n  return 0;\n}",
  },
  {
    id: "c-e8",
    title: "Count Digits",
    difficulty: "Easy",
    topic: "Math",
    description:
      "Count the number of digits in an integer.\n\nInput: 12345\nOutput: 5",
    hint: "Divide by 10 until 0.",
    starterCode: "int countDigits(int n) {\n  return 0;\n}",
  },
  {
    id: "c-e9",
    title: "Sum of Array",
    difficulty: "Easy",
    topic: "Arrays",
    description:
      "Compute the sum of all elements in an integer array.\n\nInput: [1,2,3,4,5]\nOutput: 15",
    hint: "Loop and accumulate.",
    starterCode: "int arraySum(int arr[], int n) {\n  return 0;\n}",
  },
  {
    id: "c-e10",
    title: "Odd or Even",
    difficulty: "Easy",
    topic: "Conditionals",
    description: "Print 'Even' if number is even, 'Odd' otherwise.",
    hint: "Use modulo %.",
    starterCode: "void oddOrEven(int n) {\n  // Your code\n}",
  },

  // Medium (10)
  {
    id: "c-m1",
    title: "Reverse Array",
    difficulty: "Medium",
    topic: "Arrays",
    description:
      "Reverse an integer array in place.\n\nInput: [1,2,3,4,5]\nOutput: [5,4,3,2,1]",
    hint: "Use two pointers from both ends.",
    starterCode: "void reverseArray(int arr[], int n) {\n  // Your code\n}",
  },
  {
    id: "c-m2",
    title: "Linear Search",
    difficulty: "Medium",
    topic: "Search",
    description:
      "Search for target in array, return its index.\n\narr=[1,3,5,7], target=5 → 2",
    hint: "Loop and compare.",
    starterCode:
      "int linearSearch(int arr[], int n, int target) {\n  return -1;\n}",
  },
  {
    id: "c-m3",
    title: "Fibonacci Iterative",
    difficulty: "Medium",
    topic: "Loops",
    description:
      "Compute nth Fibonacci number iteratively.\n\nInput: 8\nOutput: 21",
    hint: "Use two variables for prev and curr.",
    starterCode: "int fibonacci(int n) {\n  return 0;\n}",
  },
  {
    id: "c-m4",
    title: "Count Words in String",
    difficulty: "Medium",
    topic: "Strings",
    description:
      "Count the number of words in a string.\n\nInput: 'hello world foo'\nOutput: 3",
    hint: "Count transitions from space to non-space.",
    starterCode: "int countWords(char* s) {\n  return 0;\n}",
  },
  {
    id: "c-m5",
    title: "Matrix Multiplication",
    difficulty: "Medium",
    topic: "Arrays",
    description:
      "Multiply two 2×2 matrices.\n\nA={{1,2},{3,4}}, B={{5,6},{7,8}} → {{19,22},{43,50}}",
    hint: "Use nested loops: C[i][j] += A[i][k]*B[k][j].",
    starterCode:
      "void multiply(int A[2][2], int B[2][2], int C[2][2]) {\n  // Your code\n}",
  },
  {
    id: "c-m6",
    title: "Bubble Sort",
    difficulty: "Medium",
    topic: "Sorting",
    description:
      "Sort an array using Bubble Sort.\n\nInput: [5,3,8,1]\nOutput: [1,3,5,8]",
    hint: "Swap adjacent elements if out of order.",
    starterCode: "void bubbleSort(int arr[], int n) {\n  // Your code\n}",
  },
  {
    id: "c-m7",
    title: "GCD",
    difficulty: "Medium",
    topic: "Math",
    description:
      "Compute GCD of two numbers using Euclidean algorithm.\n\ngcd(48, 18) → 6",
    hint: "gcd(a,b) = gcd(b, a%b) until b=0.",
    starterCode: "int gcd(int a, int b) {\n  return 0;\n}",
  },
  {
    id: "c-m8",
    title: "String Concatenation",
    difficulty: "Medium",
    topic: "Strings",
    description:
      "Concatenate two strings without using strcat().\n\nResult: 'hello' + ' world' = 'hello world'",
    hint: "Find end of first string, then copy second.",
    starterCode: "void myStrcat(char* dest, char* src) {\n  // Your code\n}",
  },
  {
    id: "c-m9",
    title: "Binary Search",
    difficulty: "Medium",
    topic: "Search",
    description:
      "Implement binary search on a sorted array.\n\narr=[1,3,5,7,9], target=5 → 2",
    hint: "Use low/high pointers and compute mid.",
    starterCode:
      "int binarySearch(int arr[], int n, int target) {\n  return -1;\n}",
  },
  {
    id: "c-m10",
    title: "Check Anagram",
    difficulty: "Medium",
    topic: "Strings",
    description:
      "Check if two strings are anagrams.\n\n'listen' and 'silent' → 1 (true)",
    hint: "Count character frequencies and compare.",
    starterCode: "int isAnagram(char* a, char* b) {\n  return 0;\n}",
  },

  // Hard (10)
  {
    id: "c-h1",
    title: "Linked List Insert",
    difficulty: "Hard",
    topic: "Pointers",
    description: "Insert a node at the end of a singly linked list.",
    hint: "Traverse to the last node and set its next pointer.",
    starterCode:
      "struct Node { int data; struct Node* next; };\nstruct Node* insertEnd(struct Node* head, int data) {\n  return head;\n}",
  },
  {
    id: "c-h2",
    title: "Quicksort",
    difficulty: "Hard",
    topic: "Sorting",
    description:
      "Implement Quicksort.\n\nInput: [3,6,8,10,1,2,1]\nOutput: [1,1,2,3,6,8,10]",
    hint: "Choose pivot, partition, recurse.",
    starterCode:
      "void quicksort(int arr[], int low, int high) { }\nint partition(int arr[], int low, int high) { return 0; }",
  },
  {
    id: "c-h3",
    title: "Dynamic Memory Allocation",
    difficulty: "Hard",
    topic: "Memory",
    description:
      "Create a dynamic array of n integers using malloc, fill with squares, then return it.",
    hint: "Use malloc() and free().",
    starterCode:
      "#include <stdlib.h>\nint* squaresArray(int n) {\n  return NULL;\n}",
  },
  {
    id: "c-h4",
    title: "Reverse Linked List",
    difficulty: "Hard",
    topic: "Pointers",
    description: "Reverse a singly linked list.\n\n1→2→3→4 becomes 4→3→2→1",
    hint: "Use prev, curr, next pointers.",
    starterCode: "struct Node* reverse(struct Node* head) {\n  return NULL;\n}",
  },
  {
    id: "c-h5",
    title: "Stack Using Linked List",
    difficulty: "Hard",
    topic: "Data Structures",
    description: "Implement a stack using a linked list with push and pop.",
    hint: "Push = prepend node. Pop = remove head.",
    starterCode:
      "struct Node { int data; struct Node* next; };\nstruct Node* top = NULL;\nvoid push(int x) { }\nint pop() { return -1; }",
  },
  {
    id: "c-h6",
    title: "Tower of Hanoi",
    difficulty: "Hard",
    topic: "Recursion",
    description: "Solve the Tower of Hanoi for n disks.\n\nPrint each move.",
    hint: "Recursively move n-1 disks, then move disk n, then move n-1 again.",
    starterCode:
      "void hanoi(int n, char from, char to, char via) {\n  // Your code\n}",
  },
  {
    id: "c-h7",
    title: "Binary Tree Inorder",
    difficulty: "Hard",
    topic: "Trees",
    description: "Implement an inorder traversal of a binary tree.",
    hint: "Recurse left, visit root, recurse right.",
    starterCode:
      "struct Node { int val; struct Node *left, *right; };\nvoid inorder(struct Node* root) { }",
  },
  {
    id: "c-h8",
    title: "Merge Sort",
    difficulty: "Hard",
    topic: "Sorting",
    description:
      "Implement Merge Sort.\n\nInput: [38,27,43,3]\nOutput: [3,27,38,43]",
    hint: "Divide, sort halves, merge.",
    starterCode:
      "void mergeSort(int arr[], int l, int r) { }\nvoid merge(int arr[], int l, int m, int r) { }",
  },
  {
    id: "c-h9",
    title: "Hash Table",
    difficulty: "Hard",
    topic: "Data Structures",
    description:
      "Implement a simple hash table with insert and lookup using chaining.",
    hint: "Use an array of linked lists as buckets.",
    starterCode:
      "#define SIZE 100\nstruct Entry { int key; int val; struct Entry* next; };\nstruct Entry* table[SIZE];\nvoid insert(int key, int val) { }\nint lookup(int key) { return -1; }",
  },
  {
    id: "c-h10",
    title: "File Word Count",
    difficulty: "Hard",
    topic: "File I/O",
    description:
      "Read a text string and count the frequency of each word, then print them sorted.",
    hint: "Use a struct array or hash map to track frequencies.",
    starterCode: "void wordCount(char* text) {\n  // Your code\n}",
  },
];

// ─── DSA ─────────────────────────────────────────────────────────────────────
const dsaProblems: Problem[] = [
  // Easy (10)
  {
    id: "dsa-e1",
    title: "Two Sum",
    difficulty: "Easy",
    topic: "Arrays",
    description:
      "Return indices of two numbers that sum to target.\n\nnums=[2,7,11,15], target=9 → [0,1]",
    hint: "Use a hash map for complement lookups.",
    starterCode: "function twoSum(nums, target) {\n  return [];\n}",
  },
  {
    id: "dsa-e2",
    title: "Valid Parentheses",
    difficulty: "Easy",
    topic: "Stacks",
    description:
      "Check if a bracket string is valid.\n\n'()[]{}' → true\n'([)]' → false",
    hint: "Push open brackets, pop and verify close brackets.",
    starterCode: "function isValid(s) {\n  return false;\n}",
  },
  {
    id: "dsa-e3",
    title: "Reverse Linked List",
    difficulty: "Easy",
    topic: "Linked Lists",
    description: "Reverse a singly linked list.\n\n1→2→3→4→5 becomes 5→4→3→2→1",
    hint: "Use three pointers: prev, curr, next.",
    starterCode:
      "function reverseList(head) {\n  let prev = null, curr = head;\n  return prev;\n}",
  },
  {
    id: "dsa-e4",
    title: "Maximum Subarray",
    difficulty: "Easy",
    topic: "Arrays",
    description:
      "Find the contiguous subarray with the largest sum (Kadane's).\n\nInput: [-2,1,-3,4,-1,2,1,-5,4]\nOutput: 6",
    hint: "Track current sum and max sum as you iterate.",
    starterCode: "function maxSubArray(nums) {\n  return 0;\n}",
  },
  {
    id: "dsa-e5",
    title: "Climbing Stairs",
    difficulty: "Easy",
    topic: "Dynamic Programming",
    description:
      "How many distinct ways to climb n steps (1 or 2 at a time)?\n\nn=3 → 3 ways",
    hint: "This is essentially Fibonacci.",
    starterCode: "function climbStairs(n) {\n  return 0;\n}",
  },
  {
    id: "dsa-e6",
    title: "Contains Duplicate",
    difficulty: "Easy",
    topic: "Arrays",
    description:
      "Return true if any value appears at least twice.\n\n[1,2,3,1] → true\n[1,2,3,4] → false",
    hint: "Use a Set.",
    starterCode: "function containsDuplicate(nums) {\n  return false;\n}",
  },
  {
    id: "dsa-e7",
    title: "Best Time to Buy Stock",
    difficulty: "Easy",
    topic: "Arrays",
    description:
      "Find max profit from buying then selling once.\n\nInput: [7,1,5,3,6,4]\nOutput: 5",
    hint: "Track min price seen so far.",
    starterCode: "function maxProfit(prices) {\n  return 0;\n}",
  },
  {
    id: "dsa-e8",
    title: "Missing Number",
    difficulty: "Easy",
    topic: "Arrays",
    description:
      "Find the missing number in range [0..n].\n\nInput: [3,0,1]\nOutput: 2",
    hint: "Expected sum = n*(n+1)/2, subtract array sum.",
    starterCode: "function missingNumber(nums) {\n  return 0;\n}",
  },
  {
    id: "dsa-e9",
    title: "Intersection of Two Arrays",
    difficulty: "Easy",
    topic: "Sets",
    description:
      "Return the intersection of two integer arrays.\n\nInput: [1,2,2,1], [2,2]\nOutput: [2]",
    hint: "Use a Set for each array.",
    starterCode: "function intersection(a, b) {\n  return [];\n}",
  },
  {
    id: "dsa-e10",
    title: "Majority Element",
    difficulty: "Easy",
    topic: "Arrays",
    description:
      "Find the element appearing more than n/2 times.\n\nInput: [3,2,3]\nOutput: 3",
    hint: "Boyer-Moore Voting Algorithm.",
    starterCode: "function majorityElement(nums) {\n  return 0;\n}",
  },

  // Medium (10)
  {
    id: "dsa-m1",
    title: "Binary Search",
    difficulty: "Medium",
    topic: "Search",
    description:
      "Search a sorted array in O(log n).\n\nnums=[-1,0,3,5,9,12], target=9 → 4",
    hint: "Use left/right pointers and compute mid.",
    starterCode:
      "function binarySearch(nums, target) {\n  let left = 0, right = nums.length-1;\n  return -1;\n}",
  },
  {
    id: "dsa-m2",
    title: "Level Order Traversal",
    difficulty: "Medium",
    topic: "Trees",
    description:
      "Return level-order traversal as array of arrays.\n\n    3\n   / \\\n  9  20\n → [[3],[9,20],...]",
    hint: "Use a queue (BFS).",
    starterCode: "function levelOrder(root) {\n  return [];\n}",
  },
  {
    id: "dsa-m3",
    title: "Merge Intervals",
    difficulty: "Medium",
    topic: "Arrays",
    description:
      "Merge overlapping intervals.\n\nInput: [[1,3],[2,6],[8,10]]\nOutput: [[1,6],[8,10]]",
    hint: "Sort by start, merge overlapping.",
    starterCode: "function merge(intervals) {\n  return [];\n}",
  },
  {
    id: "dsa-m4",
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    topic: "Strings",
    description:
      "Find the longest palindromic substring.\n\nInput: 'babad'\nOutput: 'bab' or 'aba'",
    hint: "Expand around center for each character.",
    starterCode: "function longestPalindrome(s) {\n  return '';\n}",
  },
  {
    id: "dsa-m5",
    title: "Number of Islands",
    difficulty: "Medium",
    topic: "Graphs",
    description:
      "Count islands in a grid.\n\ngrid=[['1','1','0'],['0','1','0'],['0','0','1']] → 2",
    hint: "Use DFS/BFS, mark visited cells.",
    starterCode: "function numIslands(grid) {\n  return 0;\n}",
  },
  {
    id: "dsa-m6",
    title: "Group Anagrams",
    difficulty: "Medium",
    topic: "Strings",
    description:
      "Group anagrams together.\n\nInput: ['eat','tea','tan','ate','nat','bat']\nOutput: [['eat','tea','ate'],['tan','nat'],['bat']]",
    hint: "Use sorted string as key in a map.",
    starterCode: "function groupAnagrams(strs) {\n  return [];\n}",
  },
  {
    id: "dsa-m7",
    title: "Product of Array Except Self",
    difficulty: "Medium",
    topic: "Arrays",
    description:
      "Return array where each element is product of all others (no division).\n\nInput: [1,2,3,4]\nOutput: [24,12,8,6]",
    hint: "Use prefix and suffix product arrays.",
    starterCode: "function productExceptSelf(nums) {\n  return [];\n}",
  },
  {
    id: "dsa-m8",
    title: "Kth Largest Element",
    difficulty: "Medium",
    topic: "Heaps",
    description:
      "Find kth largest element in an unsorted array.\n\nInput: [3,2,1,5,6,4], k=2\nOutput: 5",
    hint: "Use a min-heap of size k.",
    starterCode: "function findKthLargest(nums, k) {\n  return 0;\n}",
  },
  {
    id: "dsa-m9",
    title: "Subsets",
    difficulty: "Medium",
    topic: "Backtracking",
    description:
      "Return all possible subsets (power set).\n\nInput: [1,2,3]\nOutput: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]",
    hint: "Use backtracking adding/not adding each element.",
    starterCode: "function subsets(nums) {\n  return [];\n}",
  },
  {
    id: "dsa-m10",
    title: "Top K Frequent Elements",
    difficulty: "Medium",
    topic: "Heaps",
    description:
      "Return the k most frequent elements.\n\nInput: [1,1,1,2,2,3], k=2\nOutput: [1,2]",
    hint: "Use a map + bucket sort or heap.",
    starterCode: "function topKFrequent(nums, k) {\n  return [];\n}",
  },

  // Hard (10)
  {
    id: "dsa-h1",
    title: "Trapping Rain Water",
    difficulty: "Hard",
    topic: "Arrays",
    description:
      "Compute how much rainwater can be trapped.\n\nInput: [0,1,0,2,1,0,1,3,2,1,2,1]\nOutput: 6",
    hint: "Use two-pointer approach with leftMax and rightMax.",
    starterCode: "function trap(height) {\n  return 0;\n}",
  },
  {
    id: "dsa-h2",
    title: "Serialize and Deserialize Tree",
    difficulty: "Hard",
    topic: "Trees",
    description: "Serialize a binary tree to string and deserialize back.",
    hint: "Use pre-order DFS with null markers.",
    starterCode:
      "function serialize(root) { return ''; }\nfunction deserialize(data) { return null; }",
  },
  {
    id: "dsa-h3",
    title: "Word Ladder",
    difficulty: "Hard",
    topic: "Graphs",
    description:
      "Shortest transformation beginWord→endWord changing one letter at a time.\n\n'hit'→'cog' → 5",
    hint: "BFS level by level, replacing each character.",
    starterCode:
      "function ladderLength(beginWord, endWord, wordList) {\n  return 0;\n}",
  },
  {
    id: "dsa-h4",
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    topic: "Binary Search",
    description:
      "Find median of two sorted arrays in O(log(m+n)).\n\nInput: [1,3], [2]\nOutput: 2.0",
    hint: "Binary search on the smaller array.",
    starterCode: "function findMedianSortedArrays(a, b) {\n  return 0;\n}",
  },
  {
    id: "dsa-h5",
    title: "Minimum Window Substring",
    difficulty: "Hard",
    topic: "Sliding Window",
    description:
      "Find minimum window in s that contains all chars of t.\n\nInput: s='ADOBECODEBANC', t='ABC'\nOutput: 'BANC'",
    hint: "Use sliding window with char frequency maps.",
    starterCode: "function minWindow(s, t) {\n  return '';\n}",
  },
  {
    id: "dsa-h6",
    title: "Edit Distance",
    difficulty: "Hard",
    topic: "Dynamic Programming",
    description:
      "Find minimum operations (insert/delete/replace) to convert word1 to word2.\n\nInput: 'horse', 'ros'\nOutput: 3",
    hint: "Use a 2D DP table.",
    starterCode: "function minDistance(word1, word2) {\n  return 0;\n}",
  },
  {
    id: "dsa-h7",
    title: "Largest Rectangle in Histogram",
    difficulty: "Hard",
    topic: "Stacks",
    description:
      "Find the largest rectangle in a histogram.\n\nInput: [2,1,5,6,2,3]\nOutput: 10",
    hint: "Use a monotonic stack.",
    starterCode: "function largestRectangleArea(heights) {\n  return 0;\n}",
  },
  {
    id: "dsa-h8",
    title: "Burst Balloons",
    difficulty: "Hard",
    topic: "Dynamic Programming",
    description:
      "Maximize coins from bursting balloons.\n\nInput: [3,1,5,8]\nOutput: 167",
    hint: "Use interval DP; decide which balloon to burst last.",
    starterCode: "function maxCoins(nums) {\n  return 0;\n}",
  },
  {
    id: "dsa-h9",
    title: "Alien Dictionary",
    difficulty: "Hard",
    topic: "Graphs",
    description:
      "Given sorted alien words, find character order.\n\nwords=['wrt','wrf','er','ett','rftt'] → 'wertf'",
    hint: "Build a directed graph, topological sort.",
    starterCode: "function alienOrder(words) {\n  return '';\n}",
  },
  {
    id: "dsa-h10",
    title: "Longest Increasing Path in Matrix",
    difficulty: "Hard",
    topic: "Graphs",
    description:
      "Find the longest strictly increasing path in an m×n matrix.\n\nInput: [[9,9,4],[6,6,8],[2,1,1]]\nOutput: 4",
    hint: "DFS with memoization.",
    starterCode: "function longestIncreasingPath(matrix) {\n  return 0;\n}",
  },
];

// ─── FRONTEND ─────────────────────────────────────────────────────────────────
const frontendProblems: Problem[] = [
  // Easy (10)
  {
    id: "fe-e1",
    title: "Toggle Visibility",
    difficulty: "Easy",
    topic: "DOM",
    description:
      "Write JavaScript to toggle the visibility of a div on button click.\n\nHTML:\n<button id='btn'>Toggle</button>\n<div id='box'>Hello</div>",
    hint: "Use toggle style.display.",
    starterCode:
      "document.getElementById('btn').addEventListener('click', function() {\n  // Your code\n});",
  },
  {
    id: "fe-e2",
    title: "Change Text Content",
    difficulty: "Easy",
    topic: "DOM",
    description:
      "Change the text of a paragraph to 'Clicked!' when a button is pressed.",
    hint: "Use element.textContent = 'new text'.",
    starterCode:
      "// Access button and paragraph\n// Add click event\n// Change textContent",
  },
  {
    id: "fe-e3",
    title: "CSS Flexbox Center",
    difficulty: "Easy",
    topic: "CSS",
    description:
      "Write CSS to perfectly center a div both horizontally and vertically.",
    hint: "Use display:flex, justify-content:center, align-items:center on parent.",
    starterCode:
      ".container {\n  /* Your styles */\n}\n.box { width:100px; height:100px; background:blue; }",
  },
  {
    id: "fe-e4",
    title: "Form Validation",
    difficulty: "Easy",
    topic: "Forms",
    description:
      "Validate that name and email fields are not empty on submit. Show alert if validation fails.",
    hint: "Access input values with .value.trim() and check length.",
    starterCode:
      "document.getElementById('form').addEventListener('submit', function(e) {\n  e.preventDefault();\n  // Validate here\n});",
  },
  {
    id: "fe-e5",
    title: "Add List Items",
    difficulty: "Easy",
    topic: "DOM",
    description:
      "Dynamically add items to an unordered list when a button is clicked.",
    hint: "Use document.createElement('li') and ul.appendChild(li).",
    starterCode:
      "let count = 0;\nfunction addItem() {\n  count++;\n  // Create and add li\n}",
  },
  {
    id: "fe-e6",
    title: "Background Color Changer",
    difficulty: "Easy",
    topic: "DOM",
    description:
      "Change the background color of the page to a random color on button click.",
    hint: "Use Math.random() and document.body.style.backgroundColor.",
    starterCode:
      "function changeColor() {\n  // Generate random hex color and set background\n}",
  },
  {
    id: "fe-e7",
    title: "Image Gallery Toggle",
    difficulty: "Easy",
    topic: "DOM",
    description:
      "Show/hide an image when a button is clicked using CSS classes.",
    hint: "Toggle a 'hidden' CSS class with classList.toggle().",
    starterCode: "function toggleImage() {\n  // Your code\n}",
  },
  {
    id: "fe-e8",
    title: "Live Character Counter",
    difficulty: "Easy",
    topic: "Events",
    description:
      "Show live count of characters typed in a textarea.\n\nUpdate count on every keystroke.",
    hint: "Listen to 'input' event on textarea and update count.",
    starterCode:
      "const textarea = document.getElementById('text');\nconst counter = document.getElementById('count');\n// Your code",
  },
  {
    id: "fe-e9",
    title: "CSS Box Model",
    difficulty: "Easy",
    topic: "CSS",
    description:
      "Style a div with: width 200px, height 100px, 20px padding, 2px solid border, 10px margin.",
    hint: "Apply all box model properties in CSS.",
    starterCode: ".box {\n  /* Your styles */\n}",
  },
  {
    id: "fe-e10",
    title: "Accordion Toggle",
    difficulty: "Easy",
    topic: "DOM",
    description:
      "Create a simple accordion that shows/hides content when a heading is clicked.",
    hint: "Use max-height transition or display toggle.",
    starterCode:
      "function toggleAccordion(id) {\n  // Show/hide panel with id\n}",
  },

  // Medium (10)
  {
    id: "fe-m1",
    title: "Debounce Function",
    difficulty: "Medium",
    topic: "JavaScript",
    description:
      "Implement a debounce function that delays execution until after wait ms of inactivity.\n\nUsage: const fn = debounce(search, 300);",
    hint: "Use clearTimeout and setTimeout.",
    starterCode:
      "function debounce(fn, wait) {\n  return function(...args) {\n    // Debounced version\n  };\n}",
  },
  {
    id: "fe-m2",
    title: "Promise Chain",
    difficulty: "Medium",
    topic: "Async",
    description:
      "Fetch user data, then fetch their posts, return first post title. Use Promise chain or async/await.",
    hint: "Use fetch() and .then() or async/await.",
    starterCode:
      "async function getFirstPostTitle(userId) {\n  // Your code\n}",
  },
  {
    id: "fe-m3",
    title: "Custom Event Emitter",
    difficulty: "Medium",
    topic: "JavaScript",
    description:
      "Implement an EventEmitter class with on(), emit(), and off() methods.",
    hint: "Use a Map to store arrays of listeners per event.",
    starterCode:
      "class EventEmitter {\n  constructor() { this.events = {}; }\n  on(event, fn) { }\n  emit(event, data) { }\n  off(event, fn) { }\n}",
  },
  {
    id: "fe-m4",
    title: "CSS Grid Layout",
    difficulty: "Medium",
    topic: "CSS",
    description:
      "Create a responsive 3-column grid that collapses to 1 column on mobile (<600px).",
    hint: "Use grid-template-columns and @media query.",
    starterCode:
      ".grid {\n  display: grid;\n  /* Your styles */\n}\n@media (max-width:600px) {\n  .grid { /* Mobile */ }\n}",
  },
  {
    id: "fe-m5",
    title: "Local Storage Todo",
    difficulty: "Medium",
    topic: "Storage",
    description:
      "Build a todo list that persists in localStorage. Items survive page refresh.",
    hint: "Use localStorage.setItem/getItem with JSON.",
    starterCode:
      "function addTodo(text) { }\nfunction getTodos() { return []; }\nfunction removeTodo(id) { }",
  },
  {
    id: "fe-m6",
    title: "Throttle Function",
    difficulty: "Medium",
    topic: "JavaScript",
    description:
      "Implement a throttle function that limits calls to once per wait ms.\n\nUsage: const fn = throttle(scroll, 100);",
    hint: "Track the last call timestamp.",
    starterCode:
      "function throttle(fn, wait) {\n  return function(...args) {\n    // Throttled version\n  };\n}",
  },
  {
    id: "fe-m7",
    title: "Deep Clone Object",
    difficulty: "Medium",
    topic: "JavaScript",
    description:
      "Deep clone a nested object without using JSON.parse/stringify or libraries.",
    hint: "Recursively copy arrays and objects.",
    starterCode: "function deepClone(obj) {\n  // Your code\n  return {};\n}",
  },
  {
    id: "fe-m8",
    title: "Custom Promise",
    difficulty: "Medium",
    topic: "Async",
    description:
      "Implement a simplified Promise class with then() and catch().",
    hint: "Use callback arrays for resolve/reject handlers.",
    starterCode:
      "class MyPromise {\n  constructor(executor) { }\n  then(onFulfilled) { }\n  catch(onRejected) { }\n}",
  },
  {
    id: "fe-m9",
    title: "Infinite Scroll (Sentinel)",
    difficulty: "Medium",
    topic: "Performance",
    description: "Implement infinite scroll using IntersectionObserver.",
    hint: "Observe a sentinel element at the bottom.",
    starterCode:
      "let page = 1;\nfunction loadMore() { }\nfunction setup() {\n  // Setup IntersectionObserver\n}",
  },
  {
    id: "fe-m10",
    title: "Drag and Drop",
    difficulty: "Medium",
    topic: "Events",
    description: "Implement drag and drop to reorder a list of items.",
    hint: "Use dragstart, dragover, drop events.",
    starterCode:
      "// Set up drag events on list items\nfunction onDragStart(e) { }\nfunction onDrop(e) { }",
  },

  // Hard (10)
  {
    id: "fe-h1",
    title: "Virtual DOM Diff",
    difficulty: "Hard",
    topic: "Concepts",
    description:
      "Implement a diff algorithm comparing two virtual DOM trees and returning patches.\n\nvdom1={type:'div',children:['Hello']}\nvdom2={type:'div',children:['World']}",
    hint: "Compare type, props, and children recursively.",
    starterCode:
      "function diff(oldVdom, newVdom) {\n  const patches = [];\n  return patches;\n}",
  },
  {
    id: "fe-h2",
    title: "Implement useState",
    difficulty: "Hard",
    topic: "React Internals",
    description:
      "Implement a simplified React useState hook.\n\nconst [count, setCount] = useState(0);",
    hint: "Use a closure to store state value.",
    starterCode:
      "let state;\nfunction useState(initialValue) {\n  return [state, (val) => { state = val; }];\n}",
  },
  {
    id: "fe-h3",
    title: "Memoize Function",
    difficulty: "Hard",
    topic: "JavaScript",
    description:
      "Implement a memoize higher-order function.\n\nconst memo = memoize(slowFn);",
    hint: "Use a Map with JSON-stringified args as key.",
    starterCode:
      "function memoize(fn) {\n  return function(...args) {\n    // Return cached or compute\n  };\n}",
  },
  {
    id: "fe-h4",
    title: "Observable / RxJS-like",
    difficulty: "Hard",
    topic: "Reactive",
    description:
      "Implement a simple Observable with subscribe, map, and filter operators.",
    hint: "Each operator returns a new Observable wrapping the source.",
    starterCode:
      "class Observable {\n  constructor(subscriber) { this._subscriber = subscriber; }\n  subscribe(observer) { this._subscriber(observer); }\n  map(fn) { }\n  filter(pred) { }\n}",
  },
  {
    id: "fe-h5",
    title: "Render Markdown to HTML",
    difficulty: "Hard",
    topic: "Parsing",
    description:
      "Parse a subset of Markdown (headings, bold, lists) and return HTML string.\n\n'# Hi' → '<h1>Hi</h1>'",
    hint: "Use regex replacements line by line.",
    starterCode: "function markdownToHtml(md) {\n  return '';\n}",
  },
  {
    id: "fe-h6",
    title: "Curry Function",
    difficulty: "Hard",
    topic: "Functional",
    description:
      "Implement a curry function that supports partial application.\n\nconst add = curry((a,b,c) => a+b+c);\nadd(1)(2)(3) → 6",
    hint: "Return a new function until all args are collected.",
    starterCode:
      "function curry(fn) {\n  return function curried(...args) {\n    // Your code\n  };\n}",
  },
  {
    id: "fe-h7",
    title: "Web Worker Counter",
    difficulty: "Hard",
    topic: "Workers",
    description:
      "Move a heavy computation (count primes up to N) to a Web Worker and show result in UI.",
    hint: "Use new Worker(), postMessage, and onmessage.",
    starterCode:
      "// main.js\nconst worker = new Worker('worker.js');\nworker.postMessage(100000);\nworker.onmessage = (e) => { /* show e.data */ };",
  },
  {
    id: "fe-h8",
    title: "Implement Redux Store",
    difficulty: "Hard",
    topic: "State Management",
    description:
      "Implement a minimal Redux-like store with getState, dispatch, and subscribe.",
    hint: "State is updated by reducers. Subscribers notified on each dispatch.",
    starterCode:
      "function createStore(reducer, initialState) {\n  // Your code\n  return { getState, dispatch, subscribe };\n}",
  },
  {
    id: "fe-h9",
    title: "Canvas Animation",
    difficulty: "Hard",
    topic: "Canvas",
    description: "Animate a bouncing ball on an HTML5 canvas.",
    hint: "Use requestAnimationFrame and check boundary collisions.",
    starterCode:
      "const canvas = document.getElementById('canvas');\nconst ctx = canvas.getContext('2d');\nlet x=50, y=50, vx=2, vy=2;\nfunction animate() {\n  requestAnimationFrame(animate);\n  // Clear, update, draw\n}",
  },
  {
    id: "fe-h10",
    title: "Service Worker Cache",
    difficulty: "Hard",
    topic: "PWA",
    description:
      "Write a service worker that caches app shell resources on install and serves them offline.",
    hint: "Use Cache API in install event, intercept fetch in activate.",
    starterCode:
      "self.addEventListener('install', e => {\n  e.waitUntil(caches.open('v1').then(c => c.addAll(['/','index.html'])));\n});\nself.addEventListener('fetch', e => { /* Serve from cache */ });",
  },
];

// ─── SQL ─────────────────────────────────────────────────────────────────────
const sqlProblems: Problem[] = [
  // Easy (10)
  {
    id: "sql-e1",
    title: "Select All Rows",
    difficulty: "Easy",
    topic: "SELECT",
    description: "Select all rows from the 'employees' table.",
    hint: "Use SELECT * FROM table_name;",
    starterCode: "-- Write your SQL query here\n",
  },
  {
    id: "sql-e2",
    title: "Filter by Salary",
    difficulty: "Easy",
    topic: "WHERE",
    description: "Select employees whose salary > 50000.",
    hint: "Use WHERE salary > 50000",
    starterCode: "SELECT id, name, salary\nFROM employees\n-- Add condition",
  },
  {
    id: "sql-e3",
    title: "Count Employees",
    difficulty: "Easy",
    topic: "Aggregate",
    description: "Count the total number of employees.",
    hint: "Use COUNT(*)",
    starterCode: "SELECT -- Your query\nFROM employees;",
  },
  {
    id: "sql-e4",
    title: "Order by Name",
    difficulty: "Easy",
    topic: "ORDER BY",
    description:
      "Select all employees ordered alphabetically by name ascending.",
    hint: "Use ORDER BY name ASC",
    starterCode: "SELECT *\nFROM employees\n-- Add ORDER BY",
  },
  {
    id: "sql-e5",
    title: "Distinct Departments",
    difficulty: "Easy",
    topic: "DISTINCT",
    description: "Get a list of unique department names.",
    hint: "Use SELECT DISTINCT department",
    starterCode: "SELECT -- Your query\nFROM employees;",
  },
  {
    id: "sql-e6",
    title: "Limit Results",
    difficulty: "Easy",
    topic: "LIMIT",
    description: "Select only the first 5 employees.",
    hint: "Use LIMIT 5 at the end of the query.",
    starterCode: "SELECT *\nFROM employees\n-- Add LIMIT",
  },
  {
    id: "sql-e7",
    title: "Update a Record",
    difficulty: "Easy",
    topic: "UPDATE",
    description: "Update the salary of employee with id=1 to 75000.",
    hint: "Use UPDATE ... SET ... WHERE",
    starterCode: "UPDATE employees\n-- Your code",
  },
  {
    id: "sql-e8",
    title: "Insert a Record",
    difficulty: "Easy",
    topic: "INSERT",
    description:
      "Insert a new employee: id=101, name='Alice', salary=60000, department='Engineering'.",
    hint: "Use INSERT INTO ... VALUES (...)",
    starterCode: "INSERT INTO employees\n-- Your code",
  },
  {
    id: "sql-e9",
    title: "Delete a Record",
    difficulty: "Easy",
    topic: "DELETE",
    description: "Delete the employee with id=5.",
    hint: "Use DELETE FROM ... WHERE id=5",
    starterCode: "DELETE FROM employees\n-- Your code",
  },
  {
    id: "sql-e10",
    title: "String Pattern Search",
    difficulty: "Easy",
    topic: "LIKE",
    description: "Select employees whose name starts with 'A'.",
    hint: "Use WHERE name LIKE 'A%'",
    starterCode: "SELECT *\nFROM employees\n-- Add LIKE condition",
  },

  // Medium (10)
  {
    id: "sql-m1",
    title: "Avg Salary by Department",
    difficulty: "Medium",
    topic: "GROUP BY",
    description: "Calculate the average salary for each department.",
    hint: "Use GROUP BY with AVG()",
    starterCode:
      "SELECT department, AVG(salary) AS avg_salary\nFROM employees\n-- Add GROUP BY",
  },
  {
    id: "sql-m2",
    title: "Second Highest Salary",
    difficulty: "Medium",
    topic: "Subquery",
    description: "Find the second highest salary.",
    hint: "Use subquery with MAX() excluding the highest.",
    starterCode:
      "SELECT MAX(salary) AS second_highest\nFROM employees\nWHERE salary < (-- Subquery)",
  },
  {
    id: "sql-m3",
    title: "Employees with No Manager",
    difficulty: "Medium",
    topic: "NULL",
    description: "Find all employees who have no manager (manager_id is NULL).",
    hint: "Use WHERE manager_id IS NULL",
    starterCode: "SELECT *\nFROM employees\n-- Add condition",
  },
  {
    id: "sql-m4",
    title: "Inner Join",
    difficulty: "Medium",
    topic: "JOINS",
    description:
      "Join employees and departments to show employee name and department name.",
    hint: "Use INNER JOIN ON employees.dept_id = departments.id",
    starterCode: "SELECT e.name, d.dept_name\nFROM employees e\n-- Add JOIN",
  },
  {
    id: "sql-m5",
    title: "Count per Department Filter",
    difficulty: "Medium",
    topic: "HAVING",
    description: "Find departments with more than 5 employees.",
    hint: "Use GROUP BY + HAVING COUNT(*) > 5",
    starterCode:
      "SELECT department, COUNT(*) AS count\nFROM employees\nGROUP BY department\n-- Add HAVING",
  },
  {
    id: "sql-m6",
    title: "Left Outer Join",
    difficulty: "Medium",
    topic: "JOINS",
    description: "Show all departments, even those without employees.",
    hint: "Use LEFT JOIN.",
    starterCode:
      "SELECT d.dept_name, COUNT(e.id) AS emp_count\nFROM departments d\n-- Add LEFT JOIN\nGROUP BY d.dept_name;",
  },
  {
    id: "sql-m7",
    title: "Max Salary per Department",
    difficulty: "Medium",
    topic: "GROUP BY",
    description: "Find the maximum salary in each department.",
    hint: "Use GROUP BY department and MAX(salary).",
    starterCode:
      "SELECT department, MAX(salary) AS max_salary\nFROM employees\n-- Add GROUP BY",
  },
  {
    id: "sql-m8",
    title: "String Concatenation",
    difficulty: "Medium",
    topic: "Functions",
    description:
      "Create a full name by concatenating first_name and last_name with a space.",
    hint: "Use CONCAT(first_name,' ',last_name) or || operator.",
    starterCode: "SELECT -- Concatenate names\nFROM employees;",
  },
  {
    id: "sql-m9",
    title: "Date Filter",
    difficulty: "Medium",
    topic: "Date Functions",
    description: "Select employees hired in the year 2022.",
    hint: "Use YEAR(hire_date) = 2022 or EXTRACT(YEAR FROM hire_date).",
    starterCode: "SELECT *\nFROM employees\n-- Add date filter",
  },
  {
    id: "sql-m10",
    title: "Self Join",
    difficulty: "Medium",
    topic: "JOINS",
    description: "Show each employee alongside their manager's name.",
    hint: "Join employees table with itself on e.manager_id = m.id.",
    starterCode:
      "SELECT e.name AS employee, m.name AS manager\nFROM employees e\n-- Add self join",
  },

  // Hard (10)
  {
    id: "sql-h1",
    title: "Rank Employees by Salary",
    difficulty: "Hard",
    topic: "Window Functions",
    description:
      "Rank employees by salary within each department using RANK().",
    hint: "Use RANK() OVER (PARTITION BY department ORDER BY salary DESC)",
    starterCode:
      "SELECT name, department, salary,\n  -- Your RANK() here\nFROM employees;",
  },
  {
    id: "sql-h2",
    title: "Recursive CTE Hierarchy",
    difficulty: "Hard",
    topic: "CTE",
    description:
      "Use recursive CTE to find all employees under a given manager.",
    hint: "WITH RECURSIVE cte AS (base UNION ALL recursive)",
    starterCode:
      "WITH RECURSIVE hierarchy AS (\n  SELECT id, name, manager_id FROM employees WHERE id=1\n  UNION ALL\n  SELECT e.id, e.name, e.manager_id FROM employees e\n  -- JOIN with hierarchy\n)\nSELECT * FROM hierarchy;",
  },
  {
    id: "sql-h3",
    title: "Pivot Table",
    difficulty: "Hard",
    topic: "Advanced",
    description:
      "Convert rows to columns showing total sales per product per quarter.",
    hint: "Use CASE WHEN with SUM() to pivot.",
    starterCode:
      "SELECT product,\n  SUM(CASE WHEN quarter='Q1' THEN amount ELSE 0 END) AS Q1,\n  -- Add Q2, Q3, Q4\nFROM sales\nGROUP BY product;",
  },
  {
    id: "sql-h4",
    title: "Running Total",
    difficulty: "Hard",
    topic: "Window Functions",
    description: "Compute a running total of salary ordered by employee id.",
    hint: "Use SUM(salary) OVER (ORDER BY id)",
    starterCode:
      "SELECT id, name, salary,\n  SUM(salary) OVER (ORDER BY id) AS running_total\nFROM employees;",
  },
  {
    id: "sql-h5",
    title: "Nth Row per Group",
    difficulty: "Hard",
    topic: "Window Functions",
    description: "Find the top 3 highest-paid employees per department.",
    hint: "Use ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) and filter.",
    starterCode:
      "WITH ranked AS (\n  SELECT *, ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rn\n  FROM employees\n)\nSELECT * FROM ranked WHERE rn <= 3;",
  },
  {
    id: "sql-h6",
    title: "Gap and Island Problem",
    difficulty: "Hard",
    topic: "Advanced",
    description: "Find consecutive date ranges where employees were active.",
    hint: "Use ROW_NUMBER() difference trick to group consecutive dates.",
    starterCode:
      "-- Solve the gaps and islands problem\n-- Group consecutive active dates into ranges",
  },
  {
    id: "sql-h7",
    title: "Cumulative Percentage",
    difficulty: "Hard",
    topic: "Window Functions",
    description:
      "Show each employee's salary and their cumulative percentage of total payroll.",
    hint: "Use SUM(salary) OVER() for total and compute percentage.",
    starterCode:
      "SELECT name, salary,\n  ROUND(100.0 * salary / SUM(salary) OVER(), 2) AS pct\nFROM employees;",
  },
  {
    id: "sql-h8",
    title: "Median Salary",
    difficulty: "Hard",
    topic: "Advanced",
    description:
      "Find the median salary of all employees without using a built-in MEDIAN function.",
    hint: "Use PERCENTILE_CONT or the middle row approach with OFFSET.",
    starterCode:
      "-- Find median salary\nSELECT AVG(salary) AS median\nFROM (\n  SELECT salary FROM employees\n  ORDER BY salary\n  LIMIT 2 - (SELECT COUNT(*) FROM employees) % 2\n  OFFSET (SELECT (COUNT(*)-1)/2 FROM employees)\n) sub;",
  },
  {
    id: "sql-h9",
    title: "Most Recent Record per Group",
    difficulty: "Hard",
    topic: "Subquery",
    description: "Get the most recent order for each customer.",
    hint: "Use MAX(order_date) per customer or ROW_NUMBER().",
    starterCode:
      "SELECT customer_id, order_id, order_date\nFROM orders o\nWHERE order_date = (SELECT MAX(order_date) FROM orders WHERE customer_id = o.customer_id);",
  },
  {
    id: "sql-h10",
    title: "Duplicate Rows Detection",
    difficulty: "Hard",
    topic: "Advanced",
    description:
      "Find all rows in the employees table where (name, department) combination is duplicated.",
    hint: "Use COUNT(*) > 1 with GROUP BY or CTE.",
    starterCode:
      "SELECT name, department, COUNT(*) AS cnt\nFROM employees\nGROUP BY name, department\nHAVING COUNT(*) > 1;",
  },
];

// ─── PATTERNS ─────────────────────────────────────────────────────────────────
const patternProblems: Problem[] = [
  // Easy (10)
  {
    id: "pat-e1",
    title: "Right-Aligned Triangle",
    difficulty: "Easy",
    topic: "Loops",
    description:
      "Print a right-aligned triangle of stars for n=5:\n*\n**\n***\n****\n*****",
    hint: "Outer loop for rows, inner loop for stars.",
    starterCode:
      "function rightTriangle(n) {\n  let result = '';\n  return result;\n}",
  },
  {
    id: "pat-e2",
    title: "Inverted Triangle",
    difficulty: "Easy",
    topic: "Loops",
    description: "Print an inverted triangle for n=4:\n****\n***\n**\n*",
    hint: "Outer loop from n down to 1.",
    starterCode:
      "function invertedTriangle(n) {\n  let result = '';\n  return result;\n}",
  },
  {
    id: "pat-e3",
    title: "Number Triangle",
    difficulty: "Easy",
    topic: "Loops",
    description: "Print a number triangle for n=4:\n1\n12\n123\n1234",
    hint: "Inner loop prints numbers from 1 to current row.",
    starterCode:
      "function numberTriangle(n) {\n  let result = '';\n  return result;\n}",
  },
  {
    id: "pat-e4",
    title: "Same Number Rows",
    difficulty: "Easy",
    topic: "Loops",
    description: "Each row filled with its row number:\n1\n22\n333\n4444",
    hint: "Repeat the row number i for i times.",
    starterCode:
      "function sameNumberRows(n) {\n  let result = '';\n  return result;\n}",
  },
  {
    id: "pat-e5",
    title: "Alphabet Triangle",
    difficulty: "Easy",
    topic: "Loops",
    description: "Print an alphabet triangle for n=4:\nA\nAB\nABC\nABCD",
    hint: "Use String.fromCharCode(65 + j).",
    starterCode:
      "function alphabetTriangle(n) {\n  let result = '';\n  return result;\n}",
  },
  {
    id: "pat-e6",
    title: "Staircase Pattern",
    difficulty: "Easy",
    topic: "Loops",
    description:
      "Print a staircase of # characters for n=6:\n     #\n    ##\n   ###\n  ####\n #####\n######",
    hint: "Print (n-i) spaces then i # characters per row.",
    starterCode:
      "function staircase(n) {\n  let result = '';\n  return result;\n}",
  },
  {
    id: "pat-e7",
    title: "Square of Stars",
    difficulty: "Easy",
    topic: "Loops",
    description:
      "Print an n×n square of stars for n=4:\n****\n****\n****\n****",
    hint: "Use two nested loops.",
    starterCode:
      "function squareStars(n) {\n  let result = '';\n  return result;\n}",
  },
  {
    id: "pat-e8",
    title: "Counting Triangle",
    difficulty: "Easy",
    topic: "Loops",
    description:
      "Print a triangle where each row counts up from 1 continuously:\n1\n2 3\n4 5 6\n7 8 9 10",
    hint: "Maintain a counter that increments across rows.",
    starterCode:
      "function countingTriangle(n) {\n  let result = '';\n  let count = 1;\n  return result;\n}",
  },
  {
    id: "pat-e9",
    title: "Mirror Triangle",
    difficulty: "Easy",
    topic: "Loops",
    description:
      "Print a mirrored right triangle for n=4:\n   *\n  **\n ***\n****",
    hint: "Print (n-i) spaces then i stars.",
    starterCode:
      "function mirrorTriangle(n) {\n  let result = '';\n  return result;\n}",
  },
  {
    id: "pat-e10",
    title: "Binary Triangle",
    difficulty: "Easy",
    topic: "Loops",
    description: "Print alternating 0s and 1s per row:\n1\n01\n101\n0101",
    hint: "First element of row i is (i%2), then alternate.",
    starterCode:
      "function binaryTriangle(n) {\n  let result = '';\n  return result;\n}",
  },

  // Medium (10)
  {
    id: "pat-m1",
    title: "Pyramid",
    difficulty: "Medium",
    topic: "Patterns",
    description:
      "Print a centered star pyramid for n=5:\n    *\n   ***\n  *****\n *******\n*********",
    hint: "Print (n-i) spaces then (2i-1) stars.",
    starterCode:
      "function pyramid(n) {\n  let result = '';\n  return result;\n}",
  },
  {
    id: "pat-m2",
    title: "Diamond Pattern",
    difficulty: "Medium",
    topic: "Patterns",
    description:
      "Print a diamond of stars for n=4:\n   *\n  ***\n *****\n*******\n *****\n  ***\n   *",
    hint: "Upper half + mirrored lower half.",
    starterCode:
      "function diamond(n) {\n  let result = '';\n  return result;\n}",
  },
  {
    id: "pat-m3",
    title: "Hollow Square",
    difficulty: "Medium",
    topic: "Patterns",
    description:
      "Print a hollow square for n=5:\n*****\n*   *\n*   *\n*   *\n*****",
    hint: "Print stars only on borders.",
    starterCode:
      "function hollowSquare(n) {\n  let result = '';\n  return result;\n}",
  },
  {
    id: "pat-m4",
    title: "Pascal's Triangle",
    difficulty: "Medium",
    topic: "Patterns",
    description:
      "Print Pascal's Triangle for n=5:\n1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1",
    hint: "Each element = sum of two elements above.",
    starterCode:
      "function pascalsTriangle(n) {\n  let result = '';\n  return result;\n}",
  },
  {
    id: "pat-m5",
    title: "Zigzag Pattern",
    difficulty: "Medium",
    topic: "Patterns",
    description: "Print a zigzag star pattern for n=3 rows, width=9.",
    hint: "For each row, print star at column positions matching zigzag math.",
    starterCode:
      "function zigzag(n, width) {\n  let result = '';\n  return result;\n}",
  },
  {
    id: "pat-m6",
    title: "Hollow Pyramid",
    difficulty: "Medium",
    topic: "Patterns",
    description:
      "Print a hollow pyramid for n=5:\n    *\n   * *\n  *   *\n *     *\n*********",
    hint: "Print star only at edges of each row, spaces inside.",
    starterCode:
      "function hollowPyramid(n) {\n  let result = '';\n  return result;\n}",
  },
  {
    id: "pat-m7",
    title: "Cross Pattern",
    difficulty: "Medium",
    topic: "Patterns",
    description:
      "Print a cross (+) pattern for odd n=5:\n  *\n  *\n*****\n  *\n  *",
    hint: "Print star only at row == mid or col == mid.",
    starterCode: "function cross(n) {\n  let result = '';\n  return result;\n}",
  },
  {
    id: "pat-m8",
    title: "X Pattern",
    difficulty: "Medium",
    topic: "Patterns",
    description: "Print an X shape for n=5:\n*   *\n * *\n  *\n * *\n*   *",
    hint: "Print star at positions where row==col or row+col==n-1.",
    starterCode:
      "function xPattern(n) {\n  let result = '';\n  return result;\n}",
  },
  {
    id: "pat-m9",
    title: "Hollow Diamond",
    difficulty: "Medium",
    topic: "Patterns",
    description: "Print a hollow diamond for n=4.",
    hint: "Combine hollow pyramid and inverted hollow pyramid.",
    starterCode:
      "function hollowDiamond(n) {\n  let result = '';\n  return result;\n}",
  },
  {
    id: "pat-m10",
    title: "Number Pyramid",
    difficulty: "Medium",
    topic: "Patterns",
    description:
      "Print a number pyramid for n=5:\n    1\n   121\n  12321\n 1234321\n123454321",
    hint: "For row i, count up from 1 to i then down to 1.",
    starterCode:
      "function numberPyramid(n) {\n  let result = '';\n  return result;\n}",
  },

  // Hard (10)
  {
    id: "pat-h1",
    title: "Spiral Matrix",
    difficulty: "Hard",
    topic: "Matrix",
    description:
      "Generate an n×n matrix in spiral order.\n\nn=3:\n1 2 3\n8 9 4\n7 6 5",
    hint: "Track four boundaries and shrink inward.",
    starterCode:
      "function spiralMatrix(n) {\n  const m = Array.from({length:n},()=>new Array(n).fill(0));\n  return m;\n}",
  },
  {
    id: "pat-h2",
    title: "Number Butterfly",
    difficulty: "Hard",
    topic: "Patterns",
    description:
      "Print a butterfly of numbers for n=4:\n1      1\n12    21\n123  321\n12344321\n123  321\n12    21\n1      1",
    hint: "Mirror number triangle on both sides with spaces.",
    starterCode:
      "function butterfly(n) {\n  let result = '';\n  return result;\n}",
  },
  {
    id: "pat-h3",
    title: "Floyd's Triangle",
    difficulty: "Hard",
    topic: "Patterns",
    description: "Print Floyd's Triangle for n=4:\n1\n2 3\n4 5 6\n7 8 9 10",
    hint: "Maintain a counter that fills rows.",
    starterCode:
      "function floydsTriangle(n) {\n  let result = '';\n  let num = 1;\n  return result;\n}",
  },
  {
    id: "pat-h4",
    title: "Checkerboard",
    difficulty: "Hard",
    topic: "Matrix",
    description:
      "Print an n×n checkerboard of * and spaces for n=6:\n* * * \n * * *\n* * * \n * * *",
    hint: "Print star if (i+j) is even, space otherwise.",
    starterCode:
      "function checkerboard(n) {\n  let result = '';\n  return result;\n}",
  },
  {
    id: "pat-h5",
    title: "Rotating Spiral",
    difficulty: "Hard",
    topic: "Matrix",
    description: "Fill an n×n matrix in counter-clockwise spiral order.",
    hint: "Similar to clockwise but reverse direction at each boundary.",
    starterCode:
      "function spiralCCW(n) {\n  const m = Array.from({length:n},()=>new Array(n).fill(0));\n  return m;\n}",
  },
  {
    id: "pat-h6",
    title: "Wave Pattern",
    difficulty: "Hard",
    topic: "Patterns",
    description:
      "Sort an n×n matrix column-by-column in wave order (alternating ascending/descending).",
    hint: "Sort even-indexed cols ascending, odd-indexed descending.",
    starterCode: "function waveMatrix(matrix) {\n  return matrix;\n}",
  },
  {
    id: "pat-h7",
    title: "Snake Pattern",
    difficulty: "Hard",
    topic: "Matrix",
    description:
      "Fill an n×n matrix in snake (row-by-row alternating direction) order.",
    hint: "Fill even rows left-to-right, odd rows right-to-left.",
    starterCode:
      "function snakeMatrix(n) {\n  const m = Array.from({length:n},()=>new Array(n).fill(0));\n  return m;\n}",
  },
  {
    id: "pat-h8",
    title: "Star Hourglass",
    difficulty: "Hard",
    topic: "Patterns",
    description:
      "Print an hourglass of stars for n=4:\n*******\n *****\n  ***\n   *\n  ***\n *****\n*******",
    hint: "Decrease then increase star count, adjusting spaces.",
    starterCode:
      "function hourglass(n) {\n  let result = '';\n  return result;\n}",
  },
  {
    id: "pat-h9",
    title: "Diagonal Matrix",
    difficulty: "Hard",
    topic: "Matrix",
    description:
      "Print a matrix where diagonals are filled with the same number:\nFor n=4:\n1 2 3 4\n2 3 4 5\n3 4 5 6\n4 5 6 7",
    hint: "Each cell (i,j) = i + j + 1.",
    starterCode:
      "function diagonalMatrix(n) {\n  const m = Array.from({length:n},()=>new Array(n).fill(0));\n  return m;\n}",
  },
  {
    id: "pat-h10",
    title: "Concentric Squares",
    difficulty: "Hard",
    topic: "Matrix",
    description:
      "Print concentric square pattern for n=4:\n4 4 4 4 4 4 4\n4 3 3 3 3 3 4\n4 3 2 2 2 3 4\n4 3 2 1 2 3 4\n4 3 2 2 2 3 4\n4 3 3 3 3 3 4\n4 4 4 4 4 4 4",
    hint: "Each cell = min(min(i,j), min(n-1-i,n-1-j)) + 1.",
    starterCode:
      "function concentricSquares(n) {\n  const size = 2*n-1;\n  const m = Array.from({length:size},()=>new Array(size).fill(0));\n  return m;\n}",
  },
];

// ─── APTITUDE ─────────────────────────────────────────────────────────────────
const aptitudeProblems: Problem[] = [
  // Easy (10)
  {
    id: "apt-e1",
    title: "Simple Interest",
    difficulty: "Easy",
    topic: "Math",
    description:
      "Calculate Simple Interest.\nSI = (P × R × T) / 100\n\nP=1000, R=5, T=2 → SI=100",
    hint: "Apply the formula directly.",
    starterCode: "function simpleInterest(P, R, T) {\n  return 0;\n}",
  },
  {
    id: "apt-e2",
    title: "HCF of Two Numbers",
    difficulty: "Easy",
    topic: "Math",
    description:
      "Find HCF of two numbers using Euclidean algorithm.\n\nhcf(12, 8) → 4",
    hint: "hcf(a,b) = hcf(b, a%b) until b=0.",
    starterCode: "function hcf(a, b) {\n  return 0;\n}",
  },
  {
    id: "apt-e3",
    title: "LCM of Two Numbers",
    difficulty: "Easy",
    topic: "Math",
    description: "Find LCM of two numbers.\n\nlcm(4, 6) → 12",
    hint: "LCM(a,b) = (a*b)/HCF(a,b)",
    starterCode: "function lcm(a, b) {\n  return 0;\n}",
  },
  {
    id: "apt-e4",
    title: "Prime Check",
    difficulty: "Easy",
    topic: "Math",
    description:
      "Check if a number is prime.\n\nisPrime(7) → true\nisPrime(10) → false",
    hint: "Check divisibility up to √n.",
    starterCode: "function isPrime(n) {\n  return false;\n}",
  },
  {
    id: "apt-e5",
    title: "Sum of Digits",
    difficulty: "Easy",
    topic: "Math",
    description: "Compute sum of digits of a number.\n\ndigitSum(1234) → 10",
    hint: "Use modulo 10 to get last digit, divide by 10.",
    starterCode: "function digitSum(n) {\n  return 0;\n}",
  },
  {
    id: "apt-e6",
    title: "Percentage Calculation",
    difficulty: "Easy",
    topic: "Math",
    description:
      "Calculate what percentage of total is part.\n\npercentage(50, 200) → 25%",
    hint: "Formula: (part/total)*100",
    starterCode: "function percentage(part, total) {\n  return 0;\n}",
  },
  {
    id: "apt-e7",
    title: "Area of Circle",
    difficulty: "Easy",
    topic: "Geometry",
    description:
      "Calculate the area of a circle given its radius.\n\narea(7) → 153.94 (use π=3.14159)",
    hint: "Area = π * r²",
    starterCode: "function circleArea(r) {\n  return 0;\n}",
  },
  {
    id: "apt-e8",
    title: "Average of Numbers",
    difficulty: "Easy",
    topic: "Statistics",
    description:
      "Calculate the average of an array of numbers.\n\navg([10,20,30,40]) → 25",
    hint: "Sum all numbers and divide by count.",
    starterCode: "function average(nums) {\n  return 0;\n}",
  },
  {
    id: "apt-e9",
    title: "Reverse Number",
    difficulty: "Easy",
    topic: "Math",
    description: "Reverse the digits of a number.\n\nreverseNum(1234) → 4321",
    hint: "Use modulo to extract digits one by one.",
    starterCode: "function reverseNum(n) {\n  return 0;\n}",
  },
  {
    id: "apt-e10",
    title: "Missing Number in Series",
    difficulty: "Easy",
    topic: "Series",
    description:
      "Find the missing number in an arithmetic series.\n\n[2, 4, 6, __, 10] → 8",
    hint: "Find the common difference and identify the gap.",
    starterCode: "function missingInSeries(arr) {\n  return 0;\n}",
  },

  // Medium (10)
  {
    id: "apt-m1",
    title: "Compound Interest",
    difficulty: "Medium",
    topic: "Finance",
    description:
      "Calculate Compound Interest.\nCI = P * (1 + R/100)^T - P\n\nP=1000, R=10, T=2 → CI=210",
    hint: "Use Math.pow() for the exponent.",
    starterCode: "function compoundInterest(P, R, T) {\n  return 0;\n}",
  },
  {
    id: "apt-m2",
    title: "Profit and Loss",
    difficulty: "Medium",
    topic: "Finance",
    description:
      "Calculate profit/loss percentage.\nProfit% = (SP-CP)/CP * 100\n\nCP=200, SP=250 → Profit: 25%",
    hint: "If SP > CP it's profit; else loss.",
    starterCode:
      "function profitLoss(CP, SP) {\n  return { type:'', percentage:0 };\n}",
  },
  {
    id: "apt-m3",
    title: "Speed Distance Time",
    difficulty: "Medium",
    topic: "Physics",
    description:
      "Solve for any variable given the other two.\nDistance = Speed × Time",
    hint: "Switch on the unknown variable.",
    starterCode: "function solve(unknown, known) {\n  return 0;\n}",
  },
  {
    id: "apt-m4",
    title: "Permutations",
    difficulty: "Medium",
    topic: "Combinatorics",
    description: "Calculate nPr = n! / (n-r)!\n\nP(5,2) → 20",
    hint: "Compute factorials and divide.",
    starterCode: "function permutation(n, r) {\n  return 0;\n}",
  },
  {
    id: "apt-m5",
    title: "Combinations",
    difficulty: "Medium",
    topic: "Combinatorics",
    description: "Calculate nCr = n! / (r! * (n-r)!)\n\nC(5,2) → 10",
    hint: "Compute factorials and divide.",
    starterCode: "function combination(n, r) {\n  return 0;\n}",
  },
  {
    id: "apt-m6",
    title: "Time and Work",
    difficulty: "Medium",
    topic: "Work",
    description:
      "A can finish work in a days, B in b days. How long together?\n\nA=6, B=12 → 4 days",
    hint: "Combined rate = 1/a + 1/b. Time = 1/rate.",
    starterCode: "function timeAndWork(a, b) {\n  return 0;\n}",
  },
  {
    id: "apt-m7",
    title: "Mixture and Alligation",
    difficulty: "Medium",
    topic: "Mixtures",
    description:
      "Two solutions with concentrations c1% and c2% are mixed in ratio r1:r2. Find the final concentration.",
    hint: "Final = (c1*r1 + c2*r2) / (r1+r2)",
    starterCode:
      "function mixtureConcentration(c1, c2, r1, r2) {\n  return 0;\n}",
  },
  {
    id: "apt-m8",
    title: "Number of Prime Factors",
    difficulty: "Medium",
    topic: "Math",
    description:
      "Count distinct prime factors of n.\n\nprimeFactors(12) → 2 (2 and 3)",
    hint: "Trial divide by primes up to √n.",
    starterCode: "function countPrimeFactors(n) {\n  return 0;\n}",
  },
  {
    id: "apt-m9",
    title: "Quadratic Roots",
    difficulty: "Medium",
    topic: "Algebra",
    description:
      "Find roots of ax²+bx+c=0 using the quadratic formula.\n\na=1, b=-5, c=6 → roots 3, 2",
    hint: "Discriminant = b²-4ac. Roots = (-b ± √D) / 2a.",
    starterCode: "function quadraticRoots(a, b, c) {\n  return [0, 0];\n}",
  },
  {
    id: "apt-m10",
    title: "Clock Angle Problem",
    difficulty: "Medium",
    topic: "Geometry",
    description:
      "Find the angle between hour and minute hands at a given time.\n\nTime: 3:00 → 90°",
    hint: "Hour hand: 0.5°/min, Minute hand: 6°/min.",
    starterCode: "function clockAngle(hours, minutes) {\n  return 0;\n}",
  },

  // Hard (10)
  {
    id: "apt-h1",
    title: "Train Crossing Problem",
    difficulty: "Hard",
    topic: "Speed & Distance",
    description:
      "Two trains L1 and L2 at speeds S1 and S2. Find time to cross each other.\n\nL1=100, L2=150, S1=60, S2=40 (same dir) → 12.5s",
    hint: "Same dir: relative speed=|S1-S2|. Opposite: S1+S2.",
    starterCode:
      "function trainCrossTime(L1, L2, S1, S2, sameDir) {\n  return 0;\n}",
  },
  {
    id: "apt-h2",
    title: "Pipe Fill Problem",
    difficulty: "Hard",
    topic: "Work & Time",
    description:
      "Pipes A and B fill tank in a and b hours. Pipe C empties in c hours. Time to fill?\n\nA=3, B=6, C=9 → ~2.57h",
    hint: "Rate = 1/a + 1/b - 1/c. Time = 1/Rate.",
    starterCode: "function tankFillTime(a, b, c) {\n  return 0;\n}",
  },
  {
    id: "apt-h3",
    title: "Age Ratio Problem",
    difficulty: "Hard",
    topic: "Algebra",
    description:
      "A:B age ratio is 3:5. After 10 years it is 5:7. Find current ages.\n\nExpected: A=15, B=25",
    hint: "Set up two equations and solve.",
    starterCode:
      "function solveAgeRatio(ratio1, ratio2, years) {\n  return { ageA:0, ageB:0 };\n}",
  },
  {
    id: "apt-h4",
    title: "Bankers Discount",
    difficulty: "Hard",
    topic: "Finance",
    description:
      "Calculate Banker's Discount.\nBD = Face Value × Rate × Time / 100\nTrue Discount = PW × Rate × Time / 100\n\nFV=1000, R=10, T=2 → BD=200, TD=166.67",
    hint: "PW = FV * 100 / (100 + R*T)",
    starterCode:
      "function bankersDiscount(FV, R, T) {\n  return { BD:0, TD:0 };\n}",
  },
  {
    id: "apt-h5",
    title: "Partnership Profit Split",
    difficulty: "Hard",
    topic: "Finance",
    description:
      "Partners A, B, C invest P1, P2, P3 for T1, T2, T3 months. Split profit proportionally.\n\nInvestments: 1000@12m, 2000@6m, 3000@4m → ratio 12:12:12 (equal)",
    hint: "Each share = investment × time. Split profit by ratio.",
    starterCode:
      "function splitProfit(investments, months, profit) {\n  return [];\n}",
  },
  {
    id: "apt-h6",
    title: "Boat and Stream",
    difficulty: "Hard",
    topic: "Speed",
    description:
      "A boat's speed in still water is u km/h, stream speed v km/h. Find time to travel d km upstream and return.\n\nu=10, v=2, d=24 → total 5h",
    hint: "Upstream speed = u-v, Downstream = u+v.",
    starterCode: "function boatTime(u, v, d) {\n  return 0;\n}",
  },
  {
    id: "apt-h7",
    title: "Calendar Problem",
    difficulty: "Hard",
    topic: "Date Math",
    description:
      "Find the day of the week for any given date (Zeller's or similar formula).\n\nDate: 1 Jan 2024 → Monday",
    hint: "Use Zeller's congruence formula.",
    starterCode: "function dayOfWeek(day, month, year) {\n  return '';\n}",
  },
  {
    id: "apt-h8",
    title: "Successive Discounts",
    difficulty: "Hard",
    topic: "Finance",
    description:
      "Calculate the final price after applying two successive discounts d1% and d2% on an original price.\n\nPrice=1000, d1=20%, d2=10% → 720",
    hint: "Apply d1 then d2: price*(1-d1/100)*(1-d2/100)",
    starterCode: "function successiveDiscount(price, d1, d2) {\n  return 0;\n}",
  },
  {
    id: "apt-h9",
    title: "Sieve of Eratosthenes",
    difficulty: "Hard",
    topic: "Math",
    description:
      "Find all prime numbers up to n using the Sieve of Eratosthenes.\n\nprimes(30) → [2,3,5,7,11,13,17,19,23,29]",
    hint: "Mark multiples of each prime as composite.",
    starterCode: "function sieve(n) {\n  return [];\n}",
  },
  {
    id: "apt-h10",
    title: "Number to Words",
    difficulty: "Hard",
    topic: "Math",
    description:
      "Convert an integer to its English word representation.\n\n1234 → 'One Thousand Two Hundred Thirty Four'",
    hint: "Handle billions, millions, thousands, hundreds, teens, and ones.",
    starterCode: "function numberToWords(n) {\n  return '';\n}",
  },
];

// ─── ADVANCED JAVA ─────────────────────────────────────────────────────────────
const advJavaProblems: Problem[] = [
  // Easy (10)
  {
    id: "aj-e1",
    title: "Lambda Expression",
    difficulty: "Easy",
    topic: "Lambdas",
    description:
      "Sort a list of strings by length using a lambda.\n\nInput: ['banana','apple','kiwi','cherry']\nOutput: ['kiwi','apple','banana','cherry']",
    hint: "Use list.sort((a,b) -> a.length() - b.length())",
    starterCode:
      "import java.util.*;\npublic static List<String> sortByLength(List<String> list) {\n  return list;\n}",
  },
  {
    id: "aj-e2",
    title: "Stream Filter",
    difficulty: "Easy",
    topic: "Streams",
    description:
      "Use Java Streams to filter even numbers from a list.\n\nInput: [1,2,3,4,5,6]\nOutput: [2,4,6]",
    hint: "Use stream().filter().collect(Collectors.toList())",
    starterCode:
      "import java.util.*;\nimport java.util.stream.*;\npublic static List<Integer> filterEvens(List<Integer> list) {\n  return list;\n}",
  },
  {
    id: "aj-e3",
    title: "Optional Handling",
    difficulty: "Easy",
    topic: "Optional",
    description: "Return the square of an Optional value, or -1 if empty.",
    hint: "Use optional.map().orElse()",
    starterCode:
      "import java.util.Optional;\npublic static int squareOrDefault(Optional<Integer> opt) {\n  return -1;\n}",
  },
  {
    id: "aj-e4",
    title: "Functional Interface",
    difficulty: "Easy",
    topic: "Functional",
    description:
      "Create a custom functional interface 'Transformer' and use it to double a number.",
    hint: "Use @FunctionalInterface annotation.",
    starterCode:
      "@FunctionalInterface\ninterface Transformer { int transform(int value); }\npublic static int doubleValue(int n) {\n  Transformer doubler = /* lambda */;\n  return doubler.transform(n);\n}",
  },
  {
    id: "aj-e5",
    title: "Method Reference",
    difficulty: "Easy",
    topic: "Method References",
    description: "Use a method reference to print each element of a list.",
    hint: "Use System.out::println as method reference.",
    starterCode:
      "import java.util.*;\npublic static void printAll(List<String> list) {\n  // Use method reference\n}",
  },
  {
    id: "aj-e6",
    title: "Stream Map",
    difficulty: "Easy",
    topic: "Streams",
    description:
      "Use Stream.map() to convert a list of integers to their squares.\n\nInput: [1,2,3,4]\nOutput: [1,4,9,16]",
    hint: "Use stream().map(x -> x*x).collect()",
    starterCode:
      "import java.util.*;\nimport java.util.stream.*;\npublic static List<Integer> squareAll(List<Integer> list) {\n  return list;\n}",
  },
  {
    id: "aj-e7",
    title: "Reduce Sum",
    difficulty: "Easy",
    topic: "Streams",
    description:
      "Use Stream.reduce() to compute the sum of all elements.\n\nInput: [1,2,3,4,5]\nOutput: 15",
    hint: "Use stream().reduce(0, Integer::sum)",
    starterCode:
      "import java.util.*;\npublic static int streamSum(List<Integer> list) {\n  return 0;\n}",
  },
  {
    id: "aj-e8",
    title: "Comparable Sorting",
    difficulty: "Easy",
    topic: "Comparisons",
    description: "Sort a list of Person objects by age using Comparable.",
    hint: "Implement compareTo() in Person class.",
    starterCode:
      "class Person implements Comparable<Person> {\n  String name; int age;\n  Person(String n, int a) { name=n; age=a; }\n  public int compareTo(Person other) { return 0; }\n}",
  },
  {
    id: "aj-e9",
    title: "String Join with Stream",
    difficulty: "Easy",
    topic: "Streams",
    description:
      "Join a list of strings with comma separator using Streams.\n\nInput: ['a','b','c'] → 'a,b,c'",
    hint: "Use Collectors.joining(',')",
    starterCode:
      "import java.util.*;\nimport java.util.stream.*;\npublic static String joinStrings(List<String> list) {\n  return '';\n}",
  },
  {
    id: "aj-e10",
    title: "Count with Stream",
    difficulty: "Easy",
    topic: "Streams",
    description:
      "Count how many elements in a list are greater than 10.\n\nInput: [5, 15, 3, 20, 8]\nOutput: 2",
    hint: "Use stream().filter().count()",
    starterCode:
      "import java.util.*;\npublic static long countGreaterThan10(List<Integer> list) {\n  return 0;\n}",
  },

  // Medium (10)
  {
    id: "aj-m1",
    title: "Generics Stack",
    difficulty: "Medium",
    topic: "Generics",
    description: "Implement a generic Stack<T> with push, pop, and peek.",
    hint: "Use ArrayList<T> internally.",
    starterCode:
      "import java.util.*;\npublic class Stack<T> {\n  private List<T> data = new ArrayList<>();\n  public void push(T item) { }\n  public T pop() { return null; }\n  public T peek() { return null; }\n}",
  },
  {
    id: "aj-m2",
    title: "Callable and Future",
    difficulty: "Medium",
    topic: "Concurrency",
    description: "Compute sum from 1 to n asynchronously using Callable.",
    hint: "Use ExecutorService.submit(callable).get()",
    starterCode:
      "import java.util.concurrent.*;\npublic static long asyncSum(int n) throws Exception {\n  ExecutorService exec = Executors.newSingleThreadExecutor();\n  Callable<Long> task = () -> 0L;\n  Future<Long> future = exec.submit(task);\n  return future.get();\n}",
  },
  {
    id: "aj-m3",
    title: "Collections Grouping",
    difficulty: "Medium",
    topic: "Streams",
    description:
      "Group words by first letter using Stream Collectors.\n\nInput: ['apple','avocado','banana','blueberry']\nOutput: {a:[apple,avocado], b:[banana,blueberry]}",
    hint: "Use Collectors.groupingBy(w -> w.charAt(0))",
    starterCode:
      "import java.util.*;\nimport java.util.stream.*;\npublic static Map<Character,List<String>> groupByFirstLetter(List<String> words) {\n  return new HashMap<>();\n}",
  },
  {
    id: "aj-m4",
    title: "Custom Exception",
    difficulty: "Medium",
    topic: "Exceptions",
    description:
      "Create 'InsufficientFundsException' and throw it in a bank withdrawal method.",
    hint: "Extend Exception class for checked exceptions.",
    starterCode:
      "class InsufficientFundsException extends Exception {\n  // Constructor\n}\nclass BankAccount {\n  double balance;\n  void withdraw(double amount) throws InsufficientFundsException { }\n}",
  },
  {
    id: "aj-m5",
    title: "Observer Pattern",
    difficulty: "Medium",
    topic: "Design Patterns",
    description:
      "Implement the Observer pattern with Subject and Observer interfaces.",
    hint: "Subject holds list of observers; notifyAll() calls update() on each.",
    starterCode:
      "interface Observer { void update(String event); }\ninterface Subject {\n  void attach(Observer o);\n  void detach(Observer o);\n  void notifyObservers(String event);\n}\nclass EventSource implements Subject { }",
  },
  {
    id: "aj-m6",
    title: "Stream FlatMap",
    difficulty: "Medium",
    topic: "Streams",
    description:
      "Flatten a list of lists into a single list using flatMap.\n\nInput: [[1,2],[3,4],[5]]\nOutput: [1,2,3,4,5]",
    hint: "Use stream().flatMap(Collection::stream).collect()",
    starterCode:
      "import java.util.*;\nimport java.util.stream.*;\npublic static List<Integer> flattenLists(List<List<Integer>> lists) {\n  return new ArrayList<>();\n}",
  },
  {
    id: "aj-m7",
    title: "Singleton Pattern",
    difficulty: "Medium",
    topic: "Design Patterns",
    description:
      "Implement a thread-safe Singleton using double-checked locking.",
    hint: "Use volatile keyword and synchronized block.",
    starterCode:
      "public class Singleton {\n  private static volatile Singleton instance;\n  private Singleton() {}\n  public static Singleton getInstance() {\n    return null;\n  }\n}",
  },
  {
    id: "aj-m8",
    title: "Builder Pattern",
    difficulty: "Medium",
    topic: "Design Patterns",
    description:
      "Implement Builder pattern for a Person object with optional fields.",
    hint: "Inner static Builder class with method chaining returning 'this'.",
    starterCode:
      "class Person {\n  String name; int age; String email;\n  static class Builder {\n    // Build Person step by step\n    public Person build() { return new Person(); }\n  }\n}",
  },
  {
    id: "aj-m9",
    title: "Synchronized Counter",
    difficulty: "Medium",
    topic: "Concurrency",
    description:
      "Implement a thread-safe counter that can be safely incremented from multiple threads.",
    hint: "Use synchronized keyword or AtomicInteger.",
    starterCode:
      "public class SafeCounter {\n  private int count = 0;\n  public synchronized void increment() { }\n  public synchronized int getCount() { return 0; }\n}",
  },
  {
    id: "aj-m10",
    title: "Functional Composition",
    difficulty: "Medium",
    topic: "Functional",
    description:
      "Compose two functions using Function.andThen() and Function.compose().\n\ndoubleIt.andThen(addTen).apply(5) → 20",
    hint: "Use java.util.function.Function interface.",
    starterCode:
      "import java.util.function.*;\npublic static int composeAndApply(int x) {\n  Function<Integer,Integer> doubleIt = n -> n * 2;\n  Function<Integer,Integer> addTen = n -> n + 10;\n  return 0;\n}",
  },

  // Hard (10)
  {
    id: "aj-h1",
    title: "CompletableFuture Chain",
    difficulty: "Hard",
    topic: "Async",
    description:
      "Chain three async operations:\n1. Fetch user\n2. Fetch orders for user\n3. Calculate total order amount\n\nReturn final total using CompletableFuture.",
    hint: "Use thenCompose() for dependent futures, thenApply() for transforms.",
    starterCode:
      "import java.util.concurrent.CompletableFuture;\npublic static CompletableFuture<Double> getTotalOrderAmount(int userId) {\n  return CompletableFuture.completedFuture(0.0);\n}",
  },
  {
    id: "aj-h2",
    title: "Thread-Safe Singleton DLC",
    difficulty: "Hard",
    topic: "Concurrency",
    description:
      "Implement thread-safe Singleton with Enum (the most robust approach in Java).",
    hint: "Enum guarantees single instance and thread safety.",
    starterCode:
      "public enum SingletonEnum {\n  INSTANCE;\n  public void doSomething() { }\n}",
  },
  {
    id: "aj-h3",
    title: "Custom Annotation Processor",
    difficulty: "Hard",
    topic: "Reflection",
    description:
      "Create @Validate annotation and use reflection to validate annotated fields are not null.",
    hint: "Use field.isAnnotationPresent() and field.get(object).",
    starterCode:
      "import java.lang.annotation.*;\nimport java.lang.reflect.*;\n@Retention(RetentionPolicy.RUNTIME)\n@Target(ElementType.FIELD)\n@interface Validate {}\nclass Validator {\n  public static void validate(Object obj) throws IllegalAccessException { }\n}",
  },
  {
    id: "aj-h4",
    title: "Generic Pair",
    difficulty: "Hard",
    topic: "Generics",
    description:
      "Implement a generic Pair<A,B> class with swap() method that returns Pair<B,A>.",
    hint: "Return new Pair<>(second, first) in swap().",
    starterCode:
      "public class Pair<A,B> {\n  final A first; final B second;\n  Pair(A a, B b) { first=a; second=b; }\n  public Pair<B,A> swap() { return null; }\n}",
  },
  {
    id: "aj-h5",
    title: "Reactive Stream Simulation",
    difficulty: "Hard",
    topic: "Reactive",
    description:
      "Simulate a simple reactive stream: create a Publisher that emits 1-10, a filter for evens, and a subscriber that collects results.",
    hint: "Use Observer pattern with typed generics.",
    starterCode:
      "interface Publisher<T> { void subscribe(Subscriber<T> s); }\ninterface Subscriber<T> { void onNext(T t); void onComplete(); }\n// Implement EvenFilter and CollectSubscriber",
  },
  {
    id: "aj-h6",
    title: "Fork/Join Sum",
    difficulty: "Hard",
    topic: "Concurrency",
    description:
      "Use ForkJoinPool to compute the sum of a large array in parallel.",
    hint: "Extend RecursiveTask<Long> and use fork()/join().",
    starterCode:
      "import java.util.concurrent.*;\nclass SumTask extends RecursiveTask<Long> {\n  int[] arr; int lo, hi;\n  SumTask(int[] a, int l, int h) { arr=a; lo=l; hi=h; }\n  protected Long compute() { return 0L; }\n}",
  },
  {
    id: "aj-h7",
    title: "Custom Iterator",
    difficulty: "Hard",
    topic: "Generics",
    description:
      "Implement a generic RangeIterator that iterates from start to end with a given step.",
    hint: "Implement Iterator<Integer> interface.",
    starterCode:
      "import java.util.Iterator;\npublic class RangeIterator implements Iterator<Integer> {\n  int current, end, step;\n  public boolean hasNext() { return false; }\n  public Integer next() { return 0; }\n}",
  },
  {
    id: "aj-h8",
    title: "Decorator Pattern",
    difficulty: "Hard",
    topic: "Design Patterns",
    description:
      "Implement Decorator pattern for a Coffee class that allows adding milk and sugar dynamically.",
    hint: "Each decorator wraps the base component and adds to its cost/description.",
    starterCode:
      "interface Coffee { String getDescription(); double getCost(); }\nclass SimpleCoffee implements Coffee {\n  public String getDescription() { return 'Coffee'; }\n  public double getCost() { return 1.0; }\n}",
  },
  {
    id: "aj-h9",
    title: "Immutable Builder",
    difficulty: "Hard",
    topic: "Design Patterns",
    description:
      "Create an immutable ImmutableUser class using the Builder pattern.",
    hint: "All fields final. Builder builds instance in build() method.",
    starterCode:
      "public final class ImmutableUser {\n  private final String name;\n  private final int age;\n  private final String email;\n  private ImmutableUser(Builder b) { name=b.name; age=b.age; email=b.email; }\n  public static class Builder {\n    String name; int age; String email;\n    public Builder name(String n) { name=n; return this; }\n    public ImmutableUser build() { return new ImmutableUser(this); }\n  }\n}",
  },
  {
    id: "aj-h10",
    title: "Parallel Merge Sort",
    difficulty: "Hard",
    topic: "Concurrency",
    description: "Implement parallel merge sort using ForkJoinPool.",
    hint: "Split array, fork each half, join and merge.",
    starterCode:
      "import java.util.concurrent.*;\nclass ParallelMergeSort extends RecursiveAction {\n  int[] arr; int lo, hi;\n  protected void compute() { }\n  void merge(int lo, int mid, int hi) { }\n}",
  },
];

export const COURSES: Course[] = [
  { id: "java", title: "Java", icon: "☕", problems: javaProblems },
  { id: "python", title: "Python", icon: "🐍", problems: pythonProblems },
  { id: "c", title: "C", icon: "⚙️", problems: cProblems },
  { id: "dsa", title: "DSA", icon: "🌲", problems: dsaProblems },
  { id: "frontend", title: "Frontend", icon: "🌐", problems: frontendProblems },
  { id: "sql", title: "SQL", icon: "🗄️", problems: sqlProblems },
  { id: "patterns", title: "Patterns", icon: "⭐", problems: patternProblems },
  { id: "aptitude", title: "Aptitude", icon: "🧮", problems: aptitudeProblems },
  {
    id: "advjava",
    title: "Advanced Java",
    icon: "🚀",
    problems: advJavaProblems,
  },
];
