import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Code2,
  Play,
  Terminal,
} from "lucide-react";
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

interface Course {
  id: string;
  title: string;
  icon: string;
  problems: Problem[];
}

const COURSES: Course[] = [
  {
    id: "java",
    title: "Java",
    icon: "☕",
    problems: [
      // Easy
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
        starterCode:
          "public static int sum(int a, int b) {\n  // Your code here\n  return 0;\n}",
      },
      {
        id: "java-e3",
        title: "Reverse a String",
        difficulty: "Easy",
        topic: "Strings",
        description:
          "Write a method to reverse a string in Java.\n\nExample:\nInput: 'hello'\nOutput: 'olleh'",
        hint: "Use StringBuilder.reverse() or a loop with charAt().",
        starterCode:
          'public static String reverse(String s) {\n  // Your code here\n  return "";\n}',
      },
      {
        id: "java-e4",
        title: "Check Even or Odd",
        difficulty: "Easy",
        topic: "Conditionals",
        description:
          "Write a method that returns true if a number is even.\n\nExample:\nInput: 4 → true\nInput: 7 → false",
        hint: "Use the modulo operator %.",
        starterCode:
          "public static boolean isEven(int n) {\n  // Your code here\n  return false;\n}",
      },
      {
        id: "java-e5",
        title: "Find Maximum",
        difficulty: "Easy",
        topic: "Arrays",
        description:
          "Find the maximum element in an integer array.\n\nExample:\nInput: [3, 7, 1, 9, 4]\nOutput: 9",
        hint: "Iterate through the array and keep track of the max.",
        starterCode:
          "public static int findMax(int[] arr) {\n  // Your code here\n  return 0;\n}",
      },
      // Medium
      {
        id: "java-m1",
        title: "Factorial",
        difficulty: "Medium",
        topic: "Recursion",
        description:
          "Write a recursive method to compute n! (factorial of n).\n\nExample:\nInput: 5\nOutput: 120",
        hint: "Base case: factorial(0) = 1. Recursive: n * factorial(n-1).",
        starterCode:
          "public static long factorial(int n) {\n  // Your code here\n  return 0;\n}",
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
          "public static boolean isPalindrome(String s) {\n  // Your code here\n  return false;\n}",
      },
      {
        id: "java-m3",
        title: "Count Vowels",
        difficulty: "Medium",
        topic: "Strings",
        description:
          "Count the number of vowels (a, e, i, o, u) in a string.\n\nExample:\nInput: 'Hello World'\nOutput: 3",
        hint: "Loop through chars and check if each is a vowel.",
        starterCode:
          "public static int countVowels(String s) {\n  // Your code here\n  return 0;\n}",
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
          "Implement a stack using an array with push, pop, and peek operations.\n\nOperations:\n- push(x): add element\n- pop(): remove top element\n- peek(): view top element",
        hint: "Use an int array and track the top index.",
        starterCode:
          "class Stack {\n  int[] data = new int[100];\n  int top = -1;\n\n  void push(int x) {\n    // Your code\n  }\n\n  int pop() {\n    // Your code\n    return -1;\n  }\n\n  int peek() {\n    // Your code\n    return -1;\n  }\n}",
      },
      // Hard
      {
        id: "java-h1",
        title: "Binary Search Tree",
        difficulty: "Hard",
        topic: "Trees",
        description:
          "Implement insert and search operations for a Binary Search Tree.\n\nFor insert(5, 3, 7, 1):\n- search(3) → true\n- search(6) → false",
        hint: "For insert: go left if value < node, right if value > node.",
        starterCode:
          "class BST {\n  Node root;\n\n  class Node {\n    int val;\n    Node left, right;\n    Node(int v) { val = v; }\n  }\n\n  void insert(int val) {\n    // Your code\n  }\n\n  boolean search(int val) {\n    // Your code\n    return false;\n  }\n}",
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
          "public static void mergeSort(int[] arr, int l, int r) {\n  // Your code\n}\n\npublic static void merge(int[] arr, int l, int m, int r) {\n  // Your code\n}",
      },
      {
        id: "java-h3",
        title: "LRU Cache",
        difficulty: "Hard",
        topic: "Design",
        description:
          "Design an LRU (Least Recently Used) Cache with get(key) and put(key, value) operations.\n\nBoth operations must run in O(1) time.",
        hint: "Use a HashMap + Doubly Linked List.",
        starterCode:
          "import java.util.*;\n\nclass LRUCache {\n  int capacity;\n\n  LRUCache(int capacity) {\n    this.capacity = capacity;\n    // Initialize your data structures\n  }\n\n  int get(int key) {\n    // Your code\n    return -1;\n  }\n\n  void put(int key, int value) {\n    // Your code\n  }\n}",
      },
    ],
  },
  {
    id: "python",
    title: "Python",
    icon: "🐍",
    problems: [
      // Easy
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
        hint: "Use the built-in sum() function or a loop.",
        starterCode: "def list_sum(nums):\n    # Your code here\n    pass",
      },
      {
        id: "py-e3",
        title: "Count Occurrences",
        difficulty: "Easy",
        topic: "Strings",
        description:
          "Count how many times a character appears in a string.\n\nExample:\nInput: s='hello', char='l'\nOutput: 2",
        hint: "Use str.count() or loop through characters.",
        starterCode: "def count_char(s, char):\n    # Your code here\n    pass",
      },
      {
        id: "py-e4",
        title: "Swap Variables",
        difficulty: "Easy",
        topic: "Basics",
        description:
          "Swap two variables without using a third variable.\n\nExample:\na=5, b=10 → a=10, b=5",
        hint: "Python supports tuple unpacking: a, b = b, a",
        starterCode: "def swap(a, b):\n    # Your code here\n    return a, b",
      },
      {
        id: "py-e5",
        title: "Square Numbers",
        difficulty: "Easy",
        topic: "List Comprehension",
        description:
          "Return a list of squares of numbers from 1 to n.\n\nExample:\nInput: n=5\nOutput: [1, 4, 9, 16, 25]",
        hint: "Use a list comprehension: [x**2 for x in range(1, n+1)]",
        starterCode: "def squares(n):\n    # Your code here\n    pass",
      },
      // Medium
      {
        id: "py-m1",
        title: "Fibonacci",
        difficulty: "Medium",
        topic: "Recursion",
        description:
          "Return the nth Fibonacci number.\n\nExample:\nInput: 7\nOutput: 13 (sequence: 0,1,1,2,3,5,8,13...)",
        hint: "Use recursion with base cases for 0 and 1.",
        starterCode: "def fibonacci(n):\n    # Your code here\n    pass",
      },
      {
        id: "py-m2",
        title: "Remove Duplicates",
        difficulty: "Medium",
        topic: "Sets",
        description:
          "Remove duplicate values from a list while preserving order.\n\nExample:\nInput: [1, 2, 2, 3, 1, 4]\nOutput: [1, 2, 3, 4]",
        hint: "Use an OrderedDict or a set to track seen values.",
        starterCode:
          "def remove_duplicates(lst):\n    # Your code here\n    pass",
      },
      {
        id: "py-m3",
        title: "Flatten Nested List",
        difficulty: "Medium",
        topic: "Recursion",
        description:
          "Flatten a nested list.\n\nExample:\nInput: [1, [2, 3], [4, [5, 6]]]\nOutput: [1, 2, 3, 4, 5, 6]",
        hint: "Recursively flatten each element that is a list.",
        starterCode: "def flatten(lst):\n    # Your code here\n    pass",
      },
      {
        id: "py-m4",
        title: "Word Frequency",
        difficulty: "Medium",
        topic: "Dictionaries",
        description:
          "Count the frequency of each word in a sentence.\n\nExample:\nInput: 'hello world hello'\nOutput: {'hello': 2, 'world': 1}",
        hint: "Use a dictionary and split() to get words.",
        starterCode:
          "def word_frequency(sentence):\n    # Your code here\n    pass",
      },
      {
        id: "py-m5",
        title: "Binary Search",
        difficulty: "Medium",
        topic: "Search",
        description:
          "Implement binary search on a sorted list.\n\nExample:\nInput: nums=[1,3,5,7,9], target=5\nOutput: 2 (index)",
        hint: "Use left and right pointers, compute mid.",
        starterCode:
          "def binary_search(nums, target):\n    # Your code here\n    return -1",
      },
      // Hard
      {
        id: "py-h1",
        title: "Longest Common Subsequence",
        difficulty: "Hard",
        topic: "Dynamic Programming",
        description:
          "Find the length of the longest common subsequence of two strings.\n\nExample:\nInput: 'ABCBDAB', 'BDCABA'\nOutput: 4",
        hint: "Use a 2D DP table.",
        starterCode: "def lcs(s1, s2):\n    # Your code here\n    return 0",
      },
      {
        id: "py-h2",
        title: "N-Queens Problem",
        difficulty: "Hard",
        topic: "Backtracking",
        description:
          "Return the number of ways to place N queens on an N×N board so no two queens attack each other.\n\nExample:\nInput: n=4\nOutput: 2",
        hint: "Use backtracking and check row/column/diagonal conflicts.",
        starterCode:
          "def solve_n_queens(n):\n    # Your code here\n    return 0",
      },
      {
        id: "py-h3",
        title: "Graph BFS",
        difficulty: "Hard",
        topic: "Graphs",
        description:
          "Implement BFS on an undirected graph and return visited nodes in order.\n\nExample:\ngraph = {0:[1,2], 1:[0,3], 2:[0], 3:[1]}\nBFS from 0 → [0, 1, 2, 3]",
        hint: "Use a queue and a visited set.",
        starterCode:
          "from collections import deque\n\ndef bfs(graph, start):\n    # Your code here\n    return []",
      },
    ],
  },
  {
    id: "c",
    title: "C",
    icon: "⚙️",
    problems: [
      // Easy
      {
        id: "c-e1",
        title: "Print Hello World",
        difficulty: "Easy",
        topic: "Basics",
        description: "Write a C program that prints 'Hello, World!'",
        hint: "Use printf() and include <stdio.h>.",
        starterCode:
          "#include <stdio.h>\n\nint main() {\n  // Your code here\n  return 0;\n}",
      },
      {
        id: "c-e2",
        title: "Add Two Numbers",
        difficulty: "Easy",
        topic: "Basics",
        description:
          "Write a function to return the sum of two integers.\n\nExample:\nadd(3, 4) → 7",
        hint: "Use the + operator.",
        starterCode:
          "int add(int a, int b) {\n  // Your code here\n  return 0;\n}",
      },
      {
        id: "c-e3",
        title: "Find Largest",
        difficulty: "Easy",
        topic: "Conditionals",
        description:
          "Find the largest of three numbers.\n\nExample:\nInput: 3, 7, 5\nOutput: 7",
        hint: "Use if-else comparisons.",
        starterCode:
          "int findLargest(int a, int b, int c) {\n  // Your code here\n  return 0;\n}",
      },
      {
        id: "c-e4",
        title: "String Length",
        difficulty: "Easy",
        topic: "Strings",
        description:
          "Compute the length of a C string without using strlen().\n\nExample:\nInput: 'hello'\nOutput: 5",
        hint: "Loop until you hit the null terminator '\\0'.",
        starterCode:
          "int strLen(char* s) {\n  // Your code here\n  return 0;\n}",
      },
      {
        id: "c-e5",
        title: "Swap Using Pointers",
        difficulty: "Easy",
        topic: "Pointers",
        description:
          "Swap two integers using pointers.\n\nExample:\na=5, b=10 → a=10, b=5",
        hint: "Use a temporary variable and dereference the pointers.",
        starterCode: "void swap(int* a, int* b) {\n  // Your code here\n}",
      },
      // Medium
      {
        id: "c-m1",
        title: "Reverse Array",
        difficulty: "Medium",
        topic: "Arrays",
        description:
          "Reverse an integer array in place.\n\nExample:\nInput: [1, 2, 3, 4, 5]\nOutput: [5, 4, 3, 2, 1]",
        hint: "Use two pointers from both ends.",
        starterCode:
          "void reverseArray(int arr[], int n) {\n  // Your code here\n}",
      },
      {
        id: "c-m2",
        title: "Linear Search",
        difficulty: "Medium",
        topic: "Search",
        description:
          "Search for a target value in an array and return its index.\n\nExample:\narr=[1,3,5,7], target=5 → 2",
        hint: "Loop through array and compare each element.",
        starterCode:
          "int linearSearch(int arr[], int n, int target) {\n  // Your code here\n  return -1;\n}",
      },
      {
        id: "c-m3",
        title: "Fibonacci Iterative",
        difficulty: "Medium",
        topic: "Loops",
        description:
          "Compute the nth Fibonacci number iteratively.\n\nExample:\nInput: 8\nOutput: 21",
        hint: "Use two variables to track previous and current.",
        starterCode:
          "int fibonacci(int n) {\n  // Your code here\n  return 0;\n}",
      },
      {
        id: "c-m4",
        title: "Count Words in String",
        difficulty: "Medium",
        topic: "Strings",
        description:
          "Count the number of words in a string.\n\nExample:\nInput: 'hello world foo'\nOutput: 3",
        hint: "Count transitions from space to non-space character.",
        starterCode:
          "#include <string.h>\n\nint countWords(char* s) {\n  // Your code here\n  return 0;\n}",
      },
      {
        id: "c-m5",
        title: "Matrix Multiplication",
        difficulty: "Medium",
        topic: "Arrays",
        description:
          "Multiply two 2×2 matrices.\n\nFor A={{1,2},{3,4}} and B={{5,6},{7,8}}:\nResult={{19,22},{43,50}}",
        hint: "Use nested loops: result[i][j] += A[i][k] * B[k][j].",
        starterCode:
          "void multiplyMatrix(int A[2][2], int B[2][2], int C[2][2]) {\n  // Your code here\n}",
      },
      // Hard
      {
        id: "c-h1",
        title: "Linked List Insert",
        difficulty: "Hard",
        topic: "Pointers",
        description:
          "Implement inserting a node at the end of a singly linked list.",
        hint: "Traverse to the last node and set its next pointer.",
        starterCode:
          "struct Node {\n  int data;\n  struct Node* next;\n};\n\nstruct Node* insertEnd(struct Node* head, int data) {\n  // Your code here\n  return head;\n}",
      },
      {
        id: "c-h2",
        title: "Quicksort",
        difficulty: "Hard",
        topic: "Sorting",
        description:
          "Implement quicksort to sort an array.\n\nExample:\nInput: [3, 6, 8, 10, 1, 2, 1]\nOutput: [1, 1, 2, 3, 6, 8, 10]",
        hint: "Choose a pivot, partition around it, recurse on both halves.",
        starterCode:
          "void quicksort(int arr[], int low, int high) {\n  // Your code here\n}\n\nint partition(int arr[], int low, int high) {\n  // Your code here\n  return 0;\n}",
      },
      {
        id: "c-h3",
        title: "Dynamic Memory Allocation",
        difficulty: "Hard",
        topic: "Memory",
        description:
          "Create a dynamic array of n integers using malloc, fill with squares (1²,2²,...n²), then free memory.",
        hint: "Use malloc() to allocate, and free() to deallocate.",
        starterCode:
          "#include <stdlib.h>\n\nint* squaresArray(int n) {\n  // Allocate, fill, return array\n  // Caller is responsible for free()\n  return NULL;\n}",
      },
    ],
  },
  {
    id: "dsa",
    title: "DSA",
    icon: "🌲",
    problems: [
      // Easy
      {
        id: "dsa-e1",
        title: "Two Sum",
        difficulty: "Easy",
        topic: "Arrays",
        description:
          "Given an array and a target, return indices of two numbers that sum to target.\n\nExample:\nnums=[2,7,11,15], target=9 → [0,1]",
        hint: "Use a hash map to store complement lookups.",
        starterCode:
          "function twoSum(nums, target) {\n  // Your solution here\n  return [];\n}",
      },
      {
        id: "dsa-e2",
        title: "Valid Parentheses",
        difficulty: "Easy",
        topic: "Stacks",
        description:
          "Check if a string of brackets is valid.\n\nExamples:\n'()[]{}' → true\n'([)]' → false",
        hint: "Use a stack. Push open brackets, pop and verify close brackets.",
        starterCode:
          "function isValid(s) {\n  // Your solution here\n  return false;\n}",
      },
      {
        id: "dsa-e3",
        title: "Reverse Linked List",
        difficulty: "Easy",
        topic: "Linked Lists",
        description:
          "Reverse a singly linked list.\n\n1→2→3→4→5 becomes 5→4→3→2→1",
        hint: "Use three pointers: prev, curr, next.",
        starterCode:
          "function reverseList(head) {\n  let prev = null, curr = head;\n  // Your solution here\n  return prev;\n}",
      },
      {
        id: "dsa-e4",
        title: "Maximum Subarray",
        difficulty: "Easy",
        topic: "Arrays",
        description:
          "Find the contiguous subarray with the largest sum (Kadane's Algorithm).\n\nExample:\nInput: [-2,1,-3,4,-1,2,1,-5,4]\nOutput: 6 (subarray [4,-1,2,1])",
        hint: "Track current sum and max sum as you iterate.",
        starterCode:
          "function maxSubArray(nums) {\n  // Your solution here\n  return 0;\n}",
      },
      {
        id: "dsa-e5",
        title: "Climbing Stairs",
        difficulty: "Easy",
        topic: "Dynamic Programming",
        description:
          "You can climb 1 or 2 steps. How many distinct ways to climb n steps?\n\nExample:\nn=3 → 3 ways: (1+1+1), (1+2), (2+1)",
        hint: "This is essentially Fibonacci.",
        starterCode:
          "function climbStairs(n) {\n  // Your solution here\n  return 0;\n}",
      },
      // Medium
      {
        id: "dsa-m1",
        title: "Binary Search",
        difficulty: "Medium",
        topic: "Search",
        description:
          "Search a sorted array in O(log n) time.\n\nExample:\nnums=[-1,0,3,5,9,12], target=9 → 4",
        hint: "Use left/right pointers and compute mid each iteration.",
        starterCode:
          "function binarySearch(nums, target) {\n  let left = 0, right = nums.length - 1;\n  // Your solution here\n  return -1;\n}",
      },
      {
        id: "dsa-m2",
        title: "Level Order Tree Traversal",
        difficulty: "Medium",
        topic: "Trees",
        description:
          "Return level-order traversal of a binary tree as array of arrays.\n\nExample:\n    3\n   / \\\n  9  20\n    /  \\\n   15   7\nOutput: [[3],[9,20],[15,7]]",
        hint: "Use a queue (BFS approach).",
        starterCode:
          "function levelOrder(root) {\n  // Your solution here\n  return [];\n}",
      },
      {
        id: "dsa-m3",
        title: "Merge Intervals",
        difficulty: "Medium",
        topic: "Arrays",
        description:
          "Merge overlapping intervals.\n\nExample:\nInput: [[1,3],[2,6],[8,10],[15,18]]\nOutput: [[1,6],[8,10],[15,18]]",
        hint: "Sort by start time, then merge overlapping ones.",
        starterCode:
          "function merge(intervals) {\n  // Your solution here\n  return [];\n}",
      },
      {
        id: "dsa-m4",
        title: "Longest Palindromic Substring",
        difficulty: "Medium",
        topic: "Strings",
        description:
          "Find the longest palindromic substring.\n\nExample:\nInput: 'babad'\nOutput: 'bab' or 'aba'",
        hint: "Expand around center for each character.",
        starterCode:
          "function longestPalindrome(s) {\n  // Your solution here\n  return '';\n}",
      },
      {
        id: "dsa-m5",
        title: "Number of Islands",
        difficulty: "Medium",
        topic: "Graphs",
        description:
          "Count islands in a grid (connected '1's surrounded by '0's).\n\nExample:\ngrid = [['1','1','0'],['1','1','0'],['0','0','1']]\nOutput: 2",
        hint: "Use DFS/BFS, mark visited cells.",
        starterCode:
          "function numIslands(grid) {\n  // Your solution here\n  return 0;\n}",
      },
      // Hard
      {
        id: "dsa-h1",
        title: "Trapping Rain Water",
        difficulty: "Hard",
        topic: "Arrays",
        description:
          "Compute how much rainwater can be trapped.\n\nExample:\nInput: [0,1,0,2,1,0,1,3,2,1,2,1]\nOutput: 6",
        hint: "Use two-pointer approach with leftMax and rightMax.",
        starterCode:
          "function trap(height) {\n  // Your solution here\n  return 0;\n}",
      },
      {
        id: "dsa-h2",
        title: "Serialize and Deserialize Tree",
        difficulty: "Hard",
        topic: "Trees",
        description:
          "Serialize a binary tree to string and deserialize back.\n\nserial(tree) → '1,2,#,#,3,4,#,#,5,#,#'\ndeserial(str) → original tree",
        hint: "Use pre-order DFS with null markers.",
        starterCode:
          "function serialize(root) {\n  // Your code\n  return '';\n}\n\nfunction deserialize(data) {\n  // Your code\n  return null;\n}",
      },
      {
        id: "dsa-h3",
        title: "Word Ladder",
        difficulty: "Hard",
        topic: "Graphs",
        description:
          "Find shortest transformation from beginWord to endWord changing one letter at a time, all intermediate words in wordList.\n\nbeginWord='hit', endWord='cog', wordList=['hot','dot','dog','lot','log','cog'] → 5",
        hint: "BFS level by level, replacing each character and checking wordList.",
        starterCode:
          "function ladderLength(beginWord, endWord, wordList) {\n  // Your solution here\n  return 0;\n}",
      },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    icon: "🌐",
    problems: [
      // Easy
      {
        id: "fe-e1",
        title: "Toggle Visibility",
        difficulty: "Easy",
        topic: "DOM",
        description:
          "Write JavaScript to toggle the visibility of a div on button click.\n\nHTML:\n<button id='btn'>Toggle</button>\n<div id='box'>Hello</div>",
        hint: "Use document.getElementById and toggle style.display.",
        starterCode:
          "document.getElementById('btn').addEventListener('click', function() {\n  // Your code here\n});",
      },
      {
        id: "fe-e2",
        title: "Change Text Content",
        difficulty: "Easy",
        topic: "DOM",
        description:
          "Change the text of a paragraph element to 'Clicked!' when a button is pressed.",
        hint: "Use element.textContent = 'new text'.",
        starterCode:
          "// Access the button and paragraph\n// Add click event\n// Change textContent",
      },
      {
        id: "fe-e3",
        title: "CSS Flexbox Center",
        difficulty: "Easy",
        topic: "CSS",
        description:
          "Write CSS to perfectly center a div both horizontally and vertically inside a full-viewport container.",
        hint: "Use display:flex, justify-content:center, align-items:center on the parent.",
        starterCode:
          ".container {\n  /* Your styles here */\n}\n\n.box {\n  width: 100px;\n  height: 100px;\n  background: blue;\n}",
      },
      {
        id: "fe-e4",
        title: "Form Validation",
        difficulty: "Easy",
        topic: "Forms",
        description:
          "Validate a form so that name and email fields cannot be empty on submit.\n\nShow an alert if validation fails.",
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
          "Dynamically add items to an unordered list when a button is clicked.\n\nEach click adds a new <li> element.",
        hint: "Use document.createElement('li') and ul.appendChild(li).",
        starterCode:
          "let count = 0;\nfunction addItem() {\n  count++;\n  // Create and add li element\n}",
      },
      // Medium
      {
        id: "fe-m1",
        title: "Debounce Function",
        difficulty: "Medium",
        topic: "JavaScript",
        description:
          "Implement a debounce function that delays execution until after wait milliseconds of inactivity.\n\nUsage:\nconst fn = debounce(search, 300);",
        hint: "Use clearTimeout and setTimeout.",
        starterCode:
          "function debounce(fn, wait) {\n  // Your code here\n  return function(...args) {\n    // Debounced version\n  };\n}",
      },
      {
        id: "fe-m2",
        title: "Promise Chain",
        difficulty: "Medium",
        topic: "Async",
        description:
          "Write a function that fetches user data, then fetches their posts, then returns the first post title.\n\nUse Promise chaining (or async/await).",
        hint: "Use fetch() and .then() chain or async/await.",
        starterCode:
          "async function getFirstPostTitle(userId) {\n  // Fetch user, then their posts\n  // Return first post title\n}",
      },
      {
        id: "fe-m3",
        title: "Custom Event Emitter",
        difficulty: "Medium",
        topic: "JavaScript",
        description:
          "Implement an EventEmitter class with on(event, fn), emit(event, data), and off(event, fn) methods.",
        hint: "Use a Map to store arrays of listeners per event.",
        starterCode:
          "class EventEmitter {\n  constructor() {\n    this.events = {};\n  }\n\n  on(event, fn) {\n    // Register listener\n  }\n\n  emit(event, data) {\n    // Call all listeners\n  }\n\n  off(event, fn) {\n    // Remove listener\n  }\n}",
      },
      {
        id: "fe-m4",
        title: "CSS Grid Layout",
        difficulty: "Medium",
        topic: "CSS",
        description:
          "Create a responsive 3-column grid that collapses to 1 column on mobile (< 600px).\n\nUse CSS Grid and media queries.",
        hint: "Use grid-template-columns and @media query.",
        starterCode:
          ".grid {\n  display: grid;\n  /* Your grid styles */\n}\n\n@media (max-width: 600px) {\n  .grid {\n    /* Mobile styles */\n  }\n}",
      },
      {
        id: "fe-m5",
        title: "Local Storage Todo",
        difficulty: "Medium",
        topic: "Storage",
        description:
          "Build a todo list that persists in localStorage. Items should survive page refresh.\n\nFunctions: addTodo(text), getTodos(), removeTodo(id)",
        hint: "Use localStorage.setItem/getItem with JSON.stringify/parse.",
        starterCode:
          "function addTodo(text) {\n  // Add to localStorage\n}\n\nfunction getTodos() {\n  // Retrieve from localStorage\n  return [];\n}\n\nfunction removeTodo(id) {\n  // Remove from localStorage\n}",
      },
      // Hard
      {
        id: "fe-h1",
        title: "Virtual DOM Diff",
        difficulty: "Hard",
        topic: "Concepts",
        description:
          "Implement a simple diff algorithm that compares two virtual DOM trees and returns a list of changes (patches).\n\nvdom1 = {type:'div', children:['Hello']}\nvdom2 = {type:'div', children:['World']}",
        hint: "Compare type, props, and children recursively.",
        starterCode:
          "function diff(oldVdom, newVdom) {\n  const patches = [];\n  // Your diff logic\n  return patches;\n}",
      },
      {
        id: "fe-h2",
        title: "Implement useState Hook",
        difficulty: "Hard",
        topic: "React Internals",
        description:
          "Implement a simplified version of React's useState hook.\n\nconst [count, setCount] = useState(0);\nsetCount(1); // triggers re-render",
        hint: "Use a closure to store state value and a queue for updates.",
        starterCode:
          "let state;\nlet setter;\n\nfunction useState(initialValue) {\n  // Your implementation\n  return [state, setter];\n}",
      },
      {
        id: "fe-h3",
        title: "Infinite Scroll",
        difficulty: "Hard",
        topic: "Performance",
        description:
          "Implement infinite scroll that loads more items when the user scrolls near the bottom of the page.\n\nUse IntersectionObserver for performance.",
        hint: "Observe a sentinel element at the bottom using IntersectionObserver.",
        starterCode:
          "let page = 1;\n\nfunction loadMore() {\n  // Fetch next page\n}\n\nfunction setupInfiniteScroll() {\n  // Setup IntersectionObserver\n}",
      },
    ],
  },
  {
    id: "sql",
    title: "SQL",
    icon: "🗄️",
    problems: [
      // Easy
      {
        id: "sql-e1",
        title: "Select All Rows",
        difficulty: "Easy",
        topic: "SELECT",
        description:
          "Write a query to select all rows from the 'employees' table.\n\nResult should show all columns.",
        hint: "Use SELECT * FROM table_name;",
        starterCode: "-- Write your SQL query here\n",
      },
      {
        id: "sql-e2",
        title: "Filter by Salary",
        difficulty: "Easy",
        topic: "WHERE",
        description:
          "Select employees whose salary is greater than 50000.\n\nColumns: id, name, salary",
        hint: "Use WHERE salary > 50000",
        starterCode:
          "SELECT id, name, salary\nFROM employees\n-- Add your condition",
      },
      {
        id: "sql-e3",
        title: "Count Employees",
        difficulty: "Easy",
        topic: "Aggregate",
        description:
          "Count the total number of employees in the table.\n\nExpected Output:\ntotal\n------\n100",
        hint: "Use COUNT(*)",
        starterCode: "SELECT -- Your query here\nFROM employees;",
      },
      {
        id: "sql-e4",
        title: "Order by Name",
        difficulty: "Easy",
        topic: "ORDER BY",
        description:
          "Select all employees ordered alphabetically by name (ascending).",
        hint: "Use ORDER BY name ASC",
        starterCode: "SELECT *\nFROM employees\n-- Add ORDER BY clause",
      },
      {
        id: "sql-e5",
        title: "Distinct Departments",
        difficulty: "Easy",
        topic: "DISTINCT",
        description:
          "Get a list of unique department names from the employees table.",
        hint: "Use SELECT DISTINCT department",
        starterCode: "SELECT -- Your query here\nFROM employees;",
      },
      // Medium
      {
        id: "sql-m1",
        title: "Average Salary by Department",
        difficulty: "Medium",
        topic: "GROUP BY",
        description:
          "Calculate the average salary for each department.\n\nExpected:\ndepartment | avg_salary\n-----------|-----------\nEngineering| 85000\nMarketing  | 62000",
        hint: "Use GROUP BY with AVG()",
        starterCode:
          "SELECT department, AVG(salary) AS avg_salary\nFROM employees\n-- Add GROUP BY",
      },
      {
        id: "sql-m2",
        title: "Find Second Highest Salary",
        difficulty: "Medium",
        topic: "Subquery",
        description:
          "Find the second highest salary in the employees table.\n\nExpected Output:\n2nd_highest\n-----------\n90000",
        hint: "Use a subquery with MAX() excluding the highest salary.",
        starterCode:
          "SELECT MAX(salary) AS second_highest\nFROM employees\nWHERE salary < (-- Subquery here)",
      },
      {
        id: "sql-m3",
        title: "Employees with No Manager",
        difficulty: "Medium",
        topic: "NULL",
        description:
          "Find all employees who have no manager (manager_id is NULL).",
        hint: "Use WHERE manager_id IS NULL",
        starterCode: "SELECT *\nFROM employees\n-- Add your condition",
      },
      {
        id: "sql-m4",
        title: "Inner Join",
        difficulty: "Medium",
        topic: "JOINS",
        description:
          "Join employees and departments tables to show employee name and their department name.\n\nTables: employees(id, name, dept_id), departments(id, dept_name)",
        hint: "Use INNER JOIN ON employees.dept_id = departments.id",
        starterCode:
          "SELECT e.name, d.dept_name\nFROM employees e\n-- Add JOIN here",
      },
      {
        id: "sql-m5",
        title: "Count per Department with Filter",
        difficulty: "Medium",
        topic: "HAVING",
        description:
          "Find departments that have more than 5 employees.\n\nExpected:\ndepartment | count\n-----------|------\nEngineering| 12\nSales      | 8",
        hint: "Use GROUP BY + HAVING COUNT(*) > 5",
        starterCode:
          "SELECT department, COUNT(*) AS count\nFROM employees\nGROUP BY department\n-- Add HAVING clause",
      },
      // Hard
      {
        id: "sql-h1",
        title: "Rank Employees by Salary",
        difficulty: "Hard",
        topic: "Window Functions",
        description:
          "Rank employees by salary within each department using RANK().\n\nExpected:\nname | department | salary | rank\n-----|------------|--------|-----\nBob  | Engineering| 95000  | 1",
        hint: "Use RANK() OVER (PARTITION BY department ORDER BY salary DESC)",
        starterCode:
          "SELECT name, department, salary,\n  -- Your RANK() here\nFROM employees;",
      },
      {
        id: "sql-h2",
        title: "Recursive CTE: Hierarchy",
        difficulty: "Hard",
        topic: "CTE",
        description:
          "Use a recursive CTE to find all employees under a given manager (including all levels).\n\nTable: employees(id, name, manager_id)",
        hint: "WITH RECURSIVE cte AS (base case UNION ALL recursive case)",
        starterCode:
          "WITH RECURSIVE hierarchy AS (\n  -- Base case: starting manager\n  SELECT id, name, manager_id FROM employees WHERE id = 1\n  UNION ALL\n  -- Recursive case\n  SELECT e.id, e.name, e.manager_id\n  FROM employees e\n  -- JOIN with hierarchy\n)\nSELECT * FROM hierarchy;",
      },
      {
        id: "sql-h3",
        title: "Pivot Table",
        difficulty: "Hard",
        topic: "Advanced",
        description:
          "Convert rows to columns (pivot) to show total sales per product per quarter.\n\nInput: sales(product, quarter, amount)\nOutput:\nproduct | Q1 | Q2 | Q3 | Q4",
        hint: "Use CASE WHEN with SUM() to pivot rows into columns.",
        starterCode:
          "SELECT product,\n  SUM(CASE WHEN quarter = 'Q1' THEN amount ELSE 0 END) AS Q1,\n  -- Add Q2, Q3, Q4\nFROM sales\nGROUP BY product;",
      },
    ],
  },
  {
    id: "patterns",
    title: "Patterns",
    icon: "⭐",
    problems: [
      // Easy
      {
        id: "pat-e1",
        title: "Right-Aligned Triangle",
        difficulty: "Easy",
        topic: "Loops",
        description:
          "Print a right-aligned triangle of stars for n=5:\n*\n**\n***\n****\n*****",
        hint: "Outer loop for rows, inner loop for stars.",
        starterCode:
          "function rightTriangle(n) {\n  let result = '';\n  // Your code here\n  return result;\n}",
      },
      {
        id: "pat-e2",
        title: "Inverted Triangle",
        difficulty: "Easy",
        topic: "Loops",
        description: "Print an inverted triangle for n=4:\n****\n***\n**\n*",
        hint: "Outer loop from n down to 1.",
        starterCode:
          "function invertedTriangle(n) {\n  let result = '';\n  // Your code here\n  return result;\n}",
      },
      {
        id: "pat-e3",
        title: "Number Triangle",
        difficulty: "Easy",
        topic: "Loops",
        description: "Print a number triangle for n=4:\n1\n12\n123\n1234",
        hint: "Inner loop prints numbers from 1 to the current row.",
        starterCode:
          "function numberTriangle(n) {\n  let result = '';\n  // Your code here\n  return result;\n}",
      },
      {
        id: "pat-e4",
        title: "Same Number Rows",
        difficulty: "Easy",
        topic: "Loops",
        description:
          "Print each row filled with its row number for n=4:\n1\n22\n333\n4444",
        hint: "Repeat the row number i for i times.",
        starterCode:
          "function sameNumberRows(n) {\n  let result = '';\n  // Your code here\n  return result;\n}",
      },
      {
        id: "pat-e5",
        title: "Alphabet Triangle",
        difficulty: "Easy",
        topic: "Loops",
        description: "Print an alphabet triangle for n=4:\nA\nAB\nABC\nABCD",
        hint: "Use String.fromCharCode(65 + j) to get letters.",
        starterCode:
          "function alphabetTriangle(n) {\n  let result = '';\n  // Your code here\n  return result;\n}",
      },
      // Medium
      {
        id: "pat-m1",
        title: "Pyramid",
        difficulty: "Medium",
        topic: "Patterns",
        description:
          "Print a centered star pyramid for n=5:\n    *\n   ***\n  *****\n *******\n*********",
        hint: "Print (n-i) spaces then (2i-1) stars per row.",
        starterCode:
          "function pyramid(n) {\n  let result = '';\n  // Your code here\n  return result;\n}",
      },
      {
        id: "pat-m2",
        title: "Diamond Pattern",
        difficulty: "Medium",
        topic: "Patterns",
        description:
          "Print a diamond of stars for n=4:\n   *\n  ***\n *****\n*******\n *****\n  ***\n   *",
        hint: "Print the upper half (pyramid) then mirror it for the lower.",
        starterCode:
          "function diamond(n) {\n  let result = '';\n  // Your code here\n  return result;\n}",
      },
      {
        id: "pat-m3",
        title: "Hollow Square",
        difficulty: "Medium",
        topic: "Patterns",
        description:
          "Print a hollow square of stars for n=5:\n*****\n*   *\n*   *\n*   *\n*****",
        hint: "Print stars only on borders (first/last row or first/last col).",
        starterCode:
          "function hollowSquare(n) {\n  let result = '';\n  // Your code here\n  return result;\n}",
      },
      {
        id: "pat-m4",
        title: "Pascal's Triangle",
        difficulty: "Medium",
        topic: "Patterns",
        description:
          "Print Pascal's Triangle for n=5 rows:\n1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1",
        hint: "Each element = previous row's element at same pos + one left.",
        starterCode:
          "function pascalsTriangle(n) {\n  let result = '';\n  // Your code here\n  return result;\n}",
      },
      {
        id: "pat-m5",
        title: "Zigzag Pattern",
        difficulty: "Medium",
        topic: "Patterns",
        description:
          "Print a zigzag star pattern for n=3 rows, width=9:\n*  *  *  *  *\n * * * * * *\n  *  *  *  *",
        hint: "For each row, print star at column positions matching zigzag math.",
        starterCode:
          "function zigzag(n, width) {\n  let result = '';\n  // Your code here\n  return result;\n}",
      },
      // Hard
      {
        id: "pat-h1",
        title: "Spiral Matrix",
        difficulty: "Hard",
        topic: "Matrix",
        description:
          "Generate an n×n matrix filled with numbers in spiral order.\n\nFor n=3:\n1 2 3\n8 9 4\n7 6 5",
        hint: "Track four boundaries (top, bottom, left, right) and shrink inward.",
        starterCode:
          "function spiralMatrix(n) {\n  const matrix = Array.from({length:n}, ()=>new Array(n).fill(0));\n  // Fill in spiral order\n  return matrix;\n}",
      },
      {
        id: "pat-h2",
        title: "Number Butterfly",
        difficulty: "Hard",
        topic: "Patterns",
        description:
          "Print a butterfly pattern of numbers for n=4:\n1      1\n12    21\n123  321\n12344321\n123  321\n12    21\n1      1",
        hint: "Mirror the number triangle on both sides with spaces in between.",
        starterCode:
          "function butterfly(n) {\n  let result = '';\n  // Your code here\n  return result;\n}",
      },
      {
        id: "pat-h3",
        title: "Floyd's Triangle",
        difficulty: "Hard",
        topic: "Patterns",
        description: "Print Floyd's Triangle for n=4:\n1\n2 3\n4 5 6\n7 8 9 10",
        hint: "Maintain a counter that increments and fills rows.",
        starterCode:
          "function floydsTriangle(n) {\n  let result = '';\n  let num = 1;\n  // Your code here\n  return result;\n}",
      },
    ],
  },
  {
    id: "aptitude",
    title: "Aptitude",
    icon: "🧮",
    problems: [
      // Easy
      {
        id: "apt-e1",
        title: "Simple Interest",
        difficulty: "Easy",
        topic: "Math",
        description:
          "Calculate Simple Interest.\nFormula: SI = (P × R × T) / 100\n\nExample:\nP=1000, R=5, T=2 → SI=100",
        hint: "Apply the formula directly.",
        starterCode:
          "function simpleInterest(P, R, T) {\n  // Your code here\n  return 0;\n}",
      },
      {
        id: "apt-e2",
        title: "HCF of Two Numbers",
        difficulty: "Easy",
        topic: "Math",
        description:
          "Find the Highest Common Factor (HCF/GCD) of two numbers using Euclidean algorithm.\n\nExample:\nhcf(12, 8) → 4",
        hint: "HCF(a, b) = HCF(b, a%b) until b=0.",
        starterCode:
          "function hcf(a, b) {\n  // Your code here\n  return 0;\n}",
      },
      {
        id: "apt-e3",
        title: "LCM of Two Numbers",
        difficulty: "Easy",
        topic: "Math",
        description:
          "Find the Least Common Multiple (LCM) of two numbers.\n\nExample:\nlcm(4, 6) → 12",
        hint: "LCM(a, b) = (a * b) / HCF(a, b)",
        starterCode:
          "function lcm(a, b) {\n  // Your code here\n  return 0;\n}",
      },
      {
        id: "apt-e4",
        title: "Prime Check",
        difficulty: "Easy",
        topic: "Math",
        description:
          "Check if a number is prime.\n\nExample:\nisPrime(7) → true\nisPrime(10) → false",
        hint: "Check divisibility up to √n.",
        starterCode:
          "function isPrime(n) {\n  // Your code here\n  return false;\n}",
      },
      {
        id: "apt-e5",
        title: "Sum of Digits",
        difficulty: "Easy",
        topic: "Math",
        description:
          "Compute the sum of digits of a number.\n\nExample:\ndigitSum(1234) → 10",
        hint: "Use modulo 10 to get last digit, then divide by 10.",
        starterCode:
          "function digitSum(n) {\n  // Your code here\n  return 0;\n}",
      },
      // Medium
      {
        id: "apt-m1",
        title: "Compound Interest",
        difficulty: "Medium",
        topic: "Finance",
        description:
          "Calculate Compound Interest.\nFormula: CI = P * (1 + R/100)^T - P\n\nExample:\nP=1000, R=10, T=2 → CI=210",
        hint: "Use Math.pow() for the exponent.",
        starterCode:
          "function compoundInterest(P, R, T) {\n  // Your code here\n  return 0;\n}",
      },
      {
        id: "apt-m2",
        title: "Profit and Loss",
        difficulty: "Medium",
        topic: "Finance",
        description:
          "Calculate profit/loss percentage.\nProfit% = (SP - CP) / CP * 100\n\nExample:\nCP=200, SP=250 → Profit: 25%",
        hint: "If SP > CP, it's profit; else loss.",
        starterCode:
          "function profitLoss(CP, SP) {\n  // Return { type: 'profit'|'loss', percentage: number }\n  return { type: '', percentage: 0 };\n}",
      },
      {
        id: "apt-m3",
        title: "Speed Distance Time",
        difficulty: "Medium",
        topic: "Physics",
        description:
          "Solve for any variable given the other two:\nDistance = Speed × Time\n\nExample:\nsolve('distance', {speed:60, time:2}) → 120",
        hint: "Switch on the unknown variable.",
        starterCode:
          "function solve(unknown, known) {\n  // Return the calculated value\n  return 0;\n}",
      },
      {
        id: "apt-m4",
        title: "Permutations",
        difficulty: "Medium",
        topic: "Combinatorics",
        description: "Calculate nPr = n! / (n-r)!\n\nExample:\nP(5, 2) → 20",
        hint: "Compute factorials and divide.",
        starterCode:
          "function permutation(n, r) {\n  // Your code here\n  return 0;\n}",
      },
      {
        id: "apt-m5",
        title: "Combinations",
        difficulty: "Medium",
        topic: "Combinatorics",
        description:
          "Calculate nCr = n! / (r! * (n-r)!)\n\nExample:\nC(5, 2) → 10",
        hint: "Compute factorials and divide.",
        starterCode:
          "function combination(n, r) {\n  // Your code here\n  return 0;\n}",
      },
      // Hard
      {
        id: "apt-h1",
        title: "Train Crossing Problems",
        difficulty: "Hard",
        topic: "Speed & Distance",
        description:
          "Two trains of lengths L1 and L2 travel at speeds S1 and S2 (same direction). Find time to cross each other.\n\nTime = (L1 + L2) / |S1 - S2|\n\nExample:\nL1=100, L2=150, S1=60, S2=40 → 12.5 seconds",
        hint: "Relative speed when same direction = |S1 - S2|.",
        starterCode:
          "function trainCrossTime(L1, L2, S1, S2, sameDirection) {\n  // Your code here\n  return 0;\n}",
      },
      {
        id: "apt-h2",
        title: "Pipe Fill Problems",
        difficulty: "Hard",
        topic: "Work & Time",
        description:
          "Pipes A and B can fill a tank in a and b hours. Pipe C can empty it in c hours. How long to fill the tank?\n\nRate = 1/a + 1/b - 1/c\nTime = 1 / Rate",
        hint: "Convert to rates (fraction of tank per hour).",
        starterCode:
          "function tankFillTime(a, b, c) {\n  // Your code here (return in hours)\n  return 0;\n}",
      },
      {
        id: "apt-h3",
        title: "Age Problems",
        difficulty: "Hard",
        topic: "Algebra",
        description:
          "The ratio of A's age to B's age is 3:5. After 10 years the ratio will be 5:7. Find their current ages.\n\nExpected: A=15, B=25",
        hint: "Set up two equations: A/B = 3/5, (A+10)/(B+10) = 5/7. Solve.",
        starterCode:
          "function solveAgeRatio(ratio1, ratio2, years) {\n  // ratio1 = [3, 5], ratio2 = [5, 7], years = 10\n  // Return { ageA, ageB }\n  return { ageA: 0, ageB: 0 };\n}",
      },
    ],
  },
  {
    id: "advjava",
    title: "Advanced Java",
    icon: "🚀",
    problems: [
      // Easy
      {
        id: "aj-e1",
        title: "Lambda Expression",
        difficulty: "Easy",
        topic: "Lambdas",
        description:
          "Use a lambda to sort a list of strings by length.\n\nInput: ['banana', 'apple', 'kiwi', 'cherry']\nOutput: ['kiwi', 'apple', 'banana', 'cherry']",
        hint: "Use list.sort((a,b) -> a.length() - b.length())",
        starterCode:
          "import java.util.*;\n\npublic static List<String> sortByLength(List<String> list) {\n  // Sort using lambda\n  return list;\n}",
      },
      {
        id: "aj-e2",
        title: "Stream Filter",
        difficulty: "Easy",
        topic: "Streams",
        description:
          "Use Java Streams to filter even numbers from a list.\n\nInput: [1, 2, 3, 4, 5, 6]\nOutput: [2, 4, 6]",
        hint: "Use stream().filter().collect(Collectors.toList())",
        starterCode:
          "import java.util.*;\nimport java.util.stream.*;\n\npublic static List<Integer> filterEvens(List<Integer> list) {\n  // Use streams\n  return list;\n}",
      },
      {
        id: "aj-e3",
        title: "Optional Handling",
        difficulty: "Easy",
        topic: "Optional",
        description:
          "Write a method that safely returns a value from Optional or a default.\n\nIf Optional has value, return it squared; else return -1.",
        hint: "Use optional.map().orElse()",
        starterCode:
          "import java.util.Optional;\n\npublic static int squareOrDefault(Optional<Integer> opt) {\n  // Your code here\n  return -1;\n}",
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
          "@FunctionalInterface\ninterface Transformer {\n  int transform(int value);\n}\n\n// Use it to double 5\npublic static int doubleValue(int n) {\n  Transformer doubler = /* lambda */;\n  return doubler.transform(n);\n}",
      },
      {
        id: "aj-e5",
        title: "Method Reference",
        difficulty: "Easy",
        topic: "Method References",
        description:
          "Use a method reference to print each element of a list.\n\nInput: ['Java', 'is', 'awesome']",
        hint: "Use System.out::println as a method reference.",
        starterCode:
          "import java.util.*;\n\npublic static void printAll(List<String> list) {\n  // Use method reference\n}",
      },
      // Medium
      {
        id: "aj-m1",
        title: "Generics Stack",
        difficulty: "Medium",
        topic: "Generics",
        description:
          "Implement a generic Stack<T> class with push, pop, and peek operations.",
        hint: "Use ArrayList<T> internally.",
        starterCode:
          "import java.util.*;\n\npublic class Stack<T> {\n  private List<T> data = new ArrayList<>();\n\n  public void push(T item) {\n    // Your code\n  }\n\n  public T pop() {\n    // Your code\n    return null;\n  }\n\n  public T peek() {\n    // Your code\n    return null;\n  }\n}",
      },
      {
        id: "aj-m2",
        title: "Callable and Future",
        difficulty: "Medium",
        topic: "Concurrency",
        description:
          "Use Callable and ExecutorService to run a task asynchronously and get a result.\n\nTask: Compute sum from 1 to n asynchronously.",
        hint: "Use ExecutorService.submit(callable).get()",
        starterCode:
          "import java.util.concurrent.*;\n\npublic static long asyncSum(int n) throws Exception {\n  ExecutorService exec = Executors.newSingleThreadExecutor();\n  Callable<Long> task = () -> {\n    // Compute sum 1..n\n    return 0L;\n  };\n  Future<Long> future = exec.submit(task);\n  return future.get();\n}",
      },
      {
        id: "aj-m3",
        title: "Collections Grouping",
        difficulty: "Medium",
        topic: "Streams",
        description:
          "Group a list of words by their first letter using Stream Collectors.\n\nInput: ['apple', 'avocado', 'banana', 'blueberry']\nOutput: {a:[apple, avocado], b:[banana, blueberry]}",
        hint: "Use Collectors.groupingBy(w -> w.charAt(0))",
        starterCode:
          "import java.util.*;\nimport java.util.stream.*;\n\npublic static Map<Character, List<String>> groupByFirstLetter(List<String> words) {\n  // Use streams\n  return new HashMap<>();\n}",
      },
      {
        id: "aj-m4",
        title: "Custom Exception",
        difficulty: "Medium",
        topic: "Exceptions",
        description:
          "Create a custom checked exception 'InsufficientFundsException' and throw it in a bank withdrawal method.",
        hint: "Extend Exception class for checked exceptions.",
        starterCode:
          "class InsufficientFundsException extends Exception {\n  // Constructor with message\n}\n\nclass BankAccount {\n  double balance;\n\n  void withdraw(double amount) throws InsufficientFundsException {\n    // Throw if amount > balance\n  }\n}",
      },
      {
        id: "aj-m5",
        title: "Observer Pattern",
        difficulty: "Medium",
        topic: "Design Patterns",
        description:
          "Implement the Observer design pattern with Subject and Observer interfaces.",
        hint: "Subject holds list of observers. notifyAll() calls update() on each.",
        starterCode:
          "interface Observer {\n  void update(String event);\n}\n\ninterface Subject {\n  void attach(Observer o);\n  void detach(Observer o);\n  void notifyObservers(String event);\n}\n\nclass EventSource implements Subject {\n  // Implement\n}",
      },
      // Hard
      {
        id: "aj-h1",
        title: "CompletableFuture Chain",
        difficulty: "Hard",
        topic: "Async",
        description:
          "Chain three async operations using CompletableFuture:\n1. Fetch user (async)\n2. Fetch orders for user (async)\n3. Calculate total order amount\n\nReturn the final total.",
        hint: "Use thenCompose() for dependent futures and thenApply() for transformations.",
        starterCode:
          "import java.util.concurrent.CompletableFuture;\n\npublic static CompletableFuture<Double> getTotalOrderAmount(int userId) {\n  // Chain: fetchUser → fetchOrders → calculateTotal\n  return CompletableFuture.completedFuture(0.0);\n}",
      },
      {
        id: "aj-h2",
        title: "Thread-Safe Singleton",
        difficulty: "Hard",
        topic: "Concurrency",
        description:
          "Implement a thread-safe Singleton using double-checked locking.",
        hint: "Use volatile keyword and synchronized block.",
        starterCode:
          "public class Singleton {\n  private static volatile Singleton instance;\n\n  private Singleton() {}\n\n  public static Singleton getInstance() {\n    // Double-checked locking\n    return null;\n  }\n}",
      },
      {
        id: "aj-h3",
        title: "Custom Annotation Processor",
        difficulty: "Hard",
        topic: "Reflection",
        description:
          "Create a @Validate annotation and use reflection to validate that annotated fields are not null or empty.",
        hint: "Use field.isAnnotationPresent() and field.get(object).",
        starterCode:
          "import java.lang.annotation.*;\nimport java.lang.reflect.*;\n\n@Retention(RetentionPolicy.RUNTIME)\n@Target(ElementType.FIELD)\n@interface Validate {}\n\nclass Validator {\n  public static void validate(Object obj) throws IllegalAccessException {\n    // Use reflection to check @Validate fields\n  }\n}",
      },
    ],
  },
];

