import type { Problem } from "./codingData";

export const javaCodePart2: Problem[] = [
  // ===== Arrays =====
  {
    id: "j-ar-e1",
    title: "Declare Array",
    difficulty: "Easy",
    topic: "Arrays",
    description:
      "Declare an int array of 5 elements and print them.\n\nInput: 1 2 3 4 5\nOutput: 1 2 3 4 5",
    hint: "int[] arr = {1,2,3,4,5};",
    starterCode: "",
  },
  {
    id: "j-ar-e2",
    title: "Array Length",
    difficulty: "Easy",
    topic: "Arrays",
    description:
      "Print the length of an array.\n\nInput: [10,20,30,40]\nOutput: 4",
    hint: "arr.length",
    starterCode: "",
  },
  {
    id: "j-ar-e3",
    title: "Sum of Array",
    difficulty: "Easy",
    topic: "Arrays",
    description:
      "Find the sum of all array elements.\n\nInput: 1 2 3 4 5\nOutput: 15",
    hint: "Loop and accumulate",
    starterCode: "",
  },
  {
    id: "j-ar-e4",
    title: "Max in Array",
    difficulty: "Easy",
    topic: "Arrays",
    description:
      "Find the maximum element in an array.\n\nInput: 3 7 1 9 4\nOutput: 9",
    hint: "Track max variable in loop",
    starterCode: "",
  },
  {
    id: "j-ar-e5",
    title: "Min in Array",
    difficulty: "Easy",
    topic: "Arrays",
    description:
      "Find the minimum element in an array.\n\nInput: 3 7 1 9 4\nOutput: 1",
    hint: "Track min variable in loop",
    starterCode: "",
  },
  {
    id: "j-ar-e6",
    title: "Reverse Array",
    difficulty: "Easy",
    topic: "Arrays",
    description:
      "Reverse an array in place.\n\nInput: 1 2 3 4 5\nOutput: 5 4 3 2 1",
    hint: "Swap from both ends",
    starterCode: "",
  },
  {
    id: "j-ar-e7",
    title: "Array Average",
    difficulty: "Easy",
    topic: "Arrays",
    description:
      "Compute average of array elements.\n\nInput: 2 4 6 8 10\nOutput: 6.0",
    hint: "sum / arr.length",
    starterCode: "",
  },
  {
    id: "j-ar-e8",
    title: "Copy Array",
    difficulty: "Easy",
    topic: "Arrays",
    description:
      "Copy array to a new array and print.\n\nInput: [1,2,3]\nOutput: [1,2,3]",
    hint: "Arrays.copyOf() or loop",
    starterCode: "",
  },
  {
    id: "j-ar-e9",
    title: "Count Occurrences",
    difficulty: "Easy",
    topic: "Arrays",
    description:
      "Count how many times a value appears in array.\n\nInput: [1,2,2,3,2] 2\nOutput: 3",
    hint: "Loop and count matches",
    starterCode: "",
  },
  {
    id: "j-ar-e10",
    title: "2D Array Print",
    difficulty: "Easy",
    topic: "Arrays",
    description:
      "Create and print a 2x3 2D array.\n\nInput: [[1,2,3],[4,5,6]]\nOutput: 1 2 3\n4 5 6",
    hint: "Nested for loops",
    starterCode: "",
  },
  {
    id: "j-ar-m1",
    title: "Sort Array",
    difficulty: "Medium",
    topic: "Arrays",
    description:
      "Sort array in ascending order.\n\nInput: 5 3 8 1 9 2\nOutput: 1 2 3 5 8 9",
    hint: "Arrays.sort(arr)",
    starterCode: "",
  },
  {
    id: "j-ar-m2",
    title: "Second Largest",
    difficulty: "Medium",
    topic: "Arrays",
    description:
      "Find the second largest element.\n\nInput: 5 3 8 1 9 2\nOutput: 8",
    hint: "Track first and second max",
    starterCode: "",
  },
  {
    id: "j-ar-m3",
    title: "Remove Duplicates",
    difficulty: "Medium",
    topic: "Arrays",
    description:
      "Remove duplicate elements from sorted array.\n\nInput: [1,1,2,3,3,4]\nOutput: [1,2,3,4]",
    hint: "Use a set or compare adjacent elements",
    starterCode: "",
  },
  {
    id: "j-ar-m4",
    title: "Rotate Array",
    difficulty: "Medium",
    topic: "Arrays",
    description:
      "Rotate array right by k positions.\n\nInput: [1,2,3,4,5] k=2\nOutput: [4,5,1,2,3]",
    hint: "Reverse entire, then parts",
    starterCode: "",
  },
  {
    id: "j-ar-m5",
    title: "Merge Sorted Arrays",
    difficulty: "Medium",
    topic: "Arrays",
    description:
      "Merge two sorted arrays into one sorted array.\n\nInput: [1,3,5] [2,4,6]\nOutput: [1,2,3,4,5,6]",
    hint: "Two pointers approach",
    starterCode: "",
  },
  {
    id: "j-ar-m6",
    title: "Two Sum",
    difficulty: "Medium",
    topic: "Arrays",
    description:
      "Find two indices whose elements sum to target.\n\nInput: [2,7,11,15] target=9\nOutput: 0 1",
    hint: "HashMap for complement",
    starterCode: "",
  },
  {
    id: "j-ar-m7",
    title: "Move Zeros",
    difficulty: "Medium",
    topic: "Arrays",
    description:
      "Move all zeros to end while maintaining order.\n\nInput: [0,1,0,3,12]\nOutput: [1,3,12,0,0]",
    hint: "Two pointer, fill non-zeros first",
    starterCode: "",
  },
  {
    id: "j-ar-m8",
    title: "Matrix Diagonal Sum",
    difficulty: "Medium",
    topic: "Arrays",
    description:
      "Sum both diagonals of a 3x3 matrix.\n\nInput: [[1,2,3],[4,5,6],[7,8,9]]\nOutput: 25",
    hint: "Main diagonal: arr[i][i], anti: arr[i][n-1-i]",
    starterCode: "",
  },
  {
    id: "j-ar-m9",
    title: "Find Missing Number",
    difficulty: "Medium",
    topic: "Arrays",
    description:
      "Find missing number in array of 1 to n.\n\nInput: [1,2,4,5] n=5\nOutput: 3",
    hint: "Expected sum = n*(n+1)/2",
    starterCode: "",
  },
  {
    id: "j-ar-m10",
    title: "Majority Element",
    difficulty: "Medium",
    topic: "Arrays",
    description:
      "Find element that appears more than n/2 times.\n\nInput: [3,2,3]\nOutput: 3",
    hint: "Boyer-Moore voting algorithm",
    starterCode: "",
  },
  {
    id: "j-ar-h1",
    title: "Spiral Matrix",
    difficulty: "Hard",
    topic: "Arrays",
    description:
      "Print elements of a 3x3 matrix in spiral order.\n\nInput: [[1,2,3],[4,5,6],[7,8,9]]\nOutput: 1 2 3 6 9 8 7 4 5",
    hint: "Track top, bottom, left, right bounds",
    starterCode: "",
  },
  {
    id: "j-ar-h2",
    title: "Maximum Subarray",
    difficulty: "Hard",
    topic: "Arrays",
    description:
      "Find contiguous subarray with maximum sum.\n\nInput: [-2,1,-3,4,-1,2,1,-5,4]\nOutput: 6",
    hint: "Kadane's algorithm",
    starterCode: "",
  },
  {
    id: "j-ar-h3",
    title: "Container With Water",
    difficulty: "Hard",
    topic: "Arrays",
    description:
      "Find max water container using height array.\n\nInput: [1,8,6,2,5,4,8,3,7]\nOutput: 49",
    hint: "Two pointers from ends",
    starterCode: "",
  },
  {
    id: "j-ar-h4",
    title: "Product Except Self",
    difficulty: "Hard",
    topic: "Arrays",
    description:
      "Return array where each element is product of all others.\n\nInput: [1,2,3,4]\nOutput: [24,12,8,6]",
    hint: "Left prefix, right suffix multiply",
    starterCode: "",
  },
  {
    id: "j-ar-h5",
    title: "Longest Consecutive",
    difficulty: "Hard",
    topic: "Arrays",
    description:
      "Find length of longest consecutive sequence.\n\nInput: [100,4,200,1,3,2]\nOutput: 4",
    hint: "HashSet, check n-1 not in set",
    starterCode: "",
  },
  {
    id: "j-ar-h6",
    title: "3 Sum",
    difficulty: "Hard",
    topic: "Arrays",
    description:
      "Find all unique triplets summing to zero.\n\nInput: [-1,0,1,2,-1,-4]\nOutput: [[-1,-1,2],[-1,0,1]]",
    hint: "Sort then two pointers for each element",
    starterCode: "",
  },
  {
    id: "j-ar-h7",
    title: "Trapping Rain Water",
    difficulty: "Hard",
    topic: "Arrays",
    description:
      "Compute how much water can be trapped.\n\nInput: [0,1,0,2,1,0,1,3,2,1,2,1]\nOutput: 6",
    hint: "Track left and right max",
    starterCode: "",
  },
  {
    id: "j-ar-h8",
    title: "Merge Intervals",
    difficulty: "Hard",
    topic: "Arrays",
    description:
      "Merge overlapping intervals.\n\nInput: [[1,3],[2,6],[8,10],[15,18]]\nOutput: [[1,6],[8,10],[15,18]]",
    hint: "Sort by start, check overlap",
    starterCode: "",
  },
  {
    id: "j-ar-h9",
    title: "Search Rotated Array",
    difficulty: "Hard",
    topic: "Arrays",
    description:
      "Search in a rotated sorted array.\n\nInput: [4,5,6,7,0,1,2] target=0\nOutput: 4",
    hint: "Modified binary search",
    starterCode: "",
  },
  {
    id: "j-ar-h10",
    title: "Next Permutation",
    difficulty: "Hard",
    topic: "Arrays",
    description:
      "Find next lexicographic permutation of array.\n\nInput: [1,2,3]\nOutput: [1,3,2]",
    hint: "Find rightmost ascending pair then swap",
    starterCode: "",
  },

  // ===== Strings =====
  {
    id: "j-st-e1",
    title: "String Length",
    difficulty: "Easy",
    topic: "Strings",
    description: "Print the length of a string.\n\nInput: Hello\nOutput: 5",
    hint: "s.length()",
    starterCode: "",
  },
  {
    id: "j-st-e2",
    title: "String Reverse",
    difficulty: "Easy",
    topic: "Strings",
    description: "Reverse a string.\n\nInput: Java\nOutput: avaJ",
    hint: "StringBuilder(s).reverse()",
    starterCode: "",
  },
  {
    id: "j-st-e3",
    title: "Uppercase String",
    difficulty: "Easy",
    topic: "Strings",
    description: "Convert string to uppercase.\n\nInput: hello\nOutput: HELLO",
    hint: "s.toUpperCase()",
    starterCode: "",
  },
  {
    id: "j-st-e4",
    title: "Lowercase String",
    difficulty: "Easy",
    topic: "Strings",
    description: "Convert string to lowercase.\n\nInput: WORLD\nOutput: world",
    hint: "s.toLowerCase()",
    starterCode: "",
  },
  {
    id: "j-st-e5",
    title: "String Contains",
    difficulty: "Easy",
    topic: "Strings",
    description:
      "Check if string contains a substring.\n\nInput: Hello World / World\nOutput: true",
    hint: "s.contains(sub)",
    starterCode: "",
  },
  {
    id: "j-st-e6",
    title: "String Replace",
    difficulty: "Easy",
    topic: "Strings",
    description:
      "Replace 'Java' with 'Python' in a string.\n\nInput: I love Java\nOutput: I love Python",
    hint: "s.replace('Java','Python')",
    starterCode: "",
  },
  {
    id: "j-st-e7",
    title: "Trim Whitespace",
    difficulty: "Easy",
    topic: "Strings",
    description:
      "Remove leading and trailing spaces.\n\nInput:   hello  \nOutput: hello",
    hint: "s.trim()",
    starterCode: "",
  },
  {
    id: "j-st-e8",
    title: "String Split",
    difficulty: "Easy",
    topic: "Strings",
    description:
      "Split string by comma and print each part.\n\nInput: a,b,c,d\nOutput: a b c d",
    hint: "s.split(',')",
    starterCode: "",
  },
  {
    id: "j-st-e9",
    title: "Char At Index",
    difficulty: "Easy",
    topic: "Strings",
    description: "Print char at index 2 of a string.\n\nInput: Java\nOutput: v",
    hint: "s.charAt(2)",
    starterCode: "",
  },
  {
    id: "j-st-e10",
    title: "String Join",
    difficulty: "Easy",
    topic: "Strings",
    description:
      "Join three strings with a dash.\n\nInput: Java Python C\nOutput: Java-Python-C",
    hint: "String.join('-', s1, s2, s3)",
    starterCode: "",
  },
  {
    id: "j-st-m1",
    title: "Count Vowels",
    difficulty: "Medium",
    topic: "Strings",
    description: "Count vowels in a string.\n\nInput: Hello World\nOutput: 3",
    hint: "Check each char against aeiouAEIOU",
    starterCode: "",
  },
  {
    id: "j-st-m2",
    title: "Palindrome String",
    difficulty: "Medium",
    topic: "Strings",
    description:
      "Check if a string is a palindrome.\n\nInput: racecar\nOutput: Palindrome",
    hint: "Compare with reversed string",
    starterCode: "",
  },
  {
    id: "j-st-m3",
    title: "Anagram Check",
    difficulty: "Medium",
    topic: "Strings",
    description:
      "Check if two strings are anagrams.\n\nInput: listen silent\nOutput: Anagram",
    hint: "Sort chars and compare",
    starterCode: "",
  },
  {
    id: "j-st-m4",
    title: "Count Words",
    difficulty: "Medium",
    topic: "Strings",
    description:
      "Count words in a sentence.\n\nInput: Hello World in Java\nOutput: 4",
    hint: "split by space and count",
    starterCode: "",
  },
  {
    id: "j-st-m5",
    title: "First Non-Repeat Char",
    difficulty: "Medium",
    topic: "Strings",
    description:
      "Find first non-repeating character.\n\nInput: aabbc\nOutput: c",
    hint: "LinkedHashMap for frequency order",
    starterCode: "",
  },
  {
    id: "j-st-m6",
    title: "String to Integer",
    difficulty: "Medium",
    topic: "Strings",
    description:
      "Convert string '123' to int without parseInt.\n\nInput: 123\nOutput: 123",
    hint: "Subtract '0' from each digit char",
    starterCode: "",
  },
  {
    id: "j-st-m7",
    title: "Remove Spaces",
    difficulty: "Medium",
    topic: "Strings",
    description:
      "Remove all spaces from a string.\n\nInput: Hello World Java\nOutput: HelloWorldJava",
    hint: "s.replace(' ', '') or StringBuilder",
    starterCode: "",
  },
  {
    id: "j-st-m8",
    title: "Capitalize Words",
    difficulty: "Medium",
    topic: "Strings",
    description:
      "Capitalize first letter of each word.\n\nInput: hello world\nOutput: Hello World",
    hint: "Split, capitalize each, join",
    starterCode: "",
  },
  {
    id: "j-st-m9",
    title: "Find Substring Index",
    difficulty: "Medium",
    topic: "Strings",
    description:
      "Find all indices of a pattern in a string.\n\nInput: aababab pat=ab\nOutput: 1 3 5",
    hint: "indexOf with fromIndex",
    starterCode: "",
  },
  {
    id: "j-st-m10",
    title: "Roman to Integer",
    difficulty: "Medium",
    topic: "Strings",
    description:
      "Convert Roman numeral string to integer.\n\nInput: XIV\nOutput: 14",
    hint: "Map each char, subtract if smaller precedes larger",
    starterCode: "",
  },
  {
    id: "j-st-h1",
    title: "Longest Palindrome Substring",
    difficulty: "Hard",
    topic: "Strings",
    description:
      "Find the longest palindromic substring.\n\nInput: babad\nOutput: bab",
    hint: "Expand around center for each char",
    starterCode: "",
  },
  {
    id: "j-st-h2",
    title: "Minimum Window Substring",
    difficulty: "Hard",
    topic: "Strings",
    description:
      "Find smallest window containing all chars of T.\n\nInput: S=ADOBECODEBANC T=ABC\nOutput: BANC",
    hint: "Sliding window with frequency map",
    starterCode: "",
  },
  {
    id: "j-st-h3",
    title: "String Compression",
    difficulty: "Hard",
    topic: "Strings",
    description:
      "Compress consecutive chars: aabccc → a2b1c3.\n\nInput: aabccc\nOutput: a2b1c3",
    hint: "Count consecutive chars",
    starterCode: "",
  },
  {
    id: "j-st-h4",
    title: "Valid Parentheses",
    difficulty: "Hard",
    topic: "Strings",
    description:
      "Check if string has valid bracket matching.\n\nInput: ({[]})\nOutput: Valid",
    hint: "Stack for open brackets",
    starterCode: "",
  },
  {
    id: "j-st-h5",
    title: "Group Anagrams",
    difficulty: "Hard",
    topic: "Strings",
    description:
      "Group words that are anagrams together.\n\nInput: eat tea tan ate nat bat\nOutput: [[eat,tea,ate],[tan,nat],[bat]]",
    hint: "Sort each word as key in HashMap",
    starterCode: "",
  },
  {
    id: "j-st-h6",
    title: "KMP Pattern Search",
    difficulty: "Hard",
    topic: "Strings",
    description:
      "Implement KMP string search algorithm.\n\nInput: text=AABABAB pattern=ABAB\nOutput: Found at index 2",
    hint: "Build failure function first",
    starterCode: "",
  },
  {
    id: "j-st-h7",
    title: "Decode String",
    difficulty: "Hard",
    topic: "Strings",
    description:
      "Decode: 3[a2[bc]] means abcbcabcbcabcbc.\n\nInput: 3[a2[bc]]\nOutput: abcbcabcbcabcbc",
    hint: "Stack-based decoding",
    starterCode: "",
  },
  {
    id: "j-st-h8",
    title: "Word Break",
    difficulty: "Hard",
    topic: "Strings",
    description:
      "Check if string can be segmented into dictionary words.\n\nInput: leetcode dict=[leet,code]\nOutput: true",
    hint: "DP with boolean array",
    starterCode: "",
  },
  {
    id: "j-st-h9",
    title: "Longest Common Subsequence",
    difficulty: "Hard",
    topic: "Strings",
    description:
      "Find length of LCS of two strings.\n\nInput: abcde ace\nOutput: 3",
    hint: "2D DP table",
    starterCode: "",
  },
  {
    id: "j-st-h10",
    title: "Edit Distance",
    difficulty: "Hard",
    topic: "Strings",
    description:
      "Minimum edits to convert one string to another.\n\nInput: horse ros\nOutput: 3",
    hint: "Levenshtein distance DP",
    starterCode: "",
  },

  // ===== Method Overloading =====
  {
    id: "j-ol-e1",
    title: "Overload Add",
    difficulty: "Easy",
    topic: "Method Overloading",
    description:
      "Overload add() for int, double, and String params.\n\nInput: 2 3 / 1.5 2.5 / Hello World\nOutput: 5 4.0 HelloWorld",
    hint: "Same name, different parameter types",
    starterCode: "",
  },
  {
    id: "j-ol-e2",
    title: "Overload Print",
    difficulty: "Easy",
    topic: "Method Overloading",
    description:
      "Overload print() for int, String, and boolean.\n\nInput: 42 / hello / true\nOutput: Int:42 String:hello Bool:true",
    hint: "Three methods named print",
    starterCode: "",
  },
  {
    id: "j-ol-e3",
    title: "Overload Area",
    difficulty: "Easy",
    topic: "Method Overloading",
    description:
      "Overload area(r) for circle and area(l,b) for rectangle.\n\nInput: 5 / 4 3\nOutput: 78.5 12",
    hint: "Different number of parameters",
    starterCode: "",
  },
  {
    id: "j-ol-e4",
    title: "Overload Multiply",
    difficulty: "Easy",
    topic: "Method Overloading",
    description:
      "Overload multiply(int,int), multiply(int,int,int).\n\nInput: 3 4 / 2 3 4\nOutput: 12 24",
    hint: "Two vs three parameters",
    starterCode: "",
  },
  {
    id: "j-ol-e5",
    title: "Overload Max",
    difficulty: "Easy",
    topic: "Method Overloading",
    description:
      "Overload max() for 2 and 3 integers.\n\nInput: 5 8 / 3 7 2\nOutput: 8 7",
    hint: "max(a,b) and max(a,b,c)",
    starterCode: "",
  },
  {
    id: "j-ol-e6",
    title: "Overload Constructor Concept",
    difficulty: "Easy",
    topic: "Method Overloading",
    description:
      "Show two overloaded methods with different return use.\n\nInput: 10 / 3.14\nOutput: Integer 10 / Double 3.14",
    hint: "int vs double param",
    starterCode: "",
  },
  {
    id: "j-ol-e7",
    title: "Overload Convert",
    difficulty: "Easy",
    topic: "Method Overloading",
    description:
      "Overload convert(int) and convert(String).\n\nInput: 65 / A\nOutput: Char: A / Int: 65",
    hint: "Different parameter types",
    starterCode: "",
  },
  {
    id: "j-ol-e8",
    title: "Overload Greet",
    difficulty: "Easy",
    topic: "Method Overloading",
    description:
      "Overload greet() with 0 and 1 params.\n\nInput: / Alice\nOutput: Hello! / Hello, Alice!",
    hint: "greet() and greet(String name)",
    starterCode: "",
  },
  {
    id: "j-ol-e9",
    title: "Overload Square",
    difficulty: "Easy",
    topic: "Method Overloading",
    description:
      "Overload square(int) and square(double).\n\nInput: 5 / 2.5\nOutput: 25 6.25",
    hint: "Same name, int vs double",
    starterCode: "",
  },
  {
    id: "j-ol-e10",
    title: "Overload Concat",
    difficulty: "Easy",
    topic: "Method Overloading",
    description:
      "Overload concat(String, String) and concat(String, int).\n\nInput: Java 8 / Hello World\nOutput: Java8 HelloWorld",
    hint: "String+int and String+String",
    starterCode: "",
  },
  {
    id: "j-ol-m1",
    title: "Overloading vs Override",
    difficulty: "Medium",
    topic: "Method Overloading",
    description:
      "Show difference between overloading (compile-time) and overriding (runtime).\n\nInput: None\nOutput: Overloaded:5, Overridden:Dog bark",
    hint: "Same class vs subclass",
    starterCode: "",
  },
  {
    id: "j-ol-m2",
    title: "Ambiguous Overload",
    difficulty: "Medium",
    topic: "Method Overloading",
    description:
      "Show an ambiguous overload scenario and how to resolve.\n\nInput: (byte)10\nOutput: int version called",
    hint: "byte promoted to int",
    starterCode: "",
  },
  {
    id: "j-ol-m3",
    title: "Varargs Overload",
    difficulty: "Medium",
    topic: "Method Overloading",
    description:
      "Overload method with varargs vs fixed params.\n\nInput: 1 2 / 1 2 3 4\nOutput: Fixed:2args, Varargs:4args",
    hint: "sum(int a, int b) vs sum(int...nums)",
    starterCode: "",
  },
  {
    id: "j-ol-m4",
    title: "Overload toString Display",
    difficulty: "Medium",
    topic: "Method Overloading",
    description:
      "Overload display() to format int array vs String array.\n\nInput: [1,2,3] / [a,b,c]\nOutput: [1,2,3] [a,b,c]",
    hint: "display(int[]) vs display(String[])",
    starterCode: "",
  },
  {
    id: "j-ol-m5",
    title: "Overload with Inheritance",
    difficulty: "Medium",
    topic: "Method Overloading",
    description:
      "Subclass adds overloaded version of parent method.\n\nInput: Dog / Cat\nOutput: Animal sound / Dog sound / Cat extra",
    hint: "Super has speak(), Dog adds speak(int)",
    starterCode: "",
  },
  {
    id: "j-ol-m6",
    title: "Numeric Promotion",
    difficulty: "Medium",
    topic: "Method Overloading",
    description:
      "Show which overload is chosen for byte param.\n\nInput: byte=10\nOutput: int overload called",
    hint: "byte is promoted to int",
    starterCode: "",
  },
  {
    id: "j-ol-m7",
    title: "Overload Power",
    difficulty: "Medium",
    topic: "Method Overloading",
    description:
      "Overload pow(int,int), pow(double,int), pow(long,int).\n\nInput: 2 8 / 2.0 8 / 3L 4\nOutput: 256 256.0 81",
    hint: "Three versions of pow",
    starterCode: "",
  },
  {
    id: "j-ol-m8",
    title: "Overload Sort",
    difficulty: "Medium",
    topic: "Method Overloading",
    description:
      "Overload sort for int[] and String[].\n\nInput: [3,1,2] / [c,a,b]\nOutput: [1,2,3] [a,b,c]",
    hint: "sort(int[]) vs sort(String[])",
    starterCode: "",
  },
  {
    id: "j-ol-m9",
    title: "Overload Distance",
    difficulty: "Medium",
    topic: "Method Overloading",
    description:
      "Compute 1D and 2D distance with overloaded methods.\n\nInput: 3,4 / 0,0,3,4\nOutput: 7.0 5.0",
    hint: "distance(x1,x2) vs distance(x1,y1,x2,y2)",
    starterCode: "",
  },
  {
    id: "j-ol-m10",
    title: "Overload Logger",
    difficulty: "Medium",
    topic: "Method Overloading",
    description:
      "Overload log(String msg), log(String msg, int level).\n\nInput: Error / Warning 2\nOutput: [LOG] Error / [LOG-2] Warning",
    hint: "Optional level parameter",
    starterCode: "",
  },
  {
    id: "j-ol-h1",
    title: "Builder with Overloading",
    difficulty: "Hard",
    topic: "Method Overloading",
    description:
      "Use overloaded set methods in a builder pattern.\n\nInput: name=Alice, age=25, score=98.5\nOutput: Alice,25,98.5",
    hint: "Builder.set(String) set(int) set(double)",
    starterCode: "",
  },
  {
    id: "j-ol-h2",
    title: "Fluent Interface",
    difficulty: "Hard",
    topic: "Method Overloading",
    description:
      "Chain overloaded methods returning 'this'.\n\nInput: .add(5).add(3.5).add('A')\nOutput: Total: 8.5A",
    hint: "Each returns this",
    starterCode: "",
  },
  {
    id: "j-ol-h3",
    title: "Generic Overload",
    difficulty: "Hard",
    topic: "Method Overloading",
    description:
      "Create overloaded print for List<Integer> and List<String>.\n\nInput: [1,2,3] / [a,b,c]\nOutput: IntList:[1,2,3] StrList:[a,b,c]",
    hint: "print(List<Integer>) and print(List<String>)",
    starterCode: "",
  },
  {
    id: "j-ol-h4",
    title: "Dispatch Simulation",
    difficulty: "Hard",
    topic: "Method Overloading",
    description:
      "Show that overloading is compile-time, not runtime.\n\nInput: Animal ref = new Dog()\nOutput: Animal method called",
    hint: "Reference type determines overload",
    starterCode: "",
  },
  {
    id: "j-ol-h5",
    title: "Overload with Generics",
    difficulty: "Hard",
    topic: "Method Overloading",
    description:
      "Overload process(T item) with specific and generic version.\n\nInput: 42 / 3.14 / hello\nOutput: Int:42, Double:3.14, Generic:hello",
    hint: "Specific types preferred over generic",
    starterCode: "",
  },
  {
    id: "j-ol-h6",
    title: "Overload with Array vs Varargs",
    difficulty: "Hard",
    topic: "Method Overloading",
    description:
      "Overload method with int[] and int... params.\n\nInput: array / varargs\nOutput: Array version / Varargs version",
    hint: "int[] and int... can coexist",
    starterCode: "",
  },
  {
    id: "j-ol-h7",
    title: "Type Widening Priority",
    difficulty: "Hard",
    topic: "Method Overloading",
    description:
      "Show widening takes priority over autoboxing.\n\nInput: int x=5\nOutput: long version called",
    hint: "int widens to long before boxing to Integer",
    starterCode: "",
  },
  {
    id: "j-ol-h8",
    title: "Overloaded Comparator",
    difficulty: "Hard",
    topic: "Method Overloading",
    description:
      "Overload compare() for strings, ints, and custom objects.\n\nInput: 5,3 / 'b','a' / Person(Alice,25)\nOutput: 1 1 0",
    hint: "compare(int,int) compare(char,char) etc.",
    starterCode: "",
  },
  {
    id: "j-ol-h9",
    title: "Recursive Overload",
    difficulty: "Hard",
    topic: "Method Overloading",
    description:
      "Overload sum to handle int, double, and array inputs.\n\nInput: 1,2,3 / 1.1,2.2 / [1,2,3,4]\nOutput: 6 3.3 10",
    hint: "Three sum overloads",
    starterCode: "",
  },
  {
    id: "j-ol-h10",
    title: "Overload Serialize",
    difficulty: "Hard",
    topic: "Method Overloading",
    description:
      "Overload serialize(int), serialize(list), serialize(map).\n\nInput: 42 / [1,2] / {a:1}\nOutput: '42' '[1,2]' '{a:1}'",
    hint: "JSON-like output for each type",
    starterCode: "",
  },

  // ===== Encapsulation =====
  {
    id: "j-en-e1",
    title: "Private Field",
    difficulty: "Easy",
    topic: "Encapsulation",
    description:
      "Create class with private int field, public getter.\n\nInput: 42\nOutput: 42",
    hint: "private int x; public int getX()",
    starterCode: "",
  },
  {
    id: "j-en-e2",
    title: "Setter Getter",
    difficulty: "Easy",
    topic: "Encapsulation",
    description:
      "Create Person with private name and getter/setter.\n\nInput: Alice\nOutput: Alice",
    hint: "setName(), getName()",
    starterCode: "",
  },
  {
    id: "j-en-e3",
    title: "Validate in Setter",
    difficulty: "Easy",
    topic: "Encapsulation",
    description:
      "Age setter validates age > 0 and <= 120.\n\nInput: -5\nOutput: Invalid age",
    hint: "if(age>0 && age<=120) this.age=age;",
    starterCode: "",
  },
  {
    id: "j-en-e4",
    title: "Read Only Field",
    difficulty: "Easy",
    topic: "Encapsulation",
    description:
      "Create class with final field (no setter, only getter).\n\nInput: Java\nOutput: Java (cannot change)",
    hint: "private final String name;",
    starterCode: "",
  },
  {
    id: "j-en-e5",
    title: "Encapsulate Counter",
    difficulty: "Easy",
    topic: "Encapsulation",
    description:
      "Create Counter with private count, increment() and getCount().\n\nInput: increment 3 times\nOutput: 3",
    hint: "private int count; public void increment()",
    starterCode: "",
  },
  {
    id: "j-en-e6",
    title: "Boolean Getter",
    difficulty: "Easy",
    topic: "Encapsulation",
    description:
      "Create class with isActive() boolean getter.\n\nInput: activate()\nOutput: true",
    hint: "isActive() naming convention for boolean",
    starterCode: "",
  },
  {
    id: "j-en-e7",
    title: "Multiple Private Fields",
    difficulty: "Easy",
    topic: "Encapsulation",
    description:
      "Create Student with private name, age, GPA and full getters.\n\nInput: Bob 20 3.8\nOutput: Bob 20 3.8",
    hint: "Three fields with three getters",
    starterCode: "",
  },
  {
    id: "j-en-e8",
    title: "Encapsulate Array",
    difficulty: "Easy",
    topic: "Encapsulation",
    description:
      "Return defensive copy of private array.\n\nInput: [1,2,3]\nOutput: [1,2,3] (external changes don't affect)",
    hint: "Return Arrays.copyOf(arr, arr.length)",
    starterCode: "",
  },
  {
    id: "j-en-e9",
    title: "Prevent Direct Access",
    difficulty: "Easy",
    topic: "Encapsulation",
    description:
      "Show compile error when accessing private field directly.\n\nInput: None\nOutput: Only accessible via getter",
    hint: "private access prevents direct use",
    starterCode: "",
  },
  {
    id: "j-en-e10",
    title: "toString with Encapsulation",
    difficulty: "Easy",
    topic: "Encapsulation",
    description:
      "Override toString using getters only.\n\nInput: Alice 25\nOutput: Person{name=Alice, age=25}",
    hint: "Use getName() and getAge() in toString",
    starterCode: "",
  },
  {
    id: "j-en-m1",
    title: "BankAccount Encapsulation",
    difficulty: "Medium",
    topic: "Encapsulation",
    description:
      "BankAccount with deposit/withdraw that validates.\n\nInput: deposit 1000, withdraw 300\nOutput: Balance: 700",
    hint: "Validate amount > 0 and < balance",
    starterCode: "",
  },
  {
    id: "j-en-m2",
    title: "Immutable Class",
    difficulty: "Medium",
    topic: "Encapsulation",
    description:
      "Create immutable Point class with final fields.\n\nInput: (3,4)\nOutput: Point(3,4) cannot change",
    hint: "final fields, no setters",
    starterCode: "",
  },
  {
    id: "j-en-m3",
    title: "Lazy Initialization",
    difficulty: "Medium",
    topic: "Encapsulation",
    description:
      "Initialize expensive field only on first access.\n\nInput: getList() twice\nOutput: Created once, reused",
    hint: "if(list==null) list = new ArrayList();",
    starterCode: "",
  },
  {
    id: "j-en-m4",
    title: "Student Grade System",
    difficulty: "Medium",
    topic: "Encapsulation",
    description:
      "Student with marks; grade auto-computed from marks.\n\nInput: marks=85\nOutput: Grade: A",
    hint: "grade is derived from marks",
    starterCode: "",
  },
  {
    id: "j-en-m5",
    title: "Access Modifier Comparison",
    difficulty: "Medium",
    topic: "Encapsulation",
    description:
      "Show private, protected, public fields accessibility.\n\nInput: None\nOutput: Private only in class, Protected in package/subclass",
    hint: "Comment showing access levels",
    starterCode: "",
  },
  {
    id: "j-en-m6",
    title: "Thread Safe Counter",
    difficulty: "Medium",
    topic: "Encapsulation",
    description:
      "Make counter thread-safe with synchronized getter/setter.\n\nInput: 3 threads increment 100 times\nOutput: 300",
    hint: "synchronized methods",
    starterCode: "",
  },
  {
    id: "j-en-m7",
    title: "Password Encapsulation",
    difficulty: "Medium",
    topic: "Encapsulation",
    description:
      "Store hashed password; setter hashes, getter returns hash.\n\nInput: mypassword\nOutput: Hashed:*****",
    hint: "Hash in setter, never return plain",
    starterCode: "",
  },
  {
    id: "j-en-m8",
    title: "Config Class",
    difficulty: "Medium",
    topic: "Encapsulation",
    description:
      "Singleton config class with private settings map.\n\nInput: set key=theme value=dark\nOutput: dark",
    hint: "Private Map with get/set methods",
    starterCode: "",
  },
  {
    id: "j-en-m9",
    title: "Rectangle Validation",
    difficulty: "Medium",
    topic: "Encapsulation",
    description:
      "Width/height setters reject negative values.\n\nInput: width=-5\nOutput: Invalid width; using 1",
    hint: "if(width > 0) this.width = width; else width=1;",
    starterCode: "",
  },
  {
    id: "j-en-m10",
    title: "Temperature Class",
    difficulty: "Medium",
    topic: "Encapsulation",
    description:
      "Temperature stored in Celsius; getter converts to Fahrenheit.\n\nInput: celsius=100\nOutput: Fahrenheit: 212.0",
    hint: "getFahrenheit() { return celsius*9/5+32; }",
    starterCode: "",
  },
  {
    id: "j-en-h1",
    title: "Deep Copy Encapsulation",
    difficulty: "Hard",
    topic: "Encapsulation",
    description:
      "Return deep copy to prevent mutation of internal state.\n\nInput: list=[1,2,3]; modify external copy\nOutput: Internal list unchanged",
    hint: "new ArrayList<>(internal)",
    starterCode: "",
  },
  {
    id: "j-en-h2",
    title: "Value Object Pattern",
    difficulty: "Hard",
    topic: "Encapsulation",
    description:
      "Create Money class (amount, currency) as immutable value object.\n\nInput: Money(100, USD) + Money(50, USD)\nOutput: Money(150, USD)",
    hint: "All fields final, methods return new instances",
    starterCode: "",
  },
  {
    id: "j-en-h3",
    title: "Fluent Encapsulated Builder",
    difficulty: "Hard",
    topic: "Encapsulation",
    description:
      "Build encapsulated House with builder pattern.\n\nInput: rooms=3 floors=2 color=Blue\nOutput: House{rooms=3,floors=2,color=Blue}",
    hint: "Builder validates in build()",
    starterCode: "",
  },
  {
    id: "j-en-h4",
    title: "Encapsulate Collection",
    difficulty: "Hard",
    topic: "Encapsulation",
    description:
      "Wrap a list with controlled add/remove methods that validate.\n\nInput: add 5 items, remove 2\nOutput: Size: 3",
    hint: "Private List, public add(item) with checks",
    starterCode: "",
  },
  {
    id: "j-en-h5",
    title: "Event Emitter Encapsulation",
    difficulty: "Hard",
    topic: "Encapsulation",
    description:
      "Encapsulate listener list; only emit() triggers callbacks.\n\nInput: addListener, emit\nOutput: Listener called with event data",
    hint: "Private listeners list, public emit()",
    starterCode: "",
  },
  {
    id: "j-en-h6",
    title: "Observable Property",
    difficulty: "Hard",
    topic: "Encapsulation",
    description:
      "Property fires callback when value changes.\n\nInput: setValue(10)\nOutput: Changed: 0 -> 10",
    hint: "In setter, call onChange callback",
    starterCode: "",
  },
  {
    id: "j-en-h7",
    title: "Cache with Encapsulation",
    difficulty: "Hard",
    topic: "Encapsulation",
    description:
      "LRU cache with private map; get/put API only.\n\nInput: put(1,a) put(2,b) get(1) put(3,c) get(2)\nOutput: a null",
    hint: "LinkedHashMap removeEldestEntry",
    starterCode: "",
  },
  {
    id: "j-en-h8",
    title: "Versioned State",
    difficulty: "Hard",
    topic: "Encapsulation",
    description:
      "Track versions of a value; rollback to previous.\n\nInput: set(1) set(2) set(3) rollback\nOutput: Current: 2",
    hint: "Stack to track history",
    starterCode: "",
  },
  {
    id: "j-en-h9",
    title: "Proxy Encapsulation",
    difficulty: "Hard",
    topic: "Encapsulation",
    description:
      "Proxy class logs all getter/setter calls.\n\nInput: getName()\nOutput: [LOG] getName called -> Alice",
    hint: "Delegation with logging around calls",
    starterCode: "",
  },
  {
    id: "j-en-h10",
    title: "DTOs and Entities",
    difficulty: "Hard",
    topic: "Encapsulation",
    description:
      "Map between encapsulated Entity and DTO.\n\nInput: Employee entity\nOutput: EmployeeDTO{name, dept} (no salary)",
    hint: "Separate model classes for API vs domain",
    starterCode: "",
  },
];