const DIFF_COLORS = {
  Easy: "bg-green-500/15 text-green-400 border-green-500/30",
  Medium: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  Hard: "bg-red-500/15 text-red-400 border-red-500/30",
};

export default function CodingPractice() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
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
      setOutput(
        `Running ${selectedProblem.title}...\n✓ Your solution has been submitted\n✓ Test cases evaluated\n\nNote: This is a simulated environment.\nImplement your solution and test your logic! 🚀`,
      );
      setSolved((prev) => new Set([...prev, selectedProblem.id]));
      setIsRunning(false);
    }, 1200);
  }

  const filteredProblems = selectedCourse
    ? filter === "All"
      ? selectedCourse.problems
      : selectedCourse.problems.filter((p) => p.difficulty === filter)
    : [];

  const getStats = (course: Course) => {
    const easy = course.problems.filter((p) => p.difficulty === "Easy").length;
    const medium = course.problems.filter(
      (p) => p.difficulty === "Medium",
    ).length;
    const hard = course.problems.filter((p) => p.difficulty === "Hard").length;
    const solvedCount = course.problems.filter((p) => solved.has(p.id)).length;
    return { easy, medium, hard, solvedCount, total: course.problems.length };
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        {(selectedCourse || selectedProblem) && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (selectedProblem) {
                setSelectedProblem(null);
              } else {
                setSelectedCourse(null);
                setFilter("All");
              }
            }}
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
              {selectedProblem
                ? selectedProblem.title
                : selectedCourse
                  ? `${selectedCourse.icon} ${selectedCourse.title} Problems`
                  : "Coding Practice"}
            </h1>
            <p className="text-muted-foreground text-sm">
              {selectedProblem
                ? `${selectedProblem.topic} · ${selectedProblem.difficulty}`
                : selectedCourse
                  ? `${filteredProblems.length} problems · Easy / Medium / Hard`
                  : `${COURSES.length} courses · 8 problems each`}
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
        {/* Course List */}
        {!selectedCourse && !selectedProblem && (
          <motion.div
            key="courses"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            data-ocid="coding.courses.list"
          >
            {COURSES.map((course, i) => {
              const stats = getStats(course);
              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  data-ocid={`coding.course.item.${i + 1}`}
                >
                  <Card
                    className="card-glow cursor-pointer hover:border-primary/50 transition-colors"
                    onClick={() => {
                      setSelectedCourse(course);
                      setFilter("All");
                    }}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{course.icon}</span>
                        <div>
                          <CardTitle className="text-base font-display">
                            {course.title}
                          </CardTitle>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {stats.total} problems
                          </p>
                        </div>
                        {stats.solvedCount > 0 && (
                          <Badge
                            variant="secondary"
                            className="ml-auto text-xs"
                          >
                            {stats.solvedCount}/{stats.total}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-2">
                      <div className="flex gap-2 text-xs">
                        <span className="px-2 py-0.5 rounded bg-green-500/15 text-green-400 border border-green-500/20">
                          Easy {stats.easy}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-yellow-500/15 text-yellow-400 border border-yellow-500/20">
                          Medium {stats.medium}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-red-500/15 text-red-400 border border-red-500/20">
                          Hard {stats.hard}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCourse(course);
                          setFilter("All");
                        }}
                        data-ocid={`coding.open-course.button.${i + 1}`}
                      >
                        <BookOpen className="w-3.5 h-3.5 mr-1.5" />
                        Practice
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Problem List inside a course */}
        {selectedCourse && !selectedProblem && (
          <motion.div
            key="problems"
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
              {filteredProblems.map((prob, i) => (
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
                              <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
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
                        {solved.has(prob.id) ? "Review" : "Solve"}
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
                    Hint
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
                      {selectedCourse?.title ?? "Code"}
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
